
# Database Setup - Supabase

Este projeto utiliza Supabase como banco de dados PostgreSQL.

## Configuração Inicial

1. **Criar conta no Supabase**
   - Acesse [supabase.com](https://supabase.com)
   - Crie uma conta gratuita
   - Crie um novo projeto

2. **Obter credenciais**
   - No dashboard do projeto, vá em Settings > API
   - Copie a URL do projeto e a chave anon/public
   - Configure as variáveis de ambiente no arquivo `.env`

3. **Executar migrações**
   - No dashboard do Supabase, vá em SQL Editor
   - Execute o conteúdo do arquivo `001_initial_schema.sql`
   - Execute o conteúdo do arquivo `seed.sql` para dados de teste

## Estrutura do Banco

### Tabelas Principais

- **usuarios**: Dados básicos de usuários (admin e pacientes)
- **pacientes**: Informações específicas de pacientes
- **questionarios**: Formulários, escalas e testes
- **sessoes**: Agendamentos e sessões realizadas
- **sessao_questionarios**: Associação entre sessões e questionários
- **respostas_questionario**: Respostas dos pacientes aos questionários
- **pagamentos**: Controle financeiro
- **relatorios**: Relatórios finais dos pacientes

### Políticas de Segurança (RLS)

O banco utiliza Row Level Security para garantir que:
- Pacientes só vejam seus próprios dados
- Administradores tenham acesso completo
- Dados sensíveis sejam protegidos

## Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

## Uso no Código

```typescript
import { supabase } from '@/lib/supabase'

// Exemplo de consulta
const { data, error } = await supabase
  .from('usuarios')
  .select('*')
  .eq('tipo_usuario', 'paciente')
```

## Dados de Teste

O arquivo `seed.sql` inclui:
- 1 usuário administrador (admin@clinica.com)
- 2 usuários pacientes
- 3 questionários de exemplo
- 2 sessões agendadas
- Pagamentos de exemplo
