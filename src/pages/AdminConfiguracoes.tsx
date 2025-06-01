
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Settings, 
  Save, 
  User, 
  Bell, 
  Shield, 
  Database,
  Mail,
  Clock,
  FileText,
  Globe
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const AdminConfiguracoes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estados das configurações
  const [configuracoes, setConfiguracoes] = useState({
    // Configurações Gerais
    nomeClinica: "Clínica Neuropsicológica",
    endereco: "Rua das Flores, 123 - São Paulo/SP",
    telefone: "(11) 99999-0000",
    email: "contato@clinica.com",
    website: "www.clinica.com",
    
    // Configurações de Notificações
    notificacoesEmail: true,
    notificacoesSMS: false,
    lembreteConsulta: true,
    lembreteHoras: 24,
    
    // Configurações de Segurança
    senhaMinima: 8,
    sessaoExpira: 480, // minutos
    backupAutomatico: true,
    
    // Configurações de Sistema
    fusoHorario: "America/Sao_Paulo",
    formatoData: "DD/MM/YYYY",
    idioma: "pt-BR",
    
    // Configurações de Laudos
    templatePadrao: "Template Neuropsicológico Padrão",
    assinaturaDigital: true,
    validadeLaudo: 365, // dias
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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("configuracoes_sistema", JSON.stringify(configuracoes));
      
      toast({
        title: "Configurações salvas",
        description: "As configurações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = (key: string, value: any) => {
    setConfiguracoes(prev => ({ ...prev, [key]: value }));
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
              <h1 className="text-3xl font-bold text-gray-800">Configurações Gerais</h1>
              <p className="text-gray-600">Gerencie as configurações do sistema</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configurações Gerais */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                Informações da Clínica
              </CardTitle>
              <CardDescription>
                Informações básicas da clínica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nomeClinica">Nome da Clínica</Label>
                <Input
                  id="nomeClinica"
                  value={configuracoes.nomeClinica}
                  onChange={(e) => updateConfig("nomeClinica", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Textarea
                  id="endereco"
                  value={configuracoes.endereco}
                  onChange={(e) => updateConfig("endereco", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={configuracoes.telefone}
                  onChange={(e) => updateConfig("telefone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={configuracoes.email}
                  onChange={(e) => updateConfig("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={configuracoes.website}
                  onChange={(e) => updateConfig("website", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Notificações */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-green-600" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure as notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-gray-600">Enviar notificações via e-mail</p>
                </div>
                <Switch
                  checked={configuracoes.notificacoesEmail}
                  onCheckedChange={(checked) => updateConfig("notificacoesEmail", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por SMS</Label>
                  <p className="text-sm text-gray-600">Enviar notificações via SMS</p>
                </div>
                <Switch
                  checked={configuracoes.notificacoesSMS}
                  onCheckedChange={(checked) => updateConfig("notificacoesSMS", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Lembrete de Consulta</Label>
                  <p className="text-sm text-gray-600">Enviar lembretes automáticos</p>
                </div>
                <Switch
                  checked={configuracoes.lembreteConsulta}
                  onCheckedChange={(checked) => updateConfig("lembreteConsulta", checked)}
                />
              </div>
              {configuracoes.lembreteConsulta && (
                <div>
                  <Label htmlFor="lembreteHoras">Horas antes da consulta</Label>
                  <Input
                    id="lembreteHoras"
                    type="number"
                    value={configuracoes.lembreteHoras}
                    onChange={(e) => updateConfig("lembreteHoras", parseInt(e.target.value))}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações de Segurança */}
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Segurança
              </CardTitle>
              <CardDescription>
                Configurações de segurança do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="senhaMinima">Tamanho mínimo da senha</Label>
                <Input
                  id="senhaMinima"
                  type="number"
                  value={configuracoes.senhaMinima}
                  onChange={(e) => updateConfig("senhaMinima", parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="sessaoExpira">Sessão expira em (minutos)</Label>
                <Input
                  id="sessaoExpira"
                  type="number"
                  value={configuracoes.sessaoExpira}
                  onChange={(e) => updateConfig("sessaoExpira", parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-gray-600">Realizar backup diário automático</p>
                </div>
                <Switch
                  checked={configuracoes.backupAutomatico}
                  onCheckedChange={(checked) => updateConfig("backupAutomatico", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Sistema */}
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-purple-600" />
                Sistema
              </CardTitle>
              <CardDescription>
                Configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fusoHorario">Fuso Horário</Label>
                <Input
                  id="fusoHorario"
                  value={configuracoes.fusoHorario}
                  onChange={(e) => updateConfig("fusoHorario", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="formatoData">Formato de Data</Label>
                <Input
                  id="formatoData"
                  value={configuracoes.formatoData}
                  onChange={(e) => updateConfig("formatoData", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="idioma">Idioma</Label>
                <Input
                  id="idioma"
                  value={configuracoes.idioma}
                  onChange={(e) => updateConfig("idioma", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configurações de Laudos */}
        <Card className="border-orange-100 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-orange-600" />
              Configurações de Laudos
            </CardTitle>
            <CardDescription>
              Configure os padrões para geração de laudos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="templatePadrao">Template Padrão</Label>
                <Input
                  id="templatePadrao"
                  value={configuracoes.templatePadrao}
                  onChange={(e) => updateConfig("templatePadrao", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="validadeLaudo">Validade do Laudo (dias)</Label>
                <Input
                  id="validadeLaudo"
                  type="number"
                  value={configuracoes.validadeLaudo}
                  onChange={(e) => updateConfig("validadeLaudo", parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Assinatura Digital</Label>
                <p className="text-sm text-gray-600">Habilitar assinatura digital nos laudos</p>
              </div>
              <Switch
                checked={configuracoes.assinaturaDigital}
                onCheckedChange={(checked) => updateConfig("assinaturaDigital", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Status do Sistema */}
        <Card className="border-gray-100 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-gray-600" />
              Status do Sistema
            </CardTitle>
            <CardDescription>
              Informações sobre o estado atual do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Online
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Status do Sistema</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary">
                  v1.0.0
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Versão Atual</p>
              </div>
              <div className="text-center">
                <Badge variant="outline">
                  {new Date().toLocaleDateString()}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Último Backup</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminConfiguracoes;
