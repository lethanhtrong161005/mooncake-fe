import { ReloadOutlined, SafetyCertificateOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, App as AntApp, Button, Card, Checkbox, DatePicker, Form, Input, Modal, Result, Select, Skeleton, Space, Steps, Typography, Upload } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { DOCUMENT_TYPES, verificationError } from '../../constants/supplierVerification';
import { useAuth } from '../../hooks/useAuth';
import { useVerificationNotifications } from '../../hooks/useVerificationNotifications';
import { useVerificationMutation, useVerificationResource } from '../../hooks/useVerificationResource';
import { supplierDocumentService } from '../../services/supplierDocumentService';
import supplierService from '../../services/supplierService';
import { VerificationDocuments, VerificationHistory, VerificationSnapshot, VerificationTag } from './VerificationShared';

export default function SupplierVerificationPanel({ onNavigate }) {
  const { message } = AntApp.useApp();
  const { user, refreshCurrentUser } = useAuth();
  const notifications = useVerificationNotifications();
  const version = notifications?.workflowVersion || 0;
  const loader = useCallback((signal) => supplierService.getMyProfile({ signal }), []);
  const resource = useVerificationResource(loader, version);
  const mutation = useVerificationMutation();
  const [form] = Form.useForm();
  const [documentType, setDocumentType] = useState('BusinessLicense');
  const [expiresOn, setExpiresOn] = useState(null);
  const [uploading, setUploading] = useState(0);
  const [review, setReview] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const uploadKeys = useRef(new Map());
  const profile = resource.data;
  const canRead = user?.capabilities?.canReadSupplierVerification ||
    user?.requestedRole === 'Supplier' || user?.role === 'Supplier';
  if (!canRead) return <Result status="403" title="Tài khoản không có quyền gửi hồ sơ nhà cung cấp" />;
  if (!profile && resource.isLoading) return <Skeleton active />;
  if (!profile && resource.error) return <Alert type="error" showIcon title={resource.error} action={<Button onClick={resource.reload}>Thử lại</Button>} />;
  const status = profile?.onboardingState || 'NotSubmitted';
  const canSubmit = profile?.allowedActions?.includes('Submit');
  const staged = profile?.stagedDocuments || [];
  const ready = staged.filter((doc) => doc.uploadStatus === 'Ready');
  const enough = ['BusinessLicense', 'FoodSafetyCertificate'].every((type) => ready.some((doc) => doc.documentType === type));
  const upload = async ({ file, onSuccess, onError }) => {
    setUploading((count) => count + 1);
    if (!uploadKeys.current.has(file.uid)) uploadKeys.current.set(file.uid, crypto.randomUUID());
    try {
      const result = await supplierDocumentService.upload(file, documentType, expiresOn, uploadKeys.current.get(file.uid));
      onSuccess(result);
      message.success('Đã tải tài liệu lên.');
      resource.reload();
    } catch (error) {
      onError(error);
      message.error(verificationError(error));
      resource.reload();
    }
    finally { setUploading((count) => count - 1); }
  };
  const submit = async () => {
    if (!confirmed || !review || uploading) return;
    const payload = { ...review, expectedVersion: profile.version, documentIds: ready.map((doc) => doc.documentId) };
    const result = await mutation.run('apply', payload, (key) => supplierService.apply(payload, key));
    if (result.ok) {
      setReview(null); setConfirmed(false); resource.reload();
      refreshCurrentUser().catch(() => {});
      message.success('Hồ sơ đã được gửi và đang chờ xét duyệt.');
    }
  };
  return <Space orientation="vertical" size="large" style={{ width: '100%' }}>
    <Card title={<Space><SafetyCertificateOutlined /> Xác minh doanh nghiệp <VerificationTag status={status} /></Space>}
      extra={<Button icon={<ReloadOutlined />} onClick={resource.reload} loading={resource.isLoading}>Làm mới</Button>}>
      <Steps size="small" current={status === 'Verified' ? 3 : status === 'Pending' ? 2 : enough ? 1 : 0}
        items={[{ title: 'Thông tin' }, { title: 'Giấy tờ' }, { title: 'Xét duyệt' }, { title: 'Đã xác minh' }]} />
      {status === 'Pending' && <Alert style={{ marginTop: 20 }} type="info" showIcon title="Hồ sơ đang chờ Admin xét duyệt"
        description="Bạn sẽ nhận thông báo real-time và email kết quả. Hồ sơ đã gửi được giữ nguyên theo phiên bản." />}
      {status === 'Verified' && <Alert style={{ marginTop: 20 }} type="success" showIcon title="Doanh nghiệp đã được xác minh"
        action={<Button onClick={() => onNavigate?.('nha-cung-cap/thiet-lap-gian-hang')}>Đến gian hàng</Button>} />}
      {status === 'Revoked' && <Alert style={{ marginTop: 20 }} type="error" showIcon title="Quyền bán hàng mới đã bị thu hồi"
        description="Bạn có thể xem lịch sử, hoàn tất nghĩa vụ giao dịch cũ trong phạm vi được phép và gửi hồ sơ tái thẩm định." />}
      {resource.error && <Alert style={{ marginTop: 12 }} type="error" title={resource.error} />}
    </Card>
    {profile?.currentSubmission && <Card title="Hồ sơ đã gửi (không thể sửa trực tiếp)"><VerificationSnapshot profile={profile} /></Card>}
    {canSubmit && <Card title={status === 'NotSubmitted' ? 'Chuẩn bị hồ sơ' : 'Chuẩn bị phiên bản hồ sơ mới'}>
      <Form form={form} layout="vertical" initialValues={{
        companyName: profile.companyName, taxCode: profile.taxCode, address: profile.address, description: profile.description,
      }} onFinish={(values) => { setReview(values); setConfirmed(false); }}>
        <Form.Item name="companyName" label="Tên doanh nghiệp" rules={[{ required: true, whitespace: true, max: 255 }]}><Input maxLength={255} /></Form.Item>
        <Form.Item name="taxCode" label="Mã số thuế" rules={[{ required: true }, { pattern: /^(?:[0-9]{10}|[0-9]{10}-?[0-9]{3})$/, message: 'Nhập mã 10 số hoặc 13 số (chi nhánh).' }]}><Input maxLength={50} /></Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, whitespace: true, max: 500 }]}><Input maxLength={500} /></Form.Item>
        <Form.Item name="description" label="Giới thiệu doanh nghiệp" rules={[{ max: 2000 }]}><Input.TextArea maxLength={2000} rows={3} /></Form.Item>
        <Typography.Title level={5}>Tài liệu pháp lý</Typography.Title>
        <Typography.Paragraph type="secondary">Cần giấy phép kinh doanh và chứng nhận ATTP. Chấp nhận mọi loại file, tối đa 10 MiB/file, 10 file và 50 MiB/hồ sơ. Chỉ người sở hữu và Admin được phép tải.</Typography.Paragraph>
        <Space wrap style={{ marginBottom: 16 }}>
          <Select aria-label="Loại tài liệu" options={DOCUMENT_TYPES} value={documentType} onChange={setDocumentType} style={{ width: 270 }} />
          <DatePicker aria-label="Ngày hết hạn giấy tờ" placeholder="Ngày hết hạn (nếu có)" onChange={(_, value) => setExpiresOn(value || null)} />
          <Upload showUploadList={false} customRequest={upload} beforeUpload={(file) => {
            if (file.size === 0) { message.error('File không được rỗng.'); return Upload.LIST_IGNORE; }
            if (file.size > 10 * 1024 * 1024) { message.error('File vượt quá 10 MiB.'); return Upload.LIST_IGNORE; }
            return true;
          }}><Button icon={<UploadOutlined />} loading={uploading > 0} disabled={staged.length >= 10}>Tải giấy tờ lên</Button></Upload>
        </Space>
        <VerificationDocuments documents={staged} removable reload={resource.reload} />
        {!enough && <Alert style={{ margin: '16px 0' }} type="info" title="Bổ sung đủ hai loại giấy tờ bắt buộc trước khi gửi." />}
        <Button style={{ marginTop: 20 }} htmlType="submit" type="primary" disabled={!enough || uploading > 0} loading={mutation.isBusy}>Kiểm tra & gửi hồ sơ</Button>
      </Form>
    </Card>}
    <Card title="Lịch sử xác minh"><VerificationHistory revision={version} /></Card>
    <Modal title="Kiểm tra hồ sơ trước khi gửi" open={!!review} onCancel={() => { if (!mutation.isBusy) setReview(null); }}
      onOk={submit} okText="Xác nhận gửi" okButtonProps={{ disabled: !confirmed || !canSubmit || !enough }}
      confirmLoading={mutation.isBusy} destroyOnHidden>
      <Typography.Paragraph><strong>{review?.companyName}</strong> • MST {review?.taxCode}</Typography.Paragraph>
      <Typography.Paragraph>{review?.address}</Typography.Paragraph>
      <VerificationDocuments documents={ready} />
      {mutation.error && <Alert type="error" showIcon title={mutation.error} style={{ marginTop: 12 }} />}
      <Checkbox style={{ marginTop: 16 }} checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)}>Tôi xác nhận thông tin và tài liệu cung cấp là chính xác.</Checkbox>
    </Modal>
  </Space>;
}
