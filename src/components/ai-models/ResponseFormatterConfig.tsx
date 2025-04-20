
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Code, Image, LayoutList, MessageSquare, FileText, Settings } from "lucide-react";
import { useState } from "react";

export const ResponseFormatterConfig = () => {
  const [markdownEnabled, setMarkdownEnabled] = useState(true);
  const [codeHighlightingEnabled, setCodeHighlightingEnabled] = useState(true);
  const [imageGenerationEnabled, setImageGenerationEnabled] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutList className="h-5 w-5" />
          Response Formatter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="text">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="markdown">Markdown Formatting</Label>
                <p className="text-sm text-muted-foreground">
                  Enable rich text formatting with Markdown
                </p>
              </div>
              <Switch 
                id="markdown" 
                checked={markdownEnabled}
                onCheckedChange={setMarkdownEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="emoji">Emoji Support</Label>
                <p className="text-sm text-muted-foreground">
                  Allow emojis in responses
                </p>
              </div>
              <Switch id="emoji" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="tone">Response Tone</Label>
                <p className="text-sm text-muted-foreground">
                  Set the overall tone of responses
                </p>
              </div>
              <Select defaultValue="professional">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="code-highlight">Syntax Highlighting</Label>
                <p className="text-sm text-muted-foreground">
                  Enable syntax highlighting for code blocks
                </p>
              </div>
              <Switch 
                id="code-highlight" 
                checked={codeHighlightingEnabled}
                onCheckedChange={setCodeHighlightingEnabled}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="line-numbers">Line Numbers</Label>
                <p className="text-sm text-muted-foreground">
                  Show line numbers in code blocks
                </p>
              </div>
              <Switch id="line-numbers" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Preferred Languages</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="lang-js" defaultChecked />
                  <Label htmlFor="lang-js">JavaScript</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lang-python" defaultChecked />
                  <Label htmlFor="lang-python">Python</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lang-java" />
                  <Label htmlFor="lang-java">Java</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lang-csharp" />
                  <Label htmlFor="lang-csharp">C#</Label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="image-gen">Image Generation</Label>
                <p className="text-sm text-muted-foreground">
                  Allow AI to generate images when appropriate
                </p>
              </div>
              <Switch 
                id="image-gen" 
                checked={imageGenerationEnabled}
                onCheckedChange={setImageGenerationEnabled}
              />
            </div>

            {imageGenerationEnabled && (
              <div className="space-y-2 rounded-md border p-4">
                <Label htmlFor="image-style">Image Style</Label>
                <Select defaultValue="realistic">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="cartoon">Cartoon</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="sketch">Sketch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="charts">Charts & Diagrams</Label>
                <p className="text-sm text-muted-foreground">
                  Allow AI to create charts and diagrams
                </p>
              </div>
              <Switch id="charts" defaultChecked />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="citations">Citations</Label>
                <p className="text-sm text-muted-foreground">
                  Include source citations in responses
                </p>
              </div>
              <Switch id="citations" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="max-length">Maximum Response Length</Label>
                <p className="text-sm text-muted-foreground">
                  Limit the length of AI responses
                </p>
              </div>
              <Select defaultValue="medium">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (1-2 paragraphs)</SelectItem>
                  <SelectItem value="medium">Medium (3-5 paragraphs)</SelectItem>
                  <SelectItem value="long">Long (6+ paragraphs)</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="export">Export Options</Label>
                <p className="text-sm text-muted-foreground">
                  Allow users to export responses
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Markdown
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
