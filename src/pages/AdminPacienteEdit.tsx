
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Upload, Link, Download, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    { id: 1, descricao: "Sessão Inicial", valor: "R$ 250,00", vencimento: "09/01/2024", status: "Pago", dataPagamento: "08/01/2024" },
    { id: 2, descricao: "Avaliação Cognitiva", valor: "R$ 250,00", vencimento: "16/01/2024", status: "Pago", dataPagamento: "15/01/2024" },
    { id: 3, descricao: "Testes Específicos", valor: "R$ 250,00", vencimento: "14/02/2024", status: "Pendente", dataPagamento: "-" },
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
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
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
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
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
              <div className="overflow-hidden">
                <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                  <div>Descrição</div>
                  <div>Valor</div>
                  <div>Vencimento</div>
                  <div>Status</div>
                  <div>Data Pagamento</div>
                  <div>Ações</div>
                </div>
                {pagamentosMock.map((pagamento) => (
                  <div key={pagamento.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                    <div className="font-medium">{pagamento.descricao}</div>
                    <div className="font-semibold">{pagamento.valor}</div>
                    <div className="text-gray-600">{pagamento.vencimento}</div>
                    <div>
                      <Badge variant={pagamento.status === "Pago" ? "default" : "outline"}>
                        {pagamento.status}
                      </Badge>
                    </div>
                    <div className="text-gray-600">{pagamento.dataPagamento}</div>
                    <div className="flex gap-1">
                      {pagamento.status === "Pendente" && (
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                          Marcar Pago
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                        <Edit className="w-4 h-4" />
                      </Button>
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
    </div>
  );
};

export default AdminPacienteEdit;
