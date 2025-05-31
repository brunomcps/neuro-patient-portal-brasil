
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPacientes from "./pages/AdminPacientes";
import AdminPacienteEdit from "./pages/AdminPacienteEdit";
import AdminAgendamentos from "./pages/AdminAgendamentos";
import AdminRelatorios from "./pages/AdminRelatorios";
import AdminQuestionarios from "./pages/AdminQuestionarios";
import AdminSessoes from "./pages/AdminSessoes";
import Recursos from "./pages/Recursos";
import NotFound from "./pages/NotFound";
import PacienteSessoes from "./pages/PacienteSessoes";
import PacientePagamentos from "./pages/PacientePagamentos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pacientes" element={<AdminPacientes />} />
          <Route path="/admin/pacientes/novo" element={<AdminPacienteEdit />} />
          <Route path="/admin/pacientes/edit/:id" element={<AdminPacienteEdit />} />
          <Route path="/admin/agendamentos" element={<AdminAgendamentos />} />
          <Route path="/admin/questionarios" element={<AdminQuestionarios />} />
          <Route path="/admin/relatorios" element={<AdminRelatorios />} />
          <Route path="/admin/sessoes" element={<AdminSessoes />} />
          <Route path="/paciente/pagamentos" element={<PacientePagamentos />} />
          <Route path="/paciente/sessoes" element={<PacienteSessoes />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
