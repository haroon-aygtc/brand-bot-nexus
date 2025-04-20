
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Cpu, Settings, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModelCardProps {
  name: string;
  icon: "sparkles" | "cpu";
  color: string;
  isPrimary?: boolean;
  defaultEnabled?: boolean;
}

export const ModelCard = ({
  name,
  icon,
  color,
  isPrimary,
  defaultEnabled = false,
}: ModelCardProps) => {
  const Icon = icon === "sparkles" ? Sparkles : Cpu;
  const navigate = useNavigate();

  const handleConfigureClick = () => {
    navigate("/ai-model-config");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 text-${color}-500`} />
            {name}
          </div>
          {isPrimary ? (
            <Badge className="bg-purple-500">Primary</Badge>
          ) : (
            <Badge variant="outline">Secondary</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Enable Model</Label>
          <Switch defaultChecked={defaultEnabled} />
        </div>
        <div className="space-y-2">
          <Label>Temperature</Label>
          <Slider defaultValue={[0.7]} max={1} step={0.1} />
        </div>
        <div className="space-y-2">
          <Label>Max Tokens</Label>
          <Input type="number" defaultValue={2000} />
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={handleConfigureClick}
        >
          <Settings className="mr-2 h-4 w-4" />
          Advanced Configuration
        </Button>
      </CardContent>
    </Card>
  );
};
