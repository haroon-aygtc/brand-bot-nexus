
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Bold, Italic, List, Heading } from "lucide-react";
import { useState } from "react";

export const ResponseFormatter = () => {
  const [markdownEnabled, setMarkdownEnabled] = useState(true);
  const [bulletListEnabled, setBulletListEnabled] = useState(true);
  const [headingsEnabled, setHeadingsEnabled] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Response Formatting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Markdown Support</Label>
              <p className="text-sm text-muted-foreground">Enable rich text formatting</p>
            </div>
            <Switch checked={markdownEnabled} onCheckedChange={setMarkdownEnabled} />
          </div>
          
          {markdownEnabled && (
            <div className="space-y-4 border rounded-md p-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Heading className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Default Heading Level</Label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select heading level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">H1 - Main Heading</SelectItem>
                    <SelectItem value="2">H2 - Section Heading</SelectItem>
                    <SelectItem value="3">H3 - Subsection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Auto Bullet Lists</Label>
              <p className="text-sm text-muted-foreground">Convert lists to bullet points</p>
            </div>
            <Switch checked={bulletListEnabled} onCheckedChange={setBulletListEnabled} />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Auto Headings</Label>
              <p className="text-sm text-muted-foreground">Detect and format headings</p>
            </div>
            <Switch checked={headingsEnabled} onCheckedChange={setHeadingsEnabled} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
