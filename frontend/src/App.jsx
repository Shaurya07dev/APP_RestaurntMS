import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlaceOrder from "./pages/PlaceOrder";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TableReservation from "./pages/TableReservation";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
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
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/reservation" element={<TableReservation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

