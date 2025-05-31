
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Questionario {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: 'formulario' | 'escala' | 'teste';
  conteudo: any;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export const useQuestionarios = () => {
  return useQuery({
    queryKey: ['questionarios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questionarios')
        .select('*')
        .eq('ativo', true)
        .order('titulo');
      
      if (error) throw error;
      return data as Questionario[];
    },
  });
};

export const useAssignQuestionario = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      sessao_id: string;
      questionario_id: string;
      visivel_paciente: boolean;
      obrigatorio: boolean;
    }) => {
      const { data: assignment, error } = await supabase
        .from('sessao_questionarios')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return assignment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessoes'] });
    },
  });
};
