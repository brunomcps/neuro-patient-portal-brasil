
-- Script para inserir dados de demonstração
-- Execute este script diretamente no banco de dados se o botão não funcionar

-- Verificar se já existem usuários de demonstração
DO $$
BEGIN
    -- Inserir usuários de demonstração apenas se não existirem
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'maria.silva@email.com') THEN
        INSERT INTO usuarios (email, nome, tipo_usuario, telefone, data_nascimento, endereco) VALUES 
        ('maria.silva@email.com', 'Maria Silva', 'paciente', '(11) 99999-1111', '1985-03-15', 'Rua das Flores, 123 - São Paulo/SP'),
        ('joao.santos@email.com', 'João Santos', 'paciente', '(11) 99999-2222', '1990-07-20', 'Av. Principal, 456 - São Paulo/SP'),
        ('ana.costa@email.com', 'Ana Costa', 'paciente', '(11) 99999-3333', '1978-12-08', 'Rua dos Pinheiros, 789 - São Paulo/SP');
    END IF;

    -- Inserir pacientes correspondentes
    IF NOT EXISTS (SELECT 1 FROM pacientes p JOIN usuarios u ON p.usuario_id = u.id WHERE u.email = 'maria.silva@email.com') THEN
        INSERT INTO pacientes (usuario_id, responsavel_nome, responsavel_telefone, observacoes, status)
        SELECT 
            u.id,
            CASE 
                WHEN u.email = 'ana.costa@email.com' THEN 'Carlos Costa'
                ELSE NULL
            END,
            CASE 
                WHEN u.email = 'ana.costa@email.com' THEN '(11) 99999-4444'
                ELSE NULL
            END,
            'Paciente de demonstração - ' || u.nome,
            'ativo'
        FROM usuarios u 
        WHERE u.email IN ('maria.silva@email.com', 'joao.santos@email.com', 'ana.costa@email.com');
    END IF;
END $$;
