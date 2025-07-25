
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Calendar, 
  Search,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Clock,
  User,
  Video,
  MapPin
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";
import { usePacientes } from "@/hooks/usePacientes";

const AdminAgendamentos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: pacientes = [], isLoading } = usePacientes();
  
  const [formData, setFormData] = useState({
    paciente_id: "",
    data: "",
    horario: "",
    tipo: "",
    modalidade: "online",
    link: ""
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

  // Dados de demonstração atualizados com modalidade
  const agendamentos = [
    {
      id: 1,
      paciente: "Maria Silva",
      data: "2024-02-05",
      horario: "09:00",
      tipo: "Sessão de Avaliação Comportamental",
      modalidade: "online",
      status: "Confirmado",
      link: "https://meet.google.com/abc-def-ghi",
      endereco: null
    },
    {
      id: 2,
      paciente: "Pedro Oliveira",
      data: "2024-02-05",
      horario: "14:00",
      tipo: "Sessão Inicial",
      modalidade: "presencial_copacabana",
      status: "Pendente",
      link: null,
      endereco: "Rua Barata Ribeiro, 200 - Copacabana, Rio de Janeiro/RJ"
    },
    {
      id: 3,
      paciente: "Ana Costa",
      data: "2024-02-06",
      horario: "10:30",
      tipo: "Sessão de Alinhamento Diagnóstico",
      modalidade: "presencial_leblon",
      status: "Confirmado",
      link: null,
      endereco: "Rua Dias Ferreira, 100 - Leblon, Rio de Janeiro/RJ"
    },
    {
      id: 4,
      paciente: "João Santos",
      data: "2024-02-07",
      horario: "16:00",
      tipo: "Devolutiva",
      modalidade: "online",
      status: "Confirmado",
      link: "https://meet.google.com/jkl-mno-pqr",
      endereco: null
    }
  ];

  const tipos = [
    "Sessão Inicial",
    "Sessão de Avaliação Comportamental",
    "Sessão de Testes Cognitivos",
    "Sessão de Alinhamento Diagnóstico",
    "Devolutiva"
  ];

  const modalidades = [
    { value: "online", label: "Online" },
    { value: "presencial_copacabana", label: "Presencial - Copacabana" },
    { value: "presencial_leblon", label: "Presencial - Leblon" }
  ];

  const getEndereco = (modalidade: string) => {
    switch (modalidade) {
      case "presencial_copacabana":
        return "Rua Barata Ribeiro, 200 - Copacabana, Rio de Janeiro/RJ";
      case "presencial_leblon":
        return "Rua Dias Ferreira, 100 - Leblon, Rio de Janeiro/RJ";
      default:
        return null;
    }
  };

  const getModalidadeLabel = (modalidade: string) => {
    const mod = modalidades.find(m => m.value === modalidade);
    return mod ? mod.label : modalidade;
  };

  const filteredAgendamentos = agendamentos.filter(agendamento =>
    agendamento.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    const pacienteSelecionado = pacientes.find(p => p.id === formData.paciente_id);
    
    toast({
      title: "Agendamento criado",
      description: `Agendamento para ${pacienteSelecionado?.usuarios?.nome || 'paciente'} foi criado com sucesso.`,
    });
    setFormData({ paciente_id: "", data: "", horario: "", tipo: "", modalidade: "online", link: "" });
    setShowAddForm(false);
  };

  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAgendamento, setEditingAgendamento] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState<any>(null);

  const handleEdit = (id: number) => {
    const agendamento = agendamentos.find(a => a.id === id);
    if (agendamento) {
      setEditingAgendamento(agendamento);
      const paciente = pacientes.find(p => p.usuarios?.nome === agendamento.paciente);
      setFormData({
        paciente_id: paciente?.id || "",
        data: agendamento.data,
        horario: agendamento.horario,
        tipo: agendamento.tipo,
        modalidade: agendamento.modalidade,
        link: agendamento.link || ""
      });
      setShowEditForm(true);
    }
  };

  const handleDelete = (id: number) => {
    const agendamento = agendamentos.find(a => a.id === id);
    if (agendamento) {
      setAgendamentoToDelete(agendamento);
      setShowDeleteDialog(true);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pacienteSelecionado = pacientes.find(p => p.id === formData.paciente_id);
    
    toast({
      title: "Agendamento atualizado",
      description: `Agendamento de ${pacienteSelecionado?.usuarios?.nome || 'paciente'} foi atualizado com sucesso.`,
    });
    setFormData({ paciente_id: "", data: "", horario: "", tipo: "", modalidade: "online", link: "" });
    setShowEditForm(false);
    setEditingAgendamento(null);
  };

  const confirmDelete = () => {
    if (agendamentoToDelete) {
      toast({
        title: "Agendamento removido",
        description: `Agendamento de ${agendamentoToDelete.paciente} foi removido do sistema.`,
        variant: "destructive"
      });
      setShowDeleteDialog(false);
      setAgendamentoToDelete(null);
    }
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
              <h1 className="text-3xl font-bold text-gray-800">Gerenciar Agendamentos</h1>
              <p className="text-gray-600">Visualize e gerencie todos os agendamentos</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8 border-blue-100">
            <CardHeader>
              <CardTitle>Criar Novo Agendamento</CardTitle>
              <CardDescription>
                Preencha os dados do novo agendamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddAgendamento} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paciente">Paciente</Label>
                    <Select value={formData.paciente_id} onValueChange={(value) => setFormData({...formData, paciente_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {pacientes.map((paciente) => (
                          <SelectItem key={paciente.id} value={paciente.id}>
                            {paciente.usuarios?.nome} - {paciente.usuarios?.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tipo">Tipo de Sessão</Label>
                    <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tipos.map(tipo => (
                          <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="data">Data</Label>
                    <Input
                      id="data"
                      type="date"
                      value={formData.data}
                      onChange={(e) => setFormData({...formData, data: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="horario">Horário</Label>
                    <Input
                      id="horario"
                      type="time"
                      value={formData.horario}
                      onChange={(e) => setFormData({...formData, horario: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="modalidade">Modalidade</Label>
                    <Select value={formData.modalidade} onValueChange={(value) => setFormData({...formData, modalidade: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a modalidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {modalidades.map(modalidade => (
                          <SelectItem key={modalidade.value} value={modalidade.value}>
                            {modalidade.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.modalidade === "online" && (
                  <div>
                    <Label htmlFor="link">Link da Reunião (opcional)</Label>
                    <Input
                      id="link"
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                      placeholder="https://meet.google.com/..."
                    />
                  </div>
                )}
                {(formData.modalidade === "presencial_copacabana" || formData.modalidade === "presencial_leblon") && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label className="font-medium">Endereço da Consulta:</Label>
                    <p className="text-sm text-gray-600 mt-1">{getEndereco(formData.modalidade)}</p>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Criar Agendamento
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

        {/* Formulário de Edição */}
        <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Agendamento</DialogTitle>
              <DialogDescription>
                Edite as informações do agendamento
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_paciente">Paciente</Label>
                  <Select value={formData.paciente_id} onValueChange={(value) => setFormData({...formData, paciente_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {pacientes.map((paciente) => (
                        <SelectItem key={paciente.id} value={paciente.id}>
                          {paciente.usuarios?.nome} - {paciente.usuarios?.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit_tipo">Tipo de Sessão</Label>
                  <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tipos.map(tipo => (
                        <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit_data">Data</Label>
                  <Input
                    id="edit_data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit_horario">Horário</Label>
                  <Input
                    id="edit_horario"
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData({...formData, horario: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit_modalidade">Modalidade</Label>
                  <Select value={formData.modalidade} onValueChange={(value) => setFormData({...formData, modalidade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {modalidades.map(modalidade => (
                        <SelectItem key={modalidade.value} value={modalidade.value}>
                          {modalidade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.modalidade === "online" && (
                <div>
                  <Label htmlFor="edit_link">Link da Reunião (opcional)</Label>
                  <Input
                    id="edit_link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="https://meet.google.com/..."
                  />
                </div>
              )}
              {(formData.modalidade === "presencial_copacabana" || formData.modalidade === "presencial_leblon") && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="font-medium">Endereço da Consulta:</Label>
                  <p className="text-sm text-gray-600 mt-1">{getEndereco(formData.modalidade)}</p>
                </div>
              )}
              <div className="flex space-x-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Salvar Alterações
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog de Confirmação de Exclusão */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o agendamento de {agendamentoToDelete?.paciente}? 
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card className="border-blue-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Lista de Agendamentos
              </CardTitle>
              <div className="relative w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por paciente ou tipo..."
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
                  <TableHead>Paciente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Tipo de Sessão</TableHead>
                  <TableHead>Modalidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Acesso</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgendamentos.map((agendamento) => (
                  <TableRow key={agendamento.id}>
                    <TableCell className="font-medium flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      {agendamento.paciente}
                    </TableCell>
                    <TableCell>{agendamento.data}</TableCell>
                    <TableCell className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {agendamento.horario}
                    </TableCell>
                    <TableCell>{agendamento.tipo}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {getModalidadeLabel(agendamento.modalidade)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={agendamento.status === "Confirmado" ? "default" : "secondary"}
                        className={
                          agendamento.status === "Confirmado" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-orange-100 text-orange-800"
                        }
                      >
                        {agendamento.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {agendamento.modalidade === "online" && agendamento.link ? (
                        <Button size="sm" variant="outline" asChild>
                          <a href={agendamento.link} target="_blank" rel="noopener noreferrer">
                            <Video className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : agendamento.endereco ? (
                        <Button size="sm" variant="outline" asChild>
                          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(agendamento.endereco)}`} target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(agendamento.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(agendamento.id)}
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

export default AdminAgendamentos;
