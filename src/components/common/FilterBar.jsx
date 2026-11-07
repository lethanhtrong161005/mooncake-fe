import { Button, Input, Select } from 'antd';

export default function FilterBar({ search, onSearchChange, status, onStatusChange,
  statusOptions = [], onReset, placeholder = 'Tìm kiếm', filterLabel = 'Trạng thái' }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
      <Input.Search
        aria-label={placeholder}
        placeholder={placeholder}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        allowClear
        className="w-full sm:max-w-xs"
        size="large"
      />
      <Select
        aria-label={filterLabel}
        value={status || ''}
        onChange={onStatusChange}
        options={[{ value: '', label: `Tất cả ${filterLabel.toLowerCase()}` }, ...statusOptions]}
        className="w-full sm:w-56"
        size="large"
      />
      <Button onClick={onReset} size="large">Đặt lại</Button>
    </div>
  );
}
