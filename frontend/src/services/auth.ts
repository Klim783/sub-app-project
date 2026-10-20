import api from './api';
import type { User, UserCreate, UserLogin, Token } from '../types';

export const authService = {
  async login(credentials: UserLogin): Promise<Token> {
    const response = await api.post<Token>('/auth/login', credentials);
    return response.data;
  },

  async register(userData: UserCreate): Promise<User> {
    const response = await api.post<User>('/users/', userData);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
