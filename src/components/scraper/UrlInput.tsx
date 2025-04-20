
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Globe, Plus, Link, FileJson, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";

const UrlInput = ({ onStartScraping }: { onStartScraping: (urls: string[]) => void }) => {
  const [activeTab, setActiveTab] = useState("single");
  const [singleUrl, setSingleUrl] = useState("");
  const [jsonUrls, setJsonUrls] = useState("");
  const [jsonError, setJsonError] = useState("");

  const handleStartScraping = () => {
    if (activeTab === "single") {
      if (singleUrl.trim()) {
        onStartScraping([singleUrl.trim()]);
      }
    } else {
      try {
        const parsed = JSON.parse(jsonUrls);
        if (Array.isArray(parsed) && parsed.every(url => typeof url === "string")) {
          setJsonError("");
          onStartScraping(parsed);
        } else {
          setJsonError("Input must be a JSON array of URL strings");
        }
      } catch (e) {
        setJsonError("Invalid JSON format");
      }
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Input URLs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="single" className="flex items-center gap-1">
              <Link className="h-4 w-4" />
              <span>Single URL</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-1">
              <FileJson className="h-4 w-4" />
              <span>JSON List</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="single-url">Website URL</Label>
              <Input
                id="single-url"
                placeholder="https://example.com/page-to-scrape"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full"
              disabled={!singleUrl.trim()}
              onClick={handleStartScraping}
            >
              Start Scraping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </TabsContent>
          
          <TabsContent value="json" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="json-urls">JSON Array of URLs</Label>
              <Textarea
                id="json-urls"
                placeholder={`[
  "https://example.com/page1",
  "https://example.com/page2",
  "https://example.com/page3"
]`}
                value={jsonUrls}
                onChange={(e) => {
                  setJsonUrls(e.target.value);
                  setJsonError("");
                }}
                className="min-h-[120px] font-mono text-xs"
              />
              {jsonError && (
                <p className="text-destructive text-xs">{jsonError}</p>
              )}
            </div>
            
            <Button 
              className="w-full"
              disabled={!jsonUrls.trim()}
              onClick={handleStartScraping}
            >
              Start Scraping Multiple URLs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UrlInput;
