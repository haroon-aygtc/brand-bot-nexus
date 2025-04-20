
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Palette, ImageIcon, FileImage, Upload } from "lucide-react";
import { useState } from "react";

export const BrandingConfig = () => {
  const [brandingEnabled, setBrandingEnabled] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Branding Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="branding-toggle">Custom Branding</Label>
            <p className="text-sm text-muted-foreground">
              Apply your brand identity to AI responses
            </p>
          </div>
          <Switch 
            id="branding-toggle" 
            checked={brandingEnabled}
            onCheckedChange={setBrandingEnabled}
          />
        </div>

        {brandingEnabled && (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-name">AI Assistant Name</Label>
                <Input 
                  id="ai-name" 
                  placeholder="e.g., Nova Assistant" 
                  defaultValue="Acme AI Assistant"
                />
                <p className="text-xs text-muted-foreground">
                  This name will be displayed to users when interacting with the AI
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-10 p-0 h-10"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <span className="sr-only">Pick a color</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="grid grid-cols-6 gap-2">
                          {["#ef4444", "#f97316", "#eab308", "#10b981", "#06b6d4", "#6366f1", "#8b5cf6", "#d946ef"].map(color => (
                            <Button 
                              key={color}
                              variant="outline" 
                              className="w-8 h-8 p-0"
                              style={{ backgroundColor: color }}
                              onClick={() => setPrimaryColor(color)}
                            />
                          ))}
                        </div>
                        <div className="flex mt-4">
                          <Input 
                            type="text" 
                            value={primaryColor} 
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input 
                      id="primary-color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-10 p-0 h-10"
                          style={{ backgroundColor: secondaryColor }}
                        >
                          <span className="sr-only">Pick a color</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="grid grid-cols-6 gap-2">
                          {["#ef4444", "#f97316", "#eab308", "#10b981", "#06b6d4", "#6366f1", "#8b5cf6", "#d946ef"].map(color => (
                            <Button 
                              key={color}
                              variant="outline" 
                              className="w-8 h-8 p-0"
                              style={{ backgroundColor: color }}
                              onClick={() => setSecondaryColor(color)}
                            />
                          ))}
                        </div>
                        <div className="flex mt-4">
                          <Input 
                            type="text" 
                            value={secondaryColor} 
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input 
                      id="secondary-color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Avatar</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <ImageIcon className="h-8 w-8 text-gray-500" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch id="animated-avatar" />
                    <Label htmlFor="animated-avatar">Use Animated Avatar</Label>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileImage className="mr-2 h-4 w-4" />
                    Select Animated Avatar
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
