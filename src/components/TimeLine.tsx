
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Clock, Calendar, User, FileText, ExternalLink } from "lucide-react";

interface Sessao {
  id: number;
  nome: string;
  descricao: string;
  orientacoes: string;
  responsavel: string;
  ordem: number;
  status: string;
  data: string;
}

interface TimeLineProps {
  sessoes: Sessao[];
}

const TimeLine = ({ sessoes }: TimeLineProps) => {
  const [selectedSessao, setSelectedSessao] = useState<Sessao | null>(null);

  const getStatusIcon = (status: string) => {
    if (status === "concluido") {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    return <Clock className="h-5 w-5 text-orange-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "concluido") {
      return "bg-green-100 border-green-300";
    }
    return "bg-orange-100 border-orange-300";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="border-blue-100">
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
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {sessao.nome}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(sessao.data)}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {sessao.responsavel}
                          </div>
                        </div>
                        <Badge 
                          variant={sessao.status === "concluido" ? "default" : "secondary"}
                          className={sessao.status === "concluido" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                        >
                          {sessao.status === "concluido" ? "Concluído" : "Pendente"}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedSessao(sessao)}
                            >
                              Leia Mais
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-xl text-gray-800">
                                {sessao.nome}
                              </DialogTitle>
                              <DialogDescription>
                                Etapa {sessao.ordem} da avaliação neuropsicológica
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Descrição
                                </h4>
                                <p className="text-gray-600">{sessao.descricao}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Orientações</h4>
                                <p className="text-gray-600">{sessao.orientacoes}</p>
                              </div>
                              
                              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                                <div>
                                  <h4 className="font-semibold text-gray-800">Responsável</h4>
                                  <p className="text-gray-600">{sessao.responsavel}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">Data</h4>
                                  <p className="text-gray-600">{formatDate(sessao.data)}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">Status</h4>
                                  <Badge 
                                    variant={sessao.status === "concluido" ? "default" : "secondary"}
                                    className={sessao.status === "concluido" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                                  >
                                    {sessao.status === "concluido" ? "Concluído" : "Pendente"}
                                  </Badge>
                                </div>
                              </div>
                              
                              {sessao.status === "pendente" && (
                                <div className="flex space-x-2">
                                  <Button className="flex-1">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Acessar Sessão
                                  </Button>
                                  <Button variant="outline" className="flex-1">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Reagendar
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {sessao.status === "pendente" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Acessar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeLine;
