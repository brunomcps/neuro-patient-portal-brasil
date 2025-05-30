
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calendar, FileText, Users, Shield, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (user) {
    navigate(user.tipo_usuario === "administrador" ? "/admin" : "/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Portal Neuropsicológico</h1>
          </div>
          <Button onClick={() => navigate("/login")} className="bg-blue-600 hover:bg-blue-700">
            Fazer Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Portal do Paciente para 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Avaliação Neuropsicológica</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Acompanhe seu processo de avaliação de forma organizada e segura. 
              Acesse formulários, agende sessões e receba seus resultados em um ambiente profissional.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate("/login")} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3"
              >
                Acessar Portal
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/recursos")}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Funcionalidades do Portal
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl text-gray-800">Agendamento Fácil</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Agende suas sessões de forma prática e visualize sua linha do tempo de avaliação.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl text-gray-800">Formulários Digitais</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Preencha formulários e escalas de autoavaliação de forma segura e organizada.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl text-gray-800">Seguro e Privado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Seus dados são protegidos com a mais alta segurança e privacidade médica.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Como Funciona o Processo
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: 1, title: "Sessão Inicial", icon: Users },
                { step: 2, title: "Sessão 2", icon: Brain },
                { step: 3, title: "Sessão 3", icon: FileText },
                { step: 4, title: "Sessão 4", icon: Calendar },
                { step: 5, title: "Alinhamento Diagnóstico", icon: Shield }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Etapa {item.step}</h3>
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Portal Neuropsicológico</h3>
              </div>
              <p className="text-gray-400">
                Plataforma segura para acompanhamento de avaliações neuropsicológicas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/recursos" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-gray-400">
                Para dúvidas sobre seu processo de avaliação, entre em contato conosco.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Portal Neuropsicológico. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
