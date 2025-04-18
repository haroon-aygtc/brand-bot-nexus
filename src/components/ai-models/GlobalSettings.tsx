
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const GlobalSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Label>API Endpoint Override</Label>
            <p className="text-sm text-muted-foreground">Override the default API endpoint for all models</p>
          </div>
          <Input className="w-[300px]" placeholder="https://api.example.com/v1" />
        </div>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Label>Fallback Model</Label>
            <p className="text-sm text-muted-foreground">Model to use when primary is unavailable</p>
          </div>
          <Select defaultValue="gpt4">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
              <SelectItem value="claude">Claude 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Label>Automatic Failover</Label>
            <p className="text-sm text-muted-foreground">Switch to fallback model automatically</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Label>Response Caching</Label>
            <p className="text-sm text-muted-foreground">Cache common responses for faster replies</p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};
