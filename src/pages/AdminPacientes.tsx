
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const AdminPacientes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: ""
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

  // Dados de demonstração expandidos
  const pacientes = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      telefone: "(11) 99999-1111",
      dataCadastro: "2024-01-15",
      sessoesConcluidas: 2,
      totalSessoes: 5,
      status: "Em andamento"
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@email.com",
      telefone: "(11) 99999-2222",
      dataCadastro: "2024-01-10",
      sessoesConcluidas: 5,
      totalSessoes: 5,
      status: "Concluído"
    },
    {
      id: 3,
      nome: "Ana Costa",
      email: "ana@email.com",
      telefone: "(11) 99999-3333",
      dataCadastro: "2024-01-20",
      sessoesConcluidas: 1,
      totalSessoes: 5,
      status: "Em andamento"
    },
    {
      id: 4,
      nome: "Pedro Oliveira",
      email: "pedro@email.com",
      telefone: "(11) 99999-4444",
      dataCadastro: "2024-01-25",
      sessoesConcluidas: 0,
      totalSessoes: 5,
      status: "Aguardando início"
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPaciente = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Paciente adicionado",
      description: `${formData.nome} foi adicionado com sucesso.`,
    });
    setFormData({ nome: "", email: "", senha: "" });
    setShowAddForm(false);
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Editar paciente",
      description: `Funcionalidade de edição será implementada.`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Paciente removido",
      description: "Paciente foi removido do sistema.",
      variant: "destructive"
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
              onClick={() => navigate("/admin")}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gerenciar Pacientes</h1>
              <p className="text-gray-600">Visualize e gerencie todos os pacientes em avaliação</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8 border-blue-100">
            <CardHeader>
              <CardTitle>Adicionar Novo Paciente</CardTitle>
              <CardDescription>
                Preencha os dados do novo paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPaciente} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="senha">Senha Inicial</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => setFormData({...formData, senha: e.target.value})}
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Adicionar Paciente
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
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Lista de Pacientes
              </CardTitle>
              <div className="relative w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
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
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Data Cadastro</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPacientes.map((paciente) => (
                  <TableRow key={paciente.id}>
                    <TableCell className="font-medium">{paciente.nome}</TableCell>
                    <TableCell>{paciente.email}</TableCell>
                    <TableCell>{paciente.telefone}</TableCell>
                    <TableCell>{paciente.dataCadastro}</TableCell>
                    <TableCell>
                      {paciente.sessoesConcluidas}/{paciente.totalSessoes} sessões
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={paciente.status === "Concluído" ? "default" : "secondary"}
                        className={
                          paciente.status === "Concluído" 
                            ? "bg-green-100 text-green-800" 
                            : paciente.status === "Em andamento"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {paciente.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(paciente.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(paciente.id)}
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
      </div>
    </div>
  );
};

export default AdminPacientes;
