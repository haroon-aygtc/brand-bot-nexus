
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedBrowserFrame } from '@/components/scraper/EnhancedBrowserFrame';
import ScrapingOptions from '@/components/scraper/ScrapingOptions';
import SelectorGroupManager from '@/components/scraper/SelectorGroupManager';
import { Book, FileJson, Cpu } from 'lucide-react';

interface ExtractedData {
  url: string;
  selector: string;
  content: string;
  timestamp: string;
}

const ScraperIntegrationPage = () => {
  const [activeTab, setActiveTab] = useState('browser');
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);
  
  const handleDataExtracted = (newData: ExtractedData) => {
    setExtractedData((prev) => [...prev, newData]);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Web Scraper</h1>
        <p className="text-muted-foreground">
          Extract structured data from websites for your AI knowledge base
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnhancedBrowserFrame 
            initialUrl="https://example.com"
            onDataExtracted={handleDataExtracted}
          />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="browser" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Data
              </TabsTrigger>
              <TabsTrigger value="selectors" className="flex items-center gap-2">
                <FileJson className="h-4 w-4" />
                Selectors
              </TabsTrigger>
              <TabsTrigger value="options" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Options
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browser">
              <Card>
                <CardHeader>
                  <CardTitle>Extracted Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {extractedData.length === 0 ? (
                    <p className="text-muted-foreground">
                      Use the element selector tool to extract data from the webpage
                    </p>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {extractedData.map((data, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-medium">{data.selector}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(data.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                          <div className="mt-2 text-sm">{data.content}</div>
                          <div className="mt-1 text-xs text-muted-foreground truncate">
                            {data.url}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="selectors">
              <SelectorGroupManager />
            </TabsContent>
            
            <TabsContent value="options">
              <ScrapingOptions />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ScraperIntegrationPage;
