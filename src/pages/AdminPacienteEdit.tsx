
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  ArrowLeft,
  Save,
  Calendar,
  ClipboardList,
  FileText,
  DollarSign,
  Link,
  Upload,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const AdminPacienteEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Estado dos dados do paciente
  const [pacienteData, setPacienteData] = useState({
    nome: "Maria Silva",
    email: "maria@email.com",
    telefone: "(11) 99999-1111",
    dataNascimento: "1985-03-15",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    contato_emergencia: "João Silva - (11) 88888-1111",
    observacoes: "Paciente com histórico de ansiedade. Prefere horários matutinos."
  });

  // Sessões planejadas para o paciente
  const [sessoesPlanejadas, setSessoesPlanejadas] = useState([
    {
      id: 1,
      nome: "Sessão Inicial",
      data: "2024-01-10",
      horario: "14:00",
      status: "concluida",
      link_reuniao: "https://meet.google.com/abc-1",
      observacoes: "Sessão realizada com sucesso."
    },
    {
      id: 2,
      nome: "Avaliação Cognitiva",
      data: "2024-01-17",
      horario: "14:00",
      status: "concluida",
      link_reuniao: "https://meet.google.com/abc-2",
      observacoes: "Paciente colaborativo."
    },
    {
      id: 3,
      nome: "Testes Específicos",
      data: "2024-02-15",
      horario: "14:00",
      status: "agendada",
      link_reuniao: "https://meet.google.com/abc-3",
      observacoes: ""
    }
  ]);

  // Questionários atribuídos
  const [questionariosAtribuidos, setQuestionariosAtribuidos] = useState([
    {
      id: 1,
      nome: "Formulário Inicial",
      link_paciente: "https://forms.google.com/inicial-123",
      status: "concluido",
      data_conclusao: "2024-01-08"
    },
    {
      id: 2,
      nome: "Escala SRS-2",
      link_paciente: "https://forms.google.com/srs2-456",
      status: "concluido",
      data_conclusao: "2024-01-12"
    },
    {
      id: 3,
      nome: "BDEFS",
      link_paciente: "https://forms.google.com/bdefs-789",
      status: "pendente",
      data_conclusao: null
    }
  ]);

  // Pagamentos
  const [pagamentos, setPagamentos] = useState([
    {
      id: 1,
      descricao: "Sessão Inicial",
      valor: 250.00,
      data_vencimento: "2024-01-10",
      status: "pago",
      data_pagamento: "2024-01-09"
    },
    {
      id: 2,
      descricao: "Avaliação Cognitiva",
      valor: 250.00,
      data_vencimento: "2024-01-17",
      status: "pago",
      data_pagamento: "2024-01-16"
    },
    {
      id: 3,
      descricao: "Testes Específicos",
      valor: 250.00,
      data_vencimento: "2024-02-15",
      status: "pendente",
      data_pagamento: null
    }
  ]);

  // Estado para formulários
  const [showAddSessao, setShowAddSessao] = useState(false);
  const [showAddQuestionario, setShowAddQuestionario] = useState(false);
  const [showAddPagamento, setShowAddPagamento] = useState(false);
  const [laudoFile, setLaudoFile] = useState<File | null>(null);

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

  const handleSavePaciente = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dados salvos",
        description: "Informações do paciente atualizadas com sucesso.",
      });
    }, 1000);
  };

  const handleUploadLaudo = () => {
    if (!laudoFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo para upload.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Laudo enviado",
      description: "Laudo do paciente foi carregado com sucesso.",
    });
    setLaudoFile(null);
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      concluida: { class: "bg-green-100 text-green-800", text: "Concluída" },
      agendada: { class: "bg-blue-100 text-blue-800", text: "Agendada" },
      cancelada: { class: "bg-red-100 text-red-800", text: "Cancelada" },
      concluido: { class: "bg-green-100 text-green-800", text: "Concluído" },
      pendente: { class: "bg-orange-100 text-orange-800", text: "Pendente" },
      pago: { class: "bg-green-100 text-green-800", text: "Pago" },
      atrasado: { class: "bg-red-100 text-red-800", text: "Atrasado" }
    };
    
    const config = configs[status as keyof typeof configs] || { class: "bg-gray-100 text-gray-800", text: status };
    return <Badge className={config.class}>{config.text}</Badge>;
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
              onClick={() => navigate("/admin/pacientes")}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar à Lista
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <User className="h-8 w-8 mr-3 text-blue-600" />
                {pacienteData.nome}
              </h1>
              <p className="text-gray-600">Gerenciamento completo do paciente</p>
            </div>
          </div>
          <Button 
            onClick={handleSavePaciente}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <Tabs defaultValue="dados" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="sessoes">Sessões</TabsTrigger>
            <TabsTrigger value="questionarios">Questionários</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
            <TabsTrigger value="laudo">Laudo</TabsTrigger>
          </TabsList>

          {/* Dados Pessoais */}
          <TabsContent value="dados">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Dados básicos e de contato do paciente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={pacienteData.nome}
                      onChange={(e) => setPacienteData({...pacienteData, nome: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={pacienteData.email}
                      onChange={(e) => setPacienteData({...pacienteData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={pacienteData.telefone}
                      onChange={(e) => setPacienteData({...pacienteData, telefone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={pacienteData.dataNascimento}
                      onChange={(e) => setPacienteData({...pacienteData, dataNascimento: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={pacienteData.endereco}
                    onChange={(e) => setPacienteData({...pacienteData, endereco: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contato_emergencia">Contato de Emergência</Label>
                  <Input
                    id="contato_emergencia"
                    value={pacienteData.contato_emergencia}
                    onChange={(e) => setPacienteData({...pacienteData, contato_emergencia: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={pacienteData.observacoes}
                    onChange={(e) => setPacienteData({...pacienteData, observacoes: e.target.value})}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessões */}
          <TabsContent value="sessoes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Sessões Planejadas
                    </CardTitle>
                    <CardDescription>
                      Gerencie as sessões de avaliação do paciente
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddSessao(!showAddSessao)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Sessão
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sessão</TableHead>
                      <TableHead>Data/Horário</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Link da Reunião</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessoesPlanejadas.map((sessao) => (
                      <TableRow key={sessao.id}>
                        <TableCell className="font-medium">{sessao.nome}</TableCell>
                        <TableCell>
                          {new Date(sessao.data).toLocaleDateString('pt-BR')} às {sessao.horario}
                        </TableCell>
                        <TableCell>{getStatusBadge(sessao.status)}</TableCell>
                        <TableCell>
                          {sessao.link_reuniao && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={sessao.link_reuniao} target="_blank" rel="noopener noreferrer">
                                <Link className="h-4 w-4 mr-1" />
                                Acessar
                              </a>
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questionários */}
          <TabsContent value="questionarios">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <ClipboardList className="h-5 w-5 mr-2 text-purple-600" />
                      Questionários Atribuídos
                    </CardTitle>
                    <CardDescription>
                      Questionários, formulários e escalas do paciente
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddQuestionario(!showAddQuestionario)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Atribuir Questionário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Questionário</TableHead>
                      <TableHead>Link do Paciente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data Conclusão</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questionariosAtribuidos.map((questionario) => (
                      <TableRow key={questionario.id}>
                        <TableCell className="font-medium">{questionario.nome}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" asChild>
                            <a href={questionario.link_paciente} target="_blank" rel="noopener noreferrer">
                              <Link className="h-4 w-4 mr-1" />
                              Acessar Link
                            </a>
                          </Button>
                        </TableCell>
                        <TableCell>{getStatusBadge(questionario.status)}</TableCell>
                        <TableCell>
                          {questionario.data_conclusao 
                            ? new Date(questionario.data_conclusao).toLocaleDateString('pt-BR')
                            : "-"
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pagamentos */}
          <TabsContent value="pagamentos">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                      Controle de Pagamentos
                    </CardTitle>
                    <CardDescription>
                      Gerencie pagamentos e consultas do paciente
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddPagamento(!showAddPagamento)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Pagamento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data Pagamento</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagamentos.map((pagamento) => (
                      <TableRow key={pagamento.id}>
                        <TableCell className="font-medium">{pagamento.descricao}</TableCell>
                        <TableCell>R$ {pagamento.valor.toFixed(2)}</TableCell>
                        <TableCell>
                          {new Date(pagamento.data_vencimento).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>{getStatusBadge(pagamento.status)}</TableCell>
                        <TableCell>
                          {pagamento.data_pagamento 
                            ? new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')
                            : "-"
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {pagamento.status === "pendente" && (
                              <Button size="sm" variant="outline" className="text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Marcar Pago
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Laudo */}
          <TabsContent value="laudo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-600" />
                  Relatório Final (Laudo)
                </CardTitle>
                <CardDescription>
                  Upload e gerenciamento do laudo neuropsicológico
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setLaudoFile(e.target.files?.[0] || null)}
                        className="max-w-sm mx-auto"
                      />
                    </div>
                    <Button onClick={handleUploadLaudo} disabled={!laudoFile}>
                      <Upload className="h-4 w-4 mr-2" />
                      Enviar Laudo
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Aceita apenas arquivos PDF. Tamanho máximo: 10MB
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Laudos Anteriores</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">laudo_maria_silva_2024.pdf</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Visualizar
                        </Button>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPacienteEdit;
