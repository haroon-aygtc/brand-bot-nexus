
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, FolderOpen, Plus, Search } from "lucide-react";
import { useState } from "react";

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Manage and organize your AI's knowledge sources
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Product Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">12 documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Technical Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">8 documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">24 documents</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
