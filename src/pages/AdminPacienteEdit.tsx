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

  // Estados dos formulários
  const [formSessao, setFormSessao] = useState({
    nome: "",
    data: "",
    horario: "",
    link_reuniao: "",
    observacoes: ""
  });

  const [formQuestionario, setFormQuestionario] = useState({
    questionario_id: "",
    link_paciente: ""
  });

  const [formPagamento, setFormPagamento] = useState({
    descricao: "",
    valor: "",
    data_vencimento: ""
  });

  // Lista de questionários disponíveis
  const questionariosDisponiveis = [
    { id: 1, nome: "Formulário Inicial", tipo: "Formulário" },
    { id: 2, nome: "Escala SRS-2", tipo: "Escala" },
    { id: 3, nome: "BDEFS", tipo: "Escala" },
    { id: 4, nome: "WISC-V", tipo: "Teste Neuropsicológico" },
    { id: 5, nome: "TEA-Ch", tipo: "Teste Neuropsicológico" },
    { id: 6, nome: "Inventário Beck de Ansiedade", tipo: "Inventário" }
  ];

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

  const handleAddSessao = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novaSessao = {
      id: sessoesPlanejadas.length + 1,
      nome: formSessao.nome,
      data: formSessao.data,
      horario: formSessao.horario,
      status: "agendada",
      link_reuniao: formSessao.link_reuniao,
      observacoes: formSessao.observacoes
    };

    setSessoesPlanejadas([...sessoesPlanejadas, novaSessao]);
    setFormSessao({ nome: "", data: "", horario: "", link_reuniao: "", observacoes: "" });
    setShowAddSessao(false);
    
    toast({
      title: "Sessão adicionada",
      description: "Nova sessão foi planejada com sucesso.",
    });
  };

  const handleAddQuestionario = (e: React.FormEvent) => {
    e.preventDefault();
    
    const questionarioSelecionado = questionariosDisponiveis.find(
      q => q.id.toString() === formQuestionario.questionario_id
    );
    
    if (!questionarioSelecionado) return;

    const novoQuestionario = {
      id: questionariosAtribuidos.length + 1,
      nome: questionarioSelecionado.nome,
      link_paciente: formQuestionario.link_paciente,
      status: "pendente",
      data_conclusao: null
    };

    setQuestionariosAtribuidos([...questionariosAtribuidos, novoQuestionario]);
    setFormQuestionario({ questionario_id: "", link_paciente: "" });
    setShowAddQuestionario(false);
    
    toast({
      title: "Questionário atribuído",
      description: "Questionário foi atribuído ao paciente com sucesso.",
    });
  };

  const handleAddPagamento = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoPagamento = {
      id: pagamentos.length + 1,
      descricao: formPagamento.descricao,
      valor: parseFloat(formPagamento.valor),
      data_vencimento: formPagamento.data_vencimento,
      status: "pendente",
      data_pagamento: null
    };

    setPagamentos([...pagamentos, novoPagamento]);
    setFormPagamento({ descricao: "", valor: "", data_vencimento: "" });
    setShowAddPagamento(false);
    
    toast({
      title: "Pagamento adicionado",
      description: "Nova cobrança foi criada com sucesso.",
    });
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
            <TabsTrigger value="questionarios">Testes e Questionários</TabsTrigger>
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
                {showAddSessao && (
                  <Card className="mb-6 border-blue-100">
                    <CardHeader>
                      <CardTitle>Nova Sessão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddSessao} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nome-sessao">Nome da Sessão</Label>
                            <Input
                              id="nome-sessao"
                              value={formSessao.nome}
                              onChange={(e) => setFormSessao({...formSessao, nome: e.target.value})}
                              placeholder="Ex: Avaliação WISC-V"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="data-sessao">Data</Label>
                            <Input
                              id="data-sessao"
                              type="date"
                              value={formSessao.data}
                              onChange={(e) => setFormSessao({...formSessao, data: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="horario-sessao">Horário</Label>
                            <Input
                              id="horario-sessao"
                              type="time"
                              value={formSessao.horario}
                              onChange={(e) => setFormSessao({...formSessao, horario: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="link-sessao">Link da Reunião</Label>
                            <Input
                              id="link-sessao"
                              type="url"
                              value={formSessao.link_reuniao}
                              onChange={(e) => setFormSessao({...formSessao, link_reuniao: e.target.value})}
                              placeholder="https://meet.google.com/..."
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="observacoes-sessao">Observações</Label>
                          <Textarea
                            id="observacoes-sessao"
                            value={formSessao.observacoes}
                            onChange={(e) => setFormSessao({...formSessao, observacoes: e.target.value})}
                            placeholder="Observações sobre a sessão..."
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            Adicionar Sessão
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowAddSessao(false)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

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
                      Testes e Questionários Atribuídos
                    </CardTitle>
                    <CardDescription>
                      Testes neuropsicológicos, questionários, formulários e escalas do paciente
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddQuestionario(!showAddQuestionario)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Atribuir Teste/Questionário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddQuestionario && (
                  <Card className="mb-6 border-purple-100">
                    <CardHeader>
                      <CardTitle>Atribuir Teste/Questionário</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddQuestionario} className="space-y-4">
                        <div>
                          <Label htmlFor="questionario-select">Questionário</Label>
                          <Select value={formQuestionario.questionario_id} onValueChange={(value) => setFormQuestionario({...formQuestionario, questionario_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um questionário" />
                            </SelectTrigger>
                            <SelectContent>
                              {questionariosDisponiveis.map((questionario) => (
                                <SelectItem key={questionario.id} value={questionario.id.toString()}>
                                  {questionario.nome} ({questionario.tipo})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="link-questionario">Link de Acesso do Paciente</Label>
                          <Input
                            id="link-questionario"
                            type="url"
                            value={formQuestionario.link_paciente}
                            onChange={(e) => setFormQuestionario({...formQuestionario, link_paciente: e.target.value})}
                            placeholder="https://forms.google.com/..."
                            required
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                            Atribuir Teste/Questionário
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowAddQuestionario(false)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

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
                {showAddPagamento && (
                  <Card className="mb-6 border-green-100">
                    <CardHeader>
                      <CardTitle>Nova Cobrança</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddPagamento} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="descricao-pagamento">Descrição</Label>
                            <Input
                              id="descricao-pagamento"
                              value={formPagamento.descricao}
                              onChange={(e) => setFormPagamento({...formPagamento, descricao: e.target.value})}
                              placeholder="Ex: Avaliação Neuropsicológica"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="valor-pagamento">Valor (R$)</Label>
                            <Input
                              id="valor-pagamento"
                              type="number"
                              step="0.01"
                              value={formPagamento.valor}
                              onChange={(e) => setFormPagamento({...formPagamento, valor: e.target.value})}
                              placeholder="250.00"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="vencimento-pagamento">Data de Vencimento</Label>
                            <Input
                              id="vencimento-pagamento"
                              type="date"
                              value={formPagamento.data_vencimento}
                              onChange={(e) => setFormPagamento({...formPagamento, data_vencimento: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            Adicionar Cobrança
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowAddPagamento(false)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

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
