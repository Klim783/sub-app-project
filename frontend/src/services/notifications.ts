import api from './api';
import type { Notification, NotificationCreate, NotificationUpdate } from '../types';

export const notificationService = {
  async getAll(unreadOnly: boolean = false): Promise<Notification[]> {
    const response = await api.get<Notification[]>('/notifications/', {
      params: { unread_only: unreadOnly },
    });
    return response.data;
  },

  async getById(id: number): Promise<Notification> {
    const response = await api.get<Notification>(`/notifications/${id}`);
    return response.data;
  },

  async update(id: number, data: NotificationUpdate): Promise<Notification> {
    const response = await api.put<Notification>(`/notifications/${id}`, data);
    return response.data;
  },

  async markAllAsRead(): Promise<void> {
    await api.post('/notifications/mark-all-read');
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },
};
