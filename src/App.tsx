import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Oferta from "./pages/Oferta";
import Realizacje from "./pages/Realizacje";
import Kalkulator from "./pages/Kalkulator";
import Blog from "./pages/Blog";
import Kontakt from "./pages/Kontakt";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/realizacje" element={<Realizacje />} />
          <Route path="/kalkulator" element={<Kalkulator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
