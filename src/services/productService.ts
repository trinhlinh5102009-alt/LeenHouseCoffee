// app/services/productService.ts
import api from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
    icon: string;
  };
  imageUrl: string;
  isAvailable: boolean;
  preparationTime: number;
  rating: number;
  totalReviews: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export const productService = {
  /**
   * Get all available products
   * GET /api/client/products
   */
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>('/client/products');
    return response.data.data;
  },

  /**
   * Get product by ID
   * GET /api/client/products/{id}
   */
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/client/products/${id}`);
    return response.data.data;
  },

  /**
   * Get products by category
   * GET /api/client/products/category/{categoryId}
   */
  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(
      `/client/products/category/${categoryId}`
    );
    return response.data.data;
  },

  /**
   * Search products
   * GET /api/client/products/search?keyword=
   */
  searchProducts: async (keyword: string): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(
      `/client/products/search`,
      { params: { keyword } }
    );
    return response.data.data;
  },

  /**
   * Get products sorted by price (ascending)
   * GET /api/client/products/sort/price-asc
   */
  getProductsSortedByPriceAsc: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(
      '/client/products/sort/price-asc'
    );
    return response.data.data;
  },

  /**
   * Get products sorted by price (descending)
   * GET /api/client/products/sort/price-desc
   */
  getProductsSortedByPriceDesc: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(
      '/client/products/sort/price-desc'
    );
    return response.data.data;
  },

  /**
   * Get newest products
   * GET /api/client/products/newest
   */
  getNewestProducts: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(
      '/client/products/newest'
    );
    return response.data.data;
  },

  /**
   * Get best selling products
   * GET /api/client/products/best-selling?limit=10
   */
  getBestSellingProducts: async (limit: number = 10): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(
      `/client/products/best-selling`,
      { params: { limit } }
    );
    return response.data.data;
  },
};