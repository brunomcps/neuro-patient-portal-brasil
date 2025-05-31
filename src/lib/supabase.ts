
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          email: string
          nome: string
          tipo_usuario: 'administrador' | 'paciente'
          telefone: string | null
          data_nascimento: string | null
          endereco: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          nome: string
          tipo_usuario: 'administrador' | 'paciente'
          telefone?: string | null
          data_nascimento?: string | null
          endereco?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nome?: string
          tipo_usuario?: 'administrador' | 'paciente'
          telefone?: string | null
          data_nascimento?: string | null
          endereco?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pacientes: {
        Row: {
          id: string
          usuario_id: string
          responsavel_nome: string | null
          responsavel_telefone: string | null
          observacoes: string | null
          status: 'ativo' | 'inativo' | 'concluido'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          usuario_id: string
          responsavel_nome?: string | null
          responsavel_telefone?: string | null
          observacoes?: string | null
          status?: 'ativo' | 'inativo' | 'concluido'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          usuario_id?: string
          responsavel_nome?: string | null
          responsavel_telefone?: string | null
          observacoes?: string | null
          status?: 'ativo' | 'inativo' | 'concluido'
          created_at?: string
          updated_at?: string
        }
      }
      questionarios: {
        Row: {
          id: string
          titulo: string
          descricao: string | null
          tipo: 'formulario' | 'escala' | 'teste'
          conteudo: any
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao?: string | null
          tipo: 'formulario' | 'escala' | 'teste'
          conteudo: any
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string | null
          tipo?: 'formulario' | 'escala' | 'teste'
          conteudo?: any
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sessoes: {
        Row: {
          id: string
          paciente_id: string
          titulo: string
          descricao: string | null
          data_agendada: string
          duracao_minutos: number
          local: string
          tipo_local: 'online' | 'presencial'
          profissional_responsavel: string
          status: 'agendada' | 'concluida' | 'cancelada'
          observacoes: string | null
          valor: number | null
          pago: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          paciente_id: string
          titulo: string
          descricao?: string | null
          data_agendada: string
          duracao_minutos: number
          local: string
          tipo_local: 'online' | 'presencial'
          profissional_responsavel: string
          status?: 'agendada' | 'concluida' | 'cancelada'
          observacoes?: string | null
          valor?: number | null
          pago?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          paciente_id?: string
          titulo?: string
          descricao?: string | null
          data_agendada?: string
          duracao_minutos?: number
          local?: string
          tipo_local?: 'online' | 'presencial'
          profissional_responsavel?: string
          status?: 'agendada' | 'concluida' | 'cancelada'
          observacoes?: string | null
          valor?: number | null
          pago?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sessao_questionarios: {
        Row: {
          id: string
          sessao_id: string
          questionario_id: string
          visivel_paciente: boolean
          obrigatorio: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sessao_id: string
          questionario_id: string
          visivel_paciente?: boolean
          obrigatorio?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sessao_id?: string
          questionario_id?: string
          visivel_paciente?: boolean
          obrigatorio?: boolean
          created_at?: string
        }
      }
      respostas_questionario: {
        Row: {
          id: string
          paciente_id: string
          questionario_id: string
          sessao_id: string | null
          respostas: any
          data_resposta: string
          created_at: string
        }
        Insert: {
          id?: string
          paciente_id: string
          questionario_id: string
          sessao_id?: string | null
          respostas: any
          data_resposta: string
          created_at?: string
        }
        Update: {
          id?: string
          paciente_id?: string
          questionario_id?: string
          sessao_id?: string | null
          respostas?: any
          data_resposta?: string
          created_at?: string
        }
      }
      pagamentos: {
        Row: {
          id: string
          paciente_id: string
          sessao_id: string | null
          valor: number
          status: 'pendente' | 'pago' | 'cancelado'
          metodo_pagamento: string | null
          data_vencimento: string
          data_pagamento: string | null
          observacoes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          paciente_id: string
          sessao_id?: string | null
          valor: number
          status?: 'pendente' | 'pago' | 'cancelado'
          metodo_pagamento?: string | null
          data_vencimento: string
          data_pagamento?: string | null
          observacoes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          paciente_id?: string
          sessao_id?: string | null
          valor?: number
          status?: 'pendente' | 'pago' | 'cancelado'
          metodo_pagamento?: string | null
          data_vencimento?: string
          data_pagamento?: string | null
          observacoes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      relatorios: {
        Row: {
          id: string
          paciente_id: string
          titulo: string
          conteudo: string
          status: 'em_andamento' | 'concluido' | 'entregue'
          data_previsao_entrega: string | null
          data_entrega: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          paciente_id: string
          titulo: string
          conteudo: string
          status?: 'em_andamento' | 'concluido' | 'entregue'
          data_previsao_entrega?: string | null
          data_entrega?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          paciente_id?: string
          titulo?: string
          conteudo?: string
          status?: 'em_andamento' | 'concluido' | 'entregue'
          data_previsao_entrega?: string | null
          data_entrega?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
