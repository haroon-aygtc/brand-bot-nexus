
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Bold, Italic, List, ListOrdered, Heading1, Heading2, 
  Link, Image, FileCode, RefreshCw
} from 'lucide-react';

interface ResponseFormatterProps {
  initialResponse?: string;
  onFormatted?: (formatted: string) => void;
}

const ResponseFormatter = ({ initialResponse = '', onFormatted }: ResponseFormatterProps) => {
  const [response, setResponse] = useState(initialResponse);
  const [formattedResponse, setFormattedResponse] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  const [autoFormat, setAutoFormat] = useState(true);
  
  const formatOptions = {
    addTitle: true,
    addBulletPoints: true,
    organizeInSections: true,
    highlightKeyPoints: true,
    addLinks: true,
    improveReadability: true
  };
  
  const [options, setOptions] = useState(formatOptions);
  
  const toggleOption = (optionName: keyof typeof formatOptions) => {
    setOptions(prev => ({
      ...prev,
      [optionName]: !prev[optionName]
    }));
  };
  
  const formatText = () => {
    // In a real implementation, this would send the request to an AI service
    // For demo purposes, we'll just wrap the text in some HTML formatting
    
    let result = response;
    
    if (options.addTitle) {
      result = `<h1>AI Response</h1>\n${result}`;
    }
    
    if (options.addBulletPoints) {
      // Simple mock transformation: convert sentences to bullet points
      const sentences = result.split('. ');
      if (sentences.length > 2) {
        const intro = sentences[0] + '.';
        const bullets = sentences.slice(1, -1).map(s => `<li>${s}.</li>`).join('\n');
        const conclusion = sentences[sentences.length - 1];
        
        result = `${intro}\n<ul>\n${bullets}\n</ul>\n${conclusion}`;
      }
    }
    
    if (options.highlightKeyPoints) {
      // Mock: bold important words
      const keywords = ['important', 'key', 'critical', 'essential', 'significant'];
      keywords.forEach(word => {
        result = result.replace(new RegExp(`\\b${word}\\b`, 'gi'), `<strong>${word}</strong>`);
      });
    }
    
    setFormattedResponse(result);
    if (onFormatted) {
      onFormatted(result);
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Response Formatter</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text Formatting</TabsTrigger>
            <TabsTrigger value="code">Code Blocks</TabsTrigger>
            <TabsTrigger value="media">Media & Links</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="title" 
                  checked={options.addTitle}
                  onCheckedChange={() => toggleOption('addTitle')}
                />
                <Label htmlFor="title">Add Title</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="bullets" 
                  checked={options.addBulletPoints}
                  onCheckedChange={() => toggleOption('addBulletPoints')}
                />
                <Label htmlFor="bullets">Convert to Bullet Points</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sections" 
                  checked={options.organizeInSections}
                  onCheckedChange={() => toggleOption('organizeInSections')}
                />
                <Label htmlFor="sections">Organize in Sections</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="highlight" 
                  checked={options.highlightKeyPoints}
                  onCheckedChange={() => toggleOption('highlightKeyPoints')}
                />
                <Label htmlFor="highlight">Highlight Key Points</Label>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex gap-1 mb-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Heading2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="syntax" />
                <Label htmlFor="syntax">Syntax Highlighting</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="indent" />
                <Label htmlFor="indent">Auto-Indent</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="copy-btn" />
                <Label htmlFor="copy-btn">Add Copy Button</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="line-numbers" />
                <Label htmlFor="line-numbers">Show Line Numbers</Label>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex gap-1 mb-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <FileCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-links" />
                <Label htmlFor="auto-links">Auto-Detect Links</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="embeds" />
                <Label htmlFor="embeds">Enable Embeds</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="images" />
                <Label htmlFor="images">Allow Images</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="videos" />
                <Label htmlFor="videos">Allow Videos</Label>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex gap-1 mb-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border rounded-lg p-4 mt-4">
          <Label htmlFor="original-response" className="text-sm font-medium">Original Response</Label>
          <Textarea 
            id="original-response" 
            className="mt-2 h-24" 
            placeholder="Enter AI response here to format..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-format" 
                checked={autoFormat}
                onCheckedChange={setAutoFormat}
              />
              <Label htmlFor="auto-format">Auto-Format Responses</Label>
            </div>
            
            <Button onClick={formatText} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Format Response
            </Button>
          </div>
          
          {formattedResponse && (
            <div className="mt-4">
              <Label htmlFor="formatted-response" className="text-sm font-medium">Formatted Result</Label>
              <div 
                className="mt-2 border rounded-md p-3 bg-muted/30 min-h-24 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formattedResponse }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseFormatter;
