import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Descriptions,
  Empty,
  Image,
  Progress,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  CameraOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  ReloadOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import contractService from '../../services/contractService';

const { Paragraph, Text, Title } = Typography;

const DELIVERY_STATUS_MAP = {
  Pending: { text: 'Chờ xếp xe', color: 'default' },
  Confirmed: { text: 'Đã xác nhận', color: 'blue' },
  PickedUp: { text: 'Đã bốc lên xe', color: 'geekblue' },
  InTransit: { text: 'Đang vận chuyển', color: 'gold' },
  AwaitingCustomerConfirmation: { text: 'Chờ khách xác nhận', color: 'cyan' },
  Delivered: { text: 'Đã giao thành công (PoD)', color: 'green' },
  Disputed: { text: 'Đang khiếu nại', color: 'red' },
  Failed: { text: 'Giao thất bại', color: 'error' },
  Returned: { text: 'Đã chuyển hoàn', color: 'volcano' },
};

const PROOF_TYPE_MAP = {
  Pickup: 'Bốc hàng tại kho',
  InTransit: 'Lộ trình vận chuyển',
  Delivery: 'Biên bản giao hàng (PoD)',
  FailedAttempt: 'Giao thất bại',
};

const formatDateTime = (val) => (val ? dayjs(val).format('HH:mm DD/MM/YYYY') : '—');

export default function ContractFulfillmentTable({
  contractId,
  contractNumber,
  extraActions = null,
}) {
  const [loading, setLoading] = useState(true);
  const [fulfillmentLines, setFulfillmentLines] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [proofsMap, setProofsMap] = useState({});
  const [loadingProofsFor, setLoadingProofsFor] = useState(null);

  useEffect(() => {
    if (!contractId) return undefined;
    let cancelled = false;

    Promise.all([
      contractService.getFulfillment(contractId).catch(() => []),
      contractService.getDeliveries(contractId).catch(() => []),
    ])
      .then(([fLines, dList]) => {
        if (cancelled) return;
        setFulfillmentLines(Array.isArray(fLines) ? fLines : []);
        setDeliveries(Array.isArray(dList) ? dList : dList?.items || []);
      })
      .catch((error) => {
        if (cancelled) return;
        const msg = error?.response?.data?.message || error?.message || 'Không thể tải bảng đối soát giao hàng.';
        message.error(msg);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [contractId]);

  const handleReload = async () => {
    setLoading(true);
    try {
      const [fLines, dList] = await Promise.all([
        contractService.getFulfillment(contractId).catch(() => []),
        contractService.getDeliveries(contractId).catch(() => []),
      ]);
      setFulfillmentLines(Array.isArray(fLines) ? fLines : []);
      setDeliveries(Array.isArray(dList) ? dList : dList?.items || []);
    } catch {
      message.error('Không thể tải bảng đối soát giao hàng.');
    } finally {
      setLoading(false);
    }
  };

  const loadProofs = async (deliveryId) => {
    if (proofsMap[deliveryId]) return;
    setLoadingProofsFor(deliveryId);
    try {
      const proofs = await contractService.getDeliveryProofs(deliveryId);
      setProofsMap((prev) => ({
        ...prev,
        [deliveryId]: Array.isArray(proofs) ? proofs : proofs?.items || [],
      }));
    } catch {
      message.error('Không thể tải ảnh chứng từ PoD của chuyến giao.');
    } finally {
      setLoadingProofsFor(null);
    }
  };

  const totalContractQty = fulfillmentLines.reduce((acc, line) => acc + (line.totalQuantity ?? line.total ?? 0), 0);
  const totalDeliveredQty = fulfillmentLines.reduce((acc, line) => acc + (line.deliveredQuantity ?? line.delivered ?? 0), 0);
  const totalRemainingQty = fulfillmentLines.reduce((acc, line) => acc + (line.remainingQuantity ?? line.remaining ?? 0), 0);
  const totalScheduledQty = fulfillmentLines.reduce((acc, line) => acc + (line.scheduledQuantity ?? line.scheduled ?? 0), 0);

  const overallPercent = totalContractQty > 0
    ? Math.round((totalDeliveredQty / totalContractQty) * 100)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={5} style={{ margin: 0, color: '#231a18' }}>
            <TruckOutlined style={{ marginRight: 8, color: '#8c1524' }} />
            Đối soát giao hàng theo đợt · Hợp đồng {contractNumber || ''}
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Theo dõi khối lượng từng sản phẩm, danh sách các đợt giao và biên bản nghiệm thu (PoD).
          </Text>
        </div>
        <Space wrap>
          {extraActions}
          <Button icon={<ReloadOutlined />} size="small" onClick={handleReload} loading={loading}>
            Tải lại
          </Button>
        </Space>
      </div>

      <Card size="small" style={{ background: '#faf8f6', borderColor: '#e4dcd3' }}>
        <Descriptions size="small" column={{ xs: 2, sm: 4 }}>
          <Descriptions.Item label="Tổng số lượng">
            <Text strong>{totalContractQty.toLocaleString('vi-VN')}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Đang giao">
            <Text type="warning" strong>{totalScheduledQty.toLocaleString('vi-VN')}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Đã giao đủ (PoD)">
            <Text type="success" strong>{totalDeliveredQty.toLocaleString('vi-VN')}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Còn lại cần giao">
            <Text style={{ color: totalRemainingQty > 0 ? '#d48806' : '#52c41a', fontWeight: 600 }}>
              {totalRemainingQty.toLocaleString('vi-VN')}
            </Text>
          </Descriptions.Item>
        </Descriptions>
        <div style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
            <span>Tiến độ hoàn tất giao hàng hợp đồng:</span>
            <strong>{overallPercent}%</strong>
          </div>
          <Progress percent={overallPercent} strokeColor="#8c1524" size={['100%', 8]} />
        </div>
      </Card>

      <div>
        <Text strong style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>
          1. Bảng đối soát chi tiết từng dòng sản phẩm
        </Text>
        <Table
          rowKey={(record) => record.lineId || record.rfqItemId || record.productName}
          dataSource={fulfillmentLines}
          loading={loading}
          pagination={false}
          size="small"
          scroll={{ x: 720 }}
          columns={[
            {
              title: 'Sản phẩm',
              dataIndex: 'productName',
              render: (name, record) => (
                <div>
                  <Text strong>{name || 'Sản phẩm hợp đồng'}</Text>
                  {record.unit && <Text type="secondary" style={{ fontSize: 12 }}> ({record.unit})</Text>}
                </div>
              ),
            },
            {
              title: 'Đơn vị',
              dataIndex: 'unit',
              width: 90,
              align: 'center',
              render: (unit) => unit || '—',
            },
            {
              title: 'Tổng hợp đồng',
              dataIndex: 'totalQuantity',
              width: 120,
              align: 'right',
              render: (val, record) => (val ?? record.total ?? 0).toLocaleString('vi-VN'),
            },
            {
              title: 'Đang xếp xe/giao',
              dataIndex: 'scheduledQuantity',
              width: 125,
              align: 'right',
              render: (val, record) => (
                <Text type="warning">{(val ?? record.scheduled ?? 0).toLocaleString('vi-VN')}</Text>
              ),
            },
            {
              title: 'Đã giao thành công',
              dataIndex: 'deliveredQuantity',
              width: 140,
              align: 'right',
              render: (val, record) => (
                <Text type="success" strong>{(val ?? record.delivered ?? 0).toLocaleString('vi-VN')}</Text>
              ),
            },
            {
              title: 'Còn lại',
              dataIndex: 'remainingQuantity',
              width: 110,
              align: 'right',
              render: (val, record) => {
                const rem = val ?? record.remaining ?? 0;
                return (
                  <Text strong style={{ color: rem === 0 ? '#52c41a' : '#cf1322' }}>
                    {rem.toLocaleString('vi-VN')}
                  </Text>
                );
              },
            },
            {
              title: 'Trạng thái',
              key: 'status',
              width: 130,
              align: 'center',
              render: (_, record) => {
                const rem = record.remainingQuantity ?? record.remaining ?? 0;
                return rem === 0 ? (
                  <Tag color="success" icon={<CheckCircleOutlined />}>Đã đủ 100%</Tag>
                ) : (
                  <Tag color="processing">Còn thiếu {rem}</Tag>
                );
              },
            },
          ]}
          locale={{ emptyText: 'Chưa có thông tin dòng sản phẩm đối soát.' }}
        />
      </div>

      <div>
        <Text strong style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>
          2. Danh sách các đợt giao &amp; Ảnh chứng từ giao nhận (PoD)
        </Text>
        <Table
          rowKey="id"
          dataSource={deliveries}
          loading={loading}
          pagination={false}
          size="small"
          scroll={{ x: 780 }}
          expandable={{
            expandedRowRender: (record) => {
              const proofs = proofsMap[record.id] || record.proofs || [];
              const isLoadingThisProof = loadingProofsFor === record.id;
              return (
                <div style={{ background: '#fafafa', padding: 16, borderRadius: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Text strong style={{ color: '#8c1524' }}>
                      <CameraOutlined style={{ marginRight: 6 }} />
                      Ảnh chứng từ &amp; Biên bản nghiệm thu giao hàng (PoD)
                    </Text>
                    <Button
                      size="small"
                      icon={<ReloadOutlined />}
                      loading={isLoadingThisProof}
                      onClick={() => loadProofs(record.id)}
                    >
                      Tải lại ảnh
                    </Button>
                  </div>

                  {isLoadingThisProof ? (
                    <div style={{ textAlign: 'center', padding: 16 }}>
                      <Spin size="small" /> Đang tải ảnh chứng từ...
                    </div>
                  ) : proofs.length === 0 ? (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="Chưa có ảnh PoD nào được nộp cho chuyến giao này."
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <Image.PreviewGroup>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          {proofs.map((proof, idx) => (
                            <Card key={proof.id || idx} size="small" style={{ width: 180 }}>
                              {proof.photoUrl ? (
                                <Image
                                  width={156}
                                  height={110}
                                  src={proof.photoUrl}
                                  style={{ objectFit: 'cover', borderRadius: 4 }}
                                  fallback="https://placehold.co/150x110?text=PoD+Photo"
                                />
                              ) : proof.signatureUrl ? (
                                <Image
                                  width={156}
                                  height={110}
                                  src={proof.signatureUrl}
                                  style={{ objectFit: 'contain', background: '#fff', borderRadius: 4 }}
                                  fallback="https://placehold.co/150x110?text=Signature"
                                />
                              ) : (
                                <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
                                  <CameraOutlined style={{ fontSize: 24, color: '#999' }} />
                                </div>
                              )}
                              <div style={{ marginTop: 8 }}>
                                <Tag color="blue" style={{ fontSize: 11, marginBottom: 4 }}>
                                  {PROOF_TYPE_MAP[proof.proofType] || proof.proofType || 'Bằng chứng'}
                                </Tag>
                                {proof.takenAt && (
                                  <div style={{ fontSize: 11, color: '#888' }}>
                                    {formatDateTime(proof.takenAt)}
                                  </div>
                                )}
                                {proof.notes && (
                                  <Paragraph ellipsis={{ rows: 2 }} style={{ margin: '4px 0 0', fontSize: 12 }}>
                                    {proof.notes}
                                  </Paragraph>
                                )}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </Image.PreviewGroup>
                    </div>
                  )}
                </div>
              );
            },
            onExpand: (expanded, record) => {
              if (expanded) loadProofs(record.id);
            },
          }}
          columns={[
            {
              title: 'Đợt giao',
              key: 'batch',
              width: 110,
              render: (_, record) => {
                if (record.batchNumber) {
                  return (
                    <Tag color="purple" style={{ fontWeight: 600 }}>
                      Đợt {record.batchNumber}{record.totalBatches ? `/${record.totalBatches}` : ''}
                    </Tag>
                  );
                }
                return <Tag color="default">Đợt 1</Tag>;
              },
            },
            {
              title: 'Mã chuyến',
              dataIndex: 'deliveryNumber',
              render: (num, record) => (
                <div>
                  <Text strong style={{ color: '#8c1524' }}>{num}</Text>
                  {record.trackingCode && <div><Text type="secondary" style={{ fontSize: 12 }}>Vận đơn: {record.trackingCode}</Text></div>}
                </div>
              ),
            },
            {
              title: 'Sản phẩm trong đợt',
              dataIndex: 'items',
              render: (items) => {
                if (!items || !items.length) return <Text type="secondary">Toàn bộ đơn hàng</Text>;
                return (
                  <Space direction="vertical" size={2}>
                    {items.map((it, idx) => (
                      <Text key={idx} style={{ fontSize: 13 }}>
                        • <strong>{it.productName || 'Sản phẩm'}</strong>: {it.quantity} {it.unit || ''}
                      </Text>
                    ))}
                  </Space>
                );
              },
            },
            {
              title: 'Ngày hẹn / Ngày giao',
              key: 'dates',
              width: 160,
              render: (_, record) => (
                <div style={{ fontSize: 12 }}>
                  <div>Hẹn: {record.scheduledDate || '—'}</div>
                  {record.actualDeliveryDate && (
                    <div style={{ color: '#52c41a' }}>Đã giao: {record.actualDeliveryDate}</div>
                  )}
                </div>
              ),
            },
            {
              title: 'Người nhận & Nơi giao',
              key: 'recipient',
              render: (_, record) => (
                <div style={{ fontSize: 12 }}>
                  <div><Text strong>{record.recipientName || 'Người nhận'}</Text> {record.recipientPhone ? `(${record.recipientPhone})` : ''}</div>
                  <Text type="secondary" ellipsis={{ tooltip: record.toAddress }} style={{ maxWidth: 220 }}>
                    {record.toAddress || '—'}
                  </Text>
                </div>
              ),
            },
            {
              title: 'Tài xế giao hàng',
              key: 'driver',
              width: 170,
              render: (_, record) => {
                if (!record.driverName) {
                  return <Text type="secondary" style={{ fontSize: 12 }}>Chưa có tài xế nhận</Text>;
                }
                return (
                  <div style={{ fontSize: 12 }}>
                    <div>
                      <Text strong>{record.driverName}</Text>
                      <span style={{ color: '#888', marginLeft: 4, fontFamily: 'monospace' }}>
                        ({record.vehiclePlate ? `BS: ${record.vehiclePlate}` : 'Xe xưởng'})
                      </span>
                    </div>
                    {record.driverClaimedAt ? (
                      <div style={{ marginTop: 2 }}>
                        <Tag color="green" style={{ fontSize: 10, padding: '0 4px', margin: 0 }}>
                          Đã nhận lúc {formatDateTime(record.driverClaimedAt)}
                        </Tag>
                      </div>
                    ) : (
                      <div style={{ marginTop: 2 }}>
                        <Tag color="orange" style={{ fontSize: 10, padding: '0 4px', margin: 0 }}>
                          Chưa có tài xế nhận
                        </Tag>
                      </div>
                    )}
                    {record.driverPhone && (
                      <div style={{ marginTop: 4 }}>
                        <Button
                          size="small"
                          type="primary"
                          icon={<PhoneOutlined />}
                          href={`tel:${record.driverPhone}`}
                          style={{ fontSize: 11, height: 22, padding: '0 6px', background: '#2d5a43', borderColor: '#2d5a43' }}
                        >
                          Gọi {record.driverPhone}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              },
            },
            {
              title: 'Trạng thái',
              dataIndex: 'status',
              width: 140,
              render: (status) => {
                const cfg = DELIVERY_STATUS_MAP[status] || { text: status, color: 'default' };
                return <Tag color={cfg.color}>{cfg.text}</Tag>;
              },
            },
            {
              title: 'Ảnh PoD',
              key: 'proofCount',
              width: 100,
              align: 'center',
              render: (_, record) => (
                <Button
                  size="small"
                  icon={<CameraOutlined />}
                  onClick={() => loadProofs(record.id)}
                >
                  Xem ảnh
                </Button>
              ),
            },
          ]}
          locale={{ emptyText: 'Chưa có chuyến giao hàng nào được khởi tạo cho hợp đồng này.' }}
        />
      </div>
    </div>
  );
}
