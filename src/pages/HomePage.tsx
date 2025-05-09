import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Terminal, Database, Code, MessageSquare } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const HomePage = () => {
  const features = [
    {
      title: "AI Models",
      description: "Configure and test various AI models including OpenAI, Gemini, Mistral, and more.",
      link: "/ai-models",
      icon: Bot,
    },
    {
      title: "Knowledge Base",
      description: "Manage your knowledge base to train your AI assistants with domain-specific information.",
      link: "/knowledge",
      icon: Database,
    },
    {
      title: "API Tester",
      description: "Test all available API endpoints with a Postman-like interface.",
      link: "/api-tester",
      icon: Terminal,
    },
    {
      title: "Chat Interface",
      description: "Interact with your AI models through a conversational chat interface.",
      link: "/chats",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Landing page navbar - no sidebar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">Brand Bot Nexus</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {features.map((feature) => (
                        <li key={feature.title}>
                          <NavigationMenuLink asChild>
                            <Link to={feature.link} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="flex items-center space-x-2">
                                <feature.icon className="h-4 w-4" />
                                <div className="text-sm font-medium leading-none">{feature.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{feature.description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link to="/api-tester">API Tester</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link to="/sign-in">Sign In</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12 flex-1">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center pb-8 border-b border-gray-200">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Brand Bot Nexus
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Your all-in-one platform for creating, managing, and deploying AI-powered chat bots tailored to your brand.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/api-tester">
                  Try API Tester <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sign-in">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Brand Bot Console</div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-blue-600">»</span> Initializing Brand Bot Nexus...
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-green-600">✓</span> Connected to OpenAI API
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-green-600">✓</span> Knowledge base loaded (150 documents)
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-blue-600">»</span> Ready to assist customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Everything you need to build, test, and deploy AI-powered chatbots for your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="transition-all hover:shadow-md border border-gray-200 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-500">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="group w-full justify-start p-0 mt-2">
                    <Link to={feature.link} className="flex items-center text-blue-600">
                      Explore 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">99.9%</p>
              <p className="text-gray-600 mt-2">Uptime Guarantee</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">24/7</p>
              <p className="text-gray-600 mt-2">Customer Support</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">15+</p>
              <p className="text-gray-600 mt-2">AI Models Supported</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold text-gray-900">Ready to get started?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Try out our API Tester to explore all the endpoints available in Brand Bot Nexus.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link to="/api-tester">
              Launch API Tester <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">&copy; 2025 Brand Bot Nexus. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/sign-in" className="text-gray-600 hover:text-blue-600">Sign In</Link>
              <Link to="/api-tester" className="text-gray-600 hover:text-blue-600">API Tester</Link>
              <a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
