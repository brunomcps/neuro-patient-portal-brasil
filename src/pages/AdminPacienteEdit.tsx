import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Upload, Link, Download, Eye, Edit, Trash2, Settings, MapPin, Monitor } from "lucide-react";
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
  const [showEditSessao, setShowEditSessao] = useState(false);
  const [showStatusSessao, setShowStatusSessao] = useState(false);
  const [selectedSessao, setSelectedSessao] = useState<any>(null);

  // Estados para formulários
  const [novaSessaoData, setNovaSessaoData] = useState({
    nome: "",
    data: "",
    horario: "",
    modalidade: "online",
    link: "",
    endereco: "",
    observacoes: "",
    questionarios_selecionados: [] as number[]
  });

  const [editSessaoData, setEditSessaoData] = useState({
    nome: "",
    data: "",
    horario: "",
    modalidade: "online",
    link: "",
    endereco: "",
    observacoes: "",
    questionarios_selecionados: [] as number[]
  });

  const [statusSessaoData, setStatusSessaoData] = useState({
    status: "",
    observacoes: ""
  });

  // Estados para gerenciar questionários
  const [showEditQuestionario, setShowEditQuestionario] = useState(false);
  const [showStatusQuestionario, setShowStatusQuestionario] = useState(false);
  const [selectedQuestionario, setSelectedQuestionario] = useState<any>(null);
  const [editQuestionarioData, setEditQuestionarioData] = useState({
    questionario: "",
    link: "",
    observacoes: ""
  });
  const [statusQuestionarioData, setStatusQuestionarioData] = useState({
    status: "",
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
  const [showEditPaymentDialog, setShowEditPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pendente");
  const [editPaymentData, setEditPaymentData] = useState({
    descricao: "",
    valor: "",
    vencimento: "",
    sessao_id: "",
    metodo_pagamento: "",
    status: "",
    observacoes: ""
  });

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
  const questionariosDisponiveis = [
    { id: 1, nome: "Formulário Inicial", tipo: "Formulário", tempo: "15 min" },
    { id: 2, nome: "Escala SRS-2", tipo: "Escala", tempo: "20 min" },
    { id: 3, nome: "BDEFS", tipo: "Escala", tempo: "25 min" },
    { id: 4, nome: "WISC-V", tipo: "Teste Neuropsicológico", tempo: "90 min" },
    { id: 5, nome: "TEA-Ch", tipo: "Teste Neuropsicológico", tempo: "45 min" },
    { id: 6, nome: "Inventário Beck de Ansiedade", tipo: "Inventário", tempo: "10 min" }
  ];

  const sessoesMock = [
    { 
      id: 1, 
      nome: "Sessão Inicial", 
      data: "09/01/2024", 
      horario: "14:00", 
      status: "Concluída", 
      modalidade: "online",
      link: "https://meet.google.com/abc-defg-hij",
      endereco: null
    },
    { 
      id: 2, 
      nome: "Avaliação Cognitiva", 
      data: "16/01/2024", 
      horario: "14:00", 
      status: "Concluída", 
      modalidade: "presencial",
      endereco: "Rua Barata Ribeiro, 370 - Copacabana, Rio de Janeiro/RJ",
      link: null
    },
    { 
      id: 3, 
      nome: "Testes Específicos", 
      data: "14/02/2024", 
      horario: "14:00", 
      status: "Agendada", 
      modalidade: "presencial",
      endereco: "Rua Dias Ferreira, 190 - Leblon, Rio de Janeiro/RJ",
      link: null
    },
  ];

  const questionariosMock = [
    { id: 1, nome: "Formulário Inicial", link: "#", status: "Concluído", data: "07/01/2024" },
    { id: 2, nome: "Escala SRS-2", link: "#", status: "Concluído", data: "11/01/2024" },
    { id: 3, nome: "BDEFS", link: "#", status: "Pendente", data: "-" },
  ];

  const pagamentosMock = [
    { id: 1, descricao: "Sessão Inicial", valor: 250.00, vencimento: "09/01/2024", status: "pago", dataPagamento: "08/01/2024" , metodo: "PIX", sessao_id: "1", sessao_nome: "Sessão Inicial"},
    { id: 2, descricao: "Avaliação Cognitiva", valor: 250.00, vencimento: "16/01/2024", status: "pago", dataPagamento: "15/01/2024", metodo: "Cartão de Crédito", sessao_id: "2", sessao_nome: "Avaliação Cognitiva" },
    { id: 3, descricao: "Testes Específicos", valor: 250.00, vencimento: "14/02/2024", status: "pendente", dataPagamento: "-", metodo: "Boleto", sessao_id: "3", sessao_nome: "Testes Específicos" },
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
    setNovaSessaoData({ nome: "", data: "", horario: "", modalidade: "online", link: "", endereco: "", observacoes: "", questionarios_selecionados: [] });
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

  // Handlers para gerenciar sessões
  const handleEditSessao = (sessao) => {
    setSelectedSessao(sessao);
    setEditSessaoData({
      nome: sessao.nome,
      data: sessao.data,
      horario: sessao.horario,
      modalidade: sessao.modalidade,
      link: sessao.link || "",
      endereco: sessao.endereco || "",
      observacoes: sessao.observacoes || "",
      questionarios_selecionados: sessao.questionarios_selecionados || []
    });
    setShowEditSessao(true);
  };

  const handleStatusSessao = (sessao) => {
    setSelectedSessao(sessao);
    setStatusSessaoData({
      status: sessao.status,
      observacoes: ""
    });
    setShowStatusSessao(true);
  };

  const handleDeleteSessao = (sessao) => {
    if (confirm(`Tem certeza que deseja remover a sessão "${sessao.nome}"?`)) {
      console.log("Deletando sessão:", sessao);
      toast.success(`Sessão ${sessao.nome} removida com sucesso`);
    }
  };

  const handleSaveEditSessao = () => {
    console.log("Salvando edição da sessão:", editSessaoData);
    toast.success("Sessão atualizada com sucesso!");
    setShowEditSessao(false);
    setSelectedSessao(null);
  };

  const handleSaveStatusSessao = () => {
    console.log("Atualizando status da sessão:", statusSessaoData);
    toast.success("Status da sessão atualizado com sucesso!");
    setShowStatusSessao(false);
    setSelectedSessao(null);
  };

  const getLocalDisplay = (sessao) => {
    if (sessao.modalidade === "online") {
      return (
        <div className="flex items-center gap-1 text-blue-600">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Online
        </div>
      );
    } else {
      const location = sessao.endereco?.includes("Copacabana") ? "Copacabana" : 
                     sessao.endereco?.includes("Leblon") ? "Leblon" : "Presencial";
      return (
        <div className="flex items-center gap-1 text-green-600">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {location}
        </div>
      );
    }
  };

  // Handlers para editar e deletar questionário
  const handleEditQuestionario = (questionario) => {
    setSelectedQuestionario(questionario);
    setEditQuestionarioData({
      questionario: questionario.nome,
      link: questionario.link,
      observacoes: questionario.observacoes || ""
    });
    setShowEditQuestionario(true);
  };

  const handleStatusQuestionario = (questionario) => {
    setSelectedQuestionario(questionario);
    setStatusQuestionarioData({
      status: questionario.status,
      observacoes: ""
    });
    setShowStatusQuestionario(true);
  };

  const handleDeleteQuestionario = (questionario) => {
    if (confirm(`Tem certeza que deseja remover o questionário "${questionario.nome}"?`)) {
      console.log("Deletando questionário:", questionario);
      toast.success(`Questionário ${questionario.nome} removido com sucesso`);
    }
  };

  const handleSaveEditQuestionario = () => {
    console.log("Salvando edição do questionário:", editQuestionarioData);
    toast.success("Questionário atualizado com sucesso!");
    setShowEditQuestionario(false);
    setSelectedQuestionario(null);
  };

  const handleSaveStatusQuestionario = () => {
    console.log("Atualizando status do questionário:", statusQuestionarioData);
    toast.success("Status do questionário atualizado com sucesso!");
    setShowStatusQuestionario(false);
    setSelectedQuestionario(null);
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

  // Handler para editar pagamento
  const handleEditPayment = (pagamento) => {
    setSelectedPayment(pagamento);
    setEditPaymentData({
      descricao: pagamento.descricao,
      valor: pagamento.valor.toString(),
      vencimento: pagamento.vencimento,
      sessao_id: pagamento.sessao_id || "",
      metodo_pagamento: pagamento.metodo || "",
      status: pagamento.status || "",
      observacoes: pagamento.observacoes || ""
    });
    setShowEditPaymentDialog(true);
  };

  // Handler para salvar edição do pagamento
  const handleSaveEditPayment = () => {
    console.log("Salvando edição do pagamento:", editPaymentData);
    toast.success("Pagamento editado com sucesso!");
    setShowEditPaymentDialog(false);
    setSelectedPayment(null);
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
                        <Label>Modalidade</Label>
                        <Select 
                          value={novaSessaoData.modalidade} 
                          onValueChange={(value) => setNovaSessaoData(prev => ({ ...prev, modalidade: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a modalidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="copacabana">Presencial - Copacabana</SelectItem>
                            <SelectItem value="leblon">Presencial - Leblon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {novaSessaoData.modalidade === "online" ? (
                        <div>
                          <Label>Link da Reunião</Label>
                          <Input
                            value={novaSessaoData.link}
                            onChange={(e) => setNovaSessaoData(prev => ({ ...prev, link: e.target.value }))}
                            placeholder="https://meet.google.com/..."
                          />
                        </div>
                      ) : (
                        <div>
                          <Label>Endereço</Label>
                          <Input
                            value={
                              novaSessaoData.modalidade === "copacabana" 
                                ? "Rua Barata Ribeiro, 370 - Copacabana, Rio de Janeiro/RJ"
                                : novaSessaoData.modalidade === "leblon"
                                ? "Rua Dias Ferreira, 190 - Leblon, Rio de Janeiro/RJ"
                                : novaSessaoData.endereco
                            }
                            onChange={(e) => setNovaSessaoData(prev => ({ ...prev, endereco: e.target.value }))}
                            placeholder="Endereço da consulta"
                            disabled={novaSessaoData.modalidade === "copacabana" || novaSessaoData.modalidade === "leblon"}
                          />
                        </div>
                      )}
                      <div>
                        <Label>Questionários e Testes para esta Sessão</Label>
                        <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-4">
                          {questionariosDisponiveis.map((questionario) => (
                            <div key={questionario.id} className="flex items-center space-x-3 p-2 border rounded">
                              <input
                                type="checkbox"
                                id={`questionario-${questionario.id}`}
                                checked={novaSessaoData.questionarios_selecionados.includes(questionario.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNovaSessaoData(prev => ({
                                      ...prev,
                                      questionarios_selecionados: [...prev.questionarios_selecionados, questionario.id]
                                    }));
                                  } else {
                                    setNovaSessaoData(prev => ({
                                      ...prev,
                                      questionarios_selecionados: prev.questionarios_selecionados.filter(id => id !== questionario.id)
                                    }));
                                  }
                                }}
                                className="h-4 w-4"
                              />
                              <label htmlFor={`questionario-${questionario.id}`} className="flex-1 cursor-pointer">
                                <div className="font-medium">{questionario.nome}</div>
                                <div className="text-sm text-gray-600">{questionario.tipo} • {questionario.tempo}</div>
                              </label>
                            </div>
                          ))}
                        </div>
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
                <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                  <div>Sessão</div>
                  <div>Data/Horário</div>
                  <div>Status</div>
                  <div>Modalidade</div>
                  <div>Acesso</div>
                  <div>Ações</div>
                </div>
                {sessoesMock.map((sessao) => (
                  <div key={sessao.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                    <div className="font-medium">{sessao.nome}</div>
                    <div className="text-gray-600">{sessao.data} às {sessao.horario}</div>
                    <div>
                      <Badge variant={sessao.status === "Concluída" ? "default" : 
                                    sessao.status === "Agendada" ? "outline" : "secondary"}>
                        {sessao.status}
                      </Badge>
                    </div>
                    <div>
                      {getLocalDisplay(sessao)}
                    </div>
                    <div>
                      {sessao.modalidade === "online" && sessao.link ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-700"
                          asChild
                        >
                          <a href={sessao.link} target="_blank" rel="noopener noreferrer">
                            <Link className="w-4 h-4 mr-1" />
                            Acessar
                          </a>
                        </Button>
                      ) : sessao.modalidade !== "online" && sessao.endereco ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700"
                          asChild
                        >
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sessao.endereco)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            Ver Local
                          </a>
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => handleStatusSessao(sessao)}
                        title="Alterar Status"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-green-600"
                        onClick={() => handleEditSessao(sessao)}
                        title="Editar Sessão"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-red-600"
                        onClick={() => handleDeleteSessao(sessao)}
                        title="Remover Sessão"
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
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => handleStatusQuestionario(questionario)}
                        title="Alterar Status"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-green-600"
                        onClick={() => handleEditQuestionario(questionario)}
                        title="Editar Questionário"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-red-600"
                        onClick={() => handleDeleteQuestionario(questionario)}
                        title="Remover Questionário"
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
                      <div>
                        <Label>Sessão Relacionada (Opcional)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma sessão" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Nenhuma sessão específica</SelectItem>
                            {sessoesMock.map((sessao) => (
                              <SelectItem key={sessao.id} value={sessao.id.toString()}>
                                {sessao.nome} - {sessao.data}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        {pagamento.sessao_nome && (
                          <div className="col-span-2">
                            <span className="font-medium">Sessão:</span> {pagamento.sessao_nome}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditPayment(pagamento)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Gerenciar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja remover o pagamento "${pagamento.descricao}"?`)) {
                              console.log("Deletando pagamento:", pagamento);
                              toast.success(`Pagamento ${pagamento.descricao} removido com sucesso`);
                            }
                          }}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
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

      {/* Dialog de Edição de Sessão */}
      <Dialog open={showEditSessao} onOpenChange={setShowEditSessao}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Sessão</DialogTitle>
            <DialogDescription>
              Edite as informações da sessão
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome da Sessão</Label>
              <Input
                value={editSessaoData.nome}
                onChange={(e) => setEditSessaoData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Avaliação WISC-V"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <Input
                  type="date"
                  value={editSessaoData.data.split('/').reverse().join('-')}
                  onChange={(e) => setEditSessaoData(prev => ({ ...prev, data: e.target.value.split('-').reverse().join('/') }))}
                />
              </div>
              <div>
                <Label>Horário</Label>
                <Input
                  type="time"
                  value={editSessaoData.horario}
                  onChange={(e) => setEditSessaoData(prev => ({ ...prev, horario: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Modalidade</Label>
              <Select 
                value={editSessaoData.modalidade} 
                onValueChange={(value) => setEditSessaoData(prev => ({ ...prev, modalidade: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="copacabana">Presencial - Copacabana</SelectItem>
                  <SelectItem value="leblon">Presencial - Leblon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {editSessaoData.modalidade === "online" ? (
              <div>
                <Label>Link da Reunião</Label>
                <Input
                  value={editSessaoData.link}
                  onChange={(e) => setEditSessaoData(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="https://meet.google.com/..."
                />
              </div>
            ) : (
              <div>
                <Label>Endereço</Label>
                <Input
                  value={
                    editSessaoData.modalidade === "copacabana" 
                      ? "Rua Barata Ribeiro, 370 - Copacabana, Rio de Janeiro/RJ"
                      : editSessaoData.modalidade === "leblon"
                      ? "Rua Dias Ferreira, 190 - Leblon, Rio de Janeiro/RJ"
                      : editSessaoData.endereco
                  }
                  onChange={(e) => setEditSessaoData(prev => ({ ...prev, endereco: e.target.value }))}
                  placeholder="Endereço da consulta"
                  disabled={editSessaoData.modalidade === "copacabana" || editSessaoData.modalidade === "leblon"}
                />
              </div>
            )}
            
            <div>
              <Label>Questionários e Testes para esta Sessão</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-4">
                {questionariosDisponiveis.map((questionario) => (
                  <div key={questionario.id} className="flex items-center space-x-3 p-2 border rounded">
                    <input
                      type="checkbox"
                      id={`edit-questionario-${questionario.id}`}
                      checked={editSessaoData.questionarios_selecionados.includes(questionario.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditSessaoData(prev => ({
                            ...prev,
                            questionarios_selecionados: [...prev.questionarios_selecionados, questionario.id]
                          }));
                        } else {
                          setEditSessaoData(prev => ({
                            ...prev,
                            questionarios_selecionados: prev.questionarios_selecionados.filter(id => id !== questionario.id)
                          }));
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <label htmlFor={`edit-questionario-${questionario.id}`} className="flex-1 cursor-pointer">
                      <div className="font-medium">{questionario.nome}</div>
                      <div className="text-sm text-gray-600">{questionario.tipo} • {questionario.tempo}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Observações</Label>
              <Textarea
                value={editSessaoData.observacoes}
                onChange={(e) => setEditSessaoData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Observações sobre a sessão..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveEditSessao} className="flex-1 bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
              <Button variant="outline" onClick={() => setShowEditSessao(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Alteração de Status */}
      <Dialog open={showStatusSessao} onOpenChange={setShowStatusSessao}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Alterar Status da Sessão</DialogTitle>
            <DialogDescription>
              {selectedSessao && `Altere o status da sessão "${selectedSessao.nome}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Novo Status</Label>
              <Select 
                value={statusSessaoData.status} 
                onValueChange={(value) => setStatusSessaoData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agendada">Agendada</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                  <SelectItem value="Reagendada">Reagendada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea
                value={statusSessaoData.observacoes}
                onChange={(e) => setStatusSessaoData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Observações sobre a alteração de status..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveStatusSessao} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Alterar Status
              </Button>
              <Button variant="outline" onClick={() => setShowStatusSessao(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição de Questionário */}
      <Dialog open={showEditQuestionario} onOpenChange={setShowEditQuestionario}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Questionário</DialogTitle>
            <DialogDescription>
              {selectedQuestionario && `Edite as informações do questionário "${selectedQuestionario.nome}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Questionário</Label>
              <Select 
                value={editQuestionarioData.questionario} 
                onValueChange={(value) => setEditQuestionarioData(prev => ({ ...prev, questionario: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um questionário" />
                </SelectTrigger>
                <SelectContent>
                  {questionariosDisponiveis.map((q) => (
                    <SelectItem key={q.id} value={q.nome}>{q.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Link de Acesso</Label>
              <Input
                value={editQuestionarioData.link}
                onChange={(e) => setEditQuestionarioData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://forms.google.com/..."
              />
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea
                value={editQuestionarioData.observacoes}
                onChange={(e) => setEditQuestionarioData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Observações sobre o questionário..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveEditQuestionario} className="flex-1 bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
              <Button variant="outline" onClick={() => setShowEditQuestionario(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Alteração de Status do Questionário */}
      <Dialog open={showStatusQuestionario} onOpenChange={setShowStatusQuestionario}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Alterar Status do Questionário</DialogTitle>
            <DialogDescription>
              {selectedQuestionario && `Altere o status do questionário "${selectedQuestionario.nome}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Novo Status</Label>
              <Select 
                value={statusQuestionarioData.status} 
                onValueChange={(value) => setStatusQuestionarioData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                  <SelectItem value="Expirado">Expirado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea
                value={statusQuestionarioData.observacoes}
                onChange={(e) => setStatusQuestionarioData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Observações sobre a alteração de status..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveStatusQuestionario} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Alterar Status
              </Button>
              <Button variant="outline" onClick={() => setShowStatusQuestionario(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      

      {/* Dialog de Gerenciamento de Pagamento */}
      <Dialog open={showEditPaymentDialog} onOpenChange={setShowEditPaymentDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Gerenciar Pagamento</DialogTitle>
            <DialogDescription>
              {selectedPayment && `Gerencie todas as informações do pagamento "${selectedPayment.descricao}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Descrição</Label>
                <Input
                  value={editPaymentData.descricao}
                  onChange={(e) => setEditPaymentData(prev => ({ ...prev, descricao: e.target.value }))}
                  placeholder="Ex: Avaliação Neuropsicológica"
                />
              </div>
              <div>
                <Label>Valor (R$)</Label>
                <Input
                  value={editPaymentData.valor}
                  onChange={(e) => setEditPaymentData(prev => ({ ...prev, valor: e.target.value }))}
                  placeholder="250,00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data de Vencimento</Label>
                <Input
                  type="date"
                  value={editPaymentData.vencimento.split('/').reverse().join('-')}
                  onChange={(e) => setEditPaymentData(prev => ({ ...prev, vencimento: e.target.value.split('-').reverse().join('/') }))}
                />
              </div>
              <div>
                <Label>Status do Pagamento</Label>
                <Select 
                  value={editPaymentData.status} 
                  onValueChange={(value) => setEditPaymentData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="atrasado">Atrasado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="estornado">Estornado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Sessão Relacionada</Label>
              <Select 
                value={editPaymentData.sessao_id} 
                onValueChange={(value) => setEditPaymentData(prev => ({ ...prev, sessao_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma sessão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma sessão específica</SelectItem>
                  {sessoesMock.map((sessao) => (
                    <SelectItem key={sessao.id} value={sessao.id.toString()}>
                      {sessao.nome} - {sessao.data} às {sessao.horario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editPaymentData.sessao_id && editPaymentData.sessao_id !== "none" && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Sessão selecionada:</strong> {sessoesMock.find(s => s.id.toString() === editPaymentData.sessao_id)?.nome} 
                    <br />
                    <span className="text-blue-600">
                      {sessoesMock.find(s => s.id.toString() === editPaymentData.sessao_id)?.data} às {sessoesMock.find(s => s.id.toString() === editPaymentData.sessao_id)?.horario}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div>
              <Label>Método de Pagamento</Label>
              <Select 
                value={editPaymentData.metodo_pagamento} 
                onValueChange={(value) => setEditPaymentData(prev => ({ ...prev, metodo_pagamento: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                  <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                  <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Observações</Label>
              <Textarea
                value={editPaymentData.observacoes}
                onChange={(e) => setEditPaymentData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Observações sobre o pagamento, comprovantes, detalhes específicos..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveEditPayment} className="flex-1 bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
              <Button variant="outline" onClick={() => setShowEditPaymentDialog(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPacienteEdit;