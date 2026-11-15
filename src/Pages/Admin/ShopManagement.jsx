import { useCallback, useState } from 'react';
import { Alert, App, Button, Descriptions, Drawer, Empty, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { CheckCircleOutlined, EyeOutlined, ReloadOutlined, SearchOutlined, StopOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { useShopResource, useShopMutation } from '../../hooks/useShopResource';
import { shopService } from '../../services/shopService';
import { SHOP_STATUS, shopError } from '../../constants/shop';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';

const SHOP_STATUS_TAG = {
  Active: { bg: '#edf5ef', border: '#c5dccb', text: '#2d5a43' },
  Suspended: { bg: '#fdf1f2', border: '#ecc9cd', text: '#7d1322' },
  Draft: { bg: '#faf7f2', border: '#e4dcd3', text: '#6c625e' },
};

function Moderation({ shop, onClose, onSaved }) {
  const { message } = App.useApp();
  const mutation = useShopMutation();
  const action = shop.status === 'Suspended' ? 'Restore' : 'Suspend';
  const [form] = Form.useForm();
  return (
    <Modal
      open
      title={`${action === 'Suspend' ? 'Đình chỉ' : 'Khôi phục'} gian hàng: ${shop.name}`}
      onCancel={onClose}
      confirmLoading={mutation.busy}
      onOk={() => form.submit()}
      okText={action === 'Suspend' ? 'Xác nhận đình chỉ' : 'Xác nhận khôi phục'}
      okButtonProps={{
        danger: action === 'Suspend',
        style: action === 'Restore' ? { backgroundColor: '#7d1322', borderColor: '#7d1322' } : undefined,
      }}
      cancelButtonProps={{ disabled: mutation.busy }}
      destroyOnHidden
    >
      <div className="mb-4 rounded-md border border-[#e4dcd3] bg-[#faf7f2] px-3.5 py-2.5 text-[13px] text-[#574d49]">
        <div className="font-medium text-[#231a18] mb-0.5">
          Trạng thái: {SHOP_STATUS[shop.status]} · Phiên bản v{shop.version}
        </div>
        <div>
          {action === 'Restore'
            ? 'Khôi phục trạng thái trước đình chỉ. Nhà cung cấp phải còn đủ điều kiện hoạt động.'
            : 'Gian hàng sẽ tạm ẩn khỏi sàn và chặn giao dịch mới; các đơn đã xác nhận vẫn xử lý theo chính sách hiện tại.'}
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={async ({ reason }) => {
          const body = { action, reason: reason.trim(), expectedVersion: shop.version };
          const result = await mutation.run(`moderate:${shop.shopId}`, body, (key) => shopService.moderate(shop.shopId, body, key));
          if (result.ok) {
            message.success('Đã cập nhật trạng thái gian hàng.');
            onSaved();
          }
        }}
      >
        <Form.Item
          name="reason"
          label="Lý do xử lý"
          rules={[{ required: true, whitespace: true, min: 10, max: 1000, message: 'Nhập lý do từ 10 đến 1000 ký tự.' }]}
        >
          <Input.TextArea rows={4} maxLength={1000} showCount placeholder="Nêu rõ căn cứ kiểm tra hoặc phản hồi vi phạm..." />
        </Form.Item>
      </Form>
      {mutation.error && (
        <Alert
          type="error"
          showIcon
          title={shopError(mutation.error)}
          description="Bản nháp lý do được giữ lại. Đóng hộp thoại và tải phiên bản mới nếu có xung đột."
        />
      )}
    </Modal>
  );
}

function ShopDetail({ id, onClose, onModerate }) {
  const load = useCallback((signal) => shopService.adminDetail(id, signal), [id]);
  const resource = useShopResource(load);
  const shop = resource.data;
  return (
    <Drawer open title="Thông tin gian hàng" onClose={onClose} size="large" loading={resource.loading}>
      {resource.error && <Alert type="error" showIcon title={shopError(resource.error)} className="mb-4" />}
      {shop && (
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          <Descriptions
            bordered
            size="small"
            column={1}
            items={[
              { key: 'name', label: 'Tên gian hàng', children: <span className="font-medium text-[#231a18]">{shop.name}</span> },
              { key: 'slug', label: 'Đường dẫn', children: <span className="font-mono text-xs text-[#574d49]">/shop/{shop.slug}</span> },
              { key: 'supplier', label: 'Mã hồ sơ NCC', children: <span className="font-mono text-xs text-[#6c625e]">{shop.supplierId}</span> },
              { key: 'status', label: 'Trạng thái', children: SHOP_STATUS[shop.status] },
              { key: 'version', label: 'Phiên bản', children: <span className="tabular-nums">v{shop.version}</span> },
              { key: 'description', label: 'Giới thiệu', children: shop.description || '—' },
              { key: 'reason', label: 'Lý do đình chỉ', children: shop.suspensionReason || '—' },
              { key: 'template', label: 'Giao diện', children: `${shop.appearance.templateName} · v${shop.appearance.revision}` },
            ]}
          />
          <Button
            danger={shop.status !== 'Suspended'}
            type={shop.status === 'Suspended' ? 'primary' : 'default'}
            style={shop.status === 'Suspended' ? { backgroundColor: '#7d1322', borderColor: '#7d1322' } : undefined}
            onClick={() => onModerate(shop)}
          >
            {shop.status === 'Suspended' ? 'Khôi phục gian hàng' : 'Đình chỉ gian hàng'}
          </Button>
        </Space>
      )}
    </Drawer>
  );
}

export function ShopManagementPanel() {
  const [query, setQuery] = useState({ page: 1, pageSize: 20, sort: 'createdAtDesc' });
  const [detailId, setDetailId] = useState(null);
  const [moderating, setModerating] = useState(null);
  const load = useCallback((signal) => shopService.adminList(query, signal), [query]);
  const resource = useShopResource(load);
  const totalCount = resource.data?.totalCount || 0;

  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Form
        onFinish={(values) => setQuery({ ...values, page: 1, pageSize: query.pageSize, sort: values.sort || 'createdAtDesc' })}
        className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5"
      >
        <Form.Item name="q" className="!mb-0 w-full sm:w-64">
          <Input
            prefix={<SearchOutlined className="text-[#8c817c]" />}
            placeholder="Tên hoặc đường dẫn gian hàng"
            maxLength={100}
            allowClear
          />
        </Form.Item>
        <Form.Item name="status" className="!mb-0 w-full sm:w-44">
          <Select
            allowClear
            placeholder="Tất cả trạng thái"
            options={Object.entries(SHOP_STATUS).map(([value, label]) => ({ value, label }))}
          />
        </Form.Item>
        <Form.Item name="sort" className="!mb-0 w-full sm:w-40">
          <Select
            placeholder="Mới nhất"
            options={[
              { value: 'createdAtDesc', label: 'Mới nhất' },
              { value: 'nameAsc', label: 'Tên A–Z' },
            ]}
          />
        </Form.Item>
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Tìm kiếm
          </Button>
          <Button icon={<ReloadOutlined />} onClick={resource.reload} loading={resource.loading}>
            Làm mới
          </Button>
        </div>
      </Form>
      {resource.error && <Alert type="error" showIcon title={shopError(resource.error)} />}
      <Table
        rowKey="shopId"
        size="middle"
        loading={resource.loading}
        dataSource={resource.data?.items || []}
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span className="text-[#6c625e]">Chưa tìm thấy gian hàng phù hợp</span>}
            />
          ),
        }}
        pagination={{
          current: query.page,
          pageSize: query.pageSize,
          total: totalCount,
          showSizeChanger: true,
          onChange: (page, pageSize) => setQuery((previous) => ({ ...previous, page, pageSize })),
        }}
        columns={[
          {
            title: 'Gian hàng',
            dataIndex: 'name',
            width: 280,
            render: (name, shop) => (
              <div className="max-w-[260px]">
                <TruncatedTooltip
                  text={name}
                  tooltipContent={`${name} (/shop/${shop.slug})`}
                  className="font-medium text-[#231a18]"
                />
                <TruncatedTooltip
                  text={`/shop/${shop.slug}`}
                  className="font-mono text-xs text-[#6c625e]"
                />
              </div>
            ),
          },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 135,
            render: (status) => {
              const tone = SHOP_STATUS_TAG[status] || SHOP_STATUS_TAG.Draft;
              return (
                <Tag style={{ backgroundColor: tone.bg, borderColor: tone.border, color: tone.text, marginInlineEnd: 0 }}>
                  {SHOP_STATUS[status] || status}
                </Tag>
              );
            },
          },
          {
            title: 'Sản phẩm',
            dataIndex: 'productCount',
            align: 'right',
            width: 105,
            render: (value) => <span className="tabular-nums font-medium text-[#231a18]">{value ?? 0}</span>,
          },
          {
            title: 'Phiên bản',
            dataIndex: 'version',
            align: 'center',
            width: 95,
            render: (value) => <span className="tabular-nums text-[#574d49]">v{value ?? 1}</span>,
          },
          {
            title: 'Thao tác',
            align: 'center',
            width: 84,
            render: (_, shop) => (
              <RowActionMenu
                ariaLabel={`Thao tác gian hàng ${shop.name}`}
                actions={[
                  {
                    key: 'detail',
                    label: 'Xem chi tiết',
                    icon: <EyeOutlined />,
                    onClick: () => setDetailId(shop.shopId),
                  },
                  {
                    key: 'moderate',
                    label: shop.status === 'Suspended' ? 'Khôi phục gian hàng' : 'Đình chỉ gian hàng',
                    icon: shop.status === 'Suspended' ? <CheckCircleOutlined /> : <StopOutlined />,
                    danger: shop.status !== 'Suspended',
                    onClick: () => setModerating(shop),
                  },
                ]}
              />
            ),
          },
        ]}
      />
      {detailId && <ShopDetail key={detailId} id={detailId} onClose={() => setDetailId(null)} onModerate={setModerating} />}
      {moderating && (
        <Moderation
          shop={moderating}
          onClose={() => setModerating(null)}
          onSaved={() => {
            setModerating(null);
            setDetailId(null);
            resource.reload();
          }}
        />
      )}
    </Space>
  );
}

export default function ShopManagement({ onNavigate }) {
  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/gian-hang"
      title="Quản lý gian hàng"
      subtitle="Tra cứu danh mục gian hàng và xử lý vi phạm với lý do lưu vết."
      onNavigate={onNavigate}
    >
      <section className="rounded-lg border border-[#e4dcd3] bg-white p-4 sm:p-5">
        <ShopManagementPanel />
      </section>
    </ColonyAdminLayout>
  );
}
