
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Copy, Code, Settings, Info, Palette, MessageSquare, LayoutTemplate, Smartphone, Save, Download } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import WidgetPreview from '@/components/widget/WidgetPreview';
import EmbedCodeGenerator from '@/components/widget/EmbedCodeGenerator';

const widgetConfigSchema = z.object({
  general: z.object({
    name: z.string().min(2, { message: "Widget name must be at least 2 characters." }),
    welcomeMessage: z.string().min(5, { message: "Welcome message must be at least 5 characters." }),
    botName: z.string().min(2, { message: "Bot name must be at least 2 characters." }),
    placeholderText: z.string().optional(),
    widgetPosition: z.enum(["bottom-right", "bottom-left", "top-right", "top-left"]),
  }),
  appearance: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    headerBgColor: z.string(),
    textColor: z.string(),
    fontSize: z.number().min(12).max(20),
    borderRadius: z.number().min(0).max(20),
    widgetWidth: z.number().min(280).max(500),
    widgetHeight: z.number().min(400).max(800),
    showLogo: z.boolean(),
    showCloseButton: z.boolean(),
    darkMode: z.boolean(),
  }),
  behavior: z.object({
    startMinimized: z.boolean(),
    autoOpen: z.boolean(),
    autoOpenDelay: z.number().min(0).max(60),
    playSoundOnMessage: z.boolean(),
    persistConversation: z.boolean(),
    showTypingIndicator: z.boolean(),
    enableUserRatings: z.boolean(),
    collectUserData: z.boolean(),
  }),
  advanced: z.object({
    modelSelection: z.enum(["gemini", "huggingface", "auto"]),
    contextRetention: z.enum(["session", "persistent", "none"]),
    maxMessagesStored: z.number().min(10).max(1000),
    enableAnalytics: z.boolean(),
    debugMode: z.boolean(),
    loadTimeoutMs: z.number().min(1000).max(30000),
  }),
});

type WidgetConfigFormValues = z.infer<typeof widgetConfigSchema>;

const WidgetConfigPage = () => {
  const [selectedTab, setSelectedTab] = useState("general");
  const [previewVisible, setPreviewVisible] = useState(true);
  const { toast } = useToast();
  
  const defaultValues: WidgetConfigFormValues = {
    general: {
      name: "Customer Support Widget",
      welcomeMessage: "Hello! How can we assist you today?",
      botName: "Support Assistant",
      placeholderText: "Type your message here...",
      widgetPosition: "bottom-right",
    },
    appearance: {
      primaryColor: "#7E69AB",
      secondaryColor: "#f3f4f6",
      headerBgColor: "#1f2937",
      textColor: "#111827",
      fontSize: 14,
      borderRadius: 8,
      widgetWidth: 350,
      widgetHeight: 550,
      showLogo: true,
      showCloseButton: true,
      darkMode: false,
    },
    behavior: {
      startMinimized: true,
      autoOpen: false,
      autoOpenDelay: 5,
      playSoundOnMessage: true,
      persistConversation: true,
      showTypingIndicator: true,
      enableUserRatings: true,
      collectUserData: false,
    },
    advanced: {
      modelSelection: "auto",
      contextRetention: "session",
      maxMessagesStored: 100,
      enableAnalytics: true,
      debugMode: false,
      loadTimeoutMs: 5000,
    },
  };
  
  const form = useForm<WidgetConfigFormValues>({
    resolver: zodResolver(widgetConfigSchema),
    defaultValues,
  });

  const onSubmit = (data: WidgetConfigFormValues) => {
    console.log('Widget configuration saved:', data);
    toast({
      title: "Configuration Saved",
      description: "Your widget configuration has been successfully saved.",
    });
  };

  const handleResetToDefaults = () => {
    form.reset(defaultValues);
    toast({
      title: "Reset to Defaults",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Widget Configuration</h1>
          <p className="text-muted-foreground">Customize your chat widget and generate embed code.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleResetToDefaults}>Reset</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/5 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Configure Your Widget
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="w-full grid grid-cols-4">
                      <TabsTrigger value="general" className="flex items-center gap-1">
                        <Info className="h-4 w-4" />
                        <span className="hidden sm:inline">General</span>
                      </TabsTrigger>
                      <TabsTrigger value="appearance" className="flex items-center gap-1">
                        <Palette className="h-4 w-4" />
                        <span className="hidden sm:inline">Appearance</span>
                      </TabsTrigger>
                      <TabsTrigger value="behavior" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Behavior</span>
                      </TabsTrigger>
                      <TabsTrigger value="advanced" className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        <span className="hidden sm:inline">Advanced</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general" className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="general.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Widget Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter widget name" />
                            </FormControl>
                            <FormDescription>
                              Internal name for this widget configuration.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="general.welcomeMessage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Welcome Message</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter welcome message" />
                            </FormControl>
                            <FormDescription>
                              First message users will see when opening the chat.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="general.botName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bot Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter bot name" />
                            </FormControl>
                            <FormDescription>
                              Name displayed for the bot in the conversation.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="general.placeholderText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Input Placeholder</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter placeholder text" />
                            </FormControl>
                            <FormDescription>
                              Text shown in the empty message input field.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="general.widgetPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Widget Position</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                <SelectItem value="top-right">Top Right</SelectItem>
                                <SelectItem value="top-left">Top Left</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Position of the widget on the page.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="appearance" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="appearance.primaryColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Color</FormLabel>
                              <div className="flex gap-2">
                                <div 
                                  className="w-10 h-10 rounded border"
                                  style={{ backgroundColor: field.value }}
                                />
                                <FormControl>
                                  <Input {...field} type="text" />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.secondaryColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Secondary Color</FormLabel>
                              <div className="flex gap-2">
                                <div 
                                  className="w-10 h-10 rounded border"
                                  style={{ backgroundColor: field.value }}
                                />
                                <FormControl>
                                  <Input {...field} type="text" />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.headerBgColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Header Background</FormLabel>
                              <div className="flex gap-2">
                                <div 
                                  className="w-10 h-10 rounded border"
                                  style={{ backgroundColor: field.value }}
                                />
                                <FormControl>
                                  <Input {...field} type="text" />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.textColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Text Color</FormLabel>
                              <div className="flex gap-2">
                                <div 
                                  className="w-10 h-10 rounded border"
                                  style={{ backgroundColor: field.value }}
                                />
                                <FormControl>
                                  <Input {...field} type="text" />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <FormField
                          control={form.control}
                          name="appearance.fontSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Font Size: {field.value}px</FormLabel>
                              <FormControl>
                                <Slider
                                  min={12}
                                  max={20}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.borderRadius"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Border Radius: {field.value}px</FormLabel>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={20}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.widgetWidth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Widget Width: {field.value}px</FormLabel>
                              <FormControl>
                                <Slider
                                  min={280}
                                  max={500}
                                  step={10}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.widgetHeight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Widget Height: {field.value}px</FormLabel>
                              <FormControl>
                                <Slider
                                  min={400}
                                  max={800}
                                  step={10}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <FormField
                          control={form.control}
                          name="appearance.showLogo"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Show Logo</FormLabel>
                                <FormDescription>
                                  Display your brand logo in the widget header
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.showCloseButton"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Show Close Button</FormLabel>
                                <FormDescription>
                                  Allow users to close the widget
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="appearance.darkMode"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Dark Mode</FormLabel>
                                <FormDescription>
                                  Use dark theme for the widget
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="behavior" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="behavior.startMinimized"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Start Minimized</FormLabel>
                                <FormDescription>
                                  Widget starts in minimized state
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="behavior.autoOpen"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Auto Open</FormLabel>
                                <FormDescription>
                                  Automatically open the widget after delay
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        {form.watch("behavior.autoOpen") && (
                          <FormField
                            control={form.control}
                            name="behavior.autoOpenDelay"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Auto Open Delay (seconds): {field.value}</FormLabel>
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={60}
                                    step={1}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        )}
                        
                        <FormField
                          control={form.control}
                          name="behavior.playSoundOnMessage"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Sound Notifications</FormLabel>
                                <FormDescription>
                                  Play sound when new messages arrive
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="behavior.persistConversation"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Persist Conversation</FormLabel>
                                <FormDescription>
                                  Save conversation between sessions
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="behavior.showTypingIndicator"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Typing Indicator</FormLabel>
                                <FormDescription>
                                  Show typing animation when AI responds
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="behavior.enableUserRatings"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>User Ratings</FormLabel>
                                <FormDescription>
                                  Allow users to rate AI responses
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="behavior.collectUserData"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Collect User Data</FormLabel>
                                <FormDescription>
                                  Ask for name/email before starting chat
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="advanced.modelSelection"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AI Model Selection</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select AI model" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="gemini">Gemini</SelectItem>
                                <SelectItem value="huggingface">Hugging Face</SelectItem>
                                <SelectItem value="auto">Auto (Smart Routing)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select which AI model to use for responses
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="advanced.contextRetention"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Context Retention</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select context retention" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="session">Session Only</SelectItem>
                                <SelectItem value="persistent">Persistent (Across Sessions)</SelectItem>
                                <SelectItem value="none">None (Stateless)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How long to maintain conversation context
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="advanced.maxMessagesStored"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Messages Stored: {field.value}</FormLabel>
                            <FormControl>
                              <Slider
                                min={10}
                                max={1000}
                                step={10}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum number of messages to keep in history
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="advanced.enableAnalytics"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Enable Analytics</FormLabel>
                                <FormDescription>
                                  Collect usage analytics and metrics
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="advanced.debugMode"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Debug Mode</FormLabel>
                                <FormDescription>
                                  Log detailed information to console
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="advanced.loadTimeoutMs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Load Timeout (ms): {field.value}</FormLabel>
                            <FormControl>
                              <Slider
                                min={1000}
                                max={30000}
                                step={1000}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum time to wait for widget to load
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Configuration
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Embed Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmbedCodeGenerator config={form.getValues()} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-2/5">
          <div className="sticky top-6 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <LayoutTemplate className="mr-2 h-5 w-5" />
                  Live Preview
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewVisible(!previewVisible)}
                >
                  {previewVisible ? "Hide Preview" : "Show Preview"}
                </Button>
              </CardHeader>
              <CardContent>
                {previewVisible ? (
                  <div className="bg-gray-100 rounded-lg p-4 min-h-[500px] flex items-center justify-center relative">
                    <WidgetPreview config={form.getValues()} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                    <Button variant="outline" onClick={() => setPreviewVisible(true)}>
                      Show Preview
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Export & Deploy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Export your widget configuration or deploy it directly to your production environment.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" className="justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export as JSON
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Code className="mr-2 h-4 w-4" />
                      Export as JavaScript
                    </Button>
                    <Button className="justify-start">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Deploy to Production
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetConfigPage;
