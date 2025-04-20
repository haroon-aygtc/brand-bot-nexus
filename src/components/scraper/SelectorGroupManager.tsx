
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Database, FileJson, Save } from "lucide-react";
import { useState } from "react";

interface SelectorGroup {
  id: string;
  name: string;
  domain: string;
  selectors: {
    name: string;
    type: "css" | "xpath";
    value: string;
  }[];
}

const SelectorGroupManager = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [groups, setGroups] = useState<SelectorGroup[]>([
    {
      id: "1",
      name: "Product Details",
      domain: "example.com",
      selectors: [
        { name: "Title", type: "css", value: ".product-title" },
        { name: "Price", type: "css", value: ".product-price" },
        { name: "Description", type: "css", value: ".product-description" },
      ],
    },
    {
      id: "2",
      name: "News Articles",
      domain: "news-site.com",
      selectors: [
        { name: "Headline", type: "css", value: "h1.headline" },
        { name: "Author", type: "css", value: ".author-name" },
        { name: "Content", type: "xpath", value: "//div[@class='article-content']" },
      ],
    },
  ]);

  const [newGroup, setNewGroup] = useState<{
    name: string;
    domain: string;
    selectors: { name: string; type: "css" | "xpath"; value: string }[];
  }>({
    name: "",
    domain: "",
    selectors: [{ name: "", type: "css", value: "" }],
  });

  const addSelector = () => {
    setNewGroup({
      ...newGroup,
      selectors: [...newGroup.selectors, { name: "", type: "css", value: "" }],
    });
  };

  const updateSelector = (index: number, field: string, value: string) => {
    const updatedSelectors = [...newGroup.selectors];
    updatedSelectors[index] = {
      ...updatedSelectors[index],
      [field]: value,
    };
    setNewGroup({
      ...newGroup,
      selectors: updatedSelectors,
    });
  };

  const saveGroup = () => {
    // In a real app, this would save to the database
    setGroups([...groups, { ...newGroup, id: Date.now().toString() }]);
    setNewGroup({
      name: "",
      domain: "",
      selectors: [{ name: "", type: "css", value: "" }],
    });
    setActiveTab("saved");
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Selector Groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="saved">Saved Groups</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-4">
            {groups.length > 0 ? (
              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Domain: {group.domain} • {group.selectors.length} selectors
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Database className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No selector groups saved yet</p>
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={() => setActiveTab("create")}
                >
                  Create Your First Group
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name</Label>
                <Input
                  id="group-name"
                  placeholder="E.g., Product Details"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="E.g., example.com"
                  value={newGroup.domain}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, domain: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Selectors</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSelector}
                >
                  Add Selector
                </Button>
              </div>

              {newGroup.selectors.map((selector, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 items-end">
                  <div className="space-y-1">
                    <Label htmlFor={`selector-name-${index}`} className="text-xs">Name</Label>
                    <Input
                      id={`selector-name-${index}`}
                      placeholder="E.g., Title"
                      value={selector.name}
                      onChange={(e) => updateSelector(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`selector-type-${index}`} className="text-xs">Type</Label>
                    <select
                      id={`selector-type-${index}`}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selector.type}
                      onChange={(e) =>
                        updateSelector(
                          index,
                          "type",
                          e.target.value as "css" | "xpath"
                        )
                      }
                    >
                      <option value="css">CSS</option>
                      <option value="xpath">XPath</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor={`selector-value-${index}`} className="text-xs">Selector</Label>
                    <Input
                      id={`selector-value-${index}`}
                      placeholder="E.g., .product-title or //h1"
                      value={selector.value}
                      onChange={(e) =>
                        updateSelector(index, "value", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={saveGroup} className="gap-2">
                <Save className="h-4 w-4" />
                Save Group
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SelectorGroupManager;
