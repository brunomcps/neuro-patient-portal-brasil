
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
  // Dados de demonstração mockados
  const mockPacientes: Paciente[] = [
    {
      id: '1',
      usuario_id: '1',
      responsavel_nome: null,
      responsavel_telefone: null,
      observacoes: 'Paciente colaborativo, primeira avaliação neuropsicológica',
      status: 'ativo',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
      usuarios: {
        nome: 'Maria Silva',
        email: 'maria.silva@email.com',
        telefone: '(11) 99999-1111',
        data_nascimento: '1985-03-15',
        endereco: 'Rua das Flores, 123 - São Paulo/SP'
      }
    },
    {
      id: '2',
      usuario_id: '2',
      responsavel_nome: null,
      responsavel_telefone: null,
      observacoes: 'Paciente em acompanhamento para TEA, segunda avaliação',
      status: 'ativo',
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
      usuarios: {
        nome: 'João Santos',
        email: 'joao.santos@email.com',
        telefone: '(11) 99999-2222',
        data_nascimento: '1990-07-20',
        endereco: 'Av. Principal, 456 - São Paulo/SP'
      }
    },
    {
      id: '3',
      usuario_id: '3',
      responsavel_nome: 'Carlos Costa',
      responsavel_telefone: '(11) 99999-4444',
      observacoes: 'Paciente menor de idade, acompanhamento familiar necessário',
      status: 'ativo',
      created_at: '2024-01-25T00:00:00Z',
      updated_at: '2024-01-25T00:00:00Z',
      usuarios: {
        nome: 'Ana Costa',
        email: 'ana.costa@email.com',
        telefone: '(11) 99999-3333',
        data_nascimento: '2010-12-08',
        endereco: 'Rua dos Pinheiros, 789 - São Paulo/SP'
      }
    },
    {
      id: '4',
      usuario_id: '4',
      responsavel_nome: 'Patricia Oliveira',
      responsavel_telefone: '(11) 99999-5555',
      observacoes: 'Avaliação para TDAH, histórico familiar relevante',
      status: 'ativo',
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-02-01T00:00:00Z',
      usuarios: {
        nome: 'Pedro Oliveira',
        email: 'pedro.oliveira@email.com',
        telefone: '(11) 99999-6666',
        data_nascimento: '2008-04-12',
        endereco: 'Rua das Palmeiras, 321 - São Paulo/SP'
      }
    },
    {
      id: '5',
      usuario_id: '5',
      responsavel_nome: null,
      responsavel_telefone: null,
      observacoes: 'Reavaliação neuropsicológica após 6 meses de tratamento',
      status: 'ativo',
      created_at: '2024-02-05T00:00:00Z',
      updated_at: '2024-02-05T00:00:00Z',
      usuarios: {
        nome: 'Carla Santos',
        email: 'carla.santos@email.com',
        telefone: '(11) 99999-7777',
        data_nascimento: '1992-09-30',
        endereco: 'Av. Paulista, 1000 - São Paulo/SP'
      }
    }
  ];

  const query = useQuery({
    queryKey: ['pacientes'],
    queryFn: async () => {
      console.log('Usando dados de demonstração...');
      // Simular delay de requisição
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Pacientes de demonstração carregados:', mockPacientes);
      return mockPacientes;
    },
  });

  return {
    ...query,
    refetch: query.refetch
  };
};

export const usePaciente = (id: string) => {
  return useQuery({
    queryKey: ['paciente', id],
    queryFn: async () => {
      if (!id) return null;
      
      // Usar dados mockados
      const { data } = await import('./usePacientes');
      const mockPacientes = [
        {
          id: '1',
          usuario_id: '1',
          responsavel_nome: null,
          responsavel_telefone: null,
          observacoes: 'Paciente colaborativo, primeira avaliação neuropsicológica',
          status: 'ativo' as const,
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z',
          usuarios: {
            nome: 'Maria Silva',
            email: 'maria.silva@email.com',
            telefone: '(11) 99999-1111',
            data_nascimento: '1985-03-15',
            endereco: 'Rua das Flores, 123 - São Paulo/SP'
          }
        },
        {
          id: '2',
          usuario_id: '2',
          responsavel_nome: null,
          responsavel_telefone: null,
          observacoes: 'Paciente em acompanhamento para TEA, segunda avaliação',
          status: 'ativo' as const,
          created_at: '2024-01-20T00:00:00Z',
          updated_at: '2024-01-20T00:00:00Z',
          usuarios: {
            nome: 'João Santos',
            email: 'joao.santos@email.com',
            telefone: '(11) 99999-2222',
            data_nascimento: '1990-07-20',
            endereco: 'Av. Principal, 456 - São Paulo/SP'
          }
        },
        {
          id: '3',
          usuario_id: '3',
          responsavel_nome: 'Carlos Costa',
          responsavel_telefone: '(11) 99999-4444',
          observacoes: 'Paciente menor de idade, acompanhamento familiar necessário',
          status: 'ativo' as const,
          created_at: '2024-01-25T00:00:00Z',
          updated_at: '2024-01-25T00:00:00Z',
          usuarios: {
            nome: 'Ana Costa',
            email: 'ana.costa@email.com',
            telefone: '(11) 99999-3333',
            data_nascimento: '2010-12-08',
            endereco: 'Rua dos Pinheiros, 789 - São Paulo/SP'
          }
        },
        {
          id: '4',
          usuario_id: '4',
          responsavel_nome: 'Patricia Oliveira',
          responsavel_telefone: '(11) 99999-5555',
          observacoes: 'Avaliação para TDAH, histórico familiar relevante',
          status: 'ativo' as const,
          created_at: '2024-02-01T00:00:00Z',
          updated_at: '2024-02-01T00:00:00Z',
          usuarios: {
            nome: 'Pedro Oliveira',
            email: 'pedro.oliveira@email.com',
            telefone: '(11) 99999-6666',
            data_nascimento: '2008-04-12',
            endereco: 'Rua das Palmeiras, 321 - São Paulo/SP'
          }
        },
        {
          id: '5',
          usuario_id: '5',
          responsavel_nome: null,
          responsavel_telefone: null,
          observacoes: 'Reavaliação neuropsicológica após 6 meses de tratamento',
          status: 'ativo' as const,
          created_at: '2024-02-05T00:00:00Z',
          updated_at: '2024-02-05T00:00:00Z',
          usuarios: {
            nome: 'Carla Santos',
            email: 'carla.santos@email.com',
            telefone: '(11) 99999-7777',
            data_nascimento: '1992-09-30',
            endereco: 'Av. Paulista, 1000 - São Paulo/SP'
          }
        }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const paciente = mockPacientes.find(p => p.id === id);
      return paciente || null;
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
      console.log('Simulando criação de paciente:', data);
      
      // Simular delay de criação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular sucesso
      const novoPaciente = {
        id: Math.random().toString(36).substr(2, 9),
        usuario_id: Math.random().toString(36).substr(2, 9),
        responsavel_nome: data.responsavel_nome || null,
        responsavel_telefone: data.responsavel_telefone || null,
        observacoes: data.observacoes || 'Paciente criado via demonstração',
        status: 'ativo' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        usuarios: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          data_nascimento: data.data_nascimento,
          endereco: data.endereco
        }
      };

      console.log('Paciente simulado criado:', novoPaciente);
      return novoPaciente;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pacientes'] });
    },
  });
};
