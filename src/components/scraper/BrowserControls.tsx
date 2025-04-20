
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface BrowserControlsProps {
  url: string;
  onUrlChange: (url: string) => void;
  onRefresh: () => void;
  onBack: () => void;
  onForward: () => void;
  isLoading: boolean;
}

const BrowserControls = ({
  url,
  onUrlChange,
  onRefresh,
  onBack,
  onForward,
  isLoading,
}: BrowserControlsProps) => {
  const [inputUrl, setInputUrl] = useState(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlChange(inputUrl);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="w-8 h-8 p-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onForward}
          className="w-8 h-8 p-0"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="w-8 h-8 p-0"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="pl-8"
            placeholder="Enter URL to browse"
          />
        </div>
      </form>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BrowserControls;
