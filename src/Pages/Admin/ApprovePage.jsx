import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Card, Drawer, Form, Input, Modal, Select, Space, Table, Typography, App as AntApp } from 'antd';
import { EyeOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { useVerificationNotifications } from '../../hooks/useVerificationNotifications';
import { useVerificationResource, useVerificationMutation } from '../../hooks/useVerificationResource';
import { VERIFICATION_LABELS, verificationError } from '../../constants/supplierVerification';
import supplierService from '../../services/supplierService';
import useDebounce from '../../hooks/useDebounce';
import { VerificationHistory, VerificationSnapshot, VerificationTag } from '../../components/supplier-verification/VerificationShared';
import { verificationDate } from '../../utils/verificationDate';

function DecisionModal({ profile, decision, stale, onCancel, onSuccess }) {
  const { message } = AntApp.useApp();
  const [form] = Form.useForm();
  const mutation = useVerificationMutation();
  const finish = async (values) => {
    const payload = decision === 'revoke' ? { expectedVersion: profile.version, reason: values.reason.trim() } :
      { expectedVersion: profile.version, submissionId: profile.currentSubmission.id,
        approve: decision === 'approve', rejectionReason: decision === 'reject' ? values.reason.trim() : null };
    const result = await mutation.run(decision, payload, (key) => decision === 'revoke' ?
      supplierService.revoke(profile.profileId, payload, key) : supplierService.reviewApplication(profile.profileId, payload, key));
    if (result.ok) { message.success('Đã lưu quyết định. Thông báo và email được xử lý qua hàng đợi.'); onSuccess(); }
    else if (result.error?.status === 409) onSuccess(true);
  };
  return <Modal open title={{ approve: 'Phê duyệt nhà cung cấp', reject: 'Từ chối hồ sơ', revoke: 'Thu hồi xác minh' }[decision]}
    onCancel={() => { if (!mutation.isBusy) onCancel(); }} onOk={() => form.submit()} confirmLoading={mutation.isBusy}
    okText="Xác nhận quyết định" okButtonProps={{ danger: decision === 'revoke', disabled: stale }} destroyOnHidden>
    <Typography.Paragraph>{profile.companyName} • Phiên bản {profile.currentSubmission?.revision}</Typography.Paragraph>
    {stale && <Alert type="warning" showIcon title="Hồ sơ có cập nhật. Hãy đóng hộp thoại và tải lại trước khi quyết định." />}
    {decision === 'approve' && <Alert type="info" title="Phê duyệt sẽ cấp quyền bán hàng mới và huy hiệu Đã xác minh cho doanh nghiệp." />}
    {decision === 'revoke' && <Alert type="warning" title="Thu hồi sẽ chặn giao dịch bán mới và gỡ huy hiệu. Các nghĩa vụ giao dịch cũ không tự động bị hủy." />}
    <Form form={form} layout="vertical" onFinish={finish}>
      {decision !== 'approve' && <Form.Item name="reason" label="Lý do" rules={[
        { required: true, whitespace: true }, { validator: (_, value) => value?.trim().length >= 10 && value.trim().length <= 1000 ?
          Promise.resolve() : Promise.reject(new Error('Nhập lý do từ 10 đến 1000 ký tự.')) },
      ]}><Input.TextArea rows={4} maxLength={1000} showCount /></Form.Item>}
    </Form>
    {mutation.error && <Alert type="error" showIcon title={mutation.error} />}
  </Modal>;
}

export default function ApprovePage({ onNavigate }) {
  const { message } = AntApp.useApp();
  const { workflowVersion = 0 } = useVerificationNotifications() || {};
  const [status, setStatus] = useState('Pending');
  const [query, setQuery] = useState('');
  const search = useDebounce(query, 300);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [decision, setDecision] = useState(null);
  const [forceStale, setForceStale] = useState(false);
  const loader = useCallback((signal) => supplierService.listApplications({
    status: status || undefined, q: search, page, pageSize, sort: 'submittedAtAsc',
  }, signal), [status, search, page, pageSize]);
  const resource = useVerificationResource(loader, workflowVersion);
  const stale = selected && forceStale;
  useEffect(() => {
    if (!selected) return;
    let active = true;
    supplierService.getVerification(selected.profileId).then((current) => {
      if (active && current.version !== selected.version) setForceStale(true);
    }).catch(() => {
      if (active) setForceStale(true);
    });
    return () => { active = false; };
  }, [selected, workflowVersion]);
  const open = async (id) => {
    setDetailLoading(true);
    try {
      const profile = await supplierService.getVerification(id);
      setSelected({ ...profile, eventVersion: workflowVersion });
      setForceStale(false);
    } catch (error) { message.error(verificationError(error)); }
    finally { setDetailLoading(false); }
  };
  const success = (conflict) => {
    if (conflict) { setForceStale(true); return; }
    setDecision(null); setSelected(null); resource.reload();
  };
  return <ColonyAdminLayout role="Admin" activeKey="admin/phe-duyet" onNavigate={onNavigate}
    title="Xác minh & duyệt nhà cung cấp" subtitle="Thẩm định hồ sơ theo đúng phiên bản và lưu lại từng quyết định.">
    <Card title="Hàng đợi hồ sơ" extra={<Button icon={<ReloadOutlined />} onClick={resource.reload}>Làm mới</Button>}>
      <Space wrap style={{ marginBottom: 20 }}>
        <Select aria-label="Trạng thái hồ sơ" value={status} style={{ width: 220 }}
          onChange={(value) => { setStatus(value); setPage(1); }}
          options={[{ value: '', label: 'Tất cả trạng thái' }, ...Object.entries(VERIFICATION_LABELS)
            .filter(([key]) => key !== 'NotSubmitted').map(([value, label]) => ({ value, label }))]} />
        <Input allowClear prefix={<SearchOutlined />} placeholder="Tên doanh nghiệp / mã số thuế" maxLength={100}
          aria-label="Tìm hồ sơ" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
      </Space>
      {resource.error && <Alert style={{ marginBottom: 16 }} type="error" showIcon title={resource.error} />}
      <Table rowKey="profileId" loading={resource.isLoading} dataSource={resource.data?.items || []} scroll={{ x: 850 }}
        pagination={{ current: page, pageSize, total: resource.data?.totalCount || 0, showSizeChanger: true, pageSizeOptions: [20, 50, 100],
          onChange: (next, size) => { setPage(size !== pageSize ? 1 : next); setPageSize(size); } }}
        columns={[
          { title: 'Doanh nghiệp', dataIndex: 'companyName' }, { title: 'Mã số thuế', dataIndex: 'taxCode' },
          { title: 'Phiên bản', dataIndex: 'revision' }, { title: 'Ngày gửi', dataIndex: 'submittedAtUtc', render: verificationDate },
          { title: 'Trạng thái', dataIndex: 'status', render: (value) => <VerificationTag status={value} /> },
          { title: 'Tài liệu', dataIndex: 'documentCount' },
          { title: 'Thao tác', key: 'view', render: (_, row) => <Button icon={<EyeOutlined />} loading={detailLoading}
            onClick={() => open(row.profileId)}>Xem hồ sơ</Button> },
        ]} />
    </Card>
    <Drawer title="Chi tiết hồ sơ nhà cung cấp" open={!!selected} size={850}
      onClose={() => { setSelected(null); setDecision(null); }}
      extra={<Button disabled={detailLoading} onClick={() => open(selected.profileId)}>Tải phiên bản mới</Button>}>
      {selected && <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <VerificationTag status={selected.verificationStatus} />
        {stale && <Alert type="warning" showIcon title="Có thay đổi mới trong hàng đợi. Tải lại hồ sơ trước khi đưa ra quyết định." />}
        <VerificationSnapshot profile={selected} />
        <Space wrap>
          {selected.verificationStatus === 'Pending' && <>
            <Button type="primary" disabled={stale} onClick={() => setDecision('approve')}>Phê duyệt</Button>
            <Button danger disabled={stale} onClick={() => setDecision('reject')}>Từ chối</Button>
          </>}
          {selected.verificationStatus === 'Verified' && <Button danger disabled={stale} onClick={() => setDecision('revoke')}>Thu hồi xác minh</Button>}
        </Space>
        <Typography.Title level={5}>Lịch sử xét duyệt</Typography.Title>
        <VerificationHistory profileId={selected.profileId} revision={workflowVersion} />
      </Space>}
    </Drawer>
    {decision && selected && <DecisionModal profile={selected} decision={decision} stale={stale}
      onCancel={() => setDecision(null)} onSuccess={success} />}
  </ColonyAdminLayout>;
}
