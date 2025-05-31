
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthUser {
  id: string;
  email: string;
  tipo_usuario: 'administrador' | 'paciente';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  simulateAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular usuário admin por enquanto
    const simulatedAdmin = {
      id: 'admin-temp-id',
      email: 'admin@clinica.com',
      tipo_usuario: 'administrador' as const
    };
    
    setUser(simulatedAdmin);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Implementar autenticação real mais tarde
    console.log('SignIn:', email, password);
  };

  const signOut = async () => {
    setUser(null);
  };

  const simulateAdmin = () => {
    const simulatedAdmin = {
      id: 'admin-temp-id',
      email: 'admin@clinica.com',
      tipo_usuario: 'administrador' as const
    };
    setUser(simulatedAdmin);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, simulateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
