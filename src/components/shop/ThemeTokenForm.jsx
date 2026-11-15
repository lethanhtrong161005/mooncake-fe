import { Col, ColorPicker, Form, InputNumber, Row } from 'antd';
import { TOKEN_LABELS } from '../../constants/shop';

export default function ThemeTokenForm({ prefix = [] }) {
  return (
    <Row gutter={[14, 4]}>
      {Object.entries(TOKEN_LABELS).map(([key, label]) => (
        <Col xs={24} sm={12} key={key}>
          <Form.Item
            name={[...prefix, key]}
            label={label}
            rules={[{ required: true, message: 'Vui lòng chọn màu.' }]}
            getValueFromEvent={(color) => color.toHexString().toUpperCase()}
          >
            <ColorPicker
              disabledAlpha
              showText
              format="hex"
              className="w-full justify-start"
            />
          </Form.Item>
        </Col>
      ))}
      <Col xs={12}>
        <Form.Item
          name={[...prefix, 'borderRadiusPx']}
          label="Bo góc (px)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={24} precision={0} className="w-full" />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          name={[...prefix, 'fontScale']}
          label="Tỷ lệ chữ"
          rules={[{ required: true }]}
        >
          <InputNumber min={0.85} max={1.25} step={0.05} precision={2} className="w-full" />
        </Form.Item>
      </Col>
    </Row>
  );
}
