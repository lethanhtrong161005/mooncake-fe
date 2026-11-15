import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const packagingTemplateService = {
  async getByShop(shopId, signal) {
    if (!shopId) return [];
    const res = await apiClient.get(API_ENDPOINTS.PACKAGING_TEMPLATES.BY_SHOP(shopId), {
      signal,
      skipAuthHeader: true,
      skipAuthRefresh: true,
    });
    const data = unwrap(res);
    return Array.isArray(data) ? data : [];
  },

  async getMine(signal) {
    const res = await apiClient.get(API_ENDPOINTS.PACKAGING_TEMPLATES.MINE, { signal });
    const data = unwrap(res);
    return Array.isArray(data) ? data : (data?.items ?? []);
  },

  async getMinePage(params = {}, signal) {
    const cleanParams = {
      page: params.page ?? 1,
      pageSize: 5,
    };
    if (params.q?.trim()) cleanParams.q = params.q.trim();
    if (params.isActive !== undefined && params.isActive !== null && params.isActive !== '') {
      cleanParams.isActive = params.isActive;
    }
    if (params.capacity !== undefined && params.capacity !== null && params.capacity !== '') {
      cleanParams.capacity = params.capacity;
    }
    if (params.material?.trim()) cleanParams.material = params.material.trim();
    cleanParams.sort = params.sort || 'createdAtDesc';

    const res = await apiClient.get(API_ENDPOINTS.PACKAGING_TEMPLATES.MINE, {
      params: cleanParams,
      signal,
    });
    const data = unwrap(res);
    if (Array.isArray(data)) {
      return {
        items: data.slice(0, 5),
        page: 1,
        pageSize: 5,
        totalCount: data.length,
        totalPages: Math.max(1, Math.ceil(data.length / 5)),
        hasNext: data.length > 5,
        hasPrevious: false,
      };
    }
    return {
      items: Array.isArray(data?.items) ? data.items : [],
      page: data?.page ?? cleanParams.page,
      pageSize: 5,
      totalCount: data?.totalCount ?? 0,
      totalPages: data?.totalPages ?? 0,
      hasNext: Boolean(data?.hasNext),
      hasPrevious: Boolean(data?.hasPrevious),
    };
  },

  async create(payload, signal) {
    const res = await apiClient.post(API_ENDPOINTS.PACKAGING_TEMPLATES.MINE, payload, { signal });
    return unwrap(res);
  },

  async update(id, payload, signal) {
    const res = await apiClient.put(API_ENDPOINTS.PACKAGING_TEMPLATES.DETAIL(id), payload, { signal });
    return unwrap(res);
  },

  async remove(id, signal) {
    const res = await apiClient.delete(API_ENDPOINTS.PACKAGING_TEMPLATES.DETAIL(id), { signal });
    return unwrap(res);
  },

  async uploadImage(file, signal) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post(API_ENDPOINTS.PACKAGING_TEMPLATES.UPLOAD_IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
      signal,
    });
    return unwrap(res);
  },
};

export default packagingTemplateService;
