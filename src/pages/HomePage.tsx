
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      title: "AI Models",
      description: "Configure and test various AI models including OpenAI, Gemini, Mistral, and more.",
      link: "/ai-models",
    },
    {
      title: "Knowledge Base",
      description: "Manage your knowledge base to train your AI assistants with domain-specific information.",
      link: "/knowledge",
    },
    {
      title: "API Tester",
      description: "Test all available API endpoints with a Postman-like interface.",
      link: "/api-tester",
    },
    {
      title: "Chat Interface",
      description: "Interact with your AI models through a conversational chat interface.",
      link: "/chats",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Brand Bot Nexus</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your all-in-one platform for creating, managing, and deploying AI-powered chat bots tailored to your brand.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Button asChild size="lg">
            <Link to="/api-tester">
              Try API Tester <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/ai-models">
              Configure AI Models
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="group w-full justify-start p-0">
                <Link to={feature.link} className="flex items-center text-primary">
                  Explore 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
