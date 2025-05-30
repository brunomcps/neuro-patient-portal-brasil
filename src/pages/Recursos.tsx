
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  FileText, 
  Clock, 
  Shield, 
  Phone,
  Mail,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users
} from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const Recursos = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({ nome: "", email: "", mensagem: "" });
  };

  const faqItems = [
    {
      pergunta: "Quanto tempo dura o processo de avaliação?",
      resposta: "O processo completo geralmente leva de 4 a 6 semanas, incluindo 5 sessões presenciais ou online e o período de elaboração do laudo."
    },
    {
      pergunta: "Preciso me preparar para as sessões?",
      resposta: "Sim, algumas orientações específicas são fornecidas antes de cada sessão. Procure ter uma boa noite de sono e evitar medicamentos que possam interferir na avaliação, exceto se prescritos pelo médico."
    },
    {
      pergunta: "Como posso acessar meu laudo?",
      resposta: "O laudo estará disponível para download no portal após a conclusão da avaliação. Você receberá uma notificação por e-mail quando estiver pronto."
    },
    {
      pergunta: "Posso reagendar uma sessão?",
      resposta: "Sim, reagendamentos podem ser feitos através do portal ou entrando em contato com nossa secretária pelo WhatsApp com pelo menos 24 horas de antecedência."
    },
    {
      pergunta: "Os dados são seguros?",
      resposta: "Sim, utilizamos criptografia e seguimos todas as normas de privacidade médica. Seus dados são protegidos e utilizados apenas para fins da avaliação neuropsicológica."
    }
  ];

  const dicas = [
    {
      titulo: "Antes das sessões",
      items: [
        "Tenha uma boa noite de sono",
        "Tome o café da manhã normalmente",
        "Evite álcool 24h antes",
        "Traga documentos médicos anteriores"
      ]
    },
    {
      titulo: "Durante os testes",
      items: [
        "Mantenha-se relaxado",
        "Responda naturalmente",
        "Não se preocupe com acertos ou erros",
        "Comunique qualquer desconforto"
      ]
    },
    {
      titulo: "Após as sessões",
      items: [
        "Complete formulários pendentes",
        "Siga orientações específicas",
        "Mantenha contato para dúvidas",
        "Aguarde o agendamento da devolutiva"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header user={{ nome: "Visitante", tipo_usuario: "visitante" }} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Recursos e Informações
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre todas as informações necessárias sobre o processo de avaliação neuropsicológica, 
            dicas de preparação e recursos úteis.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Avaliação Neuropsicológica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Processo científico que avalia funções cognitivas como memória, atenção, 
                linguagem e funções executivas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Duração do Processo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                5 sessões distribuídas ao longo de 4-6 semanas, seguidas de elaboração 
                e entrega do laudo em até 10 dias.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Segurança e Privacidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Todos os dados são protegidos com criptografia e seguem rigorosamente 
                as normas de privacidade médica.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Dicas de Preparação */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Dicas de Preparação
              </CardTitle>
              <CardDescription>
                Orientações importantes para cada fase da avaliação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dicas.map((categoria, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-800 mb-3">{categoria.titulo}</h4>
                    <ul className="space-y-2">
                      {categoria.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                Perguntas Frequentes
              </CardTitle>
              <CardDescription>
                Respostas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-800 mb-2">{item.pergunta}</h4>
                    <p className="text-sm text-gray-600">{item.resposta}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Políticas e Documentos */}
        <Card className="mb-12 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Políticas e Documentos
            </CardTitle>
            <CardDescription>
              Informações importantes sobre privacidade e termos de uso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Política de Privacidade</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Seus dados pessoais e de saúde são protegidos de acordo com a LGPD. 
                  Utilizamos apenas para fins da avaliação neuropsicológica e não compartilhamos 
                  com terceiros sem autorização.
                </p>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Ler Política Completa
                </Button>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Termos de Uso</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Ao utilizar o portal, você concorda com nossos termos de uso e 
                  procedimentos. O portal é exclusivo para pacientes em processo de avaliação.
                </p>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Ler Termos Completos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-orange-600" />
                Entre em Contato
              </CardTitle>
              <CardDescription>
                Envie sua dúvida ou mensagem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContact} className="space-y-4">
                <div>
                  <Input
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Sua mensagem"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                Outras Formas de Contato
              </CardTitle>
              <CardDescription>
                Canais diretos de comunicação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">WhatsApp</h4>
                  <p className="text-sm text-gray-600">Para agendamentos e dúvidas urgentes</p>
                  <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                    Abrir WhatsApp
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">E-mail</h4>
                  <p className="text-sm text-gray-600">contato@portal-neuro.com</p>
                  <p className="text-xs text-gray-500">Resposta em até 24h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Telefone</h4>
                  <p className="text-sm text-gray-600">(11) 9999-9999</p>
                  <p className="text-xs text-gray-500">Seg-Sex, 8h às 18h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recursos;
