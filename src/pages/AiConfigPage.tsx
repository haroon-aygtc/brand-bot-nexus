
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Database, 
  FileText, 
  Sliders, 
  Palette, 
  MessageSquare,
  ArrowRight, 
  ArrowLeft
} from "lucide-react";

// This is a dashboard page that will serve as the entry point for all AI configuration options
const AiConfigPage = () => {
  const navigate = useNavigate();

  const configOptions = [
    {
      title: "Data Sources",
      description: "Configure knowledge bases, databases, and context sources",
      icon: Database,
      path: "/ai-config/data-sources"
    },
    {
      title: "Prompt Templates",
      description: "Create and manage system prompts for different use cases",
      icon: FileText,
      path: "/ai-config/prompt-templates"
    },
    {
      title: "Response Formatter",
      description: "Customize output formatting, styles, and structures",
      icon: Sliders,
      path: "/ai-config/response-formatter"
    },
    {
      title: "Branding",
      description: "Personalize colors, logos, and visual identity",
      icon: Palette,
      path: "/ai-config/branding"
    },
    {
      title: "Follow-up Questions",
      description: "Configure question generation and presentation",
      icon: MessageSquare,
      path: "/ai-config/follow-up-questions"
    }
  ];

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/ai-models")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Customize and configure all aspects of your AI assistant
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configOptions.map((option) => (
          <Card 
            key={option.title} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(option.path)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <option.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(option.path);
                }}
              >
                Configure
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AiConfigPage;
