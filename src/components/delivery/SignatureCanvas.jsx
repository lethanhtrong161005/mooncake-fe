import { useRef, useEffect, useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { ClearOutlined, CheckOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function SignatureCanvas({ onSignatureChange, width = 360, height = 160 }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1e293b'; // Slate 800
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && onSignatureChange) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange(dataUrl);
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    if (onSignatureChange) {
      onSignatureChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative border-2 border-dashed border-amber-300 rounded-xl bg-amber-50/40 overflow-hidden shadow-inner touch-none">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="cursor-crosshair block w-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-sm font-medium">
            ✍️ Ký tên người nhận tại đây
          </div>
        )}
      </div>

      <div className="flex justify-between items-center w-full mt-2 px-1">
        <Text type="secondary" className="text-xs">
          {hasSignature ? (
            <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
              <CheckOutlined /> Đã ghi nhận chữ ký
            </span>
          ) : (
            'Chưa có chữ ký (Bắt buộc)'
          )}
        </Text>
        <Space size="small">
          <Button
            size="small"
            type="text"
            danger
            icon={<ClearOutlined />}
            onClick={clear}
            disabled={!hasSignature}
          >
            Xóa ký lại
          </Button>
        </Space>
      </div>
    </div>
  );
}

