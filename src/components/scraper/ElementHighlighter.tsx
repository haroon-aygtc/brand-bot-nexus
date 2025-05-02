
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Crosshair, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ElementHighlighterProps {
  targetIframeId: string;
  onElementSelected?: (selector: string, text: string) => void;
}

export const ElementHighlighter = ({ targetIframeId, onElementSelected }: ElementHighlighterProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    // Function to inject highlighting script into iframe
    const injectHighlightScript = () => {
      const iframe = document.getElementById(targetIframeId) as HTMLIFrameElement;
      if (!iframe || !iframe.contentWindow || !iframe.contentDocument) {
        toast.error("Cannot access iframe content. It might be blocked by CORS policy.");
        return;
      }
      
      // Create style element for highlighting
      const style = iframe.contentDocument.createElement('style');
      style.textContent = `
        .element-highlight {
          outline: 2px solid #ff3e00 !important;
          background-color: rgba(255, 62, 0, 0.1) !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }
        .element-highlight:hover {
          background-color: rgba(255, 62, 0, 0.2) !important;
        }
      `;
      style.id = 'element-highlighter-style';
      iframe.contentDocument.head.appendChild(style);
      
      // Send message to parent when element is clicked
      const messageHandler = (e: Event) => {
        if (!isSelecting) return;
        
        const element = e.target as HTMLElement;
        // Generate selector (simplified example)
        const tagName = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : '';
        const classes = Array.from(element.classList)
          .filter(cls => cls !== 'element-highlight')
          .map(cls => `.${cls}`)
          .join('');
          
        const selector = `${tagName}${id}${classes}`;
        
        // Prevent default behavior
        e.preventDefault();
        e.stopPropagation();
        
        // Send data to parent component
        if (onElementSelected) {
          onElementSelected(selector, element.textContent || '');
        }
        
        setIsSelecting(false);
        toast.success("Element selected!");
      };
      
      // Add mouseover event
      const mouseoverHandler = (e: Event) => {
        if (!isSelecting) return;
        
        if (highlightedElement) {
          highlightedElement.classList.remove('element-highlight');
        }
        
        const element = e.target as HTMLElement;
        element.classList.add('element-highlight');
        setHighlightedElement(element);
        
        // Prevent default behavior
        e.preventDefault();
        e.stopPropagation();
      };
      
      // Add mouseout event
      const mouseoutHandler = (e: Event) => {
        if (!isSelecting) return;
        
        const element = e.target as HTMLElement;
        element.classList.remove('element-highlight');
        
        // Prevent default behavior
        e.preventDefault();
        e.stopPropagation();
      };
      
      // Attach events to document
      iframe.contentDocument.addEventListener('click', messageHandler, true);
      iframe.contentDocument.addEventListener('mouseover', mouseoverHandler, true);
      iframe.contentDocument.addEventListener('mouseout', mouseoutHandler, true);
      
      return () => {
        // Clean up
        iframe.contentDocument?.removeEventListener('click', messageHandler, true);
        iframe.contentDocument?.removeEventListener('mouseover', mouseoverHandler, true);
        iframe.contentDocument?.removeEventListener('mouseout', mouseoutHandler, true);
        const styleElement = iframe.contentDocument?.getElementById('element-highlighter-style');
        if (styleElement) {
          styleElement.remove();
        }
      };
    };
    
    // Only inject if in selection mode
    let cleanup: (() => void) | undefined;
    if (isSelecting) {
      cleanup = injectHighlightScript();
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [isSelecting, targetIframeId, onElementSelected, highlightedElement]);
  
  const toggleSelectionMode = () => {
    setIsSelecting(!isSelecting);
    if (!isSelecting) {
      toast.info("Element selection mode enabled. Click on any element in the page to select it.");
    } else {
      toast.info("Element selection mode disabled.");
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isSelecting ? "default" : "outline"}
        onClick={toggleSelectionMode}
        className={isSelecting ? "bg-orange-500 hover:bg-orange-600" : ""}
      >
        {isSelecting ? (
          <>
            <EyeOff className="h-4 w-4 mr-2" />
            Stop Selecting
          </>
        ) : (
          <>
            <Crosshair className="h-4 w-4 mr-2" />
            Select Element
          </>
        )}
      </Button>
    </div>
  );
};
