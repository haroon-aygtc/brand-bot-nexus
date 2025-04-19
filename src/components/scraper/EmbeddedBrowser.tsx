
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Eye, Globe, MousePointer, Code, RefreshCw } from "lucide-react";

const EmbeddedBrowser = () => {
  const [url, setUrl] = useState("https://example.com");
  const [loadedUrl, setLoadedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [generatedSelector, setGeneratedSelector] = useState<string | null>(null);

  const handleLoadUrl = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoadedUrl(url);
      setIsLoading(false);
    }, 1500);
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedElement(null);
    setGeneratedSelector(null);
  };

  const simulateElementSelection = () => {
    // This would be handled by actual browser integration
    setSelectedElement("<div class='product-title'>Example Product</div>");
    setGeneratedSelector(".product-title");
  };

  return (
    <Card className="h-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Embedded Browser
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL to browse"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLoadUrl()}
          />
          <Button
            onClick={handleLoadUrl}
            disabled={isLoading}
          >
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Load"}
          </Button>
        </div>

        <div className="flex items-center gap-2 bg-muted/40 rounded-md p-2">
          <Button
            variant={selectionMode ? "default" : "outline"}
            size="sm"
            onClick={toggleSelectionMode}
            className="flex items-center gap-2"
          >
            <MousePointer className="h-4 w-4" />
            {selectionMode ? "Exit Selection" : "Select Elements"}
          </Button>
          
          {selectionMode && (
            <p className="text-xs text-muted-foreground ml-2">
              Click on elements in the preview to select them
            </p>
          )}
        </div>

        {/* Browser preview area */}
        <div className="border rounded-md h-64 overflow-hidden relative">
          {!loadedUrl ? (
            <div className="flex items-center justify-center h-full bg-muted/30 text-muted-foreground">
              Enter a URL and click Load to start browsing
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* This would be a real iframe in actual implementation */}
              <div className="bg-background p-4 h-full overflow-auto">
                <div className="p-4 border rounded mb-4 cursor-pointer hover:bg-muted/30" onClick={selectionMode ? simulateElementSelection : undefined}>
                  <h1 className="text-xl font-bold mb-2">Example Product</h1>
                  <p className="text-sm">This is a product description.</p>
                  <div className="mt-2 text-lg font-semibold">$99.99</div>
                </div>
                
                <ul className="space-y-2 p-4 border rounded">
                  <li className="text-sm">Feature 1</li>
                  <li className="text-sm">Feature 2</li>
                  <li className="text-sm">Feature 3</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {selectedElement && (
          <div className="space-y-2 border-t pt-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Selected Element</h4>
              <Button variant="ghost" size="sm" onClick={() => setSelectedElement(null)}>
                Clear
              </Button>
            </div>
            
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">HTML</TabsTrigger>
                <TabsTrigger value="selector">Selector</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="p-2 border rounded-md mt-2">
                <div dangerouslySetInnerHTML={{ __html: selectedElement }} />
              </TabsContent>
              
              <TabsContent value="code" className="p-2 border rounded-md mt-2 bg-muted/20">
                <code className="text-xs">{selectedElement}</code>
              </TabsContent>
              
              <TabsContent value="selector" className="mt-2">
                <div className="flex items-center gap-2">
                  <Input value={generatedSelector || ""} readOnly />
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    Use
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmbeddedBrowser;
