
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  CreditCard, 
  DollarSign,
  ArrowLeft,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  FileText,
  ExternalLink,
  Calendar
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const PacientePagamentos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedPagamento, setSelectedPagamento] = useState<any>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.tipo_usuario === "administrador") {
      navigate("/admin");
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const pagamentos = [
    {
      id: 1,
      descricao: "Sessão Inicial + Avaliação Cognitiva",
      valor: 800.00,
      data_vencimento: "2024-01-20",
      data_pagamento: "2024-01-18",
      status: "pago",
      metodo_pagamento: "PIX",
      numero_recibo: "REC-2024-001",
      sessoes_incluidas: ["Sessão Inicial", "Avaliação Cognitiva"],
      observacoes: "Pagamento realizado via PIX"
    },
    {
      id: 2,
      descricao: "Testes Específicos + Avaliação Comportamental",
      valor: 900.00,
      data_vencimento: "2024-02-20",
      data_pagamento: null,
      status: "pendente",
      metodo_pagamento: null,
      numero_recibo: null,
      sessoes_incluidas: ["Testes Específicos", "Avaliação Comportamental"],
      link_pagamento: "https://pagamento.exemplo.com/pag123",
      codigo_pix: "00020126580014BR.GOV.BCB.PIX013636297dfc-f41e-4b88-9d0a-example",
      qr_code: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    },
    {
      id: 3,
      descricao: "Sessão de Alinhamento Diagnóstico + Relatório",
      valor: 600.00,
      data_vencimento: "2024-03-05",
      data_pagamento: null,
      status: "futuro",
      metodo_pagamento: null,
      numero_recibo: null,
      sessoes_incluidas: ["Sessão de Alinhamento Diagnóstico", "Elaboração do Relatório Final"],
      observacoes: "Valor será cobrado após conclusão das sessões anteriores"
    },
    {
      id: 4,
      descricao: "Taxa de Reagendamento",
      valor: 50.00,
      data_vencimento: "2024-02-10",
      data_pagamento: null,
      status: "atrasado",
      metodo_pagamento: null,
      numero_recibo: null,
      sessoes_incluidas: [],
      observacoes: "Taxa referente ao reagendamento da sessão de 15/02",
      dias_atraso: 5
    }
  ];

  const resumoFinanceiro = {
    total_pago: 800.00,
    total_pendente: 950.00,
    total_atrasado: 50.00,
    total_geral: 2400.00,
    proximos_pagamentos: pagamentos.filter(p => p.status === "pendente").length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "pendente":
        return <Clock className="h-5 w-5 text-orange-600" />;
      case "atrasado":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-orange-100 text-orange-800";
      case "atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pago":
        return "Pago";
      case "pendente":
        return "Pendente";
      case "atrasado":
        return "Atrasado";
      default:
        return "Futuro";
    }
  };

  const handlePagar = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowPaymentDialog(true);
  };

  const handleVerRecibo = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowReceiptDialog(true);
  };

  const handleDownloadRecibo = (pagamento: any) => {
    toast({
      title: "Download iniciado",
      description: `Recibo ${pagamento.numero_recibo} será baixado em instantes.`,
    });
  };

  const handleCopyPix = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast({
      title: "Código PIX copiado",
      description: "O código PIX foi copiado para a área de transferência.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Meus Pagamentos</h1>
              <p className="text-gray-600">Gerencie seus pagamentos e visualize comprovantes</p>
            </div>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pago</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(resumoFinanceiro.total_pago)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pendente</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(resumoFinanceiro.total_pendente)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Atraso</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(resumoFinanceiro.total_atrasado)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Geral</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(resumoFinanceiro.total_geral)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Pagamentos */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Histórico de Pagamentos
            </CardTitle>
            <CardDescription>
              Visualize todos os seus pagamentos, pendências e comprovantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pagamentos.map((pagamento) => (
                <Card key={pagamento.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(pagamento.status)}
                          <h3 className="text-lg font-semibold text-gray-800">{pagamento.descricao}</h3>
                          <Badge className={getStatusColor(pagamento.status)}>
                            {getStatusText(pagamento.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Valor</p>
                            <p className="text-xl font-bold text-gray-800">{formatCurrency(pagamento.valor)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Vencimento</p>
                            <p className="text-sm text-gray-700">
                              {new Date(pagamento.data_vencimento).toLocaleDateString('pt-BR')}
                            </p>
                            {pagamento.status === "pendente" && getDaysUntilDue(pagamento.data_vencimento) <= 7 && (
                              <p className="text-xs text-orange-600">
                                {getDaysUntilDue(pagamento.data_vencimento) === 0 ? "Vence hoje!" :
                                 getDaysUntilDue(pagamento.data_vencimento) > 0 ? `Vence em ${getDaysUntilDue(pagamento.data_vencimento)} dias` :
                                 `Venceu há ${Math.abs(getDaysUntilDue(pagamento.data_vencimento))} dias`}
                              </p>
                            )}
                          </div>
                          <div>
                            {pagamento.data_pagamento && (
                              <>
                                <p className="text-sm font-medium text-gray-600">Data do Pagamento</p>
                                <p className="text-sm text-gray-700">
                                  {new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')}
                                </p>
                              </>
                            )}
                            {pagamento.metodo_pagamento && (
                              <p className="text-xs text-gray-500">via {pagamento.metodo_pagamento}</p>
                            )}
                          </div>
                        </div>

                        {pagamento.sessoes_incluidas.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-600 mb-2">Sessões incluídas:</p>
                            <div className="flex flex-wrap gap-2">
                              {pagamento.sessoes_incluidas.map((sessao, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {sessao}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {pagamento.observacoes && (
                          <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <p className="text-sm text-gray-700">{pagamento.observacoes}</p>
                          </div>
                        )}

                        {pagamento.status === "atrasado" && pagamento.dias_atraso && (
                          <div className="bg-red-50 p-3 rounded-lg mb-4">
                            <p className="text-sm text-red-800 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Pagamento em atraso há {pagamento.dias_atraso} dias
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(pagamento.status === "pendente" || pagamento.status === "atrasado") && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handlePagar(pagamento)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pagar Agora
                        </Button>
                      )}

                      {pagamento.status === "pago" && pagamento.numero_recibo && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleVerRecibo(pagamento)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Recibo
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadRecibo(pagamento)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </>
                      )}

                      {pagamento.link_pagamento && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={pagamento.link_pagamento} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Link de Pagamento
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Pagamento */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-2xl">
            {selectedPagamento && (
              <>
                <DialogHeader>
                  <DialogTitle>Realizar Pagamento</DialogTitle>
                  <DialogDescription>
                    {selectedPagamento.descricao} - {formatCurrency(selectedPagamento.valor)}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* PIX */}
                  {selectedPagamento.codigo_pix && (
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                        <Receipt className="h-5 w-5 mr-2 text-blue-600" />
                        Pagamento via PIX
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Código PIX Copia e Cola</Label>
                          <div className="flex space-x-2 mt-1">
                            <Input 
                              value={selectedPagamento.codigo_pix} 
                              readOnly 
                              className="text-xs"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => handleCopyPix(selectedPagamento.codigo_pix)}
                            >
                              Copiar
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <Label>QR Code</Label>
                          <div className="bg-white p-2 border rounded mt-1">
                            <img 
                              src={selectedPagamento.qr_code} 
                              alt="QR Code PIX" 
                              className="w-32 h-32"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cartão de Crédito */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                      Cartão de Crédito
                    </h4>
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Número do Cartão</Label>
                          <Input placeholder="**** **** **** ****" />
                        </div>
                        <div>
                          <Label>Nome no Cartão</Label>
                          <Input placeholder="Nome como no cartão" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label>Validade</Label>
                          <Input placeholder="MM/AA" />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input placeholder="***" />
                        </div>
                        <div>
                          <Label>Parcelas</Label>
                          <select className="w-full p-2 border border-gray-200 rounded-md">
                            <option>1x sem juros</option>
                            <option>2x sem juros</option>
                            <option>3x sem juros</option>
                          </select>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Pagar {formatCurrency(selectedPagamento.valor)}
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Recibo */}
        <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
          <DialogContent>
            {selectedPagamento && (
              <>
                <DialogHeader>
                  <DialogTitle>Comprovante de Pagamento</DialogTitle>
                  <DialogDescription>
                    Recibo nº {selectedPagamento.numero_recibo}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Descrição:</span>
                        <span>{selectedPagamento.descricao}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Valor:</span>
                        <span className="font-bold">{formatCurrency(selectedPagamento.valor)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Data do Pagamento:</span>
                        <span>{new Date(selectedPagamento.data_pagamento).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Método:</span>
                        <span>{selectedPagamento.metodo_pagamento}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <Badge className="bg-green-100 text-green-800">Pago</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleDownloadRecibo(selectedPagamento)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={() => setShowReceiptDialog(false)}>
                      Fechar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PacientePagamentos;
