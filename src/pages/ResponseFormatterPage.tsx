
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Copy, FileCode } from "lucide-react";

const ResponseFormatterPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Response Formatter</h1>
          <p className="text-muted-foreground">
            Create custom formatters to style your AI assistant's responses
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Formatter
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search formatters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Formatters</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormatterCard 
              title="Basic Markdown" 
              type="Markdown" 
              updatedAt="2 days ago"
              description="Standard markdown formatting with headings, lists, and code blocks"
            />
            <FormatterCard 
              title="Technical Documentation" 
              type="HTML" 
              updatedAt="1 week ago"
              description="Structured HTML format for technical documentation with syntax highlighting"
            />
            <FormatterCard 
              title="FAQ Layout" 
              type="Custom" 
              updatedAt="3 days ago"
              description="Custom Q&A format with collapsible sections for FAQs"
            />
            <FormatterCard 
              title="Interactive Tutorial" 
              type="HTML" 
              updatedAt="5 days ago"
              description="Step-by-step tutorial format with progress tracking"
            />
            <FormatterCard 
              title="Product Comparison" 
              type="Markdown" 
              updatedAt="1 day ago"
              description="Tabular format for comparing product features"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="markdown" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormatterCard 
              title="Basic Markdown" 
              type="Markdown" 
              updatedAt="2 days ago"
              description="Standard markdown formatting with headings, lists, and code blocks"
            />
            <FormatterCard 
              title="Product Comparison" 
              type="Markdown" 
              updatedAt="1 day ago"
              description="Tabular format for comparing product features"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="html" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormatterCard 
              title="Technical Documentation" 
              type="HTML" 
              updatedAt="1 week ago"
              description="Structured HTML format for technical documentation with syntax highlighting"
            />
            <FormatterCard 
              title="Interactive Tutorial" 
              type="HTML" 
              updatedAt="5 days ago"
              description="Step-by-step tutorial format with progress tracking"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormatterCard 
              title="FAQ Layout" 
              type="Custom" 
              updatedAt="3 days ago"
              description="Custom Q&A format with collapsible sections for FAQs"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface FormatterCardProps {
  title: string;
  type: string;
  updatedAt: string;
  description: string;
}

const FormatterCard = ({ title, type, updatedAt, description }: FormatterCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center">
            <FileCode className="h-5 w-5 mr-2 text-primary" />
            {title}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {type}
          </span>
          <span className="text-xs text-muted-foreground">
            Updated {updatedAt}
          </span>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" size="sm" className="h-8 px-2">
            <Copy className="h-3.5 w-3.5 mr-1" />
            Clone
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-2">
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseFormatterPage;
