import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const rfqService = {
  async create(request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.RFQ.CREATE, request));
  },
  async listMine() {
    return unwrap(await apiClient.get(API_ENDPOINTS.RFQ.LIST));
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
};

export default rfqService;
