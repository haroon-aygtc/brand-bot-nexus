
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ModelRouting = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Routing Rules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Select defaultValue="gpt4">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                <SelectItem value="claude">Claude 3</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Enter condition (e.g., contains:'technical')" className="flex-1" />
            <Button variant="outline">Add Rule</Button>
          </div>
          
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">No routing rules configured yet.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
