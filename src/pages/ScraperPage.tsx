
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, List, Plus } from "lucide-react";
import { useState } from "react";

const ScraperPage = () => {
  const [url, setUrl] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Web Scraper</h1>
          <p className="text-muted-foreground">
            Import content from websites into your AI's knowledge base
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Add New URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter website URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add URL
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            Recent Scrapes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recent scrapes</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScraperPage;
