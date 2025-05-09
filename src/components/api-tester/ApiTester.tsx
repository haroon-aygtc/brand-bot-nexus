
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EndpointList } from "./EndpointList";
import { RequestPanel } from "./RequestPanel";
import { ResponsePanel } from "./ResponsePanel";
import { generateApiEndpoints } from "./api-endpoints"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Endpoint } from "@/types/api-tester";

export function ApiTester() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestBody, setRequestBody] = useState<string>("");
  const [requestHeaders, setRequestHeaders] = useState<Record<string, string>>({
    "Content-Type": "application/json",
    "Accept": "application/json"
  });
  const [authToken, setAuthToken] = useState<string>(localStorage.getItem("authToken") || "");

  useEffect(() => {
    // Load the API endpoints
    const apiEndpoints = generateApiEndpoints();
    setEndpoints(apiEndpoints);
    
    // Select the first endpoint by default
    if (apiEndpoints.length > 0) {
      setSelectedEndpoint(apiEndpoints[0]);
      setRequestBody(JSON.stringify(apiEndpoints[0].sampleBody || {}, null, 2));
    }
  }, []);

  // Update request body when endpoint changes
  useEffect(() => {
    if (selectedEndpoint) {
      setRequestBody(JSON.stringify(selectedEndpoint.sampleBody || {}, null, 2));
    }
  }, [selectedEndpoint]);

  const handleSelectEndpoint = (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
    setResponse(null);
  };

  const handleSendRequest = async () => {
    if (!selectedEndpoint) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}${selectedEndpoint.path}`;
      const headers: Record<string, string> = { ...requestHeaders };
      
      // Add authorization header if token is available
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers,
        credentials: 'include',
      };

      // Add body for methods that support it
      if (["POST", "PUT", "PATCH"].includes(selectedEndpoint.method)) {
        try {
          options.body = requestBody;
        } catch (e) {
          setResponse({
            error: "Invalid JSON in request body",
            details: (e as Error).message
          });
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch(url, options);
      const contentType = response.headers.get("content-type");
      
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
      });
    } catch (error) {
      setResponse({
        error: "Network error",
        details: (error as Error).message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-14rem)]">
      {/* Endpoint sidebar */}
      <div className="col-span-3 border rounded-lg">
        <ScrollArea className="h-full">
          <EndpointList 
            endpoints={endpoints} 
            selectedEndpoint={selectedEndpoint}
            onSelectEndpoint={handleSelectEndpoint}
          />
        </ScrollArea>
      </div>
      
      {/* Main content area */}
      <div className="col-span-9 border rounded-lg">
        {selectedEndpoint ? (
          <Tabs defaultValue="request" className="h-full flex flex-col">
            <div className="px-4 pt-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className={`inline-flex items-center justify-center rounded px-2 py-1 text-xs font-medium mr-2
                    ${selectedEndpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 
                      selectedEndpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 
                      selectedEndpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      selectedEndpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' : 
                      'bg-purple-100 text-purple-800'}`}>
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-sm font-mono">{selectedEndpoint.path}</span>
                </div>
                <TabsList>
                  <TabsTrigger value="request">Request</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="request" className="flex-1 p-0 overflow-auto">
              <RequestPanel 
                endpoint={selectedEndpoint}
                requestBody={requestBody}
                setRequestBody={setRequestBody}
                requestHeaders={requestHeaders}
                setRequestHeaders={setRequestHeaders}
                authToken={authToken}
                setAuthToken={setAuthToken}
                onSendRequest={handleSendRequest}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="response" className="flex-1 p-0 overflow-auto">
              <ResponsePanel response={response} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select an endpoint from the list to start testing
          </div>
        )}
      </div>
    </div>
  );
}
