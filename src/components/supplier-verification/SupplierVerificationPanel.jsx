import {
  ReloadOutlined,
  SafetyCertificateOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Alert,
  App as AntApp,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Result,
  Select,
  Skeleton,
  Space,
  Steps,
  Typography,
  Upload,
} from 'antd';
import { useCallback, useRef, useState } from 'react';
import { DOCUMENT_TYPES, verificationError } from '../../constants/supplierVerification';
import { useAuth } from '../../hooks/useAuth';
import { useVerificationNotifications } from '../../hooks/useVerificationNotifications';
import { useVerificationMutation, useVerificationResource } from '../../hooks/useVerificationResource';
import { supplierDocumentService } from '../../services/supplierDocumentService';
import supplierService from '../../services/supplierService';
import {
  VerificationDocuments,
  VerificationHistory,
  VerificationSnapshot,
  VerificationTag,
} from './VerificationShared';

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
  const canRead = user?.capabilities?.canReadSupplierVerification
    || user?.requestedRole === 'Supplier'
    || user?.role === 'Supplier';

  if (!canRead) return <Result status="403" title="Tài khoản không có quyền gửi hồ sơ nhà cung cấp" />;
  if (!profile && resource.isLoading) return <Skeleton active />;
  if (!profile && resource.error) {
    return (
      <Alert
        type="error"
        showIcon
        title={resource.error}
        action={<Button onClick={resource.reload}>Thử lại</Button>}
      />
    );
  }

  const status = profile?.onboardingState || 'NotSubmitted';
  const canSubmit = profile?.allowedActions?.includes('Submit');
  const staged = profile?.stagedDocuments || [];
  const ready = staged.filter((doc) => doc.uploadStatus === 'Ready');
  const enough = ['BusinessLicense', 'FoodSafetyCertificate'].every(
    (type) => ready.some((doc) => doc.documentType === type),
  );

  const upload = async ({ file, onSuccess, onError }) => {
    setUploading((count) => count + 1);
    if (!uploadKeys.current.has(file.uid)) uploadKeys.current.set(file.uid, crypto.randomUUID());
    try {
      const result = await supplierDocumentService.upload(
        file,
        documentType,
        expiresOn,
        uploadKeys.current.get(file.uid),
      );
      onSuccess(result);
      message.success('Đã tải tài liệu lên.');
      resource.reload();
    } catch (error) {
      onError(error);
      message.error(verificationError(error));
      resource.reload();
    } finally {
      setUploading((count) => count - 1);
    }
  };

  const submit = async () => {
    if (!confirmed || !review || uploading) return;
    const payload = {
      ...review,
      expectedVersion: profile.version,
      documentIds: ready.map((doc) => doc.documentId),
    };
    const result = await mutation.run('apply', payload, (key) => supplierService.apply(payload, key));
    if (result.ok) {
      setReview(null);
      setConfirmed(false);
      resource.reload();
      refreshCurrentUser().catch(() => {});
      message.success('Hồ sơ đã được gửi và đang chờ xét duyệt.');
    }
  };

  return (
    <div className="space-y-5">
      {/* Stage Progress & Accreditation Status */}
      <section
        aria-label="Trạng thái xác minh doanh nghiệp"
        className="rounded-2xl border border-[#e4dcd3] bg-white p-5 sm:p-6"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#ebe3da] pb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <SafetyCertificateOutlined className="text-lg text-[#7d1322]" />
            <h2 className="font-serif text-lg font-semibold text-[#231a18]">
              Xác minh doanh nghiệp
            </h2>
            <VerificationTag status={status} />
          </div>
          <Button icon={<ReloadOutlined />} onClick={resource.reload} loading={resource.isLoading}>
            Làm mới
          </Button>
        </div>

        <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-4">
          <Steps
            size="small"
            current={status === 'Verified' ? 3 : status === 'Pending' ? 2 : enough ? 1 : 0}
            items={[
              { title: 'Thông tin' },
              { title: 'Giấy tờ' },
              { title: 'Xét duyệt' },
              { title: 'Đã xác minh' },
            ]}
          />
        </div>

        {status === 'Pending' && (
          <Alert
            className="mt-4"
            type="info"
            showIcon
            title="Hồ sơ đang chờ Admin xét duyệt"
            description="Bạn sẽ nhận thông báo real-time và email kết quả. Hồ sơ đã gửi được giữ nguyên theo phiên bản."
          />
        )}
        {status === 'Verified' && (
          <Alert
            className="mt-4"
            type="success"
            showIcon
            title="Doanh nghiệp đã được xác minh"
            action={
              <Button onClick={() => onNavigate?.('nha-cung-cap/thiet-lap-gian-hang')}>
                Đến gian hàng
              </Button>
            }
          />
        )}
        {status === 'Revoked' && (
          <Alert
            className="mt-4"
            type="error"
            showIcon
            title="Quyền bán hàng mới đã bị thu hồi"
            description="Bạn có thể xem lịch sử, hoàn tất nghĩa vụ giao dịch cũ trong phạm vi được phép và gửi hồ sơ tái thẩm định."
          />
        )}
        {resource.error && <Alert className="mt-4" type="error" title={resource.error} />}
      </section>

      {/* Submitted Snapshot */}
      {profile?.currentSubmission && (
        <section
          aria-label="Hồ sơ đã gửi"
          className="rounded-2xl border border-[#e4dcd3] bg-white p-5 sm:p-6"
        >
          <div className="mb-4 border-b border-[#ebe3da] pb-3">
            <h3 className="font-serif text-lg font-semibold text-[#231a18]">
              Hồ sơ đã gửi (không thể sửa trực tiếp)
            </h3>
          </div>
          <VerificationSnapshot profile={profile} />
        </section>
      )}

      {/* Editable Application Dossier */}
      {canSubmit && (
        <section
          aria-label="Biểu mẫu hồ sơ doanh nghiệp"
          className="rounded-2xl border border-[#e4dcd3] bg-white p-5 sm:p-6"
        >
          <div className="mb-5 border-b border-[#ebe3da] pb-3">
            <h3 className="font-serif text-lg font-semibold text-[#231a18]">
              {status === 'NotSubmitted' ? 'Chuẩn bị hồ sơ' : 'Chuẩn bị phiên bản hồ sơ mới'}
            </h3>
            <p className="mt-0.5 text-xs text-[#6c625e]">
              Điền thông tin pháp lý doanh nghiệp và đính kèm giấy phép bắt buộc.
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              companyName: profile.companyName,
              taxCode: profile.taxCode,
              address: profile.address,
              description: profile.description,
            }}
            onFinish={(values) => {
              setReview(values);
              setConfirmed(false);
            }}
          >
            <div className="grid grid-cols-1 gap-x-4 md:grid-cols-12">
              <div className="md:col-span-8">
                <Form.Item
                  name="companyName"
                  label="Tên doanh nghiệp"
                  rules={[{ required: true, whitespace: true, max: 255 }]}
                >
                  <Input maxLength={255} placeholder="Công ty TNHH Bánh Nghệ Nhân..." />
                </Form.Item>
              </div>
              <div className="md:col-span-4">
                <Form.Item
                  name="taxCode"
                  label="Mã số thuế"
                  rules={[
                    { required: true },
                    {
                      pattern: /^(?:[0-9]{10}|[0-9]{10}-?[0-9]{3})$/,
                      message: 'Nhập mã 10 số hoặc 13 số (chi nhánh).',
                    },
                  ]}
                >
                  <Input maxLength={50} placeholder="0312345678" />
                </Form.Item>
              </div>
            </div>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, whitespace: true, max: 500 }]}
            >
              <Input maxLength={500} placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Giới thiệu doanh nghiệp"
              rules={[{ max: 2000 }]}
            >
              <Input.TextArea maxLength={2000} rows={3} />
            </Form.Item>

            <div className="mt-6 rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-4">
              <div className="mb-3">
                <h4 className="font-medium text-sm text-[#231a18]">Tài liệu pháp lý</h4>
                <p className="mt-0.5 text-xs text-[#6c625e]">
                  Cần giấy phép kinh doanh và chứng nhận ATTP. Tối đa 10 MiB/file, 10 file và 50 MiB/hồ sơ. Chỉ chủ sở hữu và Admin được phép tải.
                </p>
              </div>

              <Space wrap className="mb-4">
                <Select
                  aria-label="Loại tài liệu"
                  options={DOCUMENT_TYPES}
                  value={documentType}
                  onChange={setDocumentType}
                  style={{ width: 270 }}
                />
                <DatePicker
                  aria-label="Ngày hết hạn giấy tờ"
                  placeholder="Ngày hết hạn (nếu có)"
                  onChange={(_, value) => setExpiresOn(value || null)}
                />
                <Upload
                  showUploadList={false}
                  customRequest={upload}
                  beforeUpload={(file) => {
                    if (file.size === 0) {
                      message.error('File không được rỗng.');
                      return Upload.LIST_IGNORE;
                    }
                    if (file.size > 10 * 1024 * 1024) {
                      message.error('File vượt quá 10 MiB.');
                      return Upload.LIST_IGNORE;
                    }
                    return true;
                  }}
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploading > 0}
                    disabled={staged.length >= 10}
                  >
                    Tải giấy tờ lên
                  </Button>
                </Upload>
              </Space>

              <div className="rounded-xl border border-[#e4dcd3] bg-white p-2">
                <VerificationDocuments documents={staged} removable reload={resource.reload} />
              </div>
            </div>

            {!enough && (
              <Alert
                className="mt-4"
                type="info"
                showIcon
                title="Bổ sung đủ hai loại giấy tờ bắt buộc trước khi gửi."
              />
            )}

            <div className="mt-5">
              <Button
                htmlType="submit"
                type="primary"
                disabled={!enough || uploading > 0}
                loading={mutation.isBusy}
                style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
              >
                Kiểm tra &amp; gửi hồ sơ
              </Button>
            </div>
          </Form>
        </section>
      )}

      {/* Verification Audit History */}
      <section
        aria-label="Lịch sử xác minh"
        className="rounded-2xl border border-[#e4dcd3] bg-white p-5 sm:p-6"
      >
        <div className="mb-4 border-b border-[#ebe3da] pb-3">
          <h3 className="font-serif text-lg font-semibold text-[#231a18]">Lịch sử xác minh</h3>
        </div>
        <VerificationHistory revision={version} />
      </section>

      <Modal
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            Kiểm tra hồ sơ trước khi gửi
          </span>
        }
        open={!!review}
        onCancel={() => {
          if (!mutation.isBusy) setReview(null);
        }}
        onOk={submit}
        okText="Xác nhận gửi"
        cancelText="Hủy"
        okButtonProps={{
          disabled: !confirmed || !canSubmit || !enough,
          style: { backgroundColor: '#7d1322', borderColor: '#7d1322' },
        }}
        confirmLoading={mutation.isBusy}
        destroyOnHidden
      >
        <div className="space-y-3 pt-2">
          <Typography.Paragraph className="!mb-1">
            <strong>{review?.companyName}</strong> • MST{' '}
            <span className="tabular-nums">{review?.taxCode}</span>
          </Typography.Paragraph>
          <Typography.Paragraph className="!mb-3 text-[#6c625e]">
            {review?.address}
          </Typography.Paragraph>
          <VerificationDocuments documents={ready} />
          {mutation.error && <Alert type="error" showIcon title={mutation.error} className="mt-3" />}
          <Checkbox
            className="mt-4"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
          >
            Tôi xác nhận thông tin và tài liệu cung cấp là chính xác.
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
}
