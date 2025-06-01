import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Upload, Link, Download, Eye, Edit, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { usePaciente } from "@/hooks/usePacientes";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const AdminPacienteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dados-pessoais");

  const { data: paciente, isLoading: pacienteLoading } = usePaciente(id!);

  // Estados para modais
  const [showNovaSessao, setShowNovaSessao] = useState(false);
  const [showAtribuirQuestionario, setShowAtribuirQuestionario] = useState(false);
  const [showNovoPagamento, setShowNovoPagamento] = useState(false);

  // Estados para formulários
  const [novaSessaoData, setNovaSessaoData] = useState({
    nome: "",
    data: "",
    horario: "",
    link: "",
    observacoes: ""
  });

  const [questionarioData, setQuestionarioData] = useState({
    questionario: "",
    link: ""
  });

  const [pagamentoData, setPagamentoData] = useState({
    descricao: "",
    valor: "",
    vencimento: ""
  });

  // Estado para upload de foto
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Estados para controle de pagamentos
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pendente");

  // Handler para upload de foto
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Arquivo muito grande. Tamanho máximo: 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Foto carregada com sucesso!");
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    toast.info("Foto removida");
  };

  // Mock data para demonstração
  const sessoesMock = [
    { id: 1, nome: "Sessão Inicial", data: "09/01/2024", horario: "14:00", status: "Concluída", link: "#" },
    { id: 2, nome: "Avaliação Cognitiva", data: "16/01/2024", horario: "14:00", status: "Concluída", link: "#" },
    { id: 3, nome: "Testes Específicos", data: "14/02/2024", horario: "14:00", status: "Agendada", link: "#" },
  ];

  const questionariosMock = [
    { id: 1, nome: "Formulário Inicial", link: "#", status: "Concluído", data: "07/01/2024" },
    { id: 2, nome: "Escala SRS-2", link: "#", status: "Concluído", data: "11/01/2024" },
    { id: 3, nome: "BDEFS", link: "#", status: "Pendente", data: "-" },
  ];

  const pagamentosMock = [
    { id: 1, descricao: "Sessão Inicial", valor: 250.00, vencimento: "09/01/2024", status: "pago", dataPagamento: "08/01/2024" , metodo: "PIX"},
    { id: 2, descricao: "Avaliação Cognitiva", valor: 250.00, vencimento: "16/01/2024", status: "pago", dataPagamento: "15/01/2024", metodo: "Cartão de Crédito" },
    { id: 3, descricao: "Testes Específicos", valor: 250.00, vencimento: "14/02/2024", status: "pendente", dataPagamento: "-", metodo: "Boleto" },
  ];

  const laudosMock = [
    { id: 1, nome: "laudo_maria_silva_2024.pdf" }
  ];

  const tabs = [
    { id: "dados-pessoais", label: "Dados Pessoais" },
    { id: "sessoes", label: "Sessões" },
    { id: "questionarios", label: "Questionários" },
    { id: "pagamentos", label: "Pagamentos" },
    { id: "laudo", label: "Laudo" },
  ];

  const handleCreateSessao = () => {
    console.log("Criando sessão:", novaSessaoData);
    toast.success("Sessão criada com sucesso!");
    setShowNovaSessao(false);
    setNovaSessaoData({ nome: "", data: "", horario: "", link: "", observacoes: "" });
  };

  const handleAtribuirQuestionario = () => {
    console.log("Atribuindo questionário:", questionarioData);
    toast.success("Questionário atribuído com sucesso!");
    setShowAtribuirQuestionario(false);
    setQuestionarioData({ questionario: "", link: "" });
  };

  const handleCreatePagamento = () => {
    console.log("Criando pagamento:", pagamentoData);
    toast.success("Pagamento criado com sucesso!");
    setShowNovoPagamento(false);
    setPagamentoData({ descricao: "", valor: "", vencimento: "" });
  };

  // Handlers para editar e deletar sessão (mock)
  const handleEditSessao = (sessao) => {
    console.log("Editando sessão:", sessao);
    toast.info(`Editando sessão ${sessao.nome}`);
  };

  const handleDeleteSessao = (sessao) => {
    console.log("Deletando sessão:", sessao);
    toast.warning(`Sessão ${sessao.nome} removida`);
  };

  // Handlers para editar e deletar questionário (mock)
  const handleEditQuestionario = (questionario) => {
    console.log("Editando questionário:", questionario);
    toast.info(`Editando questionário ${questionario.nome}`);
  };

  const handleDeleteQuestionario = (questionario) => {
    console.log("Deletando questionário:", questionario);
    toast.warning(`Questionário ${questionario.nome} removido`);
  };

  // Handler para controle de pagamentos
  const handlePaymentControl = (pagamento) => {
    setSelectedPayment(pagamento);
    setPaymentStatus(pagamento.status);
    setShowPaymentDialog(true);
  };

  // Handler para salvar alterações no pagamento
  const handleSavePayment = () => {
    console.log("Salvando pagamento:", selectedPayment);
    toast.success("Pagamento atualizado com sucesso!");
    setShowPaymentDialog(false);
  };

  if (pacienteLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-gray-500">Paciente não encontrado.</p>
          <Button onClick={() => navigate("/admin/pacientes")} className="mt-4">
            Voltar para Pacientes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/pacientes")}
            className="text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar à Lista
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{paciente.usuarios?.nome}</h1>
              <p className="text-sm text-gray-600">Gerenciamento completo do paciente</p>
            </div>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo das tabs */}
      {activeTab === "dados-pessoais" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            <p className="text-sm text-gray-600">Dados básicos e de contato do paciente</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Seção de foto do paciente */}
            <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <div className="relative group photo-upload">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Foto do paciente" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-2xl">👤</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 photo-overlay transition-opacity duration-200 cursor-pointer">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-medium text-gray-900">Foto do Paciente</h3>
                <p className="text-sm text-gray-600">Clique para alterar a foto</p>

                <div className="flex gap-2 justify-center">
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="w-4 h-4 mr-2" />
                      {photoPreview ? 'Alterar Foto' : 'Adicionar Foto'}
                    </Button>
                  </label>
                  {photoPreview && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleRemovePhoto}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remover
                    </Button>
                  )}
                </div>

                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <p className="text-xs text-gray-500">
                  Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" defaultValue={paciente.usuarios?.nome || ""} />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" defaultValue={paciente.usuarios?.email || ""} />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" defaultValue={paciente.usuarios?.telefone || "(11) 99999-1111"} />
              </div>
              <div>
                <Label htmlFor="nascimento">Data de Nascimento</Label>
                <Input 
                  id="nascimento" 
                  type="date" 
                  defaultValue={paciente.usuarios?.data_nascimento || "1985-03-15"} 
                />
              </div>
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" defaultValue={paciente.usuarios?.endereco || ""} />
            </div>
            <div>
              <Label htmlFor="contato-emergencia">Contato de Emergência</Label>
              <Input id="contato-emergencia" defaultValue="João Silva - (11) 88888-1111" />
            </div>
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea 
                id="observacoes" 
                defaultValue={paciente.observacoes || "Paciente com histórico de ansiedade. Prefere horários matutinos."} 
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "sessoes" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📅</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sessões Planejadas</CardTitle>
                    <p className="text-sm text-gray-600">Gerencie as sessões de avaliação do paciente</p>
                  </div>
                </div>
                <Dialog open={showNovaSessao} onOpenChange={setShowNovaSessao}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-900">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Sessão
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Sessão</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Nome da Sessão</Label>
                        <Input
                          value={novaSessaoData.nome}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, nome: e.target.value }))}
                          placeholder="Ex: Avaliação WISC-V"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Data</Label>
                          <Input
                            type="date"
                            value={novaSessaoData.data}
                            onChange={(e) => setNovaSessaoData(prev => ({ ...prev, data: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Horário</Label>
                          <Input
                            type="time"
                            value={novaSessaoData.horario}
                            onChange={(e) => setNovaSessaoData(prev => ({ ...prev, horario: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Link da Reunião</Label>
                        <Input
                          value={novaSessaoData.link}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, link: e.target.value }))}
                          placeholder="https://meet.google.com/..."
                        />
                      </div>
                      <div>
                        <Label>Observações</Label>
                        <Textarea
                          value={novaSessaoData.observacoes}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, observacoes: e.target.value }))}
                          placeholder="Observações sobre a sessão..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleCreateSessao} className="flex-1 bg-green-600 hover:bg-green-700">
                          Adicionar Sessão
                        </Button>
                        <Button variant="outline" onClick={() => setShowNovaSessao(false)} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                  <div>Sessão</div>
                  <div>Data/Horário</div>
                  <div>Status</div>
                  <div>Link da Reunião</div>
                  <div>Ações</div>
                </div>
                {sessoesMock.map((sessao) => (
                  <div key={sessao.id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
                    <div className="font-medium">{sessao.nome}</div>
                    <div className="text-gray-600">{sessao.data} às {sessao.horario}</div>
                    <div>
                      <Badge variant={sessao.status === "Concluída" ? "default" : "outline"}>
                        {sessao.status}
                      </Badge>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Link className="w-4 h-4 mr-1" />
                        Acessar
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-green-600"
                        onClick={() => handleEditSessao(sessao)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-red-600"
                        onClick={() => handleDeleteSessao(sessao)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "questionarios" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-purple-600 text-sm">📋</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Questionários Atribuídos</CardTitle>
                    <p className="text-sm text-gray-600">Questionários, formulários e escalas do paciente</p>
                  </div>
                </div>
                <Dialog open={showAtribuirQuestionario} onOpenChange={setShowAtribuirQuestionario}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-900">
                      <Plus className="w-4 h-4 mr-2" />
                      Atribuir Questionário
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Atribuir Questionário</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Questionário</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um questionário" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wisc">WISC-V</SelectItem>
                            <SelectItem value="srs2">Escala SRS-2</SelectItem>
                            <SelectItem value="bdefs">BDEFS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Link de Acesso do Paciente</Label>
                        <Input
                          value={questionarioData.link}
                          onChange={(e) => setQuestionarioData(prev => ({ ...prev, link: e.target.value }))}
                          placeholder="https://forms.google.com/..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAtribuirQuestionario} className="flex-1 bg-purple-600 hover:bg-purple-700">
                          Atribuir Questionário
                        </Button>
                        <Button variant="outline" onClick={() => setShowAtribuirQuestionario(false)} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                  <div>Questionário</div>
                  <div>Link do Paciente</div>
                  <div>Status</div>
                  <div>Data Conclusão</div>
                  <div>Ações</div>
                </div>
                {questionariosMock.map((questionario) => (
                  <div key={questionario.id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
                    <div className="font-medium">{questionario.nome}</div>
                    <div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Link className="w-4 h-4 mr-1" />
                        Acessar Link
                      </Button>
                    </div>
                    <div>
                      <Badge variant={questionario.status === "Concluído" ? "default" : "outline"}>
                        {questionario.status}
                      </Badge>
                    </div>
                    <div className="text-gray-600">{questionario.data}</div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-green-600"
                        onClick={() => handleEditQuestionario(questionario)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-red-600"
                        onClick={() => handleDeleteQuestionario(questionario)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "pagamentos" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-green-600 text-sm">💰</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Controle de Pagamentos</CardTitle>
                    <p className="text-sm text-gray-600">Gerencie pagamentos e cobranças do paciente</p>
                  </div>
                </div>
                <Dialog open={showNovoPagamento} onOpenChange={setShowNovoPagamento}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-900">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Pagamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Cobrança</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Descrição</Label>
                        <Input
                          value={pagamentoData.descricao}
                          onChange={(e) => setPagamentoData(prev => ({ ...prev, descricao: e.target.value }))}
                          placeholder="Ex: Avaliação Neuropsicológica"
                        />
                      </div>
                      <div>
                        <Label>Valor (R$)</Label>
                        <Input
                          value={pagamentoData.valor}
                          onChange={(e) => setPagamentoData(prev => ({ ...prev, valor: e.target.value }))}
                          placeholder="250,00"
                        />
                      </div>
                      <div>
                        <Label>Data de Vencimento</Label>
                        <Input
                          type="date"
                          value={pagamentoData.vencimento}
                          onChange={(e) => setPagamentoData(prev => ({ ...prev, vencimento: e.target.value }))}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleCreatePagamento} className="flex-1 bg-green-600 hover:bg-green-700">
                          Adicionar Cobrança
                        </Button>
                        <Button variant="outline" onClick={() => setShowNovoPagamento(false)} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                {pagamentosMock.map((pagamento) => (
                  <div key={pagamento.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{pagamento.descricao}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            pagamento.status === "pago" ? "default" : 
                            pagamento.status === "pendente" ? "secondary" : "destructive"
                          }>
                            {pagamento.status === "pago" ? "Pago" : 
                             pagamento.status === "pendente" ? "Pendente" : "Atrasado"}
                          </Badge>
                          <span className="text-lg font-bold text-green-600">
                            R$ {pagamento.valor.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Vencimento:</span> {pagamento.vencimento}
                        </div>
                        <div>
                          <span className="font-medium">Método:</span> {pagamento.metodo || "Não definido"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePaymentControl(pagamento)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Controlar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "laudo" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-600 text-sm">📄</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Relatório Final (Laudo)</CardTitle>
                  <p className="text-sm text-gray-600">Upload e gerenciamento do laudo neuropsicológico</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">Escolher arquivo · Nenhum arquivo escolhido</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Laudo
                </Button>
                <p className="text-xs text-gray-500 mt-2">Aceita apenas arquivos PDF. Tamanho máximo: 10MB</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Laudos Anteriores</h3>
                {laudosMock.map((laudo) => (
                  <div key={laudo.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-red-600 text-xs">PDF</span>
                      </div>
                      <span className="font-medium">{laudo.nome}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialog de Controle de Pagamentos */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Controle de Pagamento</DialogTitle>
            <DialogDescription>
              Gerencie o status e informações do pagamento
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">{selectedPayment.descricao}</h4>
                <p className="text-sm text-gray-600">Valor: R$ {selectedPayment.valor.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Vencimento: {selectedPayment.vencimento}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-status">Status do Pagamento</Label>
                <Select onValueChange={setPaymentStatus}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="pago">Pago</SelectItem>
                        <SelectItem value="atrasado">Atrasado</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">Método de Pagamento</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                    <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-date">Data do Pagamento</Label>
                <Input
                  id="payment-date"
                  type="date"
                  placeholder="Data do pagamento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-notes">Observações</Label>
                <Textarea
                  id="payment-notes"
                  placeholder="Observações sobre o pagamento..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSavePayment}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPaymentDialog(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPacienteEdit;