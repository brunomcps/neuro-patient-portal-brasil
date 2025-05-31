
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Users,
  Clock,
  FileText
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const AdminSessoes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [selectedSessao, setSelectedSessao] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    orientacoes: "",
    responsavel: "",
    duracao_estimada: "",
    tipo: "",
    testes_selecionados: [] as number[],
    testes_visiveis_paciente: true
  });
  const [planData, setPlanData] = useState({
    paciente_id: "",
    sessoes_selecionadas: [] as number[]
  });

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

  // Dados de demonstração - sessões pré-definidas e personalizadas
  const sessoes = [
    {
      id: 1,
      nome: "Sessão Inicial",
      descricao: "Primeira sessão de avaliação e coleta de informações",
      orientacoes: "Trazer documentos pessoais e relatórios médicos",
      responsavel: "Dr. João Silva",
      duracao_estimada: "60 min",
      tipo: "Pré-definida",
      criado_em: "2024-01-01"
    },
    {
      id: 2,
      nome: "Sessão de Testes Cognitivos",
      descricao: "Aplicação de testes neuropsicológicos",
      orientacoes: "Dormir bem na noite anterior e evitar cafeína",
      responsavel: "Dra. Maria Santos",
      duracao_estimada: "90 min",
      tipo: "Pré-definida",
      criado_em: "2024-01-01"
    },
    {
      id: 3,
      nome: "Sessão de Avaliação Comportamental",
      descricao: "Observação e análise comportamental",
      orientacoes: "Comparecer com acompanhante se necessário",
      responsavel: "Dr. João Silva",
      duracao_estimada: "75 min",
      tipo: "Pré-definida",
      criado_em: "2024-01-01"
    },
    {
      id: 4,
      nome: "Sessão de Revisão",
      descricao: "Revisão dos resultados e esclarecimentos",
      orientacoes: "Preparar dúvidas para discussão",
      responsavel: "Dra. Maria Santos",
      duracao_estimada: "45 min",
      tipo: "Pré-definida",
      criado_em: "2024-01-01"
    },
    {
      id: 5,
      nome: "Sessão de Alinhamento Diagnóstico",
      descricao: "Apresentação e discussão do diagnóstico",
      orientacoes: "Trazer acompanhante para apoio emocional",
      responsavel: "Dr. João Silva",
      duracao_estimada: "60 min",
      tipo: "Pré-definida",
      criado_em: "2024-01-01"
    },
    {
      id: 6,
      nome: "Avaliação TDAH Especializada",
      descricao: "Sessão focada em avaliação de TDAH",
      orientacoes: "Trazer relatórios escolares e médicos",
      responsavel: "Dr. Pedro Costa",
      duracao_estimada: "120 min",
      tipo: "Personalizada",
      criado_em: "2024-01-15"
    }
  ];

  const pacientes = [
    { id: 1, nome: "Maria Silva", email: "maria@email.com" },
    { id: 2, nome: "João Santos", email: "joao@email.com" },
    { id: 3, nome: "Ana Costa", email: "ana@email.com" },
    { id: 4, nome: "Pedro Oliveira", email: "pedro@email.com" }
  ];

  const testesDisponiveis = [
    { id: 1, nome: "Formulário Inicial", tipo: "Formulário", tempo: "15 min" },
    { id: 2, nome: "Escala SRS-2", tipo: "Escala", tempo: "20 min" },
    { id: 3, nome: "BDEFS", tipo: "Escala", tempo: "25 min" },
    { id: 4, nome: "WISC-V", tipo: "Teste Neuropsicológico", tempo: "90 min" },
    { id: 5, nome: "TEA-Ch", tipo: "Teste Neuropsicológico", tempo: "45 min" },
    { id: 6, nome: "Inventário Beck de Ansiedade", tipo: "Inventário", tempo: "10 min" }
  ];

  const filteredSessoes = sessoes.filter(sessao =>
    sessao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sessao.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSessao = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sessão criada",
      description: `${formData.nome} foi criada com sucesso.`,
    });
    setFormData({ nome: "", descricao: "", orientacoes: "", responsavel: "", duracao_estimada: "", tipo: "", testes_selecionados: [], testes_visiveis_paciente: true });
    setShowAddForm(false);
  };

  const handlePlanSessoes = (e: React.FormEvent) => {
    e.preventDefault();
    const paciente = pacientes.find(p => p.id === parseInt(planData.paciente_id));
    toast({
      title: "Sessões planejadas",
      description: `${planData.sessoes_selecionadas.length} sessões foram planejadas para ${paciente?.nome}.`,
    });
    setPlanData({ paciente_id: "", sessoes_selecionadas: [] });
    setShowPlanForm(false);
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Editar sessão",
      description: `Funcionalidade de edição será implementada.`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Sessão removida",
      description: "Sessão foi removida do sistema.",
      variant: "destructive"
    });
  };

  const toggleSessaoSelection = (sessaoId: number) => {
    setPlanData(prev => ({
      ...prev,
      sessoes_selecionadas: prev.sessoes_selecionadas.includes(sessaoId)
        ? prev.sessoes_selecionadas.filter(id => id !== sessaoId)
        : [...prev.sessoes_selecionadas, sessaoId]
    }));
  };

  const toggleTesteSelection = (testeId: number) => {
    setFormData(prev => ({
      ...prev,
      testes_selecionados: prev.testes_selecionados.includes(testeId)
        ? prev.testes_selecionados.filter(id => id !== testeId)
        : [...prev.testes_selecionados, testeId]
    }));
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
              onClick={() => navigate("/admin")}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gerenciar Sessões</h1>
              <p className="text-gray-600">Gerencie sessões de avaliação e planeje para pacientes</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => setShowPlanForm(!showPlanForm)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Planejar Sessões
            </Button>
            <Button 
              onClick={() => navigate("/admin/questionarios")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Atribuir Testes Independentes
            </Button>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Sessão
            </Button>
          </div>
        </div>

        {showAddForm && (
          <Card className="mb-8 border-blue-100">
            <CardHeader>
              <CardTitle>Criar Nova Sessão</CardTitle>
              <CardDescription>
                Crie uma sessão personalizada de avaliação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSessao} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome da Sessão</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Input
                      id="responsavel"
                      value={formData.responsavel}
                      onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="orientacoes">Orientações para o Paciente</Label>
                  <Textarea
                    id="orientacoes"
                    value={formData.orientacoes}
                    onChange={(e) => setFormData({...formData, orientacoes: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="duracao_estimada">Duração Estimada</Label>
                  <Input
                    id="duracao_estimada"
                    placeholder="Ex: 90 min"
                    value={formData.duracao_estimada}
                    onChange={(e) => setFormData({...formData, duracao_estimada: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Testes e Questionários para esta Sessão</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-4">
                    {testesDisponiveis.map((teste) => (
                      <div key={teste.id} className="flex items-center space-x-3 p-2 border rounded">
                        <input
                          type="checkbox"
                          id={`teste-${teste.id}`}
                          checked={formData.testes_selecionados.includes(teste.id)}
                          onChange={() => toggleTesteSelection(teste.id)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`teste-${teste.id}`} className="flex-1 cursor-pointer">
                          <div className="font-medium">{teste.nome}</div>
                          <div className="text-sm text-gray-600">{teste.tipo} • {teste.tempo}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="testes_visiveis"
                    checked={formData.testes_visiveis_paciente}
                    onChange={(e) => setFormData({...formData, testes_visiveis_paciente: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="testes_visiveis" className="text-sm">
                    Testes visíveis para o paciente antes da sessão
                  </Label>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Criar Sessão
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="border-blue-100 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Lista de Sessões
              </CardTitle>
              <div className="relative w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar sessões..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessoes.map((sessao) => (
                  <TableRow key={sessao.id}>
                    <TableCell className="font-medium">{sessao.nome}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={
                          sessao.tipo === "Pré-definida" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-purple-100 text-purple-800"
                        }
                      >
                        {sessao.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>{sessao.responsavel}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {sessao.duracao_estimada}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{sessao.descricao}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(sessao.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {sessao.tipo === "Personalizada" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDelete(sessao.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={showPlanForm} onOpenChange={setShowPlanForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Planejar Sessões para Paciente</DialogTitle>
              <DialogDescription>
                Selecione as sessões que serão realizadas com o paciente
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePlanSessoes} className="space-y-4">
              <div>
                <Label htmlFor="paciente">Paciente</Label>
                <Select value={planData.paciente_id} onValueChange={(value) => setPlanData({...planData, paciente_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {pacientes.map((paciente) => (
                      <SelectItem key={paciente.id} value={paciente.id.toString()}>
                        {paciente.nome} ({paciente.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sessões Disponíveis</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-4">
                  {sessoes.map((sessao) => (
                    <div key={sessao.id} className="flex items-center space-x-3 p-2 border rounded">
                      <input
                        type="checkbox"
                        id={`sessao-${sessao.id}`}
                        checked={planData.sessoes_selecionadas.includes(sessao.id)}
                        onChange={() => toggleSessaoSelection(sessao.id)}
                        className="h-4 w-4"
                      />
                      <label htmlFor={`sessao-${sessao.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{sessao.nome}</div>
                        <div className="text-sm text-gray-600">{sessao.descricao}</div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {sessao.duracao_estimada} • {sessao.responsavel}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Planejar Sessões ({planData.sessoes_selecionadas.length})
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowPlanForm(false)}
                >
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

export default AdminSessoes;
