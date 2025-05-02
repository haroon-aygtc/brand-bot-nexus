
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Settings, Database, MessageSquare, Palette, HelpCircle, Sliders } from "lucide-react";
import { DataSourcesConfig } from "@/components/ai-models/DataSourcesConfig";
import { PromptTemplatesConfig } from "@/components/ai-models/PromptTemplatesConfig";
import { ResponseFormatterConfig } from "@/components/ai-models/ResponseFormatterConfig";
import { BrandingConfig } from "@/components/ai-models/BrandingConfig";
import { FollowUpQuestionsConfig } from "@/components/ai-models/FollowUpQuestionsConfig";
import { GlobalSettings } from "@/components/ai-models/GlobalSettings";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const AiModelConfigPage = () => {
  const [activeTab, setActiveTab] = useState("data-sources");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Configuration saved successfully");
    }, 1000);
  };

  const menuItems = [
    { id: "data-sources", label: "Data Sources", icon: Database },
    { id: "prompt-templates", label: "Prompt Templates", icon: MessageSquare },
    { id: "response-formatter", label: "Response Formatter", icon: Sliders },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "follow-up", label: "Follow-up Questions", icon: HelpCircle },
    { id: "global-settings", label: "Global Settings", icon: Settings },
  ];

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/ai-models")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">GPT-4 Turbo Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Customize AI model behavior and response formatting
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          size="lg"
          className="gap-2"
        >
          {saving ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <CardContent className="p-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 mb-1"
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        <div className="col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>
                {menuItems.find(item => item.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
              {activeTab === "data-sources" && <DataSourcesConfig />}
              {activeTab === "prompt-templates" && <PromptTemplatesConfig />}
              {activeTab === "response-formatter" && <ResponseFormatterConfig />}
              {activeTab === "branding" && <BrandingConfig />}
              {activeTab === "follow-up" && <FollowUpQuestionsConfig />}
              {activeTab === "global-settings" && <GlobalSettings />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiModelConfigPage;
