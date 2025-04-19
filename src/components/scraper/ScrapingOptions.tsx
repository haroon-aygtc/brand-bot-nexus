
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, FileJson, Table, Image, List, FileText } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ScrapingOptions = () => {
  const form = useForm({
    defaultValues: {
      selectorType: "css",
      useProxies: false,
      useAiCleaner: true,
      aiCleanerLevel: "basic",
      extractTables: true,
      extractImages: true,
      extractLists: true,
      outputFormat: "json",
      storageLocation: "database",
    },
  });

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Scraping Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Selector Settings</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="selector-type" className="cursor-pointer">
                  Selector Type
                </Label>
                <Tabs defaultValue="css">
                  <TabsList className="h-8">
                    <TabsTrigger value="css" className="text-xs px-3">CSS</TabsTrigger>
                    <TabsTrigger value="xpath" className="text-xs px-3">XPath</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Advanced Options</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="use-proxies" className="cursor-pointer">
                  Use Proxies
                </Label>
                <Switch id="use-proxies" />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="use-ai-cleaner" className="cursor-pointer">
                    AI Text Cleaner
                  </Label>
                  <Switch id="use-ai-cleaner" defaultChecked />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="basic"
                      name="ai-cleaner-level"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <Label htmlFor="basic" className="text-xs cursor-pointer">
                      Basic
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="thorough"
                      name="ai-cleaner-level"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="thorough" className="text-xs cursor-pointer">
                      Thorough
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="semantic"
                      name="ai-cleaner-level"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="semantic" className="text-xs cursor-pointer">
                      Semantic
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Content Extraction</h3>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="extract-tables" className="text-xs cursor-pointer">Tables</Label>
                    <Switch id="extract-tables" defaultChecked />
                  </div>
                  <div className="h-10 border border-dashed border-muted-foreground/30 rounded flex items-center justify-center">
                    <Table className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="extract-images" className="text-xs cursor-pointer">Images</Label>
                    <Switch id="extract-images" defaultChecked />
                  </div>
                  <div className="h-10 border border-dashed border-muted-foreground/30 rounded flex items-center justify-center">
                    <Image className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="extract-lists" className="text-xs cursor-pointer">Lists</Label>
                    <Switch id="extract-lists" defaultChecked />
                  </div>
                  <div className="h-10 border border-dashed border-muted-foreground/30 rounded flex items-center justify-center">
                    <List className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Output Settings</h3>
              
              <div className="space-y-1.5">
                <Label className="text-xs">Output Format</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer bg-primary/5 border-primary">
                    <FileJson className="h-4 w-4 mb-1" />
                    <span className="text-xs">JSON</span>
                  </div>
                  <div className="border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                    <FileText className="h-4 w-4 mb-1" />
                    <span className="text-xs">CSV</span>
                  </div>
                  <div className="border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                    <FileText className="h-4 w-4 mb-1" />
                    <span className="text-xs">Text</span>
                  </div>
                  <div className="border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                    <code className="text-xs mb-1">&lt;/&gt;</code>
                    <span className="text-xs">HTML</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label className="text-xs">Storage Location</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-md p-2 flex items-center gap-2 cursor-pointer bg-primary/5 border-primary">
                    <Database className="h-4 w-4" />
                    <span className="text-xs">Database</span>
                  </div>
                  <div className="border rounded-md p-2 flex items-center gap-2 cursor-pointer hover:bg-muted/50">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs">File Directory</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ScrapingOptions;

// Import the missing Database icon from lucide-react
import { Database } from "lucide-react";
