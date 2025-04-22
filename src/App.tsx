
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import ChatPage from "@/pages/ChatPage";
import WidgetConfigPage from "@/pages/WidgetConfigPage";
import NotFound from "@/pages/NotFound";
import AiModelsPage from "@/pages/AiModelsPage";
import AiModelConfigPage from "@/pages/AiModelConfigPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import ScraperPage from "@/pages/ScraperPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/chats" element={
            <AppLayout>
              <ChatPage />
            </AppLayout>
          } />
          <Route path="/widget-config" element={
            <AppLayout>
              <WidgetConfigPage />
            </AppLayout>
          } />
          <Route path="/knowledge" element={
            <AppLayout>
              <KnowledgeBasePage />
            </AppLayout>
          } />
          <Route path="/scraper" element={
            <AppLayout>
              <ScraperPage />
            </AppLayout>
          } />
          <Route path="/customers" element={
            <AppLayout>
              <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                <p className="text-muted-foreground">Customer Management - Coming Soon</p>
              </div>
            </AppLayout>
          } />
          <Route path="/analytics" element={
            <AppLayout>
              <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                <p className="text-muted-foreground">Analytics Dashboard - Coming Soon</p>
              </div>
            </AppLayout>
          } />
          <Route path="/prompts" element={
            <AppLayout>
              <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                <p className="text-muted-foreground">Prompt Management - Coming Soon</p>
              </div>
            </AppLayout>
          } />
          <Route path="/admin" element={
            <AppLayout>
              <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                <p className="text-muted-foreground">Admin Panel - Coming Soon</p>
              </div>
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg border border-border">
                <p className="text-muted-foreground">Settings - Coming Soon</p>
              </div>
            </AppLayout>
          } />
          <Route path="/ai-models" element={
            <AppLayout>
              <AiModelsPage />
            </AppLayout>
          } />
          <Route path="/ai-model-config" element={
            <AppLayout>
              <AiModelConfigPage />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
