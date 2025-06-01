
import { useState } from "react";
import { Plus, Search, FileText, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { usePacientes } from "@/hooks/usePacientes";
import { Skeleton } from "@/components/ui/skeleton";
import { useSeedData } from "@/hooks/useSeedData";
import { useToast } from "@/hooks/use-toast";

const AdminPacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingDemo, setIsCreatingDemo] = useState(false);
  const navigate = useNavigate();
  const { data: pacientes, isLoading, error, refetch } = usePacientes();
  const { createDemoData } = useSeedData();
  const { toast } = useToast();

  console.log("AdminPacientes - Dados carregados:", { pacientes, isLoading, error });

  const handleCreateDemoData = async () => {
    setIsCreatingDemo(true);
    const result = await createDemoData();
    
    if (result.success) {
      toast({
        title: "Sucesso!",
        description: result.message,
      });
      refetch();
    } else {
      toast({
        title: "Erro",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsCreatingDemo(false);
  };

  const filteredPacientes = pacientes?.filter(paciente =>
    paciente.usuarios?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.usuarios?.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Pacientes</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os pacientes e suas informações</p>
        </div>
        <Button onClick={() => navigate("/admin/pacientes/novo")} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredPacientes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                {pacientes?.length === 0 ? "Nenhum paciente cadastrado." : "Nenhum paciente encontrado."}
              </p>
              {pacientes?.length === 0 && (
                <div className="flex flex-col gap-3 mt-4">
                  <Button 
                    onClick={() => navigate("/admin/pacientes/novo")} 
                  >
                    Cadastrar Primeiro Paciente
                  </Button>
                  <Button 
                    onClick={handleCreateDemoData}
                    variant="outline"
                    disabled={isCreatingDemo}
                  >
                    {isCreatingDemo ? "Criando..." : "Criar Dados de Demonstração"}
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Se o botão de demonstração não funcionar, você pode executar o script 
                    <code className="bg-gray-100 px-1 rounded text-xs mx-1">database/insert_demo_data.sql</code> 
                    diretamente no banco de dados.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPacientes.map((paciente) => (
            <Card key={paciente.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{paciente.usuarios?.nome}</CardTitle>
                    <p className="text-gray-600">{paciente.usuarios?.email}</p>
                  </div>
                  <Badge variant={paciente.status === 'ativo' ? 'default' : 'secondary'}>
                    {paciente.status.charAt(0).toUpperCase() + paciente.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="font-medium">{paciente.usuarios?.telefone || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data de Nascimento</p>
                    <p className="font-medium">
                      {paciente.usuarios?.data_nascimento 
                        ? new Date(paciente.usuarios.data_nascimento).toLocaleDateString('pt-BR')
                        : 'Não informado'
                      }
                    </p>
                  </div>
                  {paciente.responsavel_nome && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Responsável</p>
                        <p className="font-medium">{paciente.responsavel_nome}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Telefone do Responsável</p>
                        <p className="font-medium">{paciente.responsavel_telefone || 'Não informado'}</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/pacientes/edit/${paciente.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/sessoes?paciente=${paciente.id}`)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Sessões
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/relatorios?paciente=${paciente.id}`)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Relatórios
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPacientes;
