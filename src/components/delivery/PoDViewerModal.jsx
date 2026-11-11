import { Modal, Tag, Descriptions, Image, Typography, Space, Empty, Alert, Tooltip, Button } from 'antd';
import {
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CompassOutlined,
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const PROOF_TYPE_MAP = {
  Pickup: { text: 'Bốc hàng tại xưởng', color: 'blue' },
  InTransit: { text: 'Kiểm tra lộ trình', color: 'cyan' },
  Delivery: { text: 'Bàn giao thành công', color: 'gold' },
  FailedAttempt: { text: 'Giao thất bại', color: 'error' },
};

export default function PoDViewerModal({ open, onClose, delivery, proofs = [] }) {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-[#481b24]">
          <SafetyCertificateOutlined className="text-[#8c1524] text-lg" />
          <span>Bằng chứng giao nhận · {delivery?.deliveryNumber || 'Chuyến giao'}</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" className="!bg-[#8c1524] hover:!bg-[#a41c2d]" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={720}
      centered
      rootClassName="journey-pod-modal"
    >
      <div className="py-2 space-y-4">
        {delivery && (
          <Alert
            type="info"
            className="border-amber-200 bg-amber-50/50"
            title={
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span><strong>Hợp đồng:</strong> {delivery.contractNumber || 'Chưa cập nhật'}</span>
                <span><strong>Người nhận:</strong> {delivery.recipientName || 'Chưa cập nhật'}{delivery.recipientPhone ? ` (${delivery.recipientPhone})` : ''}</span>
                <span><strong>Mã vận đơn:</strong> {delivery.trackingCode || 'Nội bộ xưởng'}</span>
              </div>
            }
          />
        )}

        {proofs.length === 0 ? (
          <Empty description="Chưa có bằng chứng PoD nào được nộp cho chuyến giao này." />
        ) : (
          proofs.map((proof, index) => {
            const typeConfig = PROOF_TYPE_MAP[proof.proofType] || { text: proof.proofType, color: 'default' };
            const mapsUrl = proof.locationLat && proof.locationLng
              ? `https://www.google.com/maps?q=${proof.locationLat},${proof.locationLng}`
              : null;

            return (
              <div
                key={proof.id || index}
                className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b pb-2">
                  <Space>
                    <Tag color={typeConfig.color} className="font-semibold px-2 py-0.5">
                      {typeConfig.text}
                    </Tag>
                    <Text type="secondary" className="text-xs">
                      <ClockCircleOutlined className="mr-1" />
                      {proof.takenAt ? new Date(proof.takenAt).toLocaleString('vi-VN') : 'Mới cập nhật'}
                    </Text>
                  </Space>

                  <Tag icon={<SafetyCertificateOutlined />} color={proof.isVerified ? 'success' : 'default'} className="rounded-full">
                    {proof.isVerified ? 'Đã xác minh' : 'Chưa xác minh'}
                  </Tag>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div>
                    <Text strong className="text-xs block mb-1 text-slate-600">
                      Ảnh kiện hàng tại điểm giao:
                    </Text>
                    {proof.photoUrl ? (
                      <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        <Image
                          src={proof.photoUrl}
                          alt="Ảnh bằng chứng bàn giao"
                          className="object-cover w-full max-h-48 rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs">
                        Không có ảnh
                      </div>
                    )}
                  </div>

                  <div>
                    <Text strong className="text-xs block mb-1 text-slate-600">
                      Chữ ký người nhận:
                    </Text>
                    {proof.signatureUrl ? (
                      <div className="rounded-lg overflow-hidden border border-amber-200 bg-amber-50/30 p-2 flex items-center justify-center min-h-[120px]">
                        <Image
                          src={proof.signatureUrl}
                          alt="Chữ ký người nhận hàng"
                          className="max-h-28 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-28 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">
                        Không yêu cầu chữ ký ở bước này
                      </div>
                    )}
                  </div>
                </div>

                <Descriptions size="small" column={1} className="mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Descriptions.Item label={<span className="text-xs text-slate-500"><UserOutlined /> Người nộp</span>}>
                    <Text className="text-xs font-semibold">{proof.takenBy || 'Tài xế / Thủ kho'}</Text>
                  </Descriptions.Item>

                  <Descriptions.Item label={<span className="text-xs text-slate-500"><EnvironmentOutlined /> Tọa độ GPS</span>}>
                    {mapsUrl ? (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-mono"
                      >
                        <CompassOutlined />
                        {Number(proof.locationLat).toFixed(4)}, {Number(proof.locationLng).toFixed(4)} (Xem Maps)
                      </a>
                    ) : (
                      <Text type="secondary" className="text-xs">Không có dữ liệu GPS</Text>
                    )}
                  </Descriptions.Item>

                  {proof.notes && (
                    <Descriptions.Item label={<span className="text-xs text-slate-500">Ghi chú</span>}>
                      <Text className="text-xs italic text-slate-700">{proof.notes}</Text>
                    </Descriptions.Item>
                  )}

                  {proof.tamperProofHash && <Descriptions.Item label={<span className="text-xs text-slate-500">Mã băm SHA-256</span>}>
                    <Tooltip title="Dùng mã này để đối chiếu tính toàn vẹn của bằng chứng">
                      <Paragraph copyable className="text-[10px] font-mono text-slate-500 mb-0 bg-white p-1 rounded border">
                        {proof.tamperProofHash}
                      </Paragraph>
                    </Tooltip>
                  </Descriptions.Item>}
                </Descriptions>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
}

