
-- Insert sample admin user
INSERT INTO usuarios (id, email, nome, tipo_usuario, telefone) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'admin@clinica.com', 'Administrador', 'administrador', '(21) 99999-9999');

-- Insert sample patient users
INSERT INTO usuarios (id, email, nome, tipo_usuario, telefone, data_nascimento) VALUES 
('550e8400-e29b-41d4-a716-446655440002', 'joao@email.com', 'João Silva', 'paciente', '(21) 98888-8888', '1990-05-15'),
('550e8400-e29b-41d4-a716-446655440003', 'maria@email.com', 'Maria Santos', 'paciente', '(21) 97777-7777', '1985-10-20');

-- Insert pacientes records
INSERT INTO pacientes (id, usuario_id, responsavel_nome, responsavel_telefone, status) VALUES 
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Ana Silva', '(21) 96666-6666', 'ativo'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', NULL, NULL, 'ativo');

-- Insert sample questionários
INSERT INTO questionarios (id, titulo, descricao, tipo, conteudo) VALUES 
('550e8400-e29b-41d4-a716-446655440006', 'Formulário Inicial', 'Formulário de triagem inicial', 'formulario', 
'{"perguntas": [{"id": 1, "texto": "Qual o motivo da consulta?", "tipo": "texto_longo"}, {"id": 2, "texto": "Histórico médico relevante", "tipo": "texto_longo"}]}'),

('550e8400-e29b-41d4-a716-446655440007', 'Escala SRS-2', 'Escala de Responsividade Social - 2ª Edição', 'escala',
'{"perguntas": [{"id": 1, "texto": "Tem dificuldade em fazer amigos", "tipo": "likert", "opcoes": ["Nunca", "Às vezes", "Frequentemente", "Sempre"]}]}'),

('550e8400-e29b-41d4-a716-446655440008', 'BDEFS', 'Barkley Deficits in Executive Functioning Scale', 'teste',
'{"perguntas": [{"id": 1, "texto": "Tem problemas para organizar tarefas", "tipo": "likert", "opcoes": ["Nunca", "Às vezes", "Frequentemente", "Sempre"]}]}');

-- Insert sample sessões
INSERT INTO sessoes (id, paciente_id, titulo, data_agendada, local, tipo_local, profissional_responsavel, valor) VALUES 
('550e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440004', 'Primeira Consulta', '2024-02-15 14:00:00+00', 'https://meet.google.com/abc-def-ghi', 'online', 'Dra. Gabrielly La-Cava', 200.00),
('550e8400-e29b-41d4-a716-44665544000a', '550e8400-e29b-41d4-a716-446655440004', 'Avaliação Neuropsicológica', '2024-02-22 15:00:00+00', 'Rua das Flores, 123 - Copacabana', 'presencial', 'Dra. Gabrielly La-Cava', 300.00);

-- Insert sample sessao_questionarios associations
INSERT INTO sessao_questionarios (sessao_id, questionario_id, visivel_paciente, obrigatorio) VALUES 
('550e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440006', true, true),
('550e8400-e29b-41d4-a716-44665544000a', '550e8400-e29b-41d4-a716-446655440007', false, true),
('550e8400-e29b-41d4-a716-44665544000a', '550e8400-e29b-41d4-a716-446655440008', true, false);

-- Insert sample pagamentos
INSERT INTO pagamentos (paciente_id, sessao_id, valor, data_vencimento, status) VALUES 
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440009', 200.00, '2024-02-15', 'pago'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-44665544000a', 300.00, '2024-02-22', 'pendente');
