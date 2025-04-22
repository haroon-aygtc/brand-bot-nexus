
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Settings } from "lucide-react";
import { DataSourcesConfig } from "@/components/ai-models/DataSourcesConfig";
import { PromptTemplatesConfig } from "@/components/ai-models/PromptTemplatesConfig";
import { ResponseFormatterConfig } from "@/components/ai-models/ResponseFormatterConfig";
import { BrandingConfig } from "@/components/ai-models/BrandingConfig";
import { FollowUpQuestionsConfig } from "@/components/ai-models/FollowUpQuestionsConfig";
import { GlobalSettings } from "@/components/ai-models/GlobalSettings";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const AiModelConfigPage = () => {
  const [activeTab, setActiveTab] = useState("data-sources");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setSaving(true);
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      toast.success("Configuration saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-muted transition-colors"
            onClick={() => navigate("/ai-models")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Configure GPT-4 Turbo</h1>
            <p className="text-muted-foreground">
              Customize how this AI model processes and responds to user queries
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="hover:scale-105 transition-transform"
        >
          {saving ? (
            <span className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </span>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted p-3 border-b">
              <h3 className="font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configuration Options
              </h3>
            </div>
            <div className="p-2">
              <nav className="space-y-1">
                <Button 
                  variant={activeTab === "data-sources" ? "secondary" : "ghost"} 
                  className="w-full justify-start text-sm font-medium"
                  onClick={() => setActiveTab("data-sources")}
                >
                  Data Sources
                </Button>
                <Button 
                  variant={activeTab === "prompt-templates" ? "secondary" : "ghost"} 
                  className="w-full justify-start text-sm font-medium"
                  onClick={() => setActiveTab("prompt-templates")}
                >
                  Prompt Templates
                </Button>
                <Button 
                  variant={activeTab === "response-formatter" ? "secondary" : "ghost"} 
                  className="w-full justify-start text-sm font-medium"
                  onClick={() => setActiveTab("response-formatter")}
                >
                  Response Formatter
                </Button>
                <Button 
                  variant={activeTab === "branding" ? "secondary" : "ghost"} 
                  className="w-full justify-start text-sm font-medium"
                  onClick={() => setActiveTab("branding")}
                >
                  Branding
                </Button>
                <Button 
                  variant={activeTab === "follow-up" ? "secondary" : "ghost"} 
                  className="w-full justify-start text-sm font-medium"
                  onClick={() => setActiveTab("follow-up")}
                >
                  Follow-up Questions
                </Button>
                <Button 
                  variant={activeTab === "global-settings" ? "secondary" : "ghost"} 
                  className="w-full justify-start text-sm font-medium"
                  onClick={() => setActiveTab("global-settings")}
                >
                  Global Settings
                </Button>
              </nav>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted p-3 border-b">
              <h3 className="font-medium">
                {activeTab === "data-sources" && "Data Sources"}
                {activeTab === "prompt-templates" && "Prompt Templates"}
                {activeTab === "response-formatter" && "Response Formatter"}
                {activeTab === "branding" && "Branding"}
                {activeTab === "follow-up" && "Follow-up Questions"}
                {activeTab === "global-settings" && "Global Settings"}
              </h3>
            </div>
            <div className="p-4">
              {activeTab === "data-sources" && <DataSourcesConfig />}
              {activeTab === "prompt-templates" && <PromptTemplatesConfig />}
              {activeTab === "response-formatter" && <ResponseFormatterConfig />}
              {activeTab === "branding" && <BrandingConfig />}
              {activeTab === "follow-up" && <FollowUpQuestionsConfig />}
              {activeTab === "global-settings" && <GlobalSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiModelConfigPage;
