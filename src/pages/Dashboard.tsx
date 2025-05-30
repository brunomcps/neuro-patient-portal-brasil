
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Calendar, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Phone,
  MessageSquare,
  ExternalLink
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
    setUser(JSON.parse(userData));
  }, [navigate]);

  const sessoes = [
    {
      id: 1,
      nome: "Sessão Inicial",
      descricao: "Primeira sessão para conhecimento do paciente e coleta de informações iniciais.",
      orientacoes: "Traga documentos médicos anteriores e seja pontual.",
      responsavel: "Dr. João Santos",
      ordem: 1,
      status: "concluido",
      data: "2024-01-15"
    },
    {
      id: 2,
      nome: "Sessão de Testes Cognitivos",
      descricao: "Aplicação de testes específicos para avaliação cognitiva.",
      orientacoes: "Tenha uma boa noite de sono antes da sessão.",
      responsavel: "Dra. Maria Lima",
      ordem: 2,
      status: "concluido",
      data: "2024-01-22"
    },
    {
      id: 3,
      nome: "Sessão de Avaliação Comportamental",
      descricao: "Avaliação de aspectos comportamentais e emocionais.",
      orientacoes: "Prepare-se para discussões sobre comportamento e emoções.",
      responsavel: "Dr. João Santos",
      ordem: 3,
      status: "pendente",
      data: "2024-02-05"
    },
    {
      id: 4,
      nome: "Sessão de Testes Complementares",
      descricao: "Aplicação de testes complementares para finalizar a avaliação.",
      orientacoes: "Mantenha-se relaxado e responda naturalmente.",
      responsavel: "Dra. Ana Costa",
      ordem: 4,
      status: "pendente",
      data: "2024-02-12"
    },
    {
      id: 5,
      nome: "Sessão de Alinhamento Diagnóstico",
      descricao: "Apresentação e discussão dos resultados da avaliação.",
      orientacoes: "Prepare suas dúvidas sobre o processo.",
      responsavel: "Dr. João Santos",
      ordem: 5,
      status: "pendente",
      data: "2024-02-19"
    }
  ];

  const formularios = [
    { id: 1, nome: "Formulário Inicial", status: "concluido", link: "#" },
    { id: 2, nome: "Escala SRS-2", status: "pendente", link: "#" },
    { id: 3, nome: "Escala BDEFS", status: "pendente", link: "#" }
  ];

  const progressoGeral = (sessoes.filter(s => s.status === "concluido").length / sessoes.length) * 100;

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
            Acompanhe o progresso da sua avaliação neuropsicológica
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              Progresso da Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progresso geral</span>
                  <span>{Math.round(progressoGeral)}%</span>
                </div>
                <Progress value={progressoGeral} className="h-3" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {sessoes.filter(s => s.status === "concluido").length}
                  </div>
                  <div className="text-sm text-gray-600">Sessões Concluídas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {sessoes.filter(s => s.status === "pendente").length}
                  </div>
                  <div className="text-sm text-gray-600">Sessões Pendentes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formularios.filter(f => f.status === "concluido").length}/{formularios.length}
                  </div>
                  <div className="text-sm text-gray-600">Formulários</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <TimeLine sessoes={sessoes} />

            {/* Formulários */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Formulários e Escalas
                </CardTitle>
                <CardDescription>
                  Complete os formulários necessários para sua avaliação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formularios.map((formulario) => (
                    <div key={formulario.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-800">{formulario.nome}</h4>
                          <Badge 
                            variant={formulario.status === "concluido" ? "default" : "secondary"}
                            className={formulario.status === "concluido" ? "bg-green-100 text-green-800" : ""}
                          >
                            {formulario.status === "concluido" ? "Concluído" : "Pendente"}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={formulario.status === "concluido" ? "outline" : "default"}
                        className={formulario.status === "pendente" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {formulario.status === "concluido" ? "Visualizar" : "Preencher"}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Sessão
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contato WhatsApp
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Laudo
                </Button>
              </CardContent>
            </Card>

            {/* Next Appointment */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  Próximo Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-lg font-semibold text-gray-800">05/02/2024</div>
                  <div className="text-sm text-gray-600">14:00 - Sessão de Avaliação Comportamental</div>
                  <div className="text-sm text-gray-500 mt-2">Dra. Maria Lima</div>
                  <Button size="sm" className="mt-3" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Link da Sessão
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Important Info */}
            <Card className="border-yellow-100 bg-yellow-50/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                  Informações Importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-700">
                  <p><strong>Prazo para entrega do laudo:</strong></p>
                  <p>10 dias após a última sessão</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p><strong>Agendamento da devolutiva:</strong></p>
                  <p>Disponível a partir de 01/03/2024</p>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Ver Todos os Recursos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
