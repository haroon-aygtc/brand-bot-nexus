
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, RefreshCw, Home, History } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface BrowserNavigationControlsProps {
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  currentUrl: string;
  canGoBack: boolean;
  canGoForward: boolean;
}

export const BrowserNavigationControls = ({
  onNavigate,
  onBack,
  onForward,
  onRefresh,
  currentUrl,
  canGoBack = false,
  canGoForward = false,
}: BrowserNavigationControlsProps) => {
  const [url, setUrl] = useState(currentUrl);
  const [urlHistory, setUrlHistory] = useState<string[]>([currentUrl]);
  
  const handleNavigate = () => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      const newUrl = `https://${url}`;
      setUrl(newUrl);
      onNavigate(newUrl);
      
      // Add to history if not already the most recent
      if (urlHistory[urlHistory.length - 1] !== newUrl) {
        setUrlHistory([...urlHistory, newUrl]);
      }
    } else {
      onNavigate(url);
      
      // Add to history if not already the most recent
      if (urlHistory[urlHistory.length - 1] !== url) {
        setUrlHistory([...urlHistory, url]);
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };
  
  return (
    <div className="flex items-center space-x-2 w-full bg-card p-2 rounded-md border">
      <div className="flex space-x-1">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onBack}
          disabled={!canGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onForward}
          disabled={!canGoForward}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => {
            setUrl("https://google.com");
            onNavigate("https://google.com");
          }}
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 flex space-x-2">
        <Input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL..."
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleNavigate}>Go</Button>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <History className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {urlHistory.slice().reverse().map((historyUrl, index) => (
            <DropdownMenuItem 
              key={index}
              onClick={() => {
                setUrl(historyUrl);
                onNavigate(historyUrl);
              }}
            >
              {historyUrl.length > 40 ? `${historyUrl.substring(0, 40)}...` : historyUrl}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
