
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Calendar, 
  FileText, 
  Download, 
  Search,
  Plus,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Dados de demonstração
  const pacientes = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      sessoesConcluidas: 2,
      totalSessoes: 5,
      proximaSessao: "2024-02-05",
      status: "Em andamento"
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@email.com",
      sessoesConcluidas: 5,
      totalSessoes: 5,
      proximaSessao: null,
      status: "Concluído"
    },
    {
      id: 3,
      nome: "Ana Costa",
      email: "ana@email.com",
      sessoesConcluidas: 1,
      totalSessoes: 5,
      proximaSessao: "2024-02-08",
      status: "Em andamento"
    }
  ];

  const agendamentosHoje = [
    { id: 1, paciente: "Maria Silva", horario: "09:00", tipo: "Sessão de Avaliação Comportamental" },
    { id: 2, paciente: "Pedro Oliveira", horario: "14:00", tipo: "Sessão Inicial" },
    { id: 3, paciente: "Carla Santos", horario: "16:30", tipo: "Sessão de Alinhamento Diagnóstico" }
  ];

  const estatisticas = {
    totalPacientes: 15,
    pacientesAtivos: 8,
    sessoesConcluidas: 45,
    laudosPendentes: 3
  };

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header user={user} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Gerencie pacientes, agendamentos e acompanhe o progresso das avaliações
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                  <p className="text-3xl font-bold text-blue-600">{estatisticas.totalPacientes}</p>
                </div>
                <Users className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pacientes Ativos</p>
                  <p className="text-3xl font-bold text-green-600">{estatisticas.pacientesAtivos}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessões Concluídas</p>
                  <p className="text-3xl font-bold text-purple-600">{estatisticas.sessoesConcluidas}</p>
                </div>
                <BarChart3 className="h-12 w-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Laudos Pendentes</p>
                  <p className="text-3xl font-bold text-orange-600">{estatisticas.laudosPendentes}</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pacientes */}
            <Card className="border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Gerenciar Pacientes
                  </CardTitle>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate("/admin/pacientes")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Paciente
                  </Button>
                </div>
                <CardDescription>
                  Visualize e gerencie todos os pacientes em avaliação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar pacientes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    {filteredPacientes.map((paciente) => (
                      <div key={paciente.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{paciente.nome}</h4>
                          <p className="text-sm text-gray-600">{paciente.email}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">
                              Progresso: {paciente.sessoesConcluidas}/{paciente.totalSessoes}
                            </span>
                            <Badge 
                              variant={paciente.status === "Concluído" ? "default" : "secondary"}
                              className={paciente.status === "Concluído" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                            >
                              {paciente.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          <Button size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/admin/pacientes")}
                  >
                    Ver Todos os Pacientes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-green-100">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Formulários</h3>
                  <p className="text-sm text-gray-600 mb-4">Gerenciar formulários e escalas</p>
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                    Acessar
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardContent className="p-6 text-center">
                  <Download className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Laudos</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload e gerenciamento de laudos</p>
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                    Acessar
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-orange-100">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Relatórios</h3>
                  <p className="text-sm text-gray-600 mb-4">Análises e estatísticas</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => navigate("/admin/relatorios")}
                  >
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Appointments */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Agendamentos de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agendamentosHoje.map((agendamento) => (
                    <div key={agendamento.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">{agendamento.horario}</span>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">{agendamento.paciente}</p>
                      <p className="text-xs text-gray-500">{agendamento.tipo}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate("/admin/agendamentos")}
                >
                  Ver Todos os Agendamentos
                </Button>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-gray-600" />
                  Configurações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/pacientes")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Gerenciar Usuários
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates de Formulários
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/agendamentos")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Configurar Agenda
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações Gerais
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
