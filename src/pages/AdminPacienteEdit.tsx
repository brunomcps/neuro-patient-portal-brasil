
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, DollarSign, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePaciente } from "@/hooks/usePacientes";
import { useSessoesPaciente, useCreateSessao } from "@/hooks/useSessoes";
import { useQuestionarios, useAssignQuestionario } from "@/hooks/useQuestionarios";
import { usePagamentosPaciente, useCreatePagamento } from "@/hooks/usePagamentos";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const AdminPacienteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  const { data: paciente, isLoading: pacienteLoading } = usePaciente(id!);
  const { data: sessoes, isLoading: sessoesLoading } = useSessoesPaciente(id!);
  const { data: questionarios } = useQuestionarios();
  const { data: pagamentos, isLoading: pagamentosLoading } = usePagamentosPaciente(id!);

  const createSessao = useCreateSessao();
  const assignQuestionario = useAssignQuestionario();
  const createPagamento = useCreatePagamento();

  // Estados para modais
  const [showNovaSessao, setShowNovaSessao] = useState(false);
  const [showAtribuirQuestionario, setShowAtribuirQuestionario] = useState(false);
  const [showNovoPagamento, setShowNovoPagamento] = useState(false);

  // Estados para formulários
  const [novaSessaoData, setNovaSessaoData] = useState({
    titulo: "",
    descricao: "",
    data_agendada: "",
    duracao_minutos: 60,
    local: "",
    tipo_local: "online" as "online" | "presencial",
    profissional_responsavel: "Dra. Gabrielly La-Cava",
    valor: 0,
    observacoes: ""
  });

  const [questionarioData, setQuestionarioData] = useState({
    sessao_id: "",
    questionario_id: "",
    visivel_paciente: true,
    obrigatorio: false
  });

  const [pagamentoData, setPagamentoData] = useState({
    valor: 0,
    data_vencimento: "",
    sessao_id: "",
    metodo_pagamento: "",
    observacoes: ""
  });

  const handleCreateSessao = async () => {
    if (!id) return;

    try {
      await createSessao.mutateAsync({
        paciente_id: id,
        ...novaSessaoData
      });
      
      toast.success("Sessão criada com sucesso!");
      setShowNovaSessao(false);
      setNovaSessaoData({
        titulo: "",
        descricao: "",
        data_agendada: "",
        duracao_minutos: 60,
        local: "",
        tipo_local: "online",
        profissional_responsavel: "Dra. Gabrielly La-Cava",
        valor: 0,
        observacoes: ""
      });
    } catch (error) {
      toast.error("Erro ao criar sessão");
    }
  };

  const handleAssignQuestionario = async () => {
    try {
      await assignQuestionario.mutateAsync(questionarioData);
      toast.success("Questionário atribuído com sucesso!");
      setShowAtribuirQuestionario(false);
      setQuestionarioData({
        sessao_id: "",
        questionario_id: "",
        visivel_paciente: true,
        obrigatorio: false
      });
    } catch (error) {
      toast.error("Erro ao atribuir questionário");
    }
  };

  const handleCreatePagamento = async () => {
    if (!id) return;

    try {
      await createPagamento.mutateAsync({
        paciente_id: id,
        ...pagamentoData,
        sessao_id: pagamentoData.sessao_id || undefined
      });
      
      toast.success("Pagamento criado com sucesso!");
      setShowNovoPagamento(false);
      setPagamentoData({
        valor: 0,
        data_vencimento: "",
        sessao_id: "",
        metodo_pagamento: "",
        observacoes: ""
      });
    } catch (error) {
      toast.error("Erro ao criar pagamento");
    }
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
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/admin/pacientes")}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{paciente.usuarios?.nome}</h1>
          <p className="text-gray-600">{paciente.usuarios?.email}</p>
        </div>
        <Badge variant={paciente.status === 'ativo' ? 'default' : 'secondary'}>
          {paciente.status.charAt(0).toUpperCase() + paciente.status.slice(1)}
        </Badge>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex space-x-8">
          {[
            { id: "info", label: "Informações", icon: FileText },
            { id: "sessoes", label: "Sessões", icon: Calendar },
            { id: "pagamentos", label: "Pagamentos", icon: DollarSign },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo das tabs */}
      {activeTab === "info" && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input value={paciente.usuarios?.nome || ""} readOnly />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={paciente.usuarios?.email || ""} readOnly />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input value={paciente.usuarios?.telefone || ""} readOnly />
              </div>
              <div>
                <Label>Data de Nascimento</Label>
                <Input 
                  value={paciente.usuarios?.data_nascimento 
                    ? new Date(paciente.usuarios.data_nascimento).toLocaleDateString('pt-BR')
                    : ""
                  } 
                  readOnly 
                />
              </div>
              <div className="md:col-span-2">
                <Label>Endereço</Label>
                <Input value={paciente.usuarios?.endereco || ""} readOnly />
              </div>
              {paciente.responsavel_nome && (
                <>
                  <div>
                    <Label>Responsável</Label>
                    <Input value={paciente.responsavel_nome} readOnly />
                  </div>
                  <div>
                    <Label>Telefone do Responsável</Label>
                    <Input value={paciente.responsavel_telefone || ""} readOnly />
                  </div>
                </>
              )}
              <div className="md:col-span-2">
                <Label>Observações</Label>
                <Textarea value={paciente.observacoes || ""} readOnly />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "sessoes" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sessões</h2>
            <div className="flex gap-2">
              <Dialog open={showNovaSessao} onOpenChange={setShowNovaSessao}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Sessão
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Agendar Nova Sessão</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={novaSessaoData.titulo}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, titulo: e.target.value }))}
                          placeholder="Ex: Primeira Consulta"
                        />
                      </div>
                      <div>
                        <Label>Data e Hora</Label>
                        <Input
                          type="datetime-local"
                          value={novaSessaoData.data_agendada}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, data_agendada: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={novaSessaoData.descricao}
                        onChange={(e) => setNovaSessaoData(prev => ({ ...prev, descricao: e.target.value }))}
                        placeholder="Descrição da sessão..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Duração (minutos)</Label>
                        <Input
                          type="number"
                          value={novaSessaoData.duracao_minutos}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, duracao_minutos: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>Tipo</Label>
                        <Select
                          value={novaSessaoData.tipo_local}
                          onValueChange={(value: "online" | "presencial") => 
                            setNovaSessaoData(prev => ({ ...prev, tipo_local: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="presencial">Presencial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Local/Link</Label>
                      <Input
                        value={novaSessaoData.local}
                        onChange={(e) => setNovaSessaoData(prev => ({ ...prev, local: e.target.value }))}
                        placeholder="Link do Google Meet ou endereço"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Profissional</Label>
                        <Input
                          value={novaSessaoData.profissional_responsavel}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, profissional_responsavel: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Valor (R$)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={novaSessaoData.valor}
                          onChange={(e) => setNovaSessaoData(prev => ({ ...prev, valor: parseFloat(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Observações</Label>
                      <Textarea
                        value={novaSessaoData.observacoes}
                        onChange={(e) => setNovaSessaoData(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Observações adicionais..."
                      />
                    </div>
                    <Button onClick={handleCreateSessao} disabled={createSessao.isPending}>
                      <Save className="w-4 h-4 mr-2" />
                      {createSessao.isPending ? "Criando..." : "Criar Sessão"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showAtribuirQuestionario} onOpenChange={setShowAtribuirQuestionario}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Atribuir Questionário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Atribuir Questionário à Sessão</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div>
                      <Label>Sessão</Label>
                      <Select
                        value={questionarioData.sessao_id}
                        onValueChange={(value) => setQuestionarioData(prev => ({ ...prev, sessao_id: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma sessão" />
                        </SelectTrigger>
                        <SelectContent>
                          {sessoes?.map((sessao) => (
                            <SelectItem key={sessao.id} value={sessao.id}>
                              {sessao.titulo} - {new Date(sessao.data_agendada).toLocaleDateString('pt-BR')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Questionário</Label>
                      <Select
                        value={questionarioData.questionario_id}
                        onValueChange={(value) => setQuestionarioData(prev => ({ ...prev, questionario_id: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um questionário" />
                        </SelectTrigger>
                        <SelectContent>
                          {questionarios?.map((questionario) => (
                            <SelectItem key={questionario.id} value={questionario.id}>
                              {questionario.titulo} ({questionario.tipo})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="visivel"
                        checked={questionarioData.visivel_paciente}
                        onChange={(e) => setQuestionarioData(prev => ({ ...prev, visivel_paciente: e.target.checked }))}
                      />
                      <Label htmlFor="visivel">Visível para o paciente</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="obrigatorio"
                        checked={questionarioData.obrigatorio}
                        onChange={(e) => setQuestionarioData(prev => ({ ...prev, obrigatorio: e.target.checked }))}
                      />
                      <Label htmlFor="obrigatorio">Obrigatório</Label>
                    </div>
                    <Button onClick={handleAssignQuestionario} disabled={assignQuestionario.isPending}>
                      {assignQuestionario.isPending ? "Atribuindo..." : "Atribuir"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4">
            {sessoesLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))
            ) : sessoes?.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Nenhuma sessão encontrada.</p>
                </CardContent>
              </Card>
            ) : (
              sessoes?.map((sessao) => (
                <Card key={sessao.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{sessao.titulo}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {new Date(sessao.data_agendada).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <Badge variant={
                        sessao.status === 'agendada' ? 'default' :
                        sessao.status === 'concluida' ? 'outline' : 'destructive'
                      }>
                        {sessao.status.charAt(0).toUpperCase() + sessao.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Tipo</p>
                        <p>{sessao.tipo_local === 'online' ? 'Online' : 'Presencial'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duração</p>
                        <p>{sessao.duracao_minutos} minutos</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Profissional</p>
                        <p>{sessao.profissional_responsavel}</p>
                      </div>
                      {sessao.valor && (
                        <div>
                          <p className="text-gray-600">Valor</p>
                          <p>R$ {sessao.valor.toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                    {sessao.descricao && (
                      <div className="mt-3">
                        <p className="text-gray-600 text-sm">Descrição</p>
                        <p className="text-sm">{sessao.descricao}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "pagamentos" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pagamentos</h2>
            <Dialog open={showNovoPagamento} onOpenChange={setShowNovoPagamento}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Pagamento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Pagamento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Valor (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={pagamentoData.valor}
                        onChange={(e) => setPagamentoData(prev => ({ ...prev, valor: parseFloat(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label>Data de Vencimento</Label>
                      <Input
                        type="date"
                        value={pagamentoData.data_vencimento}
                        onChange={(e) => setPagamentoData(prev => ({ ...prev, data_vencimento: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Sessão (opcional)</Label>
                    <Select
                      value={pagamentoData.sessao_id}
                      onValueChange={(value) => setPagamentoData(prev => ({ ...prev, sessao_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma sessão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Nenhuma sessão específica</SelectItem>
                        {sessoes?.map((sessao) => (
                          <SelectItem key={sessao.id} value={sessao.id}>
                            {sessao.titulo} - {new Date(sessao.data_agendada).toLocaleDateString('pt-BR')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Método de Pagamento</Label>
                    <Input
                      value={pagamentoData.metodo_pagamento}
                      onChange={(e) => setPagamentoData(prev => ({ ...prev, metodo_pagamento: e.target.value }))}
                      placeholder="Ex: PIX, Cartão, Dinheiro"
                    />
                  </div>
                  <div>
                    <Label>Observações</Label>
                    <Textarea
                      value={pagamentoData.observacoes}
                      onChange={(e) => setPagamentoData(prev => ({ ...prev, observacoes: e.target.value }))}
                      placeholder="Observações sobre o pagamento..."
                    />
                  </div>
                  <Button onClick={handleCreatePagamento} disabled={createPagamento.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    {createPagamento.isPending ? "Criando..." : "Criar Pagamento"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {pagamentosLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))
            ) : pagamentos?.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Nenhum pagamento encontrado.</p>
                </CardContent>
              </Card>
            ) : (
              pagamentos?.map((pagamento) => (
                <Card key={pagamento.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div>
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="font-semibold text-lg">R$ {pagamento.valor.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Vencimento</p>
                          <p>{new Date(pagamento.data_vencimento).toLocaleDateString('pt-BR')}</p>
                        </div>
                        {pagamento.metodo_pagamento && (
                          <div>
                            <p className="text-sm text-gray-600">Método</p>
                            <p>{pagamento.metodo_pagamento}</p>
                          </div>
                        )}
                        {pagamento.data_pagamento && (
                          <div>
                            <p className="text-sm text-gray-600">Data de Pagamento</p>
                            <p>{new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')}</p>
                          </div>
                        )}
                      </div>
                      <Badge variant={
                        pagamento.status === 'pago' ? 'default' :
                        pagamento.status === 'pendente' ? 'outline' : 'destructive'
                      }>
                        {pagamento.status.charAt(0).toUpperCase() + pagamento.status.slice(1)}
                      </Badge>
                    </div>
                    {pagamento.observacoes && (
                      <div className="mt-3">
                        <p className="text-gray-600 text-sm">Observações</p>
                        <p className="text-sm">{pagamento.observacoes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPacienteEdit;
