
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ColorPicker } from '@/components/widget/ColorPicker';
import { TemplatePresets } from '@/components/widget/TemplatePresets';
import { Upload, RefreshCw } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Clean',
    description: 'A modern, clean design with subtle shadows',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 'glass',
    name: 'Glass Effect',
    description: 'Transparent, glass-like design with blur effects',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Dark themed design for low-light environments',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 'rounded',
    name: 'Soft Rounded',
    description: 'Soft, rounded corners and friendly feel',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Clean, minimalist design with essential elements only',
    thumbnail: '/placeholder.svg'
  }
];

const BrandingManager = () => {
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [chatTitle, setChatTitle] = useState('AI Assistant');
  const [welcomeMessage, setWelcomeMessage] = useState('Hello! How can I help you today?');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor, setSecondaryColor] = useState('#f43f5e');
  const [avatar, setAvatar] = useState('/placeholder.svg');
  const [companyName, setCompanyName] = useState('Your Company');
  
  const applyTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
    
    // Apply template settings based on selection
    switch(templateId) {
      case 'modern':
        setPrimaryColor('#6366f1');
        setSecondaryColor('#f43f5e');
        break;
      case 'glass':
        setPrimaryColor('#3b82f6');
        setSecondaryColor('#22d3ee');
        break;
      case 'dark':
        setPrimaryColor('#111827');
        setSecondaryColor('#6366f1');
        break;
      case 'rounded':
        setPrimaryColor('#8b5cf6');
        setSecondaryColor('#ec4899');
        break;
      case 'minimal':
        setPrimaryColor('#1f2937');
        setSecondaryColor('#6b7280');
        break;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Branding Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="templates">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="colors">Colors & Styling</TabsTrigger>
            <TabsTrigger value="content">Content & Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Choose a template as a starting point for your chat widget branding
            </p>
            
            <TemplatePresets
              templates={templates}
              applyTemplate={applyTemplate}
              currentTemplate={activeTemplate}
            />
          </TabsContent>
          
          <TabsContent value="colors" className="space-y-4 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Primary Color</h3>
                <div className="flex flex-col space-y-2">
                  <ColorPicker 
                    color={primaryColor} 
                    onChange={setPrimaryColor} 
                  />
                  <Input 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="mt-2" 
                  />
                </div>
                
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Used for main buttons, links, and accent elements
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Secondary Color</h3>
                <div className="flex flex-col space-y-2">
                  <ColorPicker 
                    color={secondaryColor} 
                    onChange={setSecondaryColor} 
                  />
                  <Input 
                    value={secondaryColor} 
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="mt-2" 
                  />
                </div>
                
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Used for highlights, gradients, and secondary elements
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Logo / Avatar</h3>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={avatar} alt="Logo" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <Button variant="outline" className="mb-2 w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 200x200px (JPG, PNG, SVG)
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Company Name</h3>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company Name"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Will be displayed in the widget header or footer
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="chat-title">Chat Title</Label>
                <Input
                  id="chat-title"
                  value={chatTitle}
                  onChange={(e) => setChatTitle(e.target.value)}
                  placeholder="AI Assistant"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will appear as the title of your chat widget
                </p>
              </div>
              
              <div>
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea
                  id="welcome-message"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  placeholder="Hello! How can I help you today?"
                  className="mt-1 h-24"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This message will be shown when a user first opens the chat
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Generate with AI
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandingManager;
