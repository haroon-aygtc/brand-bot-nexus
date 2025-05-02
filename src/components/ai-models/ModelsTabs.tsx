
import { Brain, Network, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModelsGrid } from '@/components/ai-models/ModelsGrid';
import { ModelRoutingPanel } from '@/components/ai-models/ModelRoutingPanel';
import { ModelsSettings } from '@/components/ai-models/ModelsSettings';

interface ModelsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const ModelsTabs = ({ activeTab, onTabChange }: ModelsTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
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
        <ModelsGrid />
      </TabsContent>

      <TabsContent value="routing" className="space-y-4">
        <ModelRoutingPanel />
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <ModelsSettings />
      </TabsContent>
    </Tabs>
  );
};
