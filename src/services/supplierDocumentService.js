import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const supplierDocumentService = {
  async upload(file, documentType, expiresOn, key, onUploadProgress) {
    const body = new FormData();
    body.append('file', file);
    body.append('documentType', documentType);
    if (expiresOn) body.append('expiresOn', expiresOn);
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.DOCUMENTS, body, {
      headers: { 'Content-Type': undefined, 'Idempotency-Key': key },
      timeout: 60000, onUploadProgress,
    }));
  },
  async remove(id, key) {
    return unwrap(await apiClient.delete(API_ENDPOINTS.SUPPLIERS.DOCUMENT(id), {
      headers: { 'Idempotency-Key': key },
    }));
  },
  async readContent(documentId, signal) {
    return apiClient.get(API_ENDPOINTS.SUPPLIERS.DOCUMENT_CONTENT(documentId), {
      responseType: 'blob', signal,
    });
  },
  async download(document) {
    const blob = await supplierDocumentService.readContent(document.documentId);
    const url = URL.createObjectURL(blob);
    try {
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.originalFileName || 'tai-lieu';
      link.click();
    } finally {
      // Give the browser time to begin the download before revoking the temporary resource.
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  },
};
