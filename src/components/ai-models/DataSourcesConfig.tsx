
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, FileText, FolderOpen, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const DataSourcesConfig = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const toggleSource = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source) 
        : [...prev, source]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="knowledge">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="context" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Context
            </TabsTrigger>
            <TabsTrigger value="project" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Project Files
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kb1" 
                    checked={selectedSources.includes("kb1")}
                    onCheckedChange={() => toggleSource("kb1")}
                  />
                  <Label htmlFor="kb1" className="font-medium">Product Documentation</Label>
                </div>
                <Badge variant="outline">12 Files</Badge>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kb2" 
                    checked={selectedSources.includes("kb2")}
                    onCheckedChange={() => toggleSource("kb2")}
                  />
                  <Label htmlFor="kb2" className="font-medium">Technical Specifications</Label>
                </div>
                <Badge variant="outline">8 Files</Badge>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kb3" 
                    checked={selectedSources.includes("kb3")}
                    onCheckedChange={() => toggleSource("kb3")}
                  />
                  <Label htmlFor="kb3" className="font-medium">FAQ Database</Label>
                </div>
                <Badge variant="outline">24 Files</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <FileText className="mr-2 h-4 w-4" />
              Add Knowledge Base
            </Button>
          </TabsContent>

          <TabsContent value="context" className="space-y-4">
            <div className="rounded-md border p-4">
              <Label htmlFor="context-field" className="block mb-2">Context Variables</Label>
              <Input id="context-field" placeholder="user_id, user_role, subscription_plan" />
              <p className="text-sm text-muted-foreground mt-2">
                Variables that will be passed to the AI model from the current user session
              </p>
            </div>
          </TabsContent>

          <TabsContent value="project" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="proj1" />
                <Label htmlFor="proj1" className="font-medium">src/data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="proj2" />
                <Label htmlFor="proj2" className="font-medium">src/components</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="proj3" />
                <Label htmlFor="proj3" className="font-medium">public/docs</Label>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <FolderOpen className="mr-2 h-4 w-4" />
              Select Directory
            </Button>
          </TabsContent>

          <TabsContent value="database" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="db1" />
                <Label htmlFor="db1" className="font-medium">products</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="db2" />
                <Label htmlFor="db2" className="font-medium">customers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="db3" />
                <Label htmlFor="db3" className="font-medium">orders</Label>
              </div>
            </div>
            <div className="rounded-md border p-4 mt-4">
              <Label htmlFor="query-field" className="block mb-2">Custom Query</Label>
              <Input id="query-field" placeholder="SELECT * FROM products WHERE category = 'electronics'" />
            </div>
          </TabsContent>
        </Tabs>

        <div className="rounded-md bg-muted p-4 mt-4">
          <h3 className="text-sm font-medium mb-2">Selected Data Sources</h3>
          {selectedSources.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSources.map(source => (
                <Badge key={source} variant="secondary" className="flex items-center gap-1">
                  {source}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data sources selected</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
