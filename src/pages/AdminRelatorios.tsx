
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3,
  ArrowLeft,
  Users,
  Calendar,
  FileText,
  Download,
  TrendingUp,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminRelatorios = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.tipo_usuario !== "administrador") {
      navigate("/dashboard");
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  // Dados de demonstração para gráficos
  const dadosMensais = [
    { mes: 'Jan', novosAtendimentos: 8, sessoesConcluidas: 32, laudosEntregues: 6 },
    { mes: 'Fev', novosAtendimentos: 12, sessoesConcluidas: 45, laudosEntregues: 9 },
    { mes: 'Mar', novosAtendimentos: 15, sessoesConcluidas: 52, laudosEntregues: 11 },
    { mes: 'Abr', novosAtendimentos: 10, sessoesConcluidas: 38, laudosEntregues: 8 },
    { mes: 'Mai', novosAtendimentos: 18, sessoesConcluidas: 65, laudosEntregues: 14 },
    { mes: 'Jun', novosAtendimentos: 14, sessoesConcluidas: 48, laudosEntregues: 12 }
  ];

  const statusPacientes = [
    { name: 'Em andamento', value: 45, color: '#3b82f6' },
    { name: 'Concluído', value: 32, color: '#10b981' },
    { name: 'Aguardando', value: 23, color: '#f59e0b' }
  ];

  const estatisticasGerais = {
    totalPacientes: 100,
    pacientesAtivos: 45,
    sessoesConcluidas: 280,
    laudosPendentes: 8,
    mediaSessoesPorPaciente: 4.2,
    tempoMedioAvaliacao: 28 // dias
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header user={user} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/admin")}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Relatórios e Análises</h1>
              <p className="text-gray-600">Visualize estatísticas e indicadores de desempenho</p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Estatísticas Resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                  <p className="text-3xl font-bold text-blue-600">{estatisticasGerais.totalPacientes}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% este mês
                  </p>
                </div>
                <Users className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessões Concluídas</p>
                  <p className="text-3xl font-bold text-green-600">{estatisticasGerais.sessoesConcluidas}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8% este mês
                  </p>
                </div>
                <Calendar className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tempo Médio de Avaliação</p>
                  <p className="text-3xl font-bold text-purple-600">{estatisticasGerais.tempoMedioAvaliacao}</p>
                  <p className="text-sm text-gray-500">dias</p>
                </div>
                <Clock className="h-12 w-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Barras - Atividades Mensais */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Atividades Mensais
              </CardTitle>
              <CardDescription>
                Comparativo de novos atendimentos, sessões e laudos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="novosAtendimentos" fill="#3b82f6" name="Novos Atendimentos" />
                  <Bar dataKey="sessoesConcluidas" fill="#10b981" name="Sessões Concluídas" />
                  <Bar dataKey="laudosEntregues" fill="#f59e0b" name="Laudos Entregues" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Pizza - Status dos Pacientes */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Status dos Pacientes
              </CardTitle>
              <CardDescription>
                Distribuição atual dos pacientes por status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusPacientes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusPacientes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Indicadores Detalhados */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-orange-100">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Laudos Pendentes</h3>
              <p className="text-3xl font-bold text-orange-600">{estatisticasGerais.laudosPendentes}</p>
              <p className="text-sm text-gray-600 mt-2">Aguardando finalização</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-100">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Média de Sessões</h3>
              <p className="text-3xl font-bold text-indigo-600">{estatisticasGerais.mediaSessoesPorPaciente}</p>
              <p className="text-sm text-gray-600 mt-2">Por paciente</p>
            </CardContent>
          </Card>

          <Card className="border-pink-100">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Taxa de Conclusão</h3>
              <p className="text-3xl font-bold text-pink-600">87%</p>
              <p className="text-sm text-gray-600 mt-2">Pacientes que concluem</p>
            </CardContent>
          </Card>

          <Card className="border-teal-100">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Agendamentos</h3>
              <p className="text-3xl font-bold text-teal-600">24</p>
              <p className="text-sm text-gray-600 mt-2">Próximos 7 dias</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminRelatorios;
