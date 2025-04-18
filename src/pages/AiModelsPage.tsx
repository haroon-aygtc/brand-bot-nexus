
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  Cpu, 
  Settings, 
  Zap, 
  MessageSquare, 
  Save,
  Sparkles,
  Gauge,
  Network
} from 'lucide-react';

const AiModelsPage = () => {
  const [activeTab, setActiveTab] = useState('models');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
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
            {/* GPT-4 Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    GPT-4 Turbo
                  </div>
                  <Badge className="bg-purple-500">Primary</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Enable Model</Label>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Slider defaultValue={[0.7]} max={1} step={0.1} />
                </div>
                <div className="space-y-2">
                  <Label>Max Tokens</Label>
                  <Input type="number" defaultValue={2000} />
                </div>
              </CardContent>
            </Card>

            {/* Claude Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    Claude 3
                  </div>
                  <Badge variant="outline">Secondary</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Enable Model</Label>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Slider defaultValue={[0.5]} max={1} step={0.1} />
                </div>
                <div className="space-y-2">
                  <Label>Max Tokens</Label>
                  <Input type="number" defaultValue={1500} />
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                    <p className="text-2xl font-bold">1.2s</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">99.8%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Daily Requests</p>
                    <p className="text-2xl font-bold">2.4k</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Routing Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Select defaultValue="gpt4">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                      <SelectItem value="claude">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Enter condition (e.g., contains:'technical')" className="flex-1" />
                  <Button variant="outline">Add Rule</Button>
                </div>
                
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">No routing rules configured yet.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <Label>Fallback Model</Label>
                  <p className="text-sm text-muted-foreground">Model to use when primary is unavailable</p>
                </div>
                <Select defaultValue="gpt4">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                    <SelectItem value="claude">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <Label>Automatic Failover</Label>
                  <p className="text-sm text-muted-foreground">Switch to fallback model automatically</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <Label>Response Caching</Label>
                  <p className="text-sm text-muted-foreground">Cache common responses for faster replies</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiModelsPage;
