
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  Clock,
  ArrowLeft,
  User,
  MapPin,
  Monitor,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit,
  ExternalLink,
  CreditCard,
  X,
  Plus,
  DollarSign
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const PacienteSessoes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedSessao, setSelectedSessao] = useState<any>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    nota: 5,
    comentario: "",
    dificuldades: "",
    sugestoes: ""
  });
  const [rescheduleData, setRescheduleData] = useState({
    motivo: "",
    data_preferida: "",
    horario_preferido: "",
    observacoes: ""
  });
  const [requestData, setRequestData] = useState({
    tipo_sessao: "",
    data_preferida: "",
    horario_preferido: "",
    modalidade: "online",
    motivo: "",
    urgencia: "normal"
  });

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

  const sessoes = [
    {
      id: 1,
      nome: "Sessão Inicial",
      descricao: "Entrevista inicial para coleta de dados básicos, histórico clínico e definição dos objetivos da avaliação.",
      orientacoes: "Chegue 15 minutos antes. Traga documentos de identificação e relatórios médicos anteriores.",
      profissional: "Dra. Gabrielly La-Cava",
      data: "2024-01-10T14:00:00",
      status: "concluida",
      local: "copacabana",
      endereco: "Rua Barata Ribeiro, 123 - Copacabana, Rio de Janeiro - RJ",
      observacoes: "Sessão realizada com sucesso. Paciente colaborativo e demonstrou boa compreensão das orientações.",
      feedback_enviado: true,
      valor: 400.00,
      status_pagamento: "pago"
    },
    {
      id: 2,
      nome: "Avaliação Cognitiva",
      descricao: "Aplicação de testes neuropsicológicos para avaliação das funções cognitivas básicas.",
      orientacoes: "Durma bem na noite anterior. Tome café da manhã normalmente. Traga óculos se usar.",
      profissional: "Dra. Gabrielly La-Cava",
      data: "2024-01-17T14:00:00",
      status: "concluida",
      local: "online",
      link: "https://meet.google.com/def-ghij-klm",
      observacoes: "Aplicação de testes WISC-V e TEA-Ch. Desempenho dentro do esperado para a idade.",
      feedback_enviado: false,
      valor: 400.00,
      status_pagamento: "pago"
    },
    {
      id: 3,
      nome: "Testes Específicos",
      descricao: "Aplicação de testes específicos baseados nas hipóteses diagnósticas levantadas.",
      orientacoes: "Mantenha medicação regular. Evite bebidas alcoólicas 24h antes.",
      profissional: "Dra. Gabrielly La-Cava",
      data: "2024-02-15T14:00:00",
      status: "agendada",
      local: "online",
      link: "https://meet.google.com/abc-defg-hij",
      valor: 500.00,
      status_pagamento: "pendente",
      pode_reagendar: true,
      prazo_reagendamento: "2024-02-13T14:00:00"
    },
    {
      id: 4,
      nome: "Avaliação Comportamental",
      descricao: "Observação e avaliação de aspectos comportamentais e emocionais.",
      orientacoes: "Sessão com duração estendida. Traga lanche leve se necessário.",
      profissional: "Dr. Carlos Mendes",
      data: "2024-02-22T14:00:00",
      status: "agendada",
      local: "leblon",
      endereco: "Av. Ataulfo de Paiva, 456 - Leblon, Rio de Janeiro - RJ",
      valor: 450.00,
      status_pagamento: "pendente",
      pode_reagendar: true,
      prazo_reagendamento: "2024-02-20T14:00:00"
    },
    {
      id: 5,
      nome: "Sessão de Alinhamento Diagnóstico",
      descricao: "Revisão dos resultados, discussão dos achados e entrega do relatório final.",
      orientacoes: "Compareça acompanhado de familiar se desejar. Sessão para esclarecimento de dúvidas.",
      profissional: "Dra. Gabrielly La-Cava",
      data: "2024-03-01T14:00:00",
      status: "pendente",
      local: "copacabana",
      endereco: "Rua Barata Ribeiro, 123 - Copacabana, Rio de Janeiro - RJ",
      valor: 350.00,
      status_pagamento: "futuro"
    }
  ];

  const solicitacoes = [
    {
      id: 1,
      tipo_sessao: "Sessão de Acompanhamento",
      data_solicitacao: "2024-02-01T10:00:00",
      status: "em_analise",
      motivo: "Necessidade de esclarecimentos adicionais sobre os resultados",
      urgencia: "normal",
      data_preferida: "2024-02-20",
      horario_preferido: "15:00",
      modalidade: "online"
    },
    {
      id: 2,
      tipo_sessao: "Sessão Extra de Testes",
      data_solicitacao: "2024-01-28T16:30:00",
      status: "aprovada",
      motivo: "Complementação de bateria de testes",
      urgencia: "alta",
      data_agendada: "2024-02-10T10:00:00",
      profissional: "Dra. Gabrielly La-Cava"
    }
  ];

  const tiposSessao = [
    "Sessão de Acompanhamento",
    "Sessão Extra de Testes",
    "Sessão de Esclarecimentos",
    "Sessão de Revisão",
    "Consulta Adicional"
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluida":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "agendada":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "reagendamento_solicitado":
        return <Edit className="h-5 w-5 text-orange-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluida":
        return "bg-green-100 text-green-800";
      case "agendada":
        return "bg-blue-100 text-blue-800";
      case "reagendamento_solicitado":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "concluida":
        return "Concluída";
      case "agendada":
        return "Agendada";
      case "reagendamento_solicitado":
        return "Reagendamento Solicitado";
      default:
        return "Pendente";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-orange-100 text-orange-800";
      case "atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pago":
        return "Pago";
      case "pendente":
        return "Pendente";
      case "atrasado":
        return "Atrasado";
      default:
        return "Futuro";
    }
  };

  const getLocalButton = (sessao: any) => {
    if (sessao.local === "online" && sessao.link) {
      return (
        <Button size="sm" variant="outline" asChild>
          <a href={sessao.link} target="_blank" rel="noopener noreferrer">
            <Monitor className="h-4 w-4 mr-2" />
            Acessar Consulta
          </a>
        </Button>
      );
    } else if (sessao.endereco) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sessao.endereco)}`;
      return (
        <Button size="sm" variant="outline" asChild>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4 mr-2" />
            Ver Endereço
          </a>
        </Button>
      );
    }
    return null;
  };

  const canReschedule = (sessao: any) => {
    if (!sessao.pode_reagendar || !sessao.prazo_reagendamento) return false;
    const now = new Date();
    const deadline = new Date(sessao.prazo_reagendamento);
    return now < deadline;
  };

  const canAccessSession = (sessao: any) => {
    const now = new Date();
    const sessionDate = new Date(sessao.data);
    const thirtyMinutesBefore = new Date(sessionDate.getTime() - 30 * 60000);
    
    return now >= thirtyMinutesBefore && sessao.status === "agendada";
  };

  const handleVerDetalhes = (sessao: any) => {
    setSelectedSessao(sessao);
  };

  const handleReschedule = (sessao: any) => {
    setSelectedSessao(sessao);
    setShowRescheduleDialog(true);
  };

  const handleEnviarFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback enviado",
      description: "Seu feedback foi enviado com sucesso. Obrigado pela avaliação!",
    });
    setFeedbackData({ nota: 5, comentario: "", dificuldades: "", sugestoes: "" });
    setShowFeedbackDialog(false);
  };

  const handleSubmitReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de reagendamento foi enviada e será analisada em breve.",
    });
    setRescheduleData({ motivo: "", data_preferida: "", horario_preferido: "", observacoes: "" });
    setShowRescheduleDialog(false);
    setSelectedSessao(null);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de nova sessão foi enviada e será analisada em breve.",
    });
    setRequestData({ tipo_sessao: "", data_preferida: "", horario_preferido: "", modalidade: "online", motivo: "", urgencia: "normal" });
    setShowRequestDialog(false);
  };

  const handlePagar = (sessao: any) => {
    navigate("/paciente/pagamentos");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Minhas Sessões e Agendamentos</h1>
              <p className="text-gray-600">Gerencie suas sessões, agendamentos e acompanhe os pagamentos</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowRequestDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Solicitar Nova Sessão
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sessões e Agendamentos */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Sessões e Agendamentos
                </CardTitle>
                <CardDescription>
                  Histórico completo de suas sessões, agendamentos e status de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessoes.map((sessao) => (
                  <Card key={sessao.id} className="border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(sessao.status)}
                            <h3 className="text-lg font-semibold text-gray-800">{sessao.nome}</h3>
                            <Badge className={getStatusColor(sessao.status)}>
                              {getStatusText(sessao.status)}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(sessao.data).toLocaleDateString('pt-BR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {new Date(sessao.data).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                {sessao.profissional}
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                {sessao.local === "online" ? (
                                  <Monitor className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <MapPin className="h-4 w-4 text-green-600" />
                                )}
                                <span className="text-sm text-gray-600 capitalize">{sessao.local}</span>
                              </div>
                              {sessao.endereco && (
                                <p className="text-xs text-gray-500">{sessao.endereco}</p>
                              )}
                              
                              {/* Informações de Pagamento */}
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-800">
                                  {formatCurrency(sessao.valor)}
                                </span>
                                <Badge className={getPaymentStatusColor(sessao.status_pagamento)}>
                                  {getPaymentStatusText(sessao.status_pagamento)}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 line-clamp-2">{sessao.descricao}</p>
                          
                          {sessao.orientacoes && (
                            <div className="bg-blue-50 p-3 rounded-lg mb-4">
                              <p className="text-sm font-medium text-blue-800 mb-1">Orientações:</p>
                              <p className="text-sm text-blue-700">{sessao.orientacoes}</p>
                            </div>
                          )}

                          {sessao.observacoes && (
                            <div className="bg-gray-50 p-3 rounded-lg mb-4">
                              <p className="text-sm font-medium text-gray-800 mb-1">Observações da sessão:</p>
                              <p className="text-sm text-gray-700">{sessao.observacoes}</p>
                            </div>
                          )}

                          {sessao.prazo_reagendamento && canReschedule(sessao) && (
                            <p className="text-xs text-orange-600 mb-4 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Reagendamento até: {new Date(sessao.prazo_reagendamento).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleVerDetalhes(sessao)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        
                        {getLocalButton(sessao)}
                        
                        {sessao.status === "agendada" && canAccessSession(sessao) && sessao.link && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                            <a href={sessao.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Entrar na Sessão
                            </a>
                          </Button>
                        )}

                        {canReschedule(sessao) && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReschedule(sessao)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Reagendar
                          </Button>
                        )}

                        {sessao.status_pagamento === "pendente" && (
                          <Button 
                            size="sm" 
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => handlePagar(sessao)}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pagar
                          </Button>
                        )}
                        
                        {sessao.status === "concluida" && !sessao.feedback_enviado && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-purple-600 border-purple-600 hover:bg-purple-50"
                            onClick={() => {
                              setSelectedSessao(sessao);
                              setShowFeedbackDialog(true);
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Enviar Feedback
                          </Button>
                        )}

                        {sessao.status === "concluida" && sessao.feedback_enviado && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Feedback Enviado
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Solicitações */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-purple-600" />
                  Minhas Solicitações
                </CardTitle>
                <CardDescription>
                  Acompanhe suas solicitações de novas sessões
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {solicitacoes.map((solicitacao) => (
                  <Card key={solicitacao.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">{solicitacao.tipo_sessao}</h4>
                          <p className="text-sm text-gray-600 mb-1">
                            Solicitado em: {new Date(solicitacao.data_solicitacao).toLocaleDateString('pt-BR')}
                          </p>
                          {solicitacao.data_preferida && (
                            <p className="text-sm text-gray-600 mb-1">
                              Data preferida: {new Date(solicitacao.data_preferida).toLocaleDateString('pt-BR')} às {solicitacao.horario_preferido}
                            </p>
                          )}
                          {solicitacao.data_agendada && (
                            <p className="text-sm text-green-600 mb-1 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Agendado para: {new Date(solicitacao.data_agendada).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                          {solicitacao.profissional && (
                            <p className="text-sm text-gray-600 mb-1">
                              Profissional: {solicitacao.profissional}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={solicitacao.status === "em_analise" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                            {solicitacao.status === "em_analise" ? "Em Análise" : "Aprovada"}
                          </Badge>
                          {solicitacao.urgencia === "alta" && (
                            <Badge variant="outline" className="text-red-600 border-red-600">
                              Urgente
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs font-medium text-gray-700 mb-1">Motivo:</p>
                        <p className="text-xs text-gray-600">{solicitacao.motivo}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog de Detalhes */}
        <Dialog open={!!selectedSessao && !showFeedbackDialog && !showRescheduleDialog} onOpenChange={() => setSelectedSessao(null)}>
          <DialogContent className="max-w-2xl">
            {selectedSessao && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedSessao.nome}</DialogTitle>
                  <DialogDescription>
                    Detalhes completos da sessão
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-medium">Data e Horário</Label>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedSessao.data).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} às {new Date(selectedSessao.data).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium">Profissional</Label>
                      <p className="text-sm text-gray-600">{selectedSessao.profissional}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="font-medium">Descrição</Label>
                    <p className="text-sm text-gray-600">{selectedSessao.descricao}</p>
                  </div>
                  
                  {selectedSessao.orientacoes && (
                    <div>
                      <Label className="font-medium">Orientações</Label>
                      <p className="text-sm text-gray-600">{selectedSessao.orientacoes}</p>
                    </div>
                  )}
                  
                  {selectedSessao.observacoes && (
                    <div>
                      <Label className="font-medium">Observações</Label>
                      <p className="text-sm text-gray-600">{selectedSessao.observacoes}</p>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-medium">Local</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        {selectedSessao.local === "online" ? (
                          <>
                            <Monitor className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-600">Online</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-600 capitalize">{selectedSessao.local}</span>
                          </>
                        )}
                      </div>
                      {selectedSessao.endereco && (
                        <p className="text-sm text-gray-500 mt-1">{selectedSessao.endereco}</p>
                      )}
                    </div>
                    <div>
                      <Label className="font-medium">Valor e Pagamento</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-gray-800">
                          {formatCurrency(selectedSessao.valor)}
                        </span>
                        <Badge className={getPaymentStatusColor(selectedSessao.status_pagamento)}>
                          {getPaymentStatusText(selectedSessao.status_pagamento)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Feedback */}
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Feedback da Sessão</DialogTitle>
              <DialogDescription>
                Sua opinião é importante para melhorarmos nossos serviços
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEnviarFeedback} className="space-y-4">
              <div>
                <Label>Nota da Sessão (1-5)</Label>
                <div className="flex space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((nota) => (
                    <Button
                      key={nota}
                      type="button"
                      size="sm"
                      variant={feedbackData.nota === nota ? "default" : "outline"}
                      onClick={() => setFeedbackData({...feedbackData, nota})}
                    >
                      {nota}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Comentários sobre a sessão</Label>
                <Textarea
                  value={feedbackData.comentario}
                  onChange={(e) => setFeedbackData({...feedbackData, comentario: e.target.value})}
                  placeholder="Como foi sua experiência na sessão?"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Dificuldades encontradas</Label>
                <Textarea
                  value={feedbackData.dificuldades}
                  onChange={(e) => setFeedbackData({...feedbackData, dificuldades: e.target.value})}
                  placeholder="Houve alguma dificuldade durante a sessão?"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Sugestões de melhoria</Label>
                <Textarea
                  value={feedbackData.sugestoes}
                  onChange={(e) => setFeedbackData({...feedbackData, sugestoes: e.target.value})}
                  placeholder="Como podemos melhorar?"
                  className="mt-1"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Enviar Feedback
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowFeedbackDialog(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog de Reagendamento */}
        <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Reagendamento</DialogTitle>
              <DialogDescription>
                Preencha os dados para solicitar o reagendamento da sessão
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitReschedule} className="space-y-4">
              <div>
                <Label>Motivo do reagendamento</Label>
                <Textarea
                  value={rescheduleData.motivo}
                  onChange={(e) => setRescheduleData({...rescheduleData, motivo: e.target.value})}
                  placeholder="Explique o motivo do reagendamento"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Data preferida</Label>
                  <Input
                    type="date"
                    value={rescheduleData.data_preferida}
                    onChange={(e) => setRescheduleData({...rescheduleData, data_preferida: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Horário preferido</Label>
                  <Input
                    type="time"
                    value={rescheduleData.horario_preferido}
                    onChange={(e) => setRescheduleData({...rescheduleData, horario_preferido: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label>Observações adicionais</Label>
                <Textarea
                  value={rescheduleData.observacoes}
                  onChange={(e) => setRescheduleData({...rescheduleData, observacoes: e.target.value})}
                  placeholder="Informações adicionais (opcional)"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Enviar Solicitação
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowRescheduleDialog(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog de Nova Solicitação */}
        <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Nova Sessão</DialogTitle>
              <DialogDescription>
                Preencha os dados para solicitar uma nova sessão
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <Label>Tipo de sessão</Label>
                <Select value={requestData.tipo_sessao} onValueChange={(value) => setRequestData({...requestData, tipo_sessao: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de sessão" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposSessao.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Motivo da solicitação</Label>
                <Textarea
                  value={requestData.motivo}
                  onChange={(e) => setRequestData({...requestData, motivo: e.target.value})}
                  placeholder="Explique o motivo da solicitação"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Data preferida</Label>
                  <Input
                    type="date"
                    value={requestData.data_preferida}
                    onChange={(e) => setRequestData({...requestData, data_preferida: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Horário preferido</Label>
                  <Input
                    type="time"
                    value={requestData.horario_preferido}
                    onChange={(e) => setRequestData({...requestData, horario_preferido: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Modalidade</Label>
                  <Select value={requestData.modalidade} onValueChange={(value) => setRequestData({...requestData, modalidade: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="ambos">Sem preferência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Urgência</Label>
                  <Select value={requestData.urgencia} onValueChange={(value) => setRequestData({...requestData, urgencia: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Enviar Solicitação
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowRequestDialog(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PacienteSessoes;
