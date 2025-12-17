import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import OverviewPage from "./pages/dashboard/OverviewPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import TemplatesPage from "./pages/dashboard/TemplatesPage";
import ReportEditorPage from "./pages/ReportEditorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Dashboard with Sidebar Layout */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<OverviewPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="recent" element={<OverviewPage />} />
            <Route path="favorites" element={<OverviewPage />} />
            <Route path="assets" element={<OverviewPage />} />
            <Route path="team" element={<OverviewPage />} />
            <Route path="settings" element={<OverviewPage />} />
          </Route>
          
          {/* Report Editor (Full screen, no dashboard sidebar) */}
          <Route path="/reports/:id" element={<ProtectedRoute><ReportEditorPage /></ProtectedRoute>} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
