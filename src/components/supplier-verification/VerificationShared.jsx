import { useCallback, useState } from 'react';
import { Alert, Button, Descriptions, Empty, Modal, Pagination, Space, Table, Tag, Timeline, App as AntApp } from 'antd';
import { DownloadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import DocumentPreviewModal from './DocumentPreviewModal';
import { DOCUMENT_TYPES, DOCUMENT_PREVIEW_MIME_TYPES, VERIFICATION_COLORS, VERIFICATION_LABELS, verificationError } from '../../constants/supplierVerification';
import { supplierDocumentService } from '../../services/supplierDocumentService';
import supplierService from '../../services/supplierService';
import { useVerificationResource } from '../../hooks/useVerificationResource';
import { verificationDate } from '../../utils/verificationDate';

export function VerificationTag({ status }) {
  return <Tag color={VERIFICATION_COLORS[status]}>{VERIFICATION_LABELS[status] || status || 'Chưa gửi hồ sơ'}</Tag>;
}

export function VerificationDocuments({ documents = [], removable = false, reload }) {
  const { message } = AntApp.useApp();
  const [busy, setBusy] = useState(null);
  const [viewing, setViewing] = useState(null);
  const action = async (document, remove) => {
    if (busy) return;
    setBusy(document.documentId);
    try {
      if (remove) {
        await supplierDocumentService.remove(document.documentId, crypto.randomUUID());
        reload?.();
      } else await supplierDocumentService.download(document);
    } catch (error) { message.error(verificationError(error)); }
    finally { setBusy(null); }
  };
  return <><Table size="small" rowKey="documentId" dataSource={documents} pagination={false}
    scroll={{ x: 550 }} locale={{ emptyText: 'Chưa có tài liệu' }} columns={[
      { title: 'Tài liệu', dataIndex: 'originalFileName' },
      { title: 'Loại', dataIndex: 'documentType', render: (value) => DOCUMENT_TYPES.find((type) => type.value === value)?.label || value },
      { title: 'Trạng thái', dataIndex: 'uploadStatus', render: (value) => <Tag color={value === 'Ready' ? 'success' : 'warning'}>{{ Ready: 'Sẵn sàng', Uploading: 'Đang xử lý', Failed: 'Thất bại', Quarantined: 'Cách ly' }[value] || value}</Tag> },
      { title: 'Hết hạn', dataIndex: 'expiresOn', render: (value) => value || 'Không khai báo' },
      { title: 'Thao tác', key: 'actions', render: (_, row) => <Space>
        <Button aria-label={`Xem ${row.originalFileName || 'tài liệu'}`}
          title={DOCUMENT_PREVIEW_MIME_TYPES.includes(row.contentType) ? 'Xem trước tài liệu' : 'Tải file về để mở định dạng này'}
          icon={<EyeOutlined />} size="small" disabled={row.uploadStatus !== 'Ready' || !DOCUMENT_PREVIEW_MIME_TYPES.includes(row.contentType)}
          onClick={() => setViewing(row)} />
        <Button aria-label={`Tải ${row.originalFileName}`} icon={<DownloadOutlined />} size="small"
          disabled={row.uploadStatus !== 'Ready'} loading={busy === row.documentId} onClick={() => action(row, false)}>Tải</Button>
        {removable && <Button danger aria-label="Gỡ tài liệu chưa gửi" icon={<DeleteOutlined />} size="small"
          disabled={row.uploadStatus === 'Uploading'} loading={busy === row.documentId} onClick={() => action(row, true)} />}
      </Space> },
    ]} />
    {viewing && <DocumentPreviewModal key={viewing.documentId} document={viewing} onClose={() => setViewing(null)} />}
  </>;
}

export function VerificationSnapshot({ profile }) {
  const submission = profile?.currentSubmission;
  if (!submission) return <Empty description="Chưa có hồ sơ đã gửi" />;
  return <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
    {submission.source === 'LegacyImport' && <Alert type="info" title="Hồ sơ chuyển từ dữ liệu cũ"
      description="Thời gian gửi được tham chiếu từ bản ghi cũ; tài liệu chưa đủ metadata an toàn cần được đối soát trước khi tải." />}
    <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }} items={[
      { key: 'revision', label: 'Phiên bản hồ sơ', children: submission.revision },
      { key: 'submitted', label: 'Ngày gửi', children: verificationDate(submission.submittedAtUtc) },
      { key: 'company', label: 'Doanh nghiệp', children: submission.companyName },
      { key: 'tax', label: 'Mã số thuế', children: submission.taxCode },
      { key: 'address', label: 'Địa chỉ', children: submission.address, span: 2 },
      { key: 'description', label: 'Giới thiệu', children: submission.description || '—', span: 2 },
    ]} />
    {submission.rejectionReason && <Alert type="warning" showIcon title="Lý do từ chối" description={submission.rejectionReason} />}
    {profile.revocationReason && profile.verificationStatus === 'Revoked' && <Alert type="error" showIcon title="Lý do thu hồi" description={profile.revocationReason} />}
    <VerificationDocuments documents={submission.documents} />
  </Space>;
}

export function VerificationHistory({ profileId, revision }) {
  const { message } = AntApp.useApp();
  const [page, setPage] = useState(1);
  const [snapshot, setSnapshot] = useState(null);
  const loader = useCallback((signal) => supplierService.history(profileId, page, signal), [profileId, page]);
  const resource = useVerificationResource(loader, revision);
  const openSnapshot = async (metadata) => {
    try {
      const id = JSON.parse(metadata || '{}').submissionId;
      if (!id) return;
      const data = await supplierService.getSubmission(profileId, id);
      setSnapshot(data);
    } catch (error) { message.error(verificationError(error)); }
  };
  if (resource.error) return <Alert type="error" title={resource.error} action={<Button onClick={resource.reload}>Thử lại</Button>} />;
  return <Space orientation="vertical" style={{ width: '100%' }}>
    {resource.data?.items?.length ? <Timeline items={resource.data.items.map((row) => ({
      key: row.id,
      children: <Space orientation="vertical" size={2}><strong>{{
        SupplierApplicationSubmitted: 'Đã gửi hồ sơ', SupplierApplicationResubmitted: 'Đã gửi lại hồ sơ',
        SupplierVerificationApproved: 'Đã phê duyệt', SupplierVerificationRejected: 'Đã từ chối',
        SupplierVerificationRevoked: 'Đã thu hồi xác minh',
      }[row.eventType] || row.eventType}</strong><span>{verificationDate(row.createdAtUtc)}</span>{row.reason && <span>{row.reason}</span>}
        {row.metadata && <Button type="link" onClick={() => openSnapshot(row.metadata)}>Xem bộ hồ sơ của sự kiện</Button>}</Space>,
    }))} /> : <Empty description={resource.isLoading ? 'Đang tải lịch sử…' : 'Chưa có lịch sử'} />}
    <Pagination current={page} total={resource.data?.totalCount || 0} pageSize={20} showSizeChanger={false} onChange={setPage} />
    <Modal open={!!snapshot} title={`Bộ hồ sơ • Phiên bản ${snapshot?.revision || ''}`} footer={null}
      onCancel={() => setSnapshot(null)} width={760} destroyOnHidden>
      <VerificationSnapshot profile={{ currentSubmission: snapshot }} />
    </Modal>
  </Space>;
}
