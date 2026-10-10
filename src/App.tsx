
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Restaurant from "./pages/Restaurant";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import QRPage from "./pages/QRPage";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import CarouselDownload from "./pages/CarouselDownload";
import CoversDownload from "./pages/CoversDownload";
import ConsultCarouselDownload from "./pages/ConsultCarouselDownload";
import Oct2026 from "./pages/Oct2026";
import ChecklistPreviews from "./pages/ChecklistPreviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Restaurant />} />
          <Route path="/slides" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/checklist-previews" element={<ChecklistPreviews />} />
          <Route path="/carousel-pl" element={<CarouselDownload />} />
          <Route path="/reels-covers" element={<CoversDownload />} />
          <Route path="/carousel-consult" element={<ConsultCarouselDownload />} />
          <Route path="/oct-2026" element={<Oct2026 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;