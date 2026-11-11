import { Breadcrumb, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default function CustomerBreadcrumbBar({ items = [], action, onNavigate }) {
  const breadcrumbItems = [
    {
      title: (
        <button
          type="button"
          onClick={() => onNavigate?.('trang-chu')}
          className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[13px] text-stone-500 transition-colors hover:text-[#8c1524]"
        >
          <HomeOutlined />
          Trang chủ
        </button>
      ),
    },
    ...items.map((item, index) => {
      const isLast = index === items.length - 1;
      return {
        title: item.onClick ? (
          <button
            type="button"
            onClick={item.onClick}
            className="max-w-72 cursor-pointer truncate border-0 bg-transparent p-0 text-[13px] text-stone-500 transition-colors hover:text-[#8c1524]"
          >
            {item.label}
          </button>
        ) : (
          <span
            className={`block max-w-72 truncate text-[13px] ${
              isLast ? 'font-medium text-stone-900' : 'text-stone-500'
            }`}
            title={typeof item.label === 'string' ? item.label : undefined}
          >
            {item.label}
          </span>
        ),
      };
    }),
  ];

  return (
    <nav aria-label="Đường dẫn trang" className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Breadcrumb separator="/" items={breadcrumbItems} className="min-w-0" />
        {action && (
          <Button
            type="text"
            size="small"
            icon={action.icon}
            onClick={action.onClick}
            className="shrink-0 !text-[13px] !font-medium !text-stone-700 hover:!text-[#8c1524]"
          >
            <span className="hidden sm:inline">{action.label}</span>
          </Button>
        )}
      </div>
    </nav>
  );
}
