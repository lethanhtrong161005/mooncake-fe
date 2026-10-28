import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const paths = API_ENDPOINTS.SHOPS;
const unwrap = (response) => response.data;
const headers = (key) => ({ headers: { 'Idempotency-Key': key } });
const get = async (path, params, signal) => unwrap(await apiClient.get(path, { params, signal }));
const getPublic = async (path, params, signal) => unwrap(await apiClient.get(path, { params, signal, skipAuthHeader: true, skipAuthRefresh: true }));
const write = async (method, path, body, key) => unwrap(await apiClient[method](path, body, headers(key)));

export const shopService = {
  async mine(signal) {
    try { return await get(paths.MINE, undefined, signal); }
    catch (error) { if (error.status === 404 && error.errorCode === 'SHOP_NOT_FOUND') return null; throw error; }
  },
  create: (body, key) => write('post', paths.MINE, body, key),
  update: (body, key) => write('put', paths.MINE, body, key),
  appearance: (body, key) => write('put', paths.APPEARANCE, body, key),
  visibility: (body, key) => write('patch', paths.VISIBILITY, body, key),
  catalog: (cursor, signal) => get(paths.TEMPLATES, { pageSize: 50, cursor }, signal),
  preview: (signal) => get(paths.PREVIEW, undefined, signal),
  public: (slug, signal) => getPublic(paths.PUBLIC(slug), undefined, signal),
  products: (slug, params, signal) => getPublic(paths.PRODUCTS(slug), params, signal),
  categories: (slug, params, signal) => getPublic(paths.CATEGORIES(slug), params, signal),
  reviews: (slug, params, signal) => getPublic(paths.REVIEWS(slug), params, signal),
  adminList: (params, signal) => get(paths.ADMIN, params, signal),
  adminDetail: (id, signal) => get(paths.ADMIN_DETAIL(id), undefined, signal),
  moderate: (id, body, key) => write('patch', paths.MODERATE(id), body, key),
  async upload(file, purpose, key, administrator = false) {
    const data = new FormData(); data.append('file', file); data.append('purpose', purpose);
    return unwrap(await apiClient.post(administrator ? paths.TEMPLATE_MEDIA : paths.MEDIA, data, {
      ...headers(key), timeout: 90000,
    }));
  },
};

export const shopTemplateService = {
  list: (params, signal) => get(paths.ADMIN_TEMPLATES, params, signal),
  detail: (id, signal) => get(paths.ADMIN_TEMPLATE(id), undefined, signal),
  create: (body, key) => write('post', paths.ADMIN_TEMPLATES, body, key),
  publish: (id, body, key) => write('put', paths.ADMIN_TEMPLATE(id), body, key),
  availability: (id, body, key) => write('patch', paths.TEMPLATE_AVAILABILITY(id), body, key),
  premium: (id, body, key) => write('patch', paths.TEMPLATE_PREMIUM(id), body, key),
};
