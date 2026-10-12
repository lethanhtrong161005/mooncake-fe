---
name: service-generator
description: >-
  Use this skill whenever creating or updating an API Service module in mooncake-fe (e.g. orderService, rfqService, contractService).
  Ensures seamless integration with Axios apiClient, ASP.NET Core endpoints, and robust mock fallback.
---

# API Service Generator Skill

This skill provides step-by-step instructions for scaffolding backend communication services in `src/services/`.

## Procedure

1. **Step 1: Check or Add API Endpoints**
   Open `src/constants/apiEndpoints.js` and register the new routes if they do not exist yet.
2. **Step 2: Create the Service File**
   Create `src/services/<domain>Service.js` using 2-space indentation.
3. **Step 3: Implement Axios calls via apiClient**
   Use `apiClient.get()`, `apiClient.post()`, `apiClient.put()`, or `apiClient.delete()`.
4. **Step 4: Add Mock Fallback**
   Check `import.meta.env.VITE_ENABLE_MOCK_FALLBACK` to return sensible mock data if backend returns error or is offline.

## Standard Service Template

```javascript
/**
 * Order Service
 * Connects with ASP.NET Core backend /api/v1/orders
 */

import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const ENABLE_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

const MOCK_ORDERS = [
  {
    id: 'ord-mock-01',
    customerName: 'Tập đoàn An Phát',
    totalAmount: 145000000,
    status: 'InProduction',
    createdAt: '2026-10-12',
  },
];

export const orderService = {
  /**
   * Lấy danh sách đơn hàng
   * @param {Object} queryParams
   */
  async getOrders(queryParams = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORDERS.LIST, { params: queryParams });
      return response.data || response;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        console.warn('[orderService.getOrders]: Backend offline, using mock data.');
        return MOCK_ORDERS;
      }
      throw error;
    }
  },

  /**
   * Tạo mới đơn hàng B2B
   * @param {Object} orderData
   */
  async createOrder(orderData) {
    try {
      return await apiClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return {
          status: 200,
          message: 'Tạo đơn hàng thành công (Mock Mode)',
          data: { ...orderData, id: `ord-${Date.now()}` },
        };
      }
      throw error;
    }
  },
};

export default orderService;
```
