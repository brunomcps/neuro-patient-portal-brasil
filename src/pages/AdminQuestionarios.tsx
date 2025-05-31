
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
  FileText, 
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Users,
  Link as LinkIcon
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const AdminQuestionarios = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedQuestionario, setSelectedQuestionario] = useState<any>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    estimativa_tempo: ""
  });
  const [assignData, setAssignData] = useState({
    paciente_id: "",
    link_acesso: ""
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

  // Dados de demonstração
  const questionarios = [
    {
      id: 1,
      titulo: "Formulário Inicial",
      descricao: "Coleta de informações básicas do paciente",
      tipo: "Formulário",
      estimativa_tempo: "15 min",
      criado_em: "2024-01-15"
    },
    {
      id: 2,
      titulo: "Escala SRS-2",
      descricao: "Escala de Responsividade Social - 2ª Edição",
      tipo: "Escala",
      estimativa_tempo: "20 min",
      criado_em: "2024-01-10"
    },
    {
      id: 3,
      titulo: "BDEFS",
      descricao: "Barkley Deficits in Executive Functioning Scale",
      tipo: "Escala",
      estimativa_tempo: "25 min",
      criado_em: "2024-01-08"
    },
    {
      id: 4,
      titulo: "WISC-V",
      descricao: "Escala de Inteligência Wechsler para Crianças - 5ª Edição",
      tipo: "Teste Neuropsicológico",
      estimativa_tempo: "90 min",
      criado_em: "2024-01-05"
    },
    {
      id: 5,
      titulo: "TEA-Ch",
      descricao: "Test of Everyday Attention for Children",
      tipo: "Teste Neuropsicológico",
      estimativa_tempo: "45 min",
      criado_em: "2024-01-03"
    },
    {
      id: 6,
      titulo: "Inventário Beck de Ansiedade",
      descricao: "Avaliação dos sintomas de ansiedade",
      tipo: "Inventário",
      estimativa_tempo: "10 min",
      criado_em: "2024-01-01"
    }
  ];

  const pacientes = [
    { id: 1, nome: "Maria Silva", email: "maria@email.com" },
    { id: 2, nome: "João Santos", email: "joao@email.com" },
    { id: 3, nome: "Ana Costa", email: "ana@email.com" },
    { id: 4, nome: "Pedro Oliveira", email: "pedro@email.com" }
  ];

  const filteredQuestionarios = questionarios.filter(questionario =>
    questionario.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    questionario.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuestionario = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Questionário adicionado",
      description: `${formData.titulo} foi adicionado com sucesso.`,
    });
    setFormData({ titulo: "", descricao: "", tipo: "", estimativa_tempo: "" });
    setShowAddForm(false);
  };

  const handleAssignQuestionario = (e: React.FormEvent) => {
    e.preventDefault();
    const paciente = pacientes.find(p => p.id === parseInt(assignData.paciente_id));
    toast({
      title: "Questionário atribuído",
      description: `${selectedQuestionario?.titulo} foi atribuído para ${paciente?.nome}.`,
    });
    setAssignData({ paciente_id: "", link_acesso: "" });
    setShowAssignForm(false);
    setSelectedQuestionario(null);
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Editar questionário",
      description: `Funcionalidade de edição será implementada.`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Questionário removido",
      description: "Questionário foi removido do sistema.",
      variant: "destructive"
    });
  };

  const openAssignDialog = (questionario: any) => {
    setSelectedQuestionario(questionario);
    setShowAssignForm(true);
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
              <h1 className="text-3xl font-bold text-gray-800">Gerenciar Testes e Questionários</h1>
              <p className="text-gray-600">Gerencie formulários, escalas, testes neuropsicológicos e questionários para os pacientes</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Teste/Questionário
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8 border-blue-100">
            <CardHeader>
              <CardTitle>Adicionar Novo Teste/Questionário</CardTitle>
              <CardDescription>
                Crie um novo formulário, escala, teste neuropsicológico ou questionário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddQuestionario} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Formulário">Formulário</SelectItem>
                        <SelectItem value="Escala">Escala</SelectItem>
                        <SelectItem value="Teste Neuropsicológico">Teste Neuropsicológico</SelectItem>
                        <SelectItem value="Questionário">Questionário</SelectItem>
                        <SelectItem value="Inventário">Inventário</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <Label htmlFor="estimativa_tempo">Estimativa de Tempo</Label>
                  <Input
                    id="estimativa_tempo"
                    placeholder="Ex: 20 min"
                    value={formData.estimativa_tempo}
                    onChange={(e) => setFormData({...formData, estimativa_tempo: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Adicionar Teste/Questionário
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

        <Card className="border-blue-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Lista de Testes e Questionários
              </CardTitle>
              <div className="relative w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar testes e questionários..."
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
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tempo Estimado</TableHead>
                  <TableHead>Data Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestionarios.map((questionario) => (
                  <TableRow key={questionario.id}>
                    <TableCell className="font-medium">{questionario.titulo}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={
                          questionario.tipo === "Formulário" 
                            ? "bg-blue-100 text-blue-800" 
                            : questionario.tipo === "Escala"
                            ? "bg-green-100 text-green-800"
                            : questionario.tipo === "Teste Neuropsicológico"
                            ? "bg-purple-100 text-purple-800"
                            : questionario.tipo === "Inventário"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {questionario.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{questionario.descricao}</TableCell>
                    <TableCell>{questionario.estimativa_tempo}</TableCell>
                    <TableCell>{questionario.criado_em}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(questionario.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openAssignDialog(questionario)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(questionario.id)}
                          className="text-red-600 hover:text-red-700"
                        >
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

        <Dialog open={showAssignForm} onOpenChange={setShowAssignForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atribuir Questionário</DialogTitle>
              <DialogDescription>
                Atribua o questionário "{selectedQuestionario?.titulo}" para um paciente
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAssignQuestionario} className="space-y-4">
              <div>
                <Label htmlFor="paciente">Paciente</Label>
                <Select value={assignData.paciente_id} onValueChange={(value) => setAssignData({...assignData, paciente_id: value})}>
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
                <Label htmlFor="link_acesso">Link de Acesso</Label>
                <Input
                  id="link_acesso"
                  placeholder="https://forms.google.com/..."
                  value={assignData.link_acesso}
                  onChange={(e) => setAssignData({...assignData, link_acesso: e.target.value})}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Atribuir Questionário
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAssignForm(false)}
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

export default AdminQuestionarios;
