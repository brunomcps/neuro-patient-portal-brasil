
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create usuarios table
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('administrador', 'paciente')) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    endereco TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pacientes table
CREATE TABLE pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    responsavel_nome VARCHAR(255),
    responsavel_telefone VARCHAR(20),
    observacoes TEXT,
    status VARCHAR(20) CHECK (status IN ('ativo', 'inativo', 'concluido')) DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questionarios table
CREATE TABLE questionarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(20) CHECK (tipo IN ('formulario', 'escala', 'teste')) NOT NULL,
    conteudo JSONB NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessoes table
CREATE TABLE sessoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_agendada TIMESTAMP WITH TIME ZONE NOT NULL,
    duracao_minutos INTEGER NOT NULL DEFAULT 60,
    local VARCHAR(255) NOT NULL,
    tipo_local VARCHAR(20) CHECK (tipo_local IN ('online', 'presencial')) NOT NULL,
    profissional_responsavel VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('agendada', 'concluida', 'cancelada')) DEFAULT 'agendada',
    observacoes TEXT,
    valor DECIMAL(10,2),
    pago BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessao_questionarios table (junction table)
CREATE TABLE sessao_questionarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sessao_id UUID REFERENCES sessoes(id) ON DELETE CASCADE,
    questionario_id UUID REFERENCES questionarios(id) ON DELETE CASCADE,
    visivel_paciente BOOLEAN DEFAULT true,
    obrigatorio BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(sessao_id, questionario_id)
);

-- Create respostas_questionario table
CREATE TABLE respostas_questionario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    questionario_id UUID REFERENCES questionarios(id) ON DELETE CASCADE,
    sessao_id UUID REFERENCES sessoes(id) ON DELETE SET NULL,
    respostas JSONB NOT NULL,
    data_resposta TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pagamentos table
CREATE TABLE pagamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    sessao_id UUID REFERENCES sessoes(id) ON DELETE SET NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pendente', 'pago', 'cancelado')) DEFAULT 'pendente',
    metodo_pagamento VARCHAR(50),
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create relatorios table
CREATE TABLE relatorios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('em_andamento', 'concluido', 'entregue')) DEFAULT 'em_andamento',
    data_previsao_entrega DATE,
    data_entrega DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX idx_pacientes_usuario_id ON pacientes(usuario_id);
CREATE INDEX idx_pacientes_status ON pacientes(status);
CREATE INDEX idx_sessoes_paciente_id ON sessoes(paciente_id);
CREATE INDEX idx_sessoes_data_agendada ON sessoes(data_agendada);
CREATE INDEX idx_sessoes_status ON sessoes(status);
CREATE INDEX idx_pagamentos_paciente_id ON pagamentos(paciente_id);
CREATE INDEX idx_pagamentos_status ON pagamentos(status);
CREATE INDEX idx_respostas_paciente_id ON respostas_questionario(paciente_id);
CREATE INDEX idx_respostas_questionario_id ON respostas_questionario(questionario_id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pacientes_updated_at BEFORE UPDATE ON pacientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questionarios_updated_at BEFORE UPDATE ON questionarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessoes_updated_at BEFORE UPDATE ON sessoes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pagamentos_updated_at BEFORE UPDATE ON pagamentos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_relatorios_updated_at BEFORE UPDATE ON relatorios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create RLS (Row Level Security) policies
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessao_questionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas_questionario ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE relatorios ENABLE ROW LEVEL SECURITY;

-- Policies for usuarios table
CREATE POLICY "Usuários podem ver seus próprios dados" ON usuarios FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Administradores podem ver todos os usuários" ON usuarios FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM usuarios WHERE id::text = auth.uid()::text AND tipo_usuario = 'administrador'
    )
);

-- Policies for pacientes table
CREATE POLICY "Pacientes podem ver seus próprios dados" ON pacientes FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM usuarios WHERE id = pacientes.usuario_id AND id::text = auth.uid()::text
    )
);
CREATE POLICY "Administradores podem ver todos os pacientes" ON pacientes FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM usuarios WHERE id::text = auth.uid()::text AND tipo_usuario = 'administrador'
    )
);

-- Similar policies for other tables...
CREATE POLICY "Acesso completo para administradores" ON questionarios FOR ALL USING (
    EXISTS (
        SELECT 1 FROM usuarios WHERE id::text = auth.uid()::text AND tipo_usuario = 'administrador'
    )
);

CREATE POLICY "Pacientes podem ver questionários ativos" ON questionarios FOR SELECT USING (ativo = true);
