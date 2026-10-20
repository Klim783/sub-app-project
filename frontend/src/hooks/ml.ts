import { useQuery, useMutation } from '@tanstack/react-query';
import { mlService } from '../services/ml';
import type { ChurnPredictRequest, RecommendationResponse, ModelStatus } from '../types';

export function useChurnPrediction() {
  return useMutation({
    mutationFn: (request: ChurnPredictRequest) => mlService.predictChurn(request),
  });
}

export function useRecommendations(topN: number = 5) {
  return useQuery({
    queryKey: ['recommendations', topN],
    queryFn: () => mlService.getRecommendations(topN),
  });
}

export function useModelStatus() {
  return useQuery({
    queryKey: ['model-status'],
    queryFn: mlService.getModelStatus,
  });
}
