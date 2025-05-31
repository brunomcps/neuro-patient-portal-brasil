
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Pagamento {
  id: string;
  paciente_id: string;
  sessao_id?: string;
  valor: number;
  status: 'pendente' | 'pago' | 'cancelado';
  metodo_pagamento?: string;
  data_vencimento: string;
  data_pagamento?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

export const usePagamentosPaciente = (pacienteId: string) => {
  return useQuery({
    queryKey: ['pagamentos', pacienteId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pagamentos')
        .select('*')
        .eq('paciente_id', pacienteId)
        .order('data_vencimento', { ascending: false });
      
      if (error) throw error;
      return data as Pagamento[];
    },
    enabled: !!pacienteId,
  });
};

export const useCreatePagamento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      paciente_id: string;
      sessao_id?: string;
      valor: number;
      data_vencimento: string;
      metodo_pagamento?: string;
      observacoes?: string;
    }) => {
      const { data: pagamento, error } = await supabase
        .from('pagamentos')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return pagamento;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pagamentos', variables.paciente_id] });
    },
  });
};
