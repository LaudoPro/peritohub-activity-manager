
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/layout/Layout";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Processos from "./pages/Processos";
import ProcessoForm from "./pages/ProcessoForm";
import Laudos from "./pages/Laudos";
import LaudoForm from "./pages/LaudoForm";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";
import RelatorioFotografico from "./pages/RelatorioFotografico";
import GerarPDF from "./pages/GerarPDF";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Layout requireAuth={false}><Login /></Layout>} />
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/processos" element={<Layout><Processos /></Layout>} />
            <Route path="/processos/novo" element={<Layout><ProcessoForm /></Layout>} />
            <Route path="/processos/:id" element={<Layout><ProcessoForm /></Layout>} />
            <Route path="/laudos" element={<Layout><Laudos /></Layout>} />
            <Route path="/laudos/novo" element={<Layout><LaudoForm /></Layout>} />
            <Route path="/laudos/:id" element={<Layout><LaudoForm /></Layout>} />
            <Route path="/laudos/:id/editar" element={<Layout><LaudoForm /></Layout>} />
            <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
            <Route path="/configuracoes" element={<Layout><Configuracoes /></Layout>} />
            <Route path="/relatorio-fotografico" element={<Layout><RelatorioFotografico /></Layout>} />
            <Route path="/gerar-pdf" element={<Layout><GerarPDF /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
