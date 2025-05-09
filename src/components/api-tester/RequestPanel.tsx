
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Endpoint } from "@/types/api-tester";
import { Loader2, Play } from "lucide-react";

interface RequestPanelProps {
  endpoint: Endpoint;
  requestBody: string;
  setRequestBody: (body: string) => void;
  requestHeaders: Record<string, string>;
  setRequestHeaders: (headers: Record<string, string>) => void;
  authToken: string;
  setAuthToken: (token: string) => void;
  onSendRequest: () => void;
  isLoading: boolean;
}

export function RequestPanel({
  endpoint,
  requestBody,
  setRequestBody,
  requestHeaders,
  setRequestHeaders,
  authToken,
  setAuthToken,
  onSendRequest,
  isLoading
}: RequestPanelProps) {
  const [bodyError, setBodyError] = useState<string>("");

  const handleBodyChange = (value: string) => {
    setRequestBody(value);
    setBodyError("");
    
    // Validate JSON if the body is not empty
    if (value.trim()) {
      try {
        JSON.parse(value);
      } catch (e) {
        setBodyError((e as Error).message);
      }
    }
  };

  const handleHeaderChange = (key: string, value: string) => {
    setRequestHeaders({ ...requestHeaders, [key]: value });
  };

  const addHeader = () => {
    setRequestHeaders({ ...requestHeaders, "": "" });
  };

  const removeHeader = (key: string) => {
    const newHeaders = { ...requestHeaders };
    delete newHeaders[key];
    setRequestHeaders(newHeaders);
  };

  const handleAuthTokenChange = (value: string) => {
    setAuthToken(value);
    localStorage.setItem("authToken", value);
  };

  const needsBody = ["POST", "PUT", "PATCH"].includes(endpoint.method);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">{endpoint.name}</h3>
          <Button 
            onClick={onSendRequest} 
            size="sm" 
            disabled={isLoading || (needsBody && bodyError !== "")}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Send Request
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">{endpoint.description}</p>
      </div>
      
      <Tabs defaultValue={needsBody ? "body" : "auth"} className="flex-1">
        <div className="px-4 border-b">
          <TabsList>
            {needsBody && <TabsTrigger value="body">Body</TabsTrigger>}
            <TabsTrigger value="auth">Auth</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="params">Params</TabsTrigger>
          </TabsList>
        </div>
        
        {needsBody && (
          <TabsContent value="body" className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="requestBody" className="text-xs">Request Body (JSON)</Label>
                {bodyError && <p className="text-xs text-red-500">{bodyError}</p>}
              </div>
              <Textarea 
                id="requestBody"
                value={requestBody}
                onChange={(e) => handleBodyChange(e.target.value)}
                className="font-mono text-sm h-[calc(100vh-25rem)] resize-none"
                placeholder="Enter request body in JSON format"
              />
              <div className="text-xs text-muted-foreground">
                <p>Required fields for this endpoint:</p>
                <ul className="list-disc list-inside mt-1">
                  {endpoint.requiredFields?.map(field => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="auth" className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="authToken" className="text-xs">Authentication Token</Label>
              <Input 
                id="authToken"
                value={authToken}
                onChange={(e) => handleAuthTokenChange(e.target.value)}
                className="font-mono text-sm mt-1"
                placeholder="Bearer token from login response"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This token will be included in the Authorization header for authenticated requests.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="headers" className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs">Request Headers</Label>
              <Button variant="outline" size="sm" onClick={addHeader}>Add Header</Button>
            </div>
            <div className="space-y-2">
              {Object.entries(requestHeaders).map(([key, value], index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={key}
                    onChange={(e) => {
                      const newHeaders = { ...requestHeaders };
                      delete newHeaders[key];
                      setRequestHeaders({ ...newHeaders, [e.target.value]: value });
                    }}
                    className="font-mono text-sm flex-1"
                    placeholder="Header name"
                  />
                  <Input 
                    value={value}
                    onChange={(e) => handleHeaderChange(key, e.target.value)}
                    className="font-mono text-sm flex-1"
                    placeholder="Header value"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeHeader(key)}
                    className="px-2"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="params" className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
          <div className="space-y-2">
            <Label className="text-xs">URL Parameters</Label>
            {endpoint.params && endpoint.params.length > 0 ? (
              <div className="space-y-4">
                {endpoint.params.map((param) => (
                  <div key={param.name} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{param.name}</span>
                      {param.required && (
                        <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{param.description}</p>
                    {param.example && (
                      <p className="text-xs">Example: <code className="bg-muted rounded px-1 py-0.5">{param.example}</code></p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No parameters for this endpoint</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
