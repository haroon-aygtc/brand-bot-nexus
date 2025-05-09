
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import ChatPage from "@/pages/ChatPage";
import WidgetConfigPage from "@/pages/WidgetConfigPage";
import NotFound from "@/pages/NotFound";
import AiModelsPage from "@/pages/AiModelsPage";
import AiModelConfigPage from "@/pages/AiModelConfigPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import ScraperPage from "@/pages/ScraperPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SystemSettingsPage from "@/pages/SystemSettingsPage";
import UserManagementPage from "@/pages/UserManagementPage";
import ContextRulesPage from "@/pages/ContextRulesPage";
import EmbedCodePage from "@/pages/EmbedCodePage";
import TemplatesPage from "@/pages/TemplatesPage";
import ResponseFormatterPage from "@/pages/ResponseFormatterPage";
import { AiConfigRoutes } from "@/components/ai-config";
import AiConfigPage from "@/pages/AiConfigPage";
import HomePage from "@/pages/HomePage";
import ApiTesterPage from "@/pages/ApiTesterPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Public Home Page - Rendered directly without AppLayout */}
            <Route path="/" element={<HomePage />} />

            {/* Public API Tester - Rendered directly without AppLayout */}
            <Route path="/api-tester" element={<ApiTesterPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/chats" element={
              <ProtectedRoute>
                <AppLayout>
                  <ChatPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/widget-config" element={
              <ProtectedRoute>
                <AppLayout>
                  <WidgetConfigPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/knowledge" element={
              <ProtectedRoute>
                <AppLayout>
                  <KnowledgeBasePage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/scraper" element={
              <ProtectedRoute>
                <AppLayout>
                  <ScraperPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/context-rules" element={
              <ProtectedRoute>
                <AppLayout>
                  <ContextRulesPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/templates" element={
              <ProtectedRoute>
                <AppLayout>
                  <TemplatesPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/embed-code" element={
              <ProtectedRoute>
                <AppLayout>
                  <EmbedCodePage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/response-formatter" element={
              <ProtectedRoute>
                <AppLayout>
                  <ResponseFormatterPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/customers" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                    <p className="text-muted-foreground">Customer Management - Coming Soon</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                    <p className="text-muted-foreground">Analytics Dashboard - Coming Soon</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/prompts" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                    <p className="text-muted-foreground">Prompt Management - Coming Soon</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout>
                  <UserManagementPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout>
                  <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                    <p className="text-muted-foreground">Admin Panel - Coming Soon</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <AppLayout>
                  <SystemSettingsPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/ai-models" element={
              <ProtectedRoute>
                <AppLayout>
                  <AiModelsPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/ai-model-config" element={
              <ProtectedRoute>
                <AppLayout>
                  <AiModelConfigPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/ai-config/*" element={
              <ProtectedRoute>
                <AppLayout>
                  <AiConfigRoutes />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
