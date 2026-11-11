import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;
const toListPage = (response, params = {}) => {
  const result = unwrap(response);
  if (!Array.isArray(result)) return result;

  const query = String(params.q || '').trim().toLocaleLowerCase();
  const filtered = result.filter((rfq) => {
    const matchesQuery = !query || `${rfq.rfqNumber || ''} ${rfq.title || ''}`.toLocaleLowerCase().includes(query);
    const matchesStatus = !params.status || rfq.status === params.status;
    return matchesQuery && matchesStatus;
  });
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.pageSize) || filtered.length || 1);
  const start = (page - 1) * pageSize;
  return { items: filtered.slice(start, start + pageSize), totalCount: filtered.length };
};

export const rfqService = {
  async create(request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.CREATE, request));
  },
  async listMine() {
    return unwrap(await apiClient.get(API_ENDPOINTS.RFQ.LIST));
  },
  async listMinePaged(params = {}, signal) {
    return toListPage(await apiClient.get(API_ENDPOINTS.RFQ.LIST, { params, signal }), params);
  },
  async listSupplierInvitations() {
    return unwrap(await apiClient.get(API_ENDPOINTS.RFQ.SUPPLIER_LIST));
  },
  async listSupplierInvitationsPaged(params = {}, signal) {
    return toListPage(await apiClient.get(API_ENDPOINTS.RFQ.SUPPLIER_LIST, { params, signal }), params);
  },
  async get(rfqId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.RFQ.DETAILS(rfqId)));
  },
  async publish(rfqId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.PUBLISH(rfqId), {}));
  },
  async cancel(rfqId, reason) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.CANCEL(rfqId), { reason }));
  },
  async suggestedSuppliers(rfqId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.RFQ.SUGGESTED_SUPPLIERS(rfqId)));
  },
  async invite(rfqId, supplierUserIds) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.INVITATIONS(rfqId), { supplierUserIds }));
  },
  async decline(rfqId, reason) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.DECLINE(rfqId), { reason }));
  },
  async submitBid(rfqId, request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.BIDS(rfqId), request));
  },
  async listBids(rfqId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.RFQ.BIDS(rfqId)));
  },
  async cancelBid(rfqId, bidId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.CANCEL_BID(rfqId, bidId), {}));
  },
  async acceptBid(rfqId, bidId, selectionNote = '') {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.ACCEPT_BID(rfqId, bidId), { selectionNote }));
  },
  async respondToBidSelection(rfqId, bidId, accept) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.RESPOND_TO_BID_SELECTION(rfqId, bidId), { accept }));
  },
};

export default rfqService;
