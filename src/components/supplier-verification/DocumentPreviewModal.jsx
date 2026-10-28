import { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, Skeleton } from 'antd';
import { supplierDocumentService } from '../../services/supplierDocumentService';
import { DOCUMENT_PREVIEW_MIME_TYPES, verificationError } from '../../constants/supplierVerification';

export default function DocumentPreviewModal({ document, onClose }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let objectUrl;
    supplierDocumentService.readContent(document.documentId, controller.signal).then((blob) => {
      if (!active) return;
      const mime = blob.type.split(';')[0].toLowerCase();
      if (!DOCUMENT_PREVIEW_MIME_TYPES.includes(mime)) {
        setError('Chỉ hỗ trợ xem trước tài liệu PDF và ảnh JPEG/PNG.');
        return;
      }
      objectUrl = URL.createObjectURL(blob);
      setPreview({ url: objectUrl, mime });
    }).catch((failure) => {
      if (active && !controller.signal.aborted) setError(verificationError(failure));
    });
    return () => {
      active = false;
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [document.documentId]);

  return <Modal open title={`Xem tài liệu: ${document.originalFileName || 'Tài liệu xác minh'}`}
    onCancel={onClose} width="min(1000px, calc(100vw - 32px))" destroyOnHidden
    footer={<Button onClick={onClose}>Đóng xem trước</Button>}>
    {error ? <Alert type="error" showIcon title={error} /> : !preview ? <Skeleton active /> :
      <div style={{ height: '70vh', minHeight: 260, textAlign: 'center', overflow: 'auto' }}>
        {preview.mime === 'application/pdf' ?
          <iframe title={`PDF: ${document.originalFileName}`} src={preview.url}
            referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', border: 0 }} /> :
          <Image src={preview.url} alt={document.originalFileName || 'Giấy tờ xác minh doanh nghiệp'}
            preview={false} style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }} />}
      </div>}
  </Modal>;
}
