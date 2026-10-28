import { ColorPicker, Form, InputNumber, Row, Col } from 'antd';
import { TOKEN_LABELS } from '../../constants/shop';

export default function ThemeTokenForm({ prefix = [] }) {
  return <Row gutter={16}>{Object.entries(TOKEN_LABELS).map(([key, label]) => <Col xs={24} sm={12} key={key}>
    <Form.Item name={[...prefix, key]} label={label} rules={[{ required: true, message: 'Vui lòng chọn màu.' }]} getValueFromEvent={(color) => color.toHexString().toUpperCase()}>
      <ColorPicker disabledAlpha showText format="hex" />
    </Form.Item>
  </Col>)}<Col span={12}><Form.Item name={[...prefix, 'borderRadiusPx']} label="Bo góc (px)" rules={[{ required: true }]}><InputNumber min={0} max={24} precision={0} /></Form.Item></Col>
    <Col span={12}><Form.Item name={[...prefix, 'fontScale']} label="Tỷ lệ chữ" rules={[{ required: true }]}><InputNumber min={0.85} max={1.25} step={0.05} precision={2} /></Form.Item></Col>
  </Row>;
}
