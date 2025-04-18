
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
import { DataSourcesConfig } from "@/components/ai-models/DataSourcesConfig";
import { PromptTemplatesConfig } from "@/components/ai-models/PromptTemplatesConfig";
import { ResponseFormatterConfig } from "@/components/ai-models/ResponseFormatterConfig";
import { BrandingConfig } from "@/components/ai-models/BrandingConfig";
import { FollowUpQuestionsConfig } from "@/components/ai-models/FollowUpQuestionsConfig";
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="transition-all">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger 
            value="data-sources"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
          >
            Data Sources
          </TabsTrigger>
          <TabsTrigger 
            value="prompt-templates"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
          >
            Prompt Templates
          </TabsTrigger>
          <TabsTrigger 
            value="response-formatter"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
          >
            Response Formatter
          </TabsTrigger>
          <TabsTrigger 
            value="branding"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
          >
            Branding
          </TabsTrigger>
          <TabsTrigger 
            value="follow-up"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
          >
            Follow-up Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent 
          value="data-sources" 
          className="space-y-4 animate-fade-in"
        >
          <DataSourcesConfig />
        </TabsContent>

        <TabsContent 
          value="prompt-templates" 
          className="space-y-4 animate-fade-in"
        >
          <PromptTemplatesConfig />
        </TabsContent>

        <TabsContent 
          value="response-formatter" 
          className="space-y-4 animate-fade-in"
        >
          <ResponseFormatterConfig />
        </TabsContent>

        <TabsContent 
          value="branding" 
          className="space-y-4 animate-fade-in"
        >
          <BrandingConfig />
        </TabsContent>

        <TabsContent 
          value="follow-up" 
          className="space-y-4 animate-fade-in"
        >
          <FollowUpQuestionsConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiModelConfigPage;
