
import { supabase } from '@/integrations/supabase/client';

export const useSeedData = () => {
  const createDemoData = async () => {
    try {
      // Criar usuários de demonstração
      const usuarios = [
        {
          nome: "Maria Silva",
          email: "maria.silva@email.com",
          telefone: "(11) 99999-1111",
          data_nascimento: "1985-03-15",
          endereco: "Rua das Flores, 123 - São Paulo/SP",
          tipo_usuario: "paciente"
        },
        {
          nome: "João Santos",
          email: "joao.santos@email.com", 
          telefone: "(11) 99999-2222",
          data_nascimento: "1990-07-20",
          endereco: "Av. Principal, 456 - São Paulo/SP",
          tipo_usuario: "paciente"
        },
        {
          nome: "Ana Costa",
          email: "ana.costa@email.com",
          telefone: "(11) 99999-3333", 
          data_nascimento: "1978-12-08",
          endereco: "Rua dos Pinheiros, 789 - São Paulo/SP",
          tipo_usuario: "paciente"
        }
      ];

      const { data: usuariosCriados, error: usuariosError } = await supabase
        .from('usuarios')
        .insert(usuarios)
        .select();

      if (usuariosError) throw usuariosError;

      // Criar pacientes correspondentes
      const pacientes = usuariosCriados.map((usuario, index) => ({
        usuario_id: usuario.id,
        responsavel_nome: index === 2 ? "Carlos Costa" : null,
        responsavel_telefone: index === 2 ? "(11) 99999-4444" : null,
        observacoes: `Paciente ${index + 1} - Observações de demonstração`,
        status: 'ativo' as const
      }));

      const { error: pacientesError } = await supabase
        .from('pacientes')
        .insert(pacientes);

      if (pacientesError) throw pacientesError;

      return { success: true, message: "Dados de demonstração criados com sucesso!" };
    } catch (error) {
      console.error('Erro ao criar dados de demonstração:', error);
      return { success: false, message: "Erro ao criar dados de demonstração" };
    }
  };

  return { createDemoData };
};
