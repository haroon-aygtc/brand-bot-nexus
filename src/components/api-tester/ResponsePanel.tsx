
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResponsePanelProps {
  response: any;
  isLoading: boolean;
}

export function ResponsePanel({ response, isLoading }: ResponsePanelProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Sending request...</span>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No response yet. Send a request to see results.
      </div>
    );
  }

  // Format response for display
  const formatResponse = () => {
    if (response.error) {
      return JSON.stringify({ error: response.error, details: response.details }, null, 2);
    }

    // Format the data part
    const formattedData = typeof response.data === 'string' 
      ? response.data 
      : JSON.stringify(response.data, null, 2);

    return formattedData;
  };

  const getStatusColor = () => {
    if (!response.status) return "bg-red-100 text-red-800"; // Error
    
    if (response.status < 300) return "bg-green-100 text-green-800"; // Success
    if (response.status < 400) return "bg-blue-100 text-blue-800"; // Redirect
    if (response.status < 500) return "bg-yellow-100 text-yellow-800"; // Client Error
    return "bg-red-100 text-red-800"; // Server Error
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {response.status && (
              <span className={`rounded px-2 py-1 text-xs font-medium mr-2 ${getStatusColor()}`}>
                {response.status} {response.statusText}
              </span>
            )}
            {response.error && (
              <span className="rounded px-2 py-1 text-xs font-medium mr-2 bg-red-100 text-red-800">
                Error
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {response.time && (
              <span>Time: {response.time}ms</span>
            )}
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <pre className="text-sm font-mono whitespace-pre-wrap">{formatResponse()}</pre>
      </ScrollArea>
    </div>
  );
}
