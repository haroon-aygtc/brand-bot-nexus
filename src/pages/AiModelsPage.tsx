
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Network, Settings, Save, Plus } from 'lucide-react';
import { AddModelForm } from '@/components/ai-models/AddModelForm';
import { ModelCard } from '@/components/ai-models/ModelCard';
import { PerformanceMetrics } from '@/components/ai-models/PerformanceMetrics';
import { ModelRouting } from '@/components/ai-models/ModelRouting';
import { GlobalSettings } from '@/components/ai-models/GlobalSettings';

const AiModelsPage = () => {
  const [activeTab, setActiveTab] = useState('models');
  const [saving, setSaving] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">AI Models</h1>
            <Badge variant="outline" className="ml-2">Beta</Badge>
          </div>
          <p className="text-muted-foreground">Configure and manage AI models for your chatbot.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowAddModel(!showAddModel)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Model
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </span>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {showAddModel && (
        <Card>
          <CardHeader>
            <CardTitle>Add New AI Model</CardTitle>
          </CardHeader>
          <CardContent>
            <AddModelForm />
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Models
          </TabsTrigger>
          <TabsTrigger value="routing" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Model Routing
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModelCard
              name="GPT-4 Turbo"
              icon="sparkles"
              color="purple"
              isPrimary
              defaultEnabled
            />
            <ModelCard
              name="Claude 3"
              icon="cpu"
              color="blue"
              defaultEnabled={false}
            />
            <PerformanceMetrics />
          </div>
        </TabsContent>

        <TabsContent value="routing" className="space-y-4">
          <ModelRouting />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <GlobalSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiModelsPage;
