/**
 * Product & Catalog Service
 * Communicates with ASP.NET Core backend /api/v1/products
 */

import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const MOCK_PRODUCTS = [
  {
    id: 'prod-01',
    name: 'Hộp Thượng Hạng “Nguyệt Viên Tri Kỷ”',
    supplier: 'Kinh Đô B2B',
    price: 480000,
    originalPrice: 545000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 1200,
    minOrder: 30,
    deliveryTime: 'Giao trong 48h',
    badge: 'NCC Xác Minh',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0gce54U1n3kxiDSj_WZFJlCiiqIoXmsqFi5RYcNbE-HyrDYGdatgnVooMWFft7pgTd6ywe3cnZFmwRXVj6-HW98F0Fwk3gNfTVBSw7rBLbrF33ZhdDpVwyiRH56g4-dfFbFya0reGpmL-Hg-p2xW4ghvbZt-9XsLApvBWLRHyojKhGRFcCW7kp_sDFULOOcoXGqIknBa3fyYIkUUZ5QoR6YDPYuQqPll4ZIqIrynw9uXYHAPGqKJt',
    description: '4 bánh x 180g • Thập cẩm sò điệp, sen dừa hảo hạng',
    supportsCustomLogo: true,
  },
  {
    id: 'prod-02',
    name: 'Hộp Sơn Mài “Hoàng Kim Vọng Nguyệt”',
    supplier: 'Madame Hương',
    price: 850000,
    originalPrice: 950000,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 860,
    minOrder: 20,
    deliveryTime: 'Sản xuất: 5 ngày',
    badge: 'VIP B2B',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQMG1AQ2M24puU7Wk-qFSPiPY5ooN2Vb1C-bf4rPc15CeqNt3b2CutQ0_J8tcAIyIjgguRLdgomEbGT7FWt_c6rsBDZsd4VMHA6_R31OVY3bcB2Yyh4NXr4fFrt1Yy38xhNpyqGWpywfcMC0_YsZu2Ph5y0ASpB1YxK4_Mez7znUkz_xaEJAIG-EeOdZn6pKU2ilOsgbPZ7QnMUu7J5UHMQi_5e8ByNty_3-SxqavFi2-TZSOB3Aog',
    description: '6 bánh Lava trứng chảy + Hũ trà sen Tây Hồ đệ nhất danh trà',
    supportsCustomLogo: true,
  },
  {
    id: 'prod-03',
    name: 'Bánh Dưỡng Sinh “Thanh Nguyệt Yến”',
    supplier: 'Nghệ Nhân Hữu Nghị',
    price: 390000,
    originalPrice: 433000,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 950,
    minOrder: 50,
    deliveryTime: 'Giao trong 24h',
    badge: 'Healthy Isomalt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSUU9euk8QszNuwm4Nu_KHGlyRVO6UZa1xAl1qcfUXYkLsaNkL_fo9Y0eBt_pwk-0eq4n7nXJd22bVLwySIH28YqkxQLX1sH74WnTPo1OmweLxstBD8bq7nZpvvI6hI1yfphoRnfldacMi4cEWs-EbM0ix2RwtoGX0Ip90H7Xk7euQe5hhZqxAlK5KNUXqbAtTq5HnS100yvTqcSeSIXTgqcollqTsTw7gCUY5IETDzQU9UuMPqq2H',
    description: '4 bánh yến sào hạt sen • Đường kiêng Isomalt không tăng đường huyết',
    supportsCustomLogo: false,
  },
  {
    id: 'prod-04',
    name: 'Set Quà “Đoàn Viên Phú Quý”',
    supplier: 'Thu Hương Bakery',
    price: 720000,
    originalPrice: 850000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 620,
    minOrder: 25,
    deliveryTime: 'Sản xuất: 3 ngày',
    badge: 'Kèm Vang Pháp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOL-Cav9v6rbL1i553OXUyPC1E2zvaok6KNoZjacOPOUdvERGXoE-Wh7kXxHfJEW2bvbWVefYDVCEQ5DAOc4m9LJlOWah_9tg75rJy6I6bysyxwwsNXa6GbzQb4lcysJAIM8wkk7aei8UgYBX40_YCYa1UmqA4X_uylmQwjBQiMcpuN4txuO9dekT-HywkN-YeCgIvkq1Aq-D2vCp8-cG5ZdaSAOc_PGVCOWZqT5EDsT5PZthuvrb3',
    description: '4 bánh thượng hạng + 1 Chai vang Bordeaux hảo hạng',
    supportsCustomLogo: true,
  },
];

export const productService = {
  /**
   * Get featured products for homepage
   */
  async getFeaturedProducts() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.FEATURED);
      return response.data || response;
    } catch {
      return MOCK_PRODUCTS;
    }
  },

  /**
   * Get product list with search/filter parameters
   */
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const endpoint = `${API_ENDPOINTS.PRODUCTS.LIST}${query ? `?${query}` : ''}`;
      const response = await apiClient.get(endpoint);
      return response.data || response;
    } catch {
      return MOCK_PRODUCTS;
    }
  },

  /**
   * Get product details by ID
   */
  async getProductById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAILS(id));
      return response.data || response;
    } catch {
      return MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
    }
  },
};

export default productService;
