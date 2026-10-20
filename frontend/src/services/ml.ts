import api from './api';
import type { 
  ChurnPredictRequest, 
  ChurnPrediction, 
  RecommendationResponse, 
  ModelStatus 
} from '../types';

export const mlService = {
  async predictChurn(request: ChurnPredictRequest): Promise<{ subscriptions: ChurnPrediction[] }> {
    const response = await api.post('/ml/churn-predict', request.subscription_ids);
    return response.data;
  },

  async getRecommendations(topN: number = 5): Promise<RecommendationResponse> {
    const response = await api.post<RecommendationResponse>('/ml/recommend', null, {
      params: { top_n: topN },
    });
    return response.data;
  },

  async getModelStatus(): Promise<ModelStatus> {
    const response = await api.get<ModelStatus>('/ml/model-status');
    return response.data;
  },
};
