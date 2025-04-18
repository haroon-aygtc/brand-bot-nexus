
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

const AiModelConfigPage = () => {
  const [activeTab, setActiveTab] = useState("data-sources");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setSaving(true);
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
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
        <Button onClick={handleSave} disabled={saving}>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="data-sources">
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="prompt-templates">
            Prompt Templates
          </TabsTrigger>
          <TabsTrigger value="response-formatter">
            Response Formatter
          </TabsTrigger>
          <TabsTrigger value="branding">
            Branding
          </TabsTrigger>
          <TabsTrigger value="follow-up">
            Follow-up Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data-sources" className="space-y-4">
          <DataSourcesConfig />
        </TabsContent>

        <TabsContent value="prompt-templates" className="space-y-4">
          <PromptTemplatesConfig />
        </TabsContent>

        <TabsContent value="response-formatter" className="space-y-4">
          <ResponseFormatterConfig />
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <BrandingConfig />
        </TabsContent>

        <TabsContent value="follow-up" className="space-y-4">
          <FollowUpQuestionsConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiModelConfigPage;
