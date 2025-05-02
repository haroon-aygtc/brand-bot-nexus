
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrowserNavigationControls } from './BrowserNavigationControls';
import { ElementHighlighter } from './ElementHighlighter';
import { Globe } from 'lucide-react';

interface EnhancedBrowserFrameProps {
  initialUrl?: string;
  onDataExtracted?: (data: any) => void;
}

export const EnhancedBrowserFrame = ({ 
  initialUrl = 'https://google.com',
  onDataExtracted
}: EnhancedBrowserFrameProps) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const urlHistoryRef = useRef<string[]>([initialUrl]);
  const currentIndexRef = useRef<number>(0);
  
  const handleNavigate = (url: string) => {
    setIsLoading(true);
    setCurrentUrl(url);
    
    // Update URL history
    const newHistory = urlHistoryRef.current.slice(0, currentIndexRef.current + 1);
    newHistory.push(url);
    urlHistoryRef.current = newHistory;
    currentIndexRef.current = newHistory.length - 1;
    
    // Update navigation state
    setCanGoBack(currentIndexRef.current > 0);
    setCanGoForward(false);
  };
  
  const handleGoBack = () => {
    if (currentIndexRef.current > 0) {
      currentIndexRef.current--;
      const previousUrl = urlHistoryRef.current[currentIndexRef.current];
      setCurrentUrl(previousUrl);
      setCanGoBack(currentIndexRef.current > 0);
      setCanGoForward(true);
    }
  };
  
  const handleGoForward = () => {
    if (currentIndexRef.current < urlHistoryRef.current.length - 1) {
      currentIndexRef.current++;
      const nextUrl = urlHistoryRef.current[currentIndexRef.current];
      setCurrentUrl(nextUrl);
      setCanGoBack(true);
      setCanGoForward(currentIndexRef.current < urlHistoryRef.current.length - 1);
    }
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };
  
  const handleElementSelected = (selector: string, content: string) => {
    if (onDataExtracted) {
      onDataExtracted({
        url: currentUrl,
        selector: selector,
        content: content,
        timestamp: new Date().toISOString()
      });
    }
  };
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Web Browser
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-4 flex flex-col">
        <div className="flex justify-between items-center">
          <BrowserNavigationControls
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onForward={handleGoForward}
            onRefresh={handleRefresh}
            currentUrl={currentUrl}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
          />
          <ElementHighlighter 
            targetIframeId="browser-iframe" 
            onElementSelected={handleElementSelected}
          />
        </div>
        
        <div className="relative flex-1 border rounded-md overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            id="browser-iframe"
            src={currentUrl}
            className="w-full h-full"
            onLoad={handleIframeLoad}
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        </div>
      </CardContent>
    </Card>
  );
};
