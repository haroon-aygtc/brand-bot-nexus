
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Code, FileJson, FileText, Copy, Table, DownloadCloud } from "lucide-react";

const LivePreview = () => {
  const [activeTab, setActiveTab] = useState("preview");
  
  // Sample scraped data
  const sampleData = {
    title: "Example Product",
    price: "$99.99",
    description: "This is a sample product description that has been extracted from the website.",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    specs: {
      weight: "2.5 kg",
      dimensions: "10 x 20 x 5 cm",
      color: "Black"
    }
  };

  // Different format representations
  const jsonView = JSON.stringify(sampleData, null, 2);
  const csvView = `"title","price","description"
"Example Product","$99.99","This is a sample product description that has been extracted from the website."`;
  const textView = `Title: Example Product
Price: $99.99
Description: This is a sample product description that has been extracted from the website.
Features: Feature 1, Feature 2, Feature 3
Specs:
  Weight: 2.5 kg
  Dimensions: 10 x 20 x 5 cm
  Color: Black`;

  return (
    <Card className="animate-fade-in h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="csv">CSV</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="flex-1 border rounded-md p-4 mt-4 overflow-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{sampleData.title}</h3>
                <div className="text-xl font-medium text-primary my-2">{sampleData.price}</div>
                <p className="text-muted-foreground">{sampleData.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <ul className="list-disc list-inside space-y-1">
                  {sampleData.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Specifications</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Weight</span>
                    <span>{sampleData.specs.weight}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>{sampleData.specs.dimensions}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Color</span>
                    <span>{sampleData.specs.color}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="json" className="flex-1 flex flex-col mt-4">
            <div className="bg-muted/20 rounded-md p-4 font-mono text-xs overflow-auto flex-1">
              <pre>{jsonView}</pre>
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <DownloadCloud className="h-4 w-4" />
                Download
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="csv" className="flex-1 flex flex-col mt-4">
            <div className="bg-muted/20 rounded-md p-4 font-mono text-xs overflow-auto flex-1">
              <pre>{csvView}</pre>
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <DownloadCloud className="h-4 w-4" />
                Download
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="flex-1 flex flex-col mt-4">
            <div className="bg-muted/20 rounded-md p-4 font-mono text-xs overflow-auto flex-1">
              <pre className="whitespace-pre-wrap">{textView}</pre>
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <DownloadCloud className="h-4 w-4" />
                Download
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LivePreview;
