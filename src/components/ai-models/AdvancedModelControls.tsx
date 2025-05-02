
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Thermometer, Zap, Cpu, RotateCw } from "lucide-react";
import { useState } from "react";

export const AdvancedModelControls = () => {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [topP, setTopP] = useState(0.9);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          Advanced Model Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="temperature" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Temperature
            </Label>
            <span className="text-sm font-medium">{temperature}</span>
          </div>
          <Slider 
            id="temperature"
            min={0} 
            max={1} 
            step={0.01} 
            value={[temperature]} 
            onValueChange={(value) => setTemperature(value[0])} 
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness: lower is more deterministic, higher is more creative
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="max-tokens" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Max Tokens
            </Label>
            <Input 
              id="max-tokens" 
              type="number" 
              className="w-20 h-8" 
              value={maxTokens} 
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              min={1}
              max={4096}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Maximum number of tokens to generate
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="top-p" className="flex items-center gap-2">
              <RotateCw className="h-4 w-4" />
              Top P
            </Label>
            <span className="text-sm font-medium">{topP}</span>
          </div>
          <Slider 
            id="top-p"
            min={0} 
            max={1} 
            step={0.01} 
            value={[topP]} 
            onValueChange={(value) => setTopP(value[0])} 
          />
          <p className="text-xs text-muted-foreground">
            Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button>
            Save Controls
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
