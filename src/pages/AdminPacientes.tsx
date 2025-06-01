
import { useState, useEffect } from "react";
import { Plus, Search, Eye, Edit, Trash2, User, Phone, Mail, Calendar, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { usePacientes } from "@/hooks/usePacientes";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";

const AdminPacientes = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showViewPatient, setShowViewPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [newPatient, setNewPatient] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  
  const navigate = useNavigate();
  const { data: pacientes, isLoading, error } = usePacientes();

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

  console.log("AdminPacientes - Dados carregados:", { pacientes, isLoading, error });

  const filteredPacientes = pacientes?.filter(paciente =>
    paciente.usuarios?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.usuarios?.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAddPatient = () => {
    // Implementar lógica de adicionar paciente
    console.log("Adicionando paciente:", newPatient);
    setShowAddPatient(false);
    setNewPatient({ nome: "", email: "", senha: "" });
  };

  const handleViewPatient = (paciente: any) => {
    setSelectedPatient(paciente);
    setShowViewPatient(true);
  };

  const getProgressoSessoes = (paciente: any) => {
    // Mock data para demonstração
    const sessoes = Math.floor(Math.random() * 10) + 1;
    const totalSessoes = Math.floor(Math.random() * 15) + 5;
    return `${sessoes}/${totalSessoes} sessões`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Em andamento</Badge>;
      case 'inativo':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Aguardando início</Badge>;
      case 'finalizado':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Concluído</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (error) {
    console.error("Erro ao carregar pacientes:", error);
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Erro ao carregar pacientes: {error.message}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-2"
            variant="outline"
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header user={user} />
      
      <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Pacientes</h1>
          <p className="text-gray-600 mt-1">Visualize e gerencie todos os pacientes em avaliação</p>
        </div>
        
        <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Paciente</DialogTitle>
              <p className="text-sm text-gray-600">Preencha os dados do novo paciente</p>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={newPatient.nome}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Digite o nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Digite o e-mail"
                />
              </div>
              <div>
                <Label htmlFor="senha">Senha Inicial</Label>
                <Input
                  id="senha"
                  type="password"
                  value={newPatient.senha}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, senha: e.target.value }))}
                  placeholder="Digite a senha inicial"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddPatient} className="flex-1 bg-green-600 hover:bg-green-700">
                  Adicionar Paciente
                </Button>
                <Button variant="outline" onClick={() => setShowAddPatient(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Pacientes */}
      <Card>
        <CardHeader className="border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-600 text-sm">👥</span>
              </div>
              <CardTitle className="text-lg">Lista de Pacientes</CardTitle>
            </div>
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : filteredPacientes.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {pacientes?.length === 0 ? "Nenhum paciente cadastrado." : "Nenhum paciente encontrado."}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              {/* Header da tabela */}
              <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                <div>Nome</div>
                <div>E-mail</div>
                <div>Telefone</div>
                <div>Data Cadastro</div>
                <div>Progresso</div>
                <div>Status</div>
                <div>Ações</div>
              </div>
              
              {/* Linhas da tabela */}
              {filteredPacientes.map((paciente) => (
                <div key={paciente.id} className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">
                    {paciente.usuarios?.nome}
                  </div>
                  <div className="text-gray-600">
                    {paciente.usuarios?.email}
                  </div>
                  <div className="text-gray-600">
                    {paciente.usuarios?.telefone || '(11) 99999-1111'}
                  </div>
                  <div className="text-gray-600">
                    {paciente.created_at 
                      ? new Date(paciente.created_at).toLocaleDateString('pt-BR')
                      : '2024-01-15'
                    }
                  </div>
                  <div className="text-gray-600">
                    {getProgressoSessoes(paciente)}
                  </div>
                  <div>
                    {getStatusBadge(paciente.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewPatient(paciente)}
                      className="text-gray-600 hover:text-blue-600"
                      title="Visualizar informações"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/pacientes/edit/${paciente.id}`)}
                      className="text-gray-600 hover:text-green-600"
                      title="Editar paciente"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-red-600"
                      title="Excluir paciente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Visualização do Paciente */}
      <Dialog open={showViewPatient} onOpenChange={setShowViewPatient}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedPatient?.usuarios?.nome}</h3>
                <p className="text-sm text-gray-600">Informações do Paciente</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-6">
              {/* Informações Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">E-mail</p>
                      <p className="text-sm text-gray-600">{selectedPatient.usuarios?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Telefone</p>
                      <p className="text-sm text-gray-600">{selectedPatient.usuarios?.telefone || '(11) 99999-1111'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Data de Nascimento</p>
                      <p className="text-sm text-gray-600">
                        {selectedPatient.usuarios?.data_nascimento 
                          ? new Date(selectedPatient.usuarios.data_nascimento).toLocaleDateString('pt-BR')
                          : '15/03/1985'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Endereço</p>
                      <p className="text-sm text-gray-600">{selectedPatient.usuarios?.endereco || 'Não informado'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status e Progresso */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Status do Tratamento</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Status</p>
                    <div className="mt-1">
                      {getStatusBadge(selectedPatient.status)}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Progresso</p>
                    <p className="text-sm text-green-700 mt-1">{getProgressoSessoes(selectedPatient)}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-orange-900">Data Cadastro</p>
                    <p className="text-sm text-orange-700 mt-1">
                      {selectedPatient.created_at 
                        ? new Date(selectedPatient.created_at).toLocaleDateString('pt-BR')
                        : '15/01/2024'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Observações */}
              {selectedPatient.observacoes && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <h4 className="font-medium text-gray-900">Observações</h4>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedPatient.observacoes}</p>
                  </div>
                </div>
              )}

              {/* Contato de Emergência */}
              {(selectedPatient.responsavel_nome || selectedPatient.responsavel_telefone) && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Contato de Emergência</h4>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-900">
                      {selectedPatient.responsavel_nome || 'Responsável'}
                    </p>
                    <p className="text-sm text-red-700">
                      {selectedPatient.responsavel_telefone || 'Telefone não informado'}
                    </p>
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="border-t pt-4 flex gap-2">
                <Button 
                  onClick={() => {
                    setShowViewPatient(false);
                    navigate(`/admin/pacientes/edit/${selectedPatient.id}`);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Paciente
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowViewPatient(false)}
                  className="flex-1"
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default AdminPacientes;
