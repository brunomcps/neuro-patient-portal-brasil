
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Paciente {
  id: string;
  usuario_id: string;
  responsavel_nome?: string;
  responsavel_telefone?: string;
  observacoes?: string;
  status: 'ativo' | 'inativo' | 'concluido';
  created_at: string;
  updated_at: string;
  usuarios?: {
    nome: string;
    email: string;
    telefone?: string;
    data_nascimento?: string;
    endereco?: string;
  };
}

export const usePacientes = () => {
  return useQuery({
    queryKey: ['pacientes'],
    queryFn: async () => {
      console.log('Buscando pacientes...');
      
      // Temporarily disable RLS for testing by using service role
      const { data, error } = await supabase
        .from('pacientes')
        .select(`
          *,
          usuarios!inner(nome, email, telefone, data_nascimento, endereco)
        `)
        .eq('status', 'ativo');
      
      if (error) {
        console.error('Erro ao buscar pacientes:', error);
        throw error;
      }
      
      console.log('Pacientes encontrados:', data);
      return data as Paciente[];
    },
  });
};

export const usePaciente = (id: string) => {
  return useQuery({
    queryKey: ['paciente', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('pacientes')
        .select(`
          *,
          usuarios!inner(nome, email, telefone, data_nascimento, endereco)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Paciente;
    },
    enabled: !!id,
  });
};

export const useCreatePaciente = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { 
      nome: string; 
      email: string; 
      telefone?: string; 
      data_nascimento?: string;
      endereco?: string;
      responsavel_nome?: string;
      responsavel_telefone?: string;
      observacoes?: string;
    }) => {
      console.log('Criando paciente:', data);
      
      // Primeiro criar o usuário
      const { data: usuario, error: usuarioError } = await supabase
        .from('usuarios')
        .insert({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          data_nascimento: data.data_nascimento,
          endereco: data.endereco,
          tipo_usuario: 'paciente'
        })
        .select()
        .single();

      if (usuarioError) {
        console.error('Erro ao criar usuário:', usuarioError);
        throw usuarioError;
      }

      console.log('Usuário criado:', usuario);

      // Depois criar o paciente
      const { data: paciente, error: pacienteError } = await supabase
        .from('pacientes')
        .insert({
          usuario_id: usuario.id,
          responsavel_nome: data.responsavel_nome,
          responsavel_telefone: data.responsavel_telefone,
          observacoes: data.observacoes,
          status: 'ativo'
        })
        .select()
        .single();

      if (pacienteError) {
        console.error('Erro ao criar paciente:', pacienteError);
        throw pacienteError;
      }

      console.log('Paciente criado:', paciente);
      return paciente;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pacientes'] });
    },
  });
};
