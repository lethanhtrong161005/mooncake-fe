---
name: component-generator
description: >-
  Use this skill whenever generating a new React component, popup modal, card, or page view in the mooncake-fe project.
  Ensures code adheres strictly to 2-space indentation, modern ES2024 JavaScript, Ant Design (antd) components, and luxury B2B aesthetics.
---

# React & Ant Design Component Generator Skill

This skill guides the Agent in scaffolding new UI components following the project's Enterprise standards and mandatory Ant Design system.

## Generation Checklist

1. **Mandatory UI Library:** Must use Ant Design (`antd`) components (`Card`, `Button`, `Input`, `Table`, `Modal`, `Tag`, `Badge`, `Space`, `Row`, `Col`, `Typography`, `Divider`).
2. **Icons:** Must use `@ant-design/icons`. Never use raw HTML buttons or external icon fonts like Material Symbols.
3. **Indentation:** Exactly 2 spaces indentation (`tabsize = 2`).
4. **File Placement:** 
   - Reusable layout components: `src/components/layout/ComponentName.jsx`
   - Common UI widgets: `src/components/common/ComponentName.jsx`
   - Specific page screens: `src/Pages/Submodule/ScreenName.jsx`
   - Sub-step components: `src/Pages/Auth/StepName.jsx`
5. **Naming Convention:** PascalCase for filename and function component name.
6. **Imports Order:**
   1. React & Hooks (`useState`, `useEffect`, `useMemo`)
   2. Ant Design components (`Card`, `Button`, `Tag`, etc.)
   3. Ant Design icons (`CheckCircleOutlined`, `ShopOutlined`, etc.)
   4. Custom Hooks (`useAuth`, `useDebounce`)
   5. Services, Utils, Constants
7. **Aesthetics & Tokens:**
   - Crimson Luxury: `#8c1524`
   - Warm Gold: `#d48806`, `#f5c840`
   - Soft Background: `#faf8f6`, `#f5f5f7`
   - Border: `#ebdcd5`, `#f0f0f0`
8. **Accessibility:** Icon buttons must have `title` or `aria-label`, images must have `alt`.

## Standard Ant Design Template

```jsx
import { useState } from 'react';
import { Card, Button, Tag, Space, Typography } from 'antd';
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

/**
 * ExampleCardComponent
 * @param {Object} props
 * @param {string} props.title - Tiêu đề component
 * @param {Function} props.onAction - Callback khi bấm nút hành động
 */
export default function ExampleCardComponent({ title = 'Tiêu đề mặc định', onAction }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      await onAction?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      hoverable
      bordered={false}
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f0e8e4',
      }}
      styles={{
        body: {
          padding: '20px',
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Title level={4} style={{ margin: 0, color: '#1f1f1f' }}>
          {title}
        </Title>
        <Tag color="gold" style={{ fontWeight: 700, borderRadius: 10, margin: 0 }}>
          <CheckCircleFilled style={{ marginRight: 4 }} />
          Đã Xác Minh
        </Tag>
      </div>

      <Paragraph style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 16 }}>
        Nội dung mô tả dịch vụ hoặc sản phẩm theo chuẩn thiết kế giao diện doanh nghiệp B2B.
      </Paragraph>

      <Space size={10} style={{ width: '100%' }}>
        <Button
          type="primary"
          block
          size="middle"
          loading={isLoading}
          onClick={handleAction}
          icon={<ArrowRightOutlined />}
          style={{
            background: '#8c1524',
            borderColor: '#8c1524',
            fontWeight: 700,
            borderRadius: 8,
          }}
        >
          Thực Hiện
        </Button>
      </Space>
    </Card>
  );
}
```
