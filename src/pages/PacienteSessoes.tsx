
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
  DialogTrigger,
} from "@/components/ui/dialog";
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
  ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const PacienteSessoes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedSessao, setSelectedSessao] = useState<any>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    nota: 5,
    comentario: "",
    dificuldades: "",
    sugestoes: ""
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
      feedback_enviado: true
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
      feedback_enviado: false
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
      link: "https://meet.google.com/abc-defg-hij"
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
      endereco: "Av. Ataulfo de Paiva, 456 - Leblon, Rio de Janeiro - RJ"
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
      endereco: "Rua Barata Ribeiro, 123 - Copacabana, Rio de Janeiro - RJ"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluida":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "agendada":
        return <Calendar className="h-5 w-5 text-blue-600" />;
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
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "concluida":
        return "Concluída";
      case "agendada":
        return "Agendada";
      default:
        return "Pendente";
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

  const handleVerDetalhes = (sessao: any) => {
    setSelectedSessao(sessao);
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

  const canAccessSession = (sessao: any) => {
    const now = new Date();
    const sessionDate = new Date(sessao.data);
    const thirtyMinutesBefore = new Date(sessionDate.getTime() - 30 * 60000);
    
    return now >= thirtyMinutesBefore && sessao.status === "agendada";
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
              <h1 className="text-3xl font-bold text-gray-800">Minhas Sessões</h1>
              <p className="text-gray-600">Gerencie suas sessões de avaliação neuropsicológica</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {sessoes.map((sessao) => (
            <Card key={sessao.id} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(sessao.status)}
                      <h3 className="text-xl font-semibold text-gray-800">{sessao.nome}</h3>
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
        </div>

        {/* Dialog de Detalhes */}
        <Dialog open={!!selectedSessao && !showFeedbackDialog} onOpenChange={() => setSelectedSessao(null)}>
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
      </div>
    </div>
  );
};

export default PacienteSessoes;
