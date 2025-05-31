
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
  ClipboardList,
  MapPin,
  Monitor,
  ExternalLink,
  Eye,
  CreditCard,
  Phone,
  User
} from "lucide-react";
import Header from "@/components/Header";

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
  const sessoesConcluidas = 2;
  const totalSessoes = 5;
  const questionariosRealizados = 1;
  const totalQuestionarios = 3;
  const pagamentosPendentes = 1;

  const proximaConsulta = {
    data: "15 de Fevereiro, 2024",
    horario: "14:00",
    tipo: "Testes Específicos",
    profissional: "Dra. Gabrielly La-Cava",
    local: "online",
    link: "https://meet.google.com/abc-defg-hij",
    descricao: "Aplicação de testes específicos baseados nas hipóteses diagnósticas levantadas."
  };

  const sessoes = [
    {
      id: 1,
      nome: "Sessão Inicial",
      descricao: "Entrevista inicial para coleta de dados básicos, histórico clínico e definição dos objetivos da avaliação.",
      orientacoes: "Chegue 15 minutos antes. Traga documentos de identificação e relatórios médicos anteriores.",
      profissional: "Dra. Gabrielly La-Cava",
      ordem: 1,
      status: "concluido",
      data: "2024-01-10T14:00:00",
      local: "copacabana",
      endereco: "Rua Barata Ribeiro, 123 - Copacabana, Rio de Janeiro - RJ"
    },
    {
      id: 2,
      nome: "Avaliação Cognitiva",
      descricao: "Aplicação de testes neuropsicológicos para avaliação das funções cognitivas básicas.",
      orientacoes: "Durma bem na noite anterior. Tome café da manhã normalmente. Traga óculos se usar.",
      profissional: "Dra. Gabrielly La-Cava",
      ordem: 2,
      status: "concluido",
      data: "2024-01-17T14:00:00",
      local: "online",
      link: "https://meet.google.com/def-ghij-klm"
    },
    {
      id: 3,
      nome: "Testes Específicos",
      descricao: "Aplicação de testes específicos baseados nas hipóteses diagnósticas levantadas.",
      orientacoes: "Mantenha medicação regular. Evite bebidas alcoólicas 24h antes.",
      profissional: "Dra. Gabrielly La-Cava",
      ordem: 3,
      status: "pendente",
      data: "2024-02-15T14:00:00",
      local: "online",
      link: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 4,
      nome: "Avaliação Comportamental",
      descricao: "Observação e avaliação de aspectos comportamentais e emocionais.",
      orientacoes: "Sessão com duração estendida. Traga lanche leve se necessário.",
      profissional: "Dr. Carlos Mendes",
      ordem: 4,
      status: "pendente",
      data: "2024-02-22T14:00:00",
      local: "leblon",
      endereco: "Av. Ataulfo de Paiva, 456 - Leblon, Rio de Janeiro - RJ"
    },
    {
      id: 5,
      nome: "Sessão de Alinhamento Diagnóstico",
      descricao: "Revisão dos resultados, discussão dos achados e entrega do relatório final.",
      orientacoes: "Compareça acompanhado de familiar se desejar. Sessão para esclarecimento de dúvidas.",
      profissional: "Dra. Gabrielly La-Cava",
      ordem: 5,
      status: "pendente",
      data: "2024-03-01T14:00:00",
      local: "copacabana",
      endereco: "Rua Barata Ribeiro, 123 - Copacabana, Rio de Janeiro - RJ"
    }
  ];

  const questionarios = [
    { 
      id: 1, 
      nome: "Formulário Inicial", 
      tipo: "Formulário",
      status: "concluido", 
      prazo: "Concluído",
      link: "https://forms.google.com/..."
    },
    { 
      id: 2, 
      nome: "Escala SRS-2", 
      tipo: "Escala",
      status: "pendente", 
      prazo: "Até 20/02/2024",
      link: "https://forms.google.com/..."
    },
    { 
      id: 3, 
      nome: "BDEFS", 
      tipo: "Escala",
      status: "pendente", 
      prazo: "Até 25/02/2024",
      link: "https://forms.google.com/..."
    }
  ];

  const prazoLaudo = "28 de Fevereiro, 2024";

  const getStatusIcon = (status: string) => {
    return status === "concluido" ? (
      <CheckCircle className="h-6 w-6 text-white" />
    ) : (
      <Clock className="h-6 w-6 text-white" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "concluido" 
      ? "bg-green-500 border-green-300" 
      : "bg-orange-500 border-orange-300";
  };

  const getLocalIcon = (local: string) => {
    return local === "online" ? (
      <Monitor className="h-4 w-4" />
    ) : (
      <MapPin className="h-4 w-4" />
    );
  };

  const getLocalButton = (sessao: any) => {
    if (sessao.local === "online") {
      return (
        <Button size="sm" variant="outline" asChild>
          <a href={sessao.link} target="_blank" rel="noopener noreferrer">
            <Monitor className="h-4 w-4 mr-2" />
            Acessar
          </a>
        </Button>
      );
    } else {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sessao.endereco)}`;
      return (
        <Button size="sm" variant="outline" asChild>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4 mr-2" />
            Ver Local
          </a>
        </Button>
      );
    }
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5521999999999?text=Olá, gostaria de falar sobre minha avaliação neuropsicológica", "_blank");
  };

  const handleTimeline = () => {
    navigate("/paciente/sessoes");
  };

  const handleQuestionarios = () => {
    // Scroll to questionarios section
    document.querySelector('.questionarios-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePagamentos = () => {
    navigate("/paciente/pagamentos");
  };

  const handleAgendamentos = () => {
    navigate("/paciente/agendamentos");
  };

  const handleRelatorioFinal = () => {
    alert("Seu relatório final estará disponível após a conclusão de todas as sessões e testes.");
  };

  const handleVerDetalhes = () => {
    alert(`Detalhes da consulta:\n\nTipo: ${proximaConsulta.tipo}\nData: ${proximaConsulta.data}\nHorário: ${proximaConsulta.horario}\nProfissional: ${proximaConsulta.profissional}\nLocal: ${proximaConsulta.local}\n\nDescrição: ${proximaConsulta.descricao}`);
  };

  const handleLeiaMais = (sessao: any) => {
    alert(`${sessao.nome}\n\nDescrição completa:\n${sessao.descricao}\n\nOrientações:\n${sessao.orientacoes}\n\nProfissional: ${sessao.profissional}\nData: ${new Date(sessao.data).toLocaleDateString('pt-BR')}\nStatus: ${sessao.status === 'concluido' ? 'Concluído' : 'Pendente'}`);
  };

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
              Acompanhe o andamento do seu processo de avaliação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressoGeral} className="mb-6" />
            
            {/* Medidores */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessões</p>
                  <p className="text-xl font-bold text-blue-600">{sessoesConcluidas}/{totalSessoes}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <ClipboardList className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Questionários</p>
                  <p className="text-xl font-bold text-purple-600">{questionariosRealizados}/{totalQuestionarios}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                <CreditCard className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pagamentos Pendentes</p>
                  <p className="text-xl font-bold text-orange-600">{pagamentosPendentes}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Timeline Aprimorada */}
            <Card className="border-blue-100 timeline-section">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Linha do Tempo da Avaliação
                </CardTitle>
                <CardDescription>
                  Acompanhe o progresso das suas sessões de avaliação neuropsicológica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-6">
                    {sessoes.map((sessao, index) => (
                      <div key={sessao.id} className="relative flex items-start space-x-4">
                        {/* Timeline Dot */}
                        <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${getStatusColor(sessao.status)}`}>
                          {getStatusIcon(sessao.status)}
                        </div>
                        
                        {/* Session Content */}
                        <div className="flex-1 min-w-0">
                          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                  {sessao.nome}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {new Date(sessao.data).toLocaleDateString('pt-BR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })} às {new Date(sessao.data).toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                <p className="text-sm text-gray-700 mb-3 flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {sessao.profissional}
                                </p>
                                <div className="flex items-center space-x-2 mb-4">
                                  <Badge 
                                    variant={sessao.status === "concluido" ? "default" : "secondary"}
                                    className={sessao.status === "concluido" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                                  >
                                    {sessao.status === "concluido" ? "Concluído" : "Pendente"}
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center space-x-1">
                                    {getLocalIcon(sessao.local)}
                                    <span className="capitalize">{sessao.local}</span>
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {sessao.descricao}
                            </p>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleLeiaMais(sessao)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Leia Mais
                              </Button>
                              {getLocalButton(sessao)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questionários */}
            <Card className="border-purple-100 questionarios-section">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-purple-600" />
                  Testes e Questionários
                </CardTitle>
                <CardDescription>
                  Formulários, escalas e testes para preenchimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {questionarios.map((questionario) => (
                    <Card key={questionario.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-800">{questionario.nome}</h4>
                              <Badge variant="outline" className="text-xs">
                                {questionario.tipo}
                              </Badge>
                            </div>
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
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Preencher
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ações Rápidas */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex flex-col h-16 space-y-1" onClick={handleWhatsApp}>
                    <Phone className="h-5 w-5 text-green-600" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                  
                  <Button variant="outline" className="flex flex-col h-16 space-y-1" onClick={handleTimeline}>
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-xs">Sessões</span>
                  </Button>

                  <Button variant="outline" className="flex flex-col h-16 space-y-1" onClick={handleQuestionarios}>
                    <ClipboardList className="h-5 w-5 text-purple-600" />
                    <span className="text-xs">Questionários</span>
                  </Button>
                  
                  <Button variant="outline" className="flex flex-col h-16 space-y-1" onClick={handlePagamentos}>
                    <CreditCard className="h-5 w-5 text-orange-600" />
                    <span className="text-xs">Pagamentos</span>
                  </Button>
                  
                  <Button variant="outline" className="flex flex-col h-16 space-y-1" onClick={handleRelatorioFinal}>
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span className="text-xs">Relatório</span>
                  </Button>

                  <Button variant="outline" className="flex flex-col h-16 space-y-1" onClick={handleAgendamentos}>
                    <Clock className="h-5 w-5 text-indigo-600" />
                    <span className="text-xs">Agendar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Próxima Consulta */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Próxima Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800">{proximaConsulta.data}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {proximaConsulta.horario}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{proximaConsulta.tipo}</p>
                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {proximaConsulta.profissional}
                    </p>
                    <Badge variant="outline" className="flex items-center space-x-1 w-fit mb-3">
                      {getLocalIcon(proximaConsulta.local)}
                      <span className="capitalize">{proximaConsulta.local}</span>
                    </Badge>
                    <div className="space-y-2">
                      {proximaConsulta.local === "online" ? (
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <a href={proximaConsulta.link} target="_blank" rel="noopener noreferrer">
                            <Monitor className="h-4 w-4 mr-2" />
                            Acessar Consulta
                          </a>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <a href="https://www.google.com/maps/search/?api=1&query=Rua+Barata+Ribeiro,+123+-+Copacabana,+Rio+de+Janeiro+-+RJ" target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-4 w-4 mr-2" />
                            Ver Endereço
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="w-full" onClick={handleVerDetalhes}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prazo do Relatório */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                  Prazo de Entrega do Relatório
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm font-medium text-orange-800">Entrega prevista para</p>
                  <p className="text-lg font-bold text-orange-600">{prazoLaudo}</p>
                  <p className="text-xs text-orange-600 mt-2">
                    Após conclusão de todos os testes
                  </p>
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
