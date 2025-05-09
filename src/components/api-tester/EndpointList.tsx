
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Endpoint } from "@/types/api-tester";
import { Search } from "lucide-react";

interface EndpointListProps {
  endpoints: Endpoint[];
  selectedEndpoint: Endpoint | null;
  onSelectEndpoint: (endpoint: Endpoint) => void;
}

export function EndpointList({ endpoints, selectedEndpoint, onSelectEndpoint }: EndpointListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Get unique categories
  const categories = ["all", ...new Set(endpoints.map(e => e.category))];
  
  // Filter endpoints based on search query and active category
  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = 
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === "all" || endpoint.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search endpoints..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-4 overflow-auto flex-nowrap h-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="text-xs whitespace-nowrap capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="m-0">
            {category === "all" ? (
              // For "all" tab, group endpoints by category
              <>
                {Array.from(new Set(filteredEndpoints.map(e => e.category))).map(cat => (
                  <div key={cat} className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 capitalize">{cat}</h3>
                    <div className="space-y-1">
                      {filteredEndpoints
                        .filter(e => e.category === cat)
                        .map(endpoint => (
                          <EndpointItem 
                            key={`${endpoint.method}-${endpoint.path}`}
                            endpoint={endpoint}
                            isSelected={selectedEndpoint?.path === endpoint.path && selectedEndpoint?.method === endpoint.method}
                            onClick={() => onSelectEndpoint(endpoint)}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // For specific category tabs, show endpoints directly
              <div className="space-y-1">
                {filteredEndpoints.map(endpoint => (
                  <EndpointItem 
                    key={`${endpoint.method}-${endpoint.path}`}
                    endpoint={endpoint}
                    isSelected={selectedEndpoint?.path === endpoint.path && selectedEndpoint?.method === endpoint.method}
                    onClick={() => onSelectEndpoint(endpoint)}
                  />
                ))}
              </div>
            )}
            
            {filteredEndpoints.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">
                No endpoints found
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface EndpointItemProps {
  endpoint: Endpoint;
  isSelected: boolean;
  onClick: () => void;
}

function EndpointItem({ endpoint, isSelected, onClick }: EndpointItemProps) {
  return (
    <div 
      className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted text-sm
        ${isSelected ? 'bg-muted' : ''}`}
      onClick={onClick}
    >
      <span className={`inline-flex items-center justify-center rounded px-2 py-0.5 text-xs font-medium mr-2
        ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 
          endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 
          endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
          endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' : 
          'bg-purple-100 text-purple-800'}`}>
        {endpoint.method}
      </span>
      <span className="truncate">{endpoint.name}</span>
    </div>
  );
}
