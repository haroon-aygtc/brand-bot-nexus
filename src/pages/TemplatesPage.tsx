
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, FileText, FileCode } from "lucide-react";

const TemplatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Create and manage response templates for your AI assistant
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="greeting">Greeting</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="product">Product Info</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TemplateCard 
              title="Welcome Message" 
              category="Greeting" 
              updatedAt="2 days ago"
              usageCount={342}
            />
            <TemplateCard 
              title="Technical Support" 
              category="Support" 
              updatedAt="5 days ago"
              usageCount={128}
            />
            <TemplateCard 
              title="Product Features" 
              category="Product Info" 
              updatedAt="1 week ago"
              usageCount={215}
            />
            <TemplateCard 
              title="Error Resolution" 
              category="Support" 
              updatedAt="3 days ago"
              usageCount={97}
            />
            <TemplateCard 
              title="Pricing Information" 
              category="Product Info" 
              updatedAt="4 days ago"
              usageCount={183}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="greeting" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TemplateCard 
              title="Welcome Message" 
              category="Greeting" 
              updatedAt="2 days ago"
              usageCount={342}
            />
            <TemplateCard 
              title="Introduction Template" 
              category="Greeting" 
              updatedAt="1 week ago"
              usageCount={156}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="support" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TemplateCard 
              title="Technical Support" 
              category="Support" 
              updatedAt="5 days ago"
              usageCount={128}
            />
            <TemplateCard 
              title="Error Resolution" 
              category="Support" 
              updatedAt="3 days ago"
              usageCount={97}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="product" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TemplateCard 
              title="Product Features" 
              category="Product Info" 
              updatedAt="1 week ago"
              usageCount={215}
            />
            <TemplateCard 
              title="Pricing Information" 
              category="Product Info" 
              updatedAt="4 days ago"
              usageCount={183}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TemplateCardProps {
  title: string;
  category: string;
  updatedAt: string;
  usageCount: number;
}

const TemplateCard = ({ title, category, updatedAt, usageCount }: TemplateCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            {title}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">
            Updated {updatedAt}
          </span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Used {usageCount} times
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatesPage;
