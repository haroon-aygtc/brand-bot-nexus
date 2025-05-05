
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const EmbedCodePage = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const embedCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['MyWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','mw','https://cdn.example.com/widget.js'));
  
  mw('init', { 
    token: 'YOUR_API_TOKEN',
    theme: 'light',
    position: 'bottom-right' 
  });
</script>`;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Embed Code</h1>
        <p className="text-muted-foreground">
          Add your AI assistant to any website with a simple embed code
        </p>
      </div>

      <Tabs defaultValue="js">
        <TabsList>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="vue">Vue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="js" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Code className="h-5 w-5 mr-2" />
                JavaScript Embed Code
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">{embedCode}</code>
              </pre>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Installation Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Copy the embed code above</li>
                  <li>Paste it into the <code className="bg-muted px-1 rounded">&lt;head&gt;</code> section of your website</li>
                  <li>Replace <code className="bg-muted px-1 rounded">YOUR_API_TOKEN</code> with your actual API token</li>
                  <li>Customize the parameters as needed</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="react" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>React Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Install our React component:</p>
              <pre className="bg-muted p-4 rounded-md">
                <code>npm install @example/ai-assistant-react</code>
              </pre>
              
              <p className="text-muted-foreground mt-4 mb-2">Usage:</p>
              <pre className="bg-muted p-4 rounded-md">
                <code>{`import { AIAssistant } from '@example/ai-assistant-react';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <AIAssistant 
        apiToken="YOUR_API_TOKEN"
        theme="light"
        position="bottom-right"
      />
    </div>
  );
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vue Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Install our Vue component:</p>
              <pre className="bg-muted p-4 rounded-md">
                <code>npm install @example/ai-assistant-vue</code>
              </pre>
              
              <p className="text-muted-foreground mt-4 mb-2">Usage:</p>
              <pre className="bg-muted p-4 rounded-md">
                <code>{`<template>
  <div>
    <h1>My Website</h1>
    <AIAssistant 
      :api-token="apiToken"
      theme="light"
      position="bottom-right"
    />
  </div>
</template>

<script>
import { AIAssistant } from '@example/ai-assistant-vue';

export default {
  components: {
    AIAssistant
  },
  data() {
    return {
      apiToken: 'YOUR_API_TOKEN'
    }
  }
}
</script>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmbedCodePage;
