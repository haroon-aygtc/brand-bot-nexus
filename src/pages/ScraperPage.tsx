
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Settings, Database, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Import our new components
import UrlInput from "@/components/scraper/UrlInput";
import EmbeddedBrowser from "@/components/scraper/EmbeddedBrowser";
import SelectorGroupManager from "@/components/scraper/SelectorGroupManager";
import ScrapingOptions from "@/components/scraper/ScrapingOptions";
import LivePreview from "@/components/scraper/LivePreview";

const ScraperPage = () => {
  const [activeView, setActiveView] = useState<"setup" | "results">("setup");
  const [activeTab, setActiveTab] = useState("url-input");
  const [scrapingInProgress, setScrapingInProgress] = useState(false);
  const [scrapedUrls, setScrapedUrls] = useState<string[]>([]);

  const handleStartScraping = (urls: string[]) => {
    setScrapedUrls(urls);
    setScrapingInProgress(true);
    
    // Simulate scraping process
    toast.info("Scraping started", {
      description: `Scraping ${urls.length} URL${urls.length > 1 ? 's' : ''}`,
      duration: 3000,
    });
    
    // After a delay, show results
    setTimeout(() => {
      setScrapingInProgress(false);
      setActiveView("results");
      toast.success("Scraping completed", {
        description: `Successfully scraped ${urls.length} URL${urls.length > 1 ? 's' : ''}`,
      });
    }, 3000);
  };

  const handleBackToSetup = () => {
    setActiveView("setup");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Web Scraper</h1>
          <p className="text-muted-foreground">
            Import content from websites into your AI's knowledge base
          </p>
        </div>
        
        {activeView === "results" && (
          <Button variant="outline" onClick={handleBackToSetup}>
            Back to Setup
          </Button>
        )}
      </div>
      
      {activeView === "setup" ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Scraper Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full justify-start mb-6">
                    <TabsTrigger value="url-input" className="flex items-center gap-1.5">
                      <Globe className="h-4 w-4" />
                      URL Input
                    </TabsTrigger>
                    <TabsTrigger value="browser" className="flex items-center gap-1.5">
                      <Globe className="h-4 w-4" />
                      Browser
                    </TabsTrigger>
                    <TabsTrigger value="selectors" className="flex items-center gap-1.5">
                      <Database className="h-4 w-4" />
                      Selectors
                    </TabsTrigger>
                    <TabsTrigger value="options" className="flex items-center gap-1.5">
                      <Settings className="h-4 w-4" />
                      Options
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="url-input">
                    <UrlInput onStartScraping={handleStartScraping} />
                  </TabsContent>
                  
                  <TabsContent value="browser">
                    <EmbeddedBrowser />
                  </TabsContent>
                  
                  <TabsContent value="selectors">
                    <SelectorGroupManager />
                  </TabsContent>
                  
                  <TabsContent value="options">
                    <ScrapingOptions />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-12 lg:col-span-4">
            <Card className="bg-primary/5 border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="text-primary">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Enter a URL</h3>
                      <p className="text-sm text-muted-foreground">
                        Paste the website URL you want to scrape or provide a JSON list
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Select Elements</h3>
                      <p className="text-sm text-muted-foreground">
                        Use the browser tab to click and select elements you want to extract
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Configure Options</h3>
                      <p className="text-sm text-muted-foreground">
                        Customize output format, storage, and extraction settings
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Start Scraping</h3>
                      <p className="text-sm text-muted-foreground">
                        Click the start button to begin the scraping process
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={activeTab !== "url-input"}
                  onClick={() => activeTab === "url-input" && handleStartScraping(["https://example.com"])}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Start Scraping Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Scraping Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">URLs Scraped</h3>
                  <div className="border rounded-md p-2">
                    {scrapedUrls.map((url, index) => (
                      <div key={index} className="py-2 px-2 border-b last:border-0">
                        <p className="text-sm truncate">{url}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Extraction Summary</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-md p-3">
                      <h4 className="text-xs text-muted-foreground mb-1">Pages Processed</h4>
                      <p className="text-2xl font-bold">{scrapedUrls.length}</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="text-xs text-muted-foreground mb-1">Elements Extracted</h4>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="text-xs text-muted-foreground mb-1">Images Found</h4>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="text-xs text-muted-foreground mb-1">Tables Processed</h4>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Actions</h3>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline">
                      Import to Knowledge Base
                    </Button>
                    <Button variant="outline">
                      Save as Template
                    </Button>
                    <Button variant="outline">
                      Export Results
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-12 lg:col-span-7 h-[600px]">
            <LivePreview />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScraperPage;
