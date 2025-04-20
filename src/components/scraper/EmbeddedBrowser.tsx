
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, MousePointer, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BrowserControls from "./BrowserControls";

const EmbeddedBrowser = () => {
  const [url, setUrl] = useState("https://example.com");
  const [loadedUrl, setLoadedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [generatedSelector, setGeneratedSelector] = useState<string | null>(null);
  const [urlHistory, setUrlHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleLoadUrl = (newUrl: string) => {
    setIsLoading(true);
    // Update history
    const newHistory = urlHistory.slice(0, historyIndex + 1);
    newHistory.push(newUrl);
    setUrlHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Simulate loading
    setTimeout(() => {
      setLoadedUrl(newUrl);
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(urlHistory[historyIndex - 1]);
      handleLoadUrl(urlHistory[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < urlHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(urlHistory[historyIndex + 1]);
      handleLoadUrl(urlHistory[historyIndex + 1]);
    }
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
      <CardContent className="space-y-4 p-0">
        <BrowserControls
          url={url}
          onUrlChange={handleLoadUrl}
          onRefresh={() => handleLoadUrl(url)}
          onBack={handleBack}
          onForward={handleForward}
          isLoading={isLoading}
        />

        <div className="px-6">
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
        </div>

        {/* Browser preview area */}
        <div className="border-t">
          <div className="relative w-full h-[400px] overflow-auto">
            {!loadedUrl ? (
              <div className="flex items-center justify-center h-full bg-muted/30 text-muted-foreground">
                Enter a URL and click Load to start browsing
              </div>
            ) : (
              <div className="relative w-full h-full">
                <div className="bg-background p-4 h-full overflow-auto">
                  <div 
                    className={`p-4 border rounded mb-4 cursor-pointer ${
                      selectionMode ? "hover:bg-muted/30 hover:outline hover:outline-2 hover:outline-primary" : ""
                    }`} 
                    onClick={selectionMode ? simulateElementSelection : undefined}
                  >
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
