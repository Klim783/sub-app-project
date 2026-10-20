import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '../services/payments';
import type { Payment, PaymentCreate } from '../types';

export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: paymentService.getAll,
  });
}

export function usePayment(id: number) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: PaymentCreate) => paymentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
}
