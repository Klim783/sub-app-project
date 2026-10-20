// User types
export interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UserCreate {
  email: string;
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

// Auth types
export interface Token {
  access_token: string;
  token_type: string;
}

// Subscription types
export interface Subscription {
  id: number;
  name: string;
  provider: string;
  category?: string;
  price: number;
  billing_cycle: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  renewal_date?: string;
  user_id: number;
  created_at: string;
  updated_at?: string;
}

export interface SubscriptionCreate {
  name: string;
  provider: string;
  category?: string;
  price: number;
  billing_cycle: 'monthly' | 'yearly';
  status?: 'active' | 'cancelled' | 'expired';
  renewal_date?: string;
}

export interface SubscriptionUpdate {
  name?: string;
  provider?: string;
  category?: string;
  price?: number;
  billing_cycle?: 'monthly' | 'yearly';
  status?: 'active' | 'cancelled' | 'expired';
  renewal_date?: string;
}

// Payment types
export interface Payment {
  id: number;
  subscription_id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payment_date: string;
  user_id: number;
  created_at: string;
}

export interface PaymentCreate {
  subscription_id: number;
  amount: number;
  currency?: string;
}

// Notification types
export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  notification_type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  created_at: string;
}

export interface NotificationCreate {
  user_id: number;
  title: string;
  message: string;
  notification_type?: 'info' | 'warning' | 'error' | 'success';
}

export interface NotificationUpdate {
  is_read?: boolean;
}

// ML types
export interface ChurnPrediction {
  id: number;
  name: string;
  prediction: {
    churn_probability: number;
    at_risk: boolean;
  };
}

export interface ChurnPredictRequest {
  subscription_ids: number[];
}

export interface Recommendation {
  id: number;
  name: string;
  provider: string;
  category?: string;
  price: number;
  similarity_score?: number;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
}

export interface ModelStatus {
  churn_predictor: {
    is_trained: boolean;
    model_type: string;
  };
  recommender: {
    is_fitted: boolean;
    model_type: string;
  };
}

// Document types
export interface Document {
  id: number;
  name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  user_id: number;
  uploaded_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  detail: string;
  status?: number;
}
