
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Code } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmbedCodeGeneratorProps {
  config: any;
}

const EmbedCodeGenerator = ({ config }: EmbedCodeGeneratorProps) => {
  const [copied, setCopied] = useState(false);
  const [codeTab, setCodeTab] = useState('script');
  const { toast } = useToast();

  // Generate widget unique ID based on config name
  const widgetId = config.general.name.toLowerCase().replace(/\s+/g, '-');
  
  // Generate JavaScript embed code
  const scriptCode = `<!-- ChatAdmin Widget -->
<script>
  (function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = "https://cdn.chatadmin.ai/widget/${widgetId}.js";
    g.async = true;
    g.defer = true;
    s.parentNode.insertBefore(g, s);
  }(document, "script"));
</script>`;

  // Generate HTML embed code (iframe)
  const iframeCode = `<!-- ChatAdmin Widget (iframe) -->
<iframe
  src="https://app.chatadmin.ai/widget/${widgetId}"
  width="${config.appearance.widgetWidth || 350}"
  height="${config.appearance.widgetHeight || 550}"
  frameborder="0"
  allow="microphone"
  style="border: none; position: fixed; ${config.general.widgetPosition.replace('-', ' ')}: 20px; z-index: 9999;"
></iframe>`;

  // Generate NPM install code
  const npmCode = `// Install the package
npm install chatadmin-widget

// In your component
import ChatAdminWidget from 'chatadmin-widget';

// In your render function
<ChatAdminWidget 
  widgetId="${widgetId}"
  position="${config.general.widgetPosition}" 
  primaryColor="${config.appearance.primaryColor}"
  darkMode={${config.appearance.darkMode}}
/>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The embed code has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const getCode = () => {
    switch (codeTab) {
      case 'script':
        return scriptCode;
      case 'iframe':
        return iframeCode;
      case 'npm':
        return npmCode;
      default:
        return scriptCode;
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Use this code to embed the chat widget on your website. Choose the method that works best for your platform.
      </p>
      
      <Tabs defaultValue="script" value={codeTab} onValueChange={setCodeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="script">JavaScript</TabsTrigger>
          <TabsTrigger value="iframe">iframe</TabsTrigger>
          <TabsTrigger value="npm">React/NPM</TabsTrigger>
        </TabsList>
        
        <TabsContent value="script" className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">
            Add this script to your HTML page, preferably just before the closing <code className="px-1 py-0.5 bg-muted rounded">&lt;/body&gt;</code> tag.
          </div>
        </TabsContent>
        
        <TabsContent value="iframe" className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">
            Use this iframe code if you have limited access to add custom JavaScript to your site.
          </div>
        </TabsContent>
        
        <TabsContent value="npm" className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">
            For React applications, you can use our NPM package for easier integration.
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
          <code>{getCode()}</code>
        </pre>
        
        <div className="absolute top-2 right-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200"
            onClick={() => copyToClipboard(getCode())}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-md flex items-start space-x-3 mt-4">
        <div className="mt-0.5">
          <Code className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Installation Notes</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
            <li>The widget will appear in the <strong>{config.general.widgetPosition.replace('-', ' ')}</strong> of your website.</li>
            <li>Make sure your website allows third-party scripts if you're using the JavaScript embed method.</li>
            <li>For WordPress sites, you can add the code in the theme footer or use a "Custom HTML" block.</li>
            <li>For advanced customization options, use the NPM package with your React application.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmbedCodeGenerator;
