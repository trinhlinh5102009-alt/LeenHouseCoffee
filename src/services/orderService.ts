// app/services/orderService.ts
import api from './api';
import { ApiResponse } from './productService';

export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: 'CASH' | 'CARD' | 'MOMO' | 'VNPAY' | 'ZALOPAY';
  tableNumber?: number;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}

export interface Order {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  tableNumber?: number;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  items: {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    notes?: string;
  }[];
}

export const orderService = {
  /**
   * Create new order
   * POST /api/client/orders
   */
  createOrder: async (orderData: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<ApiResponse<Order>>(
      '/client/orders',
      orderData
    );
    return response.data.data;
  },

  /**
   * Get my orders
   * GET /api/client/orders
   */
  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get<ApiResponse<Order[]>>('/client/orders');
    return response.data.data;
  },

  /**
   * Get order by ID
   * GET /api/client/orders/{id}
   */
  getOrderById: async (id: number): Promise<Order> => {
    const response = await api.get<ApiResponse<Order>>(`/client/orders/${id}`);
    return response.data.data;
  },

  /**
   * Cancel order
   * PUT /api/client/orders/{id}/cancel
   */
  cancelOrder: async (id: number): Promise<Order> => {
    const response = await api.put<ApiResponse<Order>>(
      `/client/orders/${id}/cancel`
    );
    return response.data.data;
  },
};