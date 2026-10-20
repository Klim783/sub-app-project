import api from './api';
import type { Payment, PaymentCreate } from '../types';

export const paymentService = {
  async getAll(): Promise<Payment[]> {
    const response = await api.get<Payment[]>('/payments/');
    return response.data;
  },

  async getById(id: number): Promise<Payment> {
    const response = await api.get<Payment>(`/payments/${id}`);
    return response.data;
  },

  async create(data: PaymentCreate): Promise<Payment> {
    const response = await api.post<Payment>('/payments/', data);
    return response.data;
  },
};
