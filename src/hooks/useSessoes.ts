
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Sessao {
  id: string;
  paciente_id: string;
  titulo: string;
  descricao?: string;
  data_agendada: string;
  duracao_minutos: number;
  local: string;
  tipo_local: 'online' | 'presencial';
  profissional_responsavel: string;
  status: 'agendada' | 'concluida' | 'cancelada';
  observacoes?: string;
  valor?: number;
  pago: boolean;
  created_at: string;
  updated_at: string;
}

export const useSessoesPaciente = (pacienteId: string) => {
  return useQuery({
    queryKey: ['sessoes', pacienteId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .eq('paciente_id', pacienteId)
        .order('data_agendada', { ascending: false });
      
      if (error) throw error;
      return data as Sessao[];
    },
    enabled: !!pacienteId,
  });
};

export const useCreateSessao = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      paciente_id: string;
      titulo: string;
      descricao?: string;
      data_agendada: string;
      duracao_minutos: number;
      local: string;
      tipo_local: 'online' | 'presencial';
      profissional_responsavel: string;
      valor?: number;
      observacoes?: string;
    }) => {
      const { data: sessao, error } = await supabase
        .from('sessoes')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return sessao;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sessoes', variables.paciente_id] });
    },
  });
};
