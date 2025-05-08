
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiModelsHeader } from '@/components/ai-models/AiModelsHeader';
import { AddModelFormContainer } from '@/components/ai-models/AddModelFormContainer';
import { ModelsTabs } from '@/components/ai-models/ModelsTabs';
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

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="models" onClick={() => setActiveTab('models')}>AI Models</TabsTrigger>
          <TabsTrigger value="testing" onClick={() => setActiveTab('testing')}>Testing Area</TabsTrigger>
          <TabsTrigger value="settings" onClick={() => setActiveTab('settings')}>Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="models">
          <ModelsTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
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
