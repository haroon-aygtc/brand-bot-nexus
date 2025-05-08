
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiModelsHeader } from '@/components/ai-models/AiModelsHeader';
import { AddModelFormContainer } from '@/components/ai-models/AddModelFormContainer';
import { ModelsGrid } from '@/components/ai-models/ModelsGrid';
import { ModelRoutingPanel } from '@/components/ai-models/ModelRoutingPanel';
import { ModelsSettings } from '@/components/ai-models/ModelsSettings';
import { AiModelTesting } from '@/components/ai-models/AiModelTesting';

const AiModelsPage = () => {
  const [activeTab, setActiveTab] = useState('models');
  const [showAddModel, setShowAddModel] = useState(false);

  const handleToggleAddModel = () => {
    setShowAddModel(!showAddModel);
  };

  return (
    <div className="space-y-6">
      <AiModelsHeader onToggleAddModel={handleToggleAddModel} />

      {showAddModel && <AddModelFormContainer />}

      <Tabs defaultValue="models" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="testing">Testing Area</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="models">
          <Tabs defaultValue="all-models" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all-models" className="flex items-center gap-2">Models</TabsTrigger>
              <TabsTrigger value="routing" className="flex items-center gap-2">Model Routing</TabsTrigger>
              <TabsTrigger value="model-settings" className="flex items-center gap-2">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="all-models" className="space-y-4">
              <ModelsGrid />
            </TabsContent>

            <TabsContent value="routing" className="space-y-4">
              <ModelRoutingPanel />
            </TabsContent>

            <TabsContent value="model-settings" className="space-y-4">
              <ModelsSettings />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="testing">
          <AiModelTesting />
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">AI Model Settings</h3>
            <p className="text-muted-foreground">
              Configure global settings for all AI models. Adjust default parameters,
              access controls, and usage limits.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiModelsPage;
