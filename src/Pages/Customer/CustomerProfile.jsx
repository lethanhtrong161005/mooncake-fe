import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, App as AntApp, Avatar, Button, Form, Input, Spin, Typography } from 'antd';
import {
  ArrowLeftOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  MailOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import { useAuth } from '../../hooks/useAuth';
import profileService from '../../services/profileService';
import './customer-profile.css';

const { Title, Text, Paragraph } = Typography;
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_AVATAR_EXTENSIONS = /\.(jpe?g|png|webp)$/i;

const toFormValues = (profile) => ({
  fullName: profile.fullName || '',
  phone: profile.phone || '',
  avatarUrl: profile.avatarUrl || profile.avatar_url || '',
});

const validateAvatarFile = (file) => {
  if (!file) return 'Vui lòng chọn tệp ảnh đại diện.';
  const mime = file.type?.toLowerCase() || '';
  const hasValidType = mime ? ALLOWED_AVATAR_TYPES.has(mime) : ALLOWED_AVATAR_EXTENSIONS.test(file.name || '');
  if (!hasValidType) {
    return 'Chỉ hỗ trợ ảnh định dạng JPG, PNG hoặc WEBP.';
  }
  if (file.size <= 0) return 'Tệp ảnh đại diện bị rỗng.';
  if (file.size > MAX_AVATAR_BYTES) return 'Ảnh đại diện không được vượt quá 5MB.';
  return '';
};

export default function CustomerProfile({ onNavigate }) {
  const { user, refreshCurrentUser } = useAuth();
  const { message: messageApi } = AntApp.useApp();
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const previewObjectUrlRef = useRef('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [avatarError, setAvatarError] = useState('');
  const [localPreviewUrl, setLocalPreviewUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const watchedName = Form.useWatch('fullName', form);
  const watchedAvatar = Form.useWatch('avatarUrl', form);
  const displayName = watchedName?.trim() || profile?.fullName || user?.fullName || 'Khách hàng';
  const avatarUrl = watchedAvatar?.trim() || undefined;
  const previewAvatarUrl = localPreviewUrl || avatarUrl;
  const avatarBusy = uploadingAvatar || removingAvatar;

  const clearLocalPreview = useCallback(() => {
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = '';
    }
    setLocalPreviewUrl('');
  }, []);

  useEffect(() => () => clearLocalPreview(), [clearLocalPreview]);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const current = await profileService.getMine();
      if (!current?.id) throw new Error('Dữ liệu hồ sơ không hợp lệ.');
      setProfile(current);
      form.setFieldsValue(toFormValues(current));
    } catch (error) {
      setLoadError(error?.message || 'Không thể tải hồ sơ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    Promise.resolve().then(loadProfile);
  }, [loadProfile]);

  const handleAvatarUpload = async (file) => {
    const validationError = validateAvatarFile(file);
    if (validationError) {
      setAvatarError(validationError);
      return;
    }

    clearLocalPreview();
    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlRef.current = objectUrl;
    setLocalPreviewUrl(objectUrl);
    setAvatarError('');
    setUploadingAvatar(true);

    try {
      const updated = await profileService.uploadAvatar(file);
      const nextAvatarUrl = updated?.avatarUrl || updated?.avatar_url || '';
      if (!nextAvatarUrl) throw new Error('Phản hồi tải ảnh đại diện không hợp lệ.');

      form.setFieldValue('avatarUrl', nextAvatarUrl);
      setProfile((prev) => (prev ? { ...prev, avatarUrl: nextAvatarUrl } : updated));
      await refreshCurrentUser().catch(() => null);
      messageApi.success('Đã cập nhật ảnh đại diện.');
    } catch (error) {
      setAvatarError(error?.message || 'Không thể tải ảnh đại diện. Vui lòng thử lại.');
    } finally {
      clearLocalPreview();
      setUploadingAvatar(false);
    }
  };

  const handleAvatarInputChange = (event) => {
    const selectedFile = event.target.files?.[0];
    event.target.value = '';
    if (selectedFile) {
      handleAvatarUpload(selectedFile);
    }
  };

  const handleAvatarDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (saving || avatarBusy) return;
    const droppedFile = event.dataTransfer?.files?.[0];
    if (droppedFile) {
      handleAvatarUpload(droppedFile);
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarError('');
    setRemovingAvatar(true);
    try {
      await profileService.removeAvatar();
      clearLocalPreview();
      form.setFieldValue('avatarUrl', '');
      setProfile((prev) => (prev ? { ...prev, avatarUrl: null } : prev));
      await refreshCurrentUser().catch(() => null);
      messageApi.success('Đã gỡ ảnh đại diện.');
    } catch (error) {
      setAvatarError(error?.message || 'Không thể gỡ ảnh đại diện. Vui lòng thử lại.');
    } finally {
      setRemovingAvatar(false);
    }
  };

  const handleSave = async (values) => {
    setSaving(true);
    setSaveError('');
    try {
      const updated = await profileService.updateMine({
        fullName: values.fullName.trim(),
        phone: values.phone?.trim() || null,
        avatarUrl: values.avatarUrl?.trim() || null,
      });
      if (!updated?.id) throw new Error('Phản hồi cập nhật hồ sơ không hợp lệ.');
      setProfile(updated);
      form.setFieldsValue(toFormValues(updated));
      await refreshCurrentUser().catch(() => null);
      messageApi.success('Đã cập nhật hồ sơ cá nhân.');
    } catch (error) {
      setSaveError(error?.message || 'Không thể cập nhật hồ sơ. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="customer-profile-page">
      <CustomerHeader activeKey="ho-so-khach-hang" onNavigate={onNavigate} />
      <main className="customer-profile-page__main">
        <div className="customer-profile-page__container">
          <Button type="link" className="customer-profile-page__back"
            icon={<ArrowLeftOutlined />} onClick={() => onNavigate?.('trang-chu')}>
            Về trang chủ
          </Button>

          <header className="customer-profile-page__heading">
            <Text className="customer-profile-page__eyebrow">Tài khoản Nguyệt Phố</Text>
            <Title level={1}>Hồ sơ của tôi</Title>
            <Paragraph>Quản lý thông tin cá nhân dùng cho tài khoản và đơn hàng của bạn.</Paragraph>
          </header>

          {loading ? (
            <div className="customer-profile-page__loading">
              <Spin size="large" description="Đang tải hồ sơ..." />
            </div>
          ) : loadError ? (
            <Alert type="error" showIcon title="Không thể tải hồ sơ" description={loadError}
              action={<Button onClick={loadProfile}>Thử lại</Button>} />
          ) : profile && (
            <div className="customer-profile-page__layout">
              <aside className="customer-profile-page__identity" aria-label="Thông tin tài khoản">
                <div className="customer-profile-page__identity-top">
                  <span className="customer-profile-page__identity-label">Tài khoản cá nhân</span>
                  <span className="customer-profile-page__identity-mark" aria-hidden="true">✦</span>
                </div>
                <Avatar size={92} src={previewAvatarUrl} alt={`Ảnh đại diện của ${displayName}`}
                  className="customer-profile-page__avatar">
                  {displayName[0].toLocaleUpperCase('vi-VN')}
                </Avatar>
                <Title level={2}>{displayName}</Title>
                <Text className="customer-profile-page__identity-role">Khách hàng Nguyệt Phố</Text>
                <div className="customer-profile-page__identity-rule" />
                <div className="customer-profile-page__identity-detail">
                  <MailOutlined aria-hidden="true" />
                  <span>{profile.email}</span>
                </div>
                <div className="customer-profile-page__identity-note">
                  <CheckCircleOutlined aria-hidden="true" />
                  <span>Thông tin lưu trực tiếp vào tài khoản của bạn.</span>
                </div>
              </aside>

              <section className="customer-profile-page__editor" aria-labelledby="profile-editor-title">
                <div className="customer-profile-page__editor-heading">
                  <span className="customer-profile-page__editor-icon"><UserOutlined aria-hidden="true" /></span>
                  <div>
                    <Title id="profile-editor-title" level={3}>Thông tin cá nhân</Title>
                    <Paragraph>Cập nhật tên, số điện thoại và ảnh đại diện.</Paragraph>
                  </div>
                </div>

                {saveError && <Alert className="customer-profile-page__error" type="error"
                  showIcon title={saveError} />}

                <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}
                  className="customer-profile-page__form">
                  <Form.Item name="avatarUrl" hidden>
                    <Input />
                  </Form.Item>

                  <div className="customer-profile-page__avatar-field">
                    <label htmlFor="customer-avatar-upload" className="customer-profile-page__avatar-label">
                      Ảnh đại diện
                    </label>
                    <input
                      ref={fileInputRef}
                      id="customer-avatar-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                      className="customer-profile-page__file-input"
                      disabled={saving || avatarBusy}
                      onChange={handleAvatarInputChange}
                    />
                    <div
                      className={`customer-profile-page__avatar-dropzone${dragActive ? ' is-dragging' : ''}`}
                      onDragOver={(event) => {
                        event.preventDefault();
                        if (!saving && !avatarBusy) setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleAvatarDrop}
                    >
                      <div className="customer-profile-page__avatar-preview-wrap">
                        <Avatar size={64} src={previewAvatarUrl} alt={`Ảnh xem trước của ${displayName}`}
                          className="customer-profile-page__avatar-thumb">
                          {displayName[0].toLocaleUpperCase('vi-VN')}
                        </Avatar>
                        {uploadingAvatar && (
                          <span className="customer-profile-page__avatar-spinner" aria-hidden="true">
                            <LoadingOutlined />
                          </span>
                        )}
                      </div>

                      <div className="customer-profile-page__avatar-copy">
                        <Text strong className="customer-profile-page__avatar-title">
                          {uploadingAvatar
                            ? 'Đang tải ảnh lên...'
                            : avatarUrl
                              ? 'Ảnh đại diện đang hiển thị trên hồ sơ'
                              : 'Chưa có ảnh đại diện'}
                        </Text>
                        <Text className="customer-profile-page__avatar-hint">
                          Kéo thả hoặc chọn ảnh JPG, PNG, WEBP tối đa 5MB.
                        </Text>
                      </div>

                      <div className="customer-profile-page__avatar-actions">
                        <Button
                          type="default"
                          icon={uploadingAvatar ? <LoadingOutlined /> : <CameraOutlined />}
                          loading={uploadingAvatar}
                          disabled={saving || removingAvatar}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {avatarUrl ? 'Đổi ảnh' : 'Tải ảnh lên'}
                        </Button>
                        {avatarUrl && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            loading={removingAvatar}
                            disabled={saving || uploadingAvatar}
                            onClick={handleRemoveAvatar}
                          >
                            Gỡ ảnh
                          </Button>
                        )}
                      </div>
                    </div>
                    {avatarError && (
                      <Alert className="customer-profile-page__avatar-error" type="error"
                        showIcon title={avatarError} />
                    )}
                  </div>

                  <Form.Item name="fullName" label="Họ và tên" rules={[
                    { required: true, whitespace: true, message: 'Vui lòng nhập họ và tên.' },
                    { max: 100, message: 'Họ và tên tối đa 100 ký tự.' },
                  ]}>
                    <Input placeholder="Tên hiển thị của bạn" autoComplete="name" />
                  </Form.Item>

                  <div className="customer-profile-page__form-row">
                    <Form.Item name="phone" label="Số điện thoại" rules={[
                      { pattern: /^(?:\+?84|0)[\s.\-()]*[35789](?:[\s.\-()]*[0-9]){8}$/, message: 'Số điện thoại không hợp lệ.' },
                    ]}>
                      <Input placeholder="090 123 4567" autoComplete="tel" />
                    </Form.Item>
                    <Form.Item label="Email đăng nhập">
                      <Input value={profile.email} disabled autoComplete="email"
                        aria-label="Email đăng nhập" />
                    </Form.Item>
                  </div>

                  <div className="customer-profile-page__form-footer">
                    <Text>Email đăng nhập được giữ nguyên để bảo vệ tài khoản.</Text>
                    <Button type="primary" htmlType="submit" loading={saving} disabled={avatarBusy}
                      icon={<SaveOutlined />}>
                      Lưu thay đổi
                    </Button>
                  </div>
                </Form>
              </section>
            </div>
          )}
        </div>
      </main>
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
