
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle, 
  Calendar, 
  Download, 
  MessageSquare, 
  AlertCircle,
  FileText,
  ClipboardList
} from "lucide-react";
import Header from "@/components/Header";
import TimeLine from "@/components/TimeLine";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.tipo_usuario === "administrador") {
      navigate("/admin");
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  // Dados de demonstração
  const progressoGeral = 60; // 3 de 5 etapas concluídas
  const proximaConsulta = {
    data: "15 de Fevereiro, 2024",
    horario: "14:00",
    tipo: "Sessão de Avaliação Comportamental",
    link: "https://meet.google.com/abc-defg-hij"
  };

  const sessoes = [
    {
      id: 1,
      nome: "Sessão Inicial",
      descricao: "Entrevista inicial para coleta de dados básicos, histórico clínico e definição dos objetivos da avaliação.",
      orientacoes: "Chegue 15 minutos antes. Traga documentos de identificação e relatórios médicos anteriores.",
      responsavel: "Dr. João Silva",
      ordem: 1,
      status: "concluido",
      data: "2024-01-10T14:00:00"
    },
    {
      id: 2,
      nome: "Avaliação Cognitiva",
      descricao: "Aplicação de testes neuropsicológicos para avaliação das funções cognitivas básicas.",
      orientacoes: "Durma bem na noite anterior. Tome café da manhã normalmente. Traga óculos se usar.",
      responsavel: "Dr. João Silva",
      ordem: 2,
      status: "concluido",
      data: "2024-01-17T14:00:00"
    },
    {
      id: 3,
      nome: "Testes Específicos",
      descricao: "Aplicação de testes específicos baseados nas hipóteses diagnósticas levantadas.",
      orientacoes: "Mantenha medicação regular. Evite bebidas alcoólicas 24h antes.",
      responsavel: "Dr. João Silva",
      ordem: 3,
      status: "pendente",
      data: "2024-02-15T14:00:00"
    },
    {
      id: 4,
      nome: "Avaliação Comportamental",
      descricao: "Observação e avaliação de aspectos comportamentais e emocionais.",
      orientacoes: "Sessão com duração estendida. Traga lanche leve se necessário.",
      responsavel: "Dra. Maria Santos",
      ordem: 4,
      status: "pendente",
      data: "2024-02-22T14:00:00"
    },
    {
      id: 5,
      nome: "Sessão de Alinhamento Diagnóstico",
      descricao: "Revisão dos resultados, discussão dos achados e entrega do relatório final.",
      orientacoes: "Compareça acompanhado de familiar se desejar. Sessão para esclarecimento de dúvidas.",
      responsavel: "Dr. João Silva",
      ordem: 5,
      status: "pendente",
      data: "2024-03-01T14:00:00"
    }
  ];

  const questionarios = [
    { 
      id: 1, 
      nome: "Formulário Inicial", 
      status: "concluido", 
      prazo: "Concluído",
      link: "https://forms.google.com/..."
    },
    { 
      id: 2, 
      nome: "Escala SRS-2", 
      status: "concluido", 
      prazo: "Concluído",
      link: "https://forms.google.com/..."
    },
    { 
      id: 3, 
      nome: "BDEFS", 
      status: "pendente", 
      prazo: "Até 20/02/2024",
      link: "https://forms.google.com/..."
    },
    { 
      id: 4, 
      nome: "Questionário Complementar", 
      status: "pendente", 
      prazo: "Até 25/02/2024",
      link: "https://forms.google.com/..."
    }
  ];

  const prazoLaudo = "28 de Fevereiro, 2024";
  const agendamentoDevolutiva = "A partir de 01 de Março, 2024";

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header user={user} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Olá, {user.nome}!
          </h1>
          <p className="text-gray-600">
            Acompanhe seu processo de avaliação neuropsicológica
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
              Progresso da Avaliação
            </CardTitle>
            <CardDescription>
              Você completou {Math.round((progressoGeral / 100) * 5)} de 5 etapas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressoGeral} className="mb-4" />
            <p className="text-sm text-gray-600">
              {progressoGeral}% concluído - Continue assim! 🎉
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <TimeLine sessoes={sessoes} />

            {/* Questionários */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-purple-600" />
                  Questionários
                </CardTitle>
                <CardDescription>
                  Formulários, escalas e testes para preenchimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questionarios.map((questionario) => (
                    <div key={questionario.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{questionario.nome}</h4>
                        <p className="text-sm text-gray-600">Prazo: {questionario.prazo}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={questionario.status === "concluido" ? "default" : "secondary"}
                          className={questionario.status === "concluido" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                        >
                          {questionario.status === "concluido" ? "Concluído" : "Pendente"}
                        </Badge>
                        {questionario.status === "pendente" && (
                          <Button size="sm" asChild>
                            <a href={questionario.link} target="_blank" rel="noopener noreferrer">
                              Preencher
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-100">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Agendamentos</h3>
                  <p className="text-sm text-gray-600 mb-4">Visualize e gerencie suas consultas</p>
                  <Button size="sm" className="w-full">
                    Ver Agenda
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Recursos</h3>
                  <p className="text-sm text-gray-600 mb-4">Dicas e informações úteis</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => navigate("/recursos")}
                  >
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Appointment */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Próxima Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-800">{proximaConsulta.data}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {proximaConsulta.horario}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{proximaConsulta.tipo}</p>
                    <Button size="sm" variant="outline" className="w-full mt-2" asChild>
                      <a href={proximaConsulta.link} target="_blank" rel="noopener noreferrer">
                        Acessar Consulta
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                  Datas Importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">Prazo do Laudo</p>
                  <p className="text-sm text-orange-600">{prazoLaudo}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Agendamento da Devolutiva</p>
                  <p className="text-sm text-green-600">{agendamentoDevolutiva}</p>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contatar Secretária
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Download Section */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Download className="h-5 w-5 mr-2 text-gray-600" />
                  Documentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Seu laudo estará disponível após a conclusão da avaliação
                  </p>
                  <Button size="sm" variant="outline" disabled className="w-full">
                    Laudo não disponível
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
