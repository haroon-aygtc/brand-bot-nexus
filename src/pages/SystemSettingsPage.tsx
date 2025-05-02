
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SystemSettingsManager } from '@/components/settings/SystemSettingsManager';
import { BrandingManager } from '@/components/branding/BrandingManager';
import { ResponseFormatter } from '@/components/response-formatter/ResponseFormatter';
import { FollowUpBuilder } from '@/components/follow-up/FollowUpBuilder';

const SystemSettingsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">
          Configure and customize your AI chat system settings.
        </p>
      </div>
      
      <Tabs defaultValue="system">
        <TabsList className="mb-6">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="formatter">Response Formatter</TabsTrigger>
          <TabsTrigger value="followup">Follow-Up Builder</TabsTrigger>
        </TabsList>
        
        <TabsContent value="system">
          <SystemSettingsManager />
        </TabsContent>
        
        <TabsContent value="branding">
          <BrandingManager />
        </TabsContent>
        
        <TabsContent value="formatter">
          <ResponseFormatter />
        </TabsContent>
        
        <TabsContent value="followup">
          <FollowUpBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettingsPage;
