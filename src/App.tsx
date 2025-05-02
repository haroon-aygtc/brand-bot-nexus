
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
import SystemSettingsPage from "@/pages/SystemSettingsPage";

const queryClient = new QueryClient();

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
            
            {/* Protected Routes */}
            <Route path="/" element={
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
