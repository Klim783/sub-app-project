import api from './api';
import type { Subscription, SubscriptionCreate, SubscriptionUpdate } from '../types';

export const subscriptionService = {
  async getAll(): Promise<Subscription[]> {
    const response = await api.get<Subscription[]>('/subscriptions/');
    return response.data;
  },

  async getById(id: number): Promise<Subscription> {
    const response = await api.get<Subscription>(`/subscriptions/${id}`);
    return response.data;
  },

  async create(data: SubscriptionCreate): Promise<Subscription> {
    const response = await api.post<Subscription>('/subscriptions/', data);
    return response.data;
  },

  async update(id: number, data: SubscriptionUpdate): Promise<Subscription> {
    const response = await api.put<Subscription>(`/subscriptions/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/subscriptions/${id}`);
  },
};
