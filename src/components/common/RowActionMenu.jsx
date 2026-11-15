import { App, Button, Dropdown, Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

/**
 * RowActionMenu
 * Compact single trigger button that opens a dropdown menu of row actions.
 */
export default function RowActionMenu({
  actions = [],
  ariaLabel = 'Thao tác',
  placement = 'bottomRight',
}) {
  const { modal } = App.useApp();
  const visibleActions = actions.filter((item) => item && item.show !== false && !item.hidden);

  const actionableCount = visibleActions.filter((item) => item.type !== 'divider').length;
  if (actionableCount === 0) {
    return null;
  }

  const runAction = (item) => {
    if (item.disabled || !item.onClick) return;
    if (item.confirmTitle) {
      const modalApi = modal || Modal;
      modalApi.confirm({
        title: item.confirmTitle,
        content: item.confirmContent,
        okText: item.confirmOkText || 'Xác nhận',
        cancelText: item.confirmCancelText || 'Hủy',
        okButtonProps: item.danger ? { danger: true } : undefined,
        onOk: () => item.onClick(),
      });
      return;
    }
    item.onClick();
  };

  const menuItems = visibleActions.map((item, idx) => {
    if (item.type === 'divider') {
      return { type: 'divider', key: item.key || `divider-${idx}` };
    }
    return {
      key: item.key || String(idx),
      label: item.label,
      icon: item.icon,
      danger: item.danger,
      disabled: item.disabled,
      onClick: () => runAction(item),
    };
  });

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement={placement}
    >
      <Button
        size="small"
        icon={<MoreOutlined />}
        aria-label={ariaLabel}
        className="!inline-flex !items-center !justify-center !border-[#e4dcd3] !text-[#231a18] hover:!border-[#8c1524] hover:!text-[#8c1524]"
      />
    </Dropdown>
  );
}
