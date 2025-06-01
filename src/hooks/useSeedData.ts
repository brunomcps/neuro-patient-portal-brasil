
import { supabase } from '@/integrations/supabase/client';

export const useSeedData = () => {
  const createDemoData = async () => {
    try {
      // Verificar se já existem pacientes
      const { data: existingPacientes, error: checkError } = await supabase
        .from('pacientes')
        .select('id')
        .limit(1);

      if (checkError) throw checkError;

      if (existingPacientes && existingPacientes.length > 0) {
        return { success: false, message: "Já existem pacientes cadastrados no sistema." };
      }

      // Tentar executar o seed SQL diretamente usando RPC (Remote Procedure Call)
      // Primeiro vamos criar dados básicos que funcionem com as políticas atuais
      
      // Usar dados do seed.sql existente que já funcionam
      const { error: seedError } = await supabase.rpc('create_demo_data');

      if (seedError) {
        // Se RPC não funcionar, vamos tentar uma abordagem alternativa
        // Usar os dados que já estão no seed.sql
        console.log('RPC não disponível, dados de demonstração podem já estar no banco');
        
        // Verificar novamente se existem dados após tentativa
        const { data: pacientesCheck } = await supabase
          .from('pacientes')
          .select('*, usuarios(*)')
          .limit(5);

        if (pacientesCheck && pacientesCheck.length > 0) {
          return { success: true, message: "Dados de demonstração já estão disponíveis!" };
        }

        return { 
          success: false, 
          message: "Não foi possível criar dados de demonstração. Verifique as permissões do banco de dados ou use o botão 'Cadastrar Primeiro Paciente' para adicionar dados manualmente." 
        };
      }

      return { success: true, message: "Dados de demonstração criados com sucesso!" };
      
    } catch (error) {
      console.error('Erro ao criar dados de demonstração:', error);
      
      // Verificar se há dados no banco mesmo com erro
      try {
        const { data: pacientesExistentes } = await supabase
          .from('pacientes')
          .select('*, usuarios(*)')
          .limit(5);

        if (pacientesExistentes && pacientesExistentes.length > 0) {
          return { success: true, message: "Dados de demonstração encontrados no banco!" };
        }
      } catch (checkError) {
        console.error('Erro ao verificar dados existentes:', checkError);
      }

      return { 
        success: false, 
        message: "Erro ao criar dados de demonstração. Use o botão 'Cadastrar Primeiro Paciente' para começar." 
      };
    }
  };

  return { createDemoData };
};
