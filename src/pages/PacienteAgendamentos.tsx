
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Edit,
  X,
  CheckCircle,
  AlertTriangle,
  Plus
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const PacienteAgendamentos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<any>(null);
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

  const agendamentos = [
    {
      id: 1,
      tipo: "Testes Específicos",
      profissional: "Dra. Gabrielly La-Cava",
      data: "2024-02-15T14:00:00",
      status: "confirmado",
      local: "online",
      link: "https://meet.google.com/abc-defg-hij",
      observacoes: "Aplicação de testes específicos baseados nas hipóteses diagnósticas.",
      pode_reagendar: true,
      prazo_reagendamento: "2024-02-13T14:00:00"
    },
    {
      id: 2,
      tipo: "Avaliação Comportamental",
      profissional: "Dr. Carlos Mendes",
      data: "2024-02-22T14:00:00",
      status: "confirmado",
      local: "leblon",
      endereco: "Av. Ataulfo de Paiva, 456 - Leblon, Rio de Janeiro - RJ",
      observacoes: "Sessão com duração estendida para observação comportamental.",
      pode_reagendar: true,
      prazo_reagendamento: "2024-02-20T14:00:00"
    },
    {
      id: 3,
      tipo: "Sessão de Alinhamento Diagnóstico",
      profissional: "Dra. Gabrielly La-Cava",
      data: "2024-03-01T14:00:00",
      status: "pendente_confirmacao",
      local: "copacabana",
      endereco: "Rua Barata Ribeiro, 123 - Copacabana, Rio de Janeiro - RJ",
      observacoes: "Aguardando confirmação da disponibilidade do profissional.",
      pode_reagendar: false,
      prazo_reagendamento: null
    },
    {
      id: 4,
      tipo: "Reagendamento Solicitado",
      profissional: "Dra. Gabrielly La-Cava",
      data: "2024-02-08T14:00:00",
      status: "reagendamento_solicitado",
      local: "online",
      observacoes: "Solicitação de reagendamento em análise.",
      pode_reagendar: false,
      prazo_reagendamento: null,
      motivo_reagendamento: "Conflito com compromisso de trabalho"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800";
      case "pendente_confirmacao":
        return "bg-orange-100 text-orange-800";
      case "reagendamento_solicitado":
        return "bg-blue-100 text-blue-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      case "em_analise":
        return "bg-yellow-100 text-yellow-800";
      case "aprovada":
        return "bg-green-100 text-green-800";
      case "rejeitada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado";
      case "pendente_confirmacao":
        return "Pendente Confirmação";
      case "reagendamento_solicitado":
        return "Reagendamento Solicitado";
      case "cancelado":
        return "Cancelado";
      case "em_analise":
        return "Em Análise";
      case "aprovada":
        return "Aprovada";
      case "rejeitada":
        return "Rejeitada";
      default:
        return status;
    }
  };

  const canReschedule = (agendamento: any) => {
    if (!agendamento.pode_reagendar || !agendamento.prazo_reagendamento) return false;
    const now = new Date();
    const deadline = new Date(agendamento.prazo_reagendamento);
    return now < deadline;
  };

  const handleReschedule = (agendamento: any) => {
    setSelectedAgendamento(agendamento);
    setShowRescheduleDialog(true);
  };

  const handleSubmitReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de reagendamento foi enviada e será analisada em breve.",
    });
    setRescheduleData({ motivo: "", data_preferida: "", horario_preferido: "", observacoes: "" });
    setShowRescheduleDialog(false);
    setSelectedAgendamento(null);
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

  const handleCancelReschedule = (id: number) => {
    toast({
      title: "Solicitação cancelada",
      description: "Sua solicitação de reagendamento foi cancelada.",
    });
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
              <h1 className="text-3xl font-bold text-gray-800">Meus Agendamentos</h1>
              <p className="text-gray-600">Gerencie seus agendamentos e solicite novas sessões</p>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Agendamentos Confirmados */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Agendamentos Confirmados
                </CardTitle>
                <CardDescription>
                  Suas próximas sessões agendadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agendamentos.map((agendamento) => (
                  <Card key={agendamento.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">{agendamento.tipo}</h4>
                          <p className="text-sm text-gray-600 flex items-center mb-1">
                            <User className="h-4 w-4 mr-2" />
                            {agendamento.profissional}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            {new Date(agendamento.data).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <div className="flex items-center space-x-2 mb-2">
                            {agendamento.local === "online" ? (
                              <Monitor className="h-4 w-4 text-blue-600" />
                            ) : (
                              <MapPin className="h-4 w-4 text-green-600" />
                            )}
                            <span className="text-sm text-gray-600 capitalize">{agendamento.local}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(agendamento.status)}>
                          {getStatusText(agendamento.status)}
                        </Badge>
                      </div>

                      {agendamento.observacoes && (
                        <p className="text-xs text-gray-500 mb-3">{agendamento.observacoes}</p>
                      )}

                      {agendamento.motivo_reagendamento && (
                        <div className="bg-blue-50 p-2 rounded mb-3">
                          <p className="text-xs font-medium text-blue-800">Motivo do reagendamento:</p>
                          <p className="text-xs text-blue-700">{agendamento.motivo_reagendamento}</p>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {canReschedule(agendamento) && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReschedule(agendamento)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Reagendar
                          </Button>
                        )}

                        {agendamento.status === "reagendamento_solicitado" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleCancelReschedule(agendamento.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancelar Solicitação
                          </Button>
                        )}

                        {agendamento.link && agendamento.status === "confirmado" && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={agendamento.link} target="_blank" rel="noopener noreferrer">
                              <Monitor className="h-4 w-4 mr-2" />
                              Acessar
                            </a>
                          </Button>
                        )}
                      </div>

                      {agendamento.prazo_reagendamento && canReschedule(agendamento) && (
                        <p className="text-xs text-orange-600 mt-2 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Reagendamento até: {new Date(agendamento.prazo_reagendamento).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Solicitações */}
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
                          <Badge className={getStatusColor(solicitacao.status)}>
                            {getStatusText(solicitacao.status)}
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

export default PacienteAgendamentos;
