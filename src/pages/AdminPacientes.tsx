
import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
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

const AdminPacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  
  const navigate = useNavigate();
  const { data: pacientes, isLoading, error } = usePacientes();

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

  return (
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
                      onClick={() => navigate(`/admin/pacientes/edit/${paciente.id}`)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/pacientes/edit/${paciente.id}`)}
                      className="text-gray-600 hover:text-green-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-red-600"
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
    </div>
  );
};

export default AdminPacientes;
