
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Save,
  RefreshCw,
  Shield,
  Globe,
  Settings,
  Database,
  Cloud,
  Server
} from 'lucide-react';

const SystemSettingsManager = () => {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'AI Chat System',
    defaultLanguage: 'en',
    sessionTimeout: '30',
    enableDebugMode: false,
    enableMaintenanceMode: false,
    backupFrequency: 'daily'
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    requireStrongPasswords: true,
    enableTwoFactorAuth: false,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    enforcePasswordExpiry: false,
    passwordExpiryDays: '90',
    allowedIPs: '',
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    apiKey: '',
    webhookUrl: '',
    enableGoogleAnalytics: false,
    googleAnalyticsId: '',
    enableCRM: false,
    crmEndpoint: '',
  });
  
  const handleGeneralChange = (name: string, value: string | boolean) => {
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  const handleSecurityChange = (name: string, value: string | boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [name]: value
    });
  };
  
  const handleIntegrationChange = (name: string, value: string | boolean) => {
    setIntegrationSettings({
      ...integrationSettings,
      [name]: value
    });
  };
  
  const saveSettings = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', {
      general: generalSettings,
      security: securitySettings,
      integrations: integrationSettings
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">System Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input 
                  id="system-name" 
                  value={generalSettings.systemName}
                  onChange={(e) => handleGeneralChange('systemName', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select 
                    value={generalSettings.defaultLanguage}
                    onValueChange={(value) => handleGeneralChange('defaultLanguage', value)}
                  >
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select 
                    value={generalSettings.backupFrequency}
                    onValueChange={(value) => handleGeneralChange('backupFrequency', value)}
                  >
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="debug-mode" 
                    checked={generalSettings.enableDebugMode}
                    onCheckedChange={(checked) => handleGeneralChange('enableDebugMode', checked)}
                  />
                  <Label htmlFor="debug-mode">Enable Debug Mode</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="maintenance-mode" 
                    checked={generalSettings.enableMaintenanceMode}
                    onCheckedChange={(checked) => handleGeneralChange('enableMaintenanceMode', checked)}
                  />
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input 
                  id="session-timeout" 
                  type="number" 
                  value={generalSettings.sessionTimeout}
                  onChange={(e) => handleGeneralChange('sessionTimeout', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="strong-passwords" 
                    checked={securitySettings.requireStrongPasswords}
                    onCheckedChange={(checked) => handleSecurityChange('requireStrongPasswords', checked)}
                  />
                  <Label htmlFor="strong-passwords">Require Strong Passwords</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="two-factor" 
                    checked={securitySettings.enableTwoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange('enableTwoFactorAuth', checked)}
                  />
                  <Label htmlFor="two-factor">Enable Two-Factor Auth</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-login">Max Login Attempts</Label>
                  <Input 
                    id="max-login" 
                    type="number" 
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => handleSecurityChange('maxLoginAttempts', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="security-timeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="security-timeout" 
                    type="number" 
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch 
                    id="password-expiry" 
                    checked={securitySettings.enforcePasswordExpiry}
                    onCheckedChange={(checked) => handleSecurityChange('enforcePasswordExpiry', checked)}
                  />
                  <Label htmlFor="password-expiry">Enforce Password Expiry</Label>
                </div>
                
                {securitySettings.enforcePasswordExpiry && (
                  <Input 
                    id="expiry-days" 
                    type="number" 
                    placeholder="Days until password expires"
                    value={securitySettings.passwordExpiryDays}
                    onChange={(e) => handleSecurityChange('passwordExpiryDays', e.target.value)}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                <Textarea 
                  id="allowed-ips" 
                  placeholder="Enter IP addresses, one per line (leave empty to allow all)"
                  value={securitySettings.allowedIPs}
                  onChange={(e) => handleSecurityChange('allowedIPs', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter IP addresses or ranges (e.g., 192.168.1.0/24) one per line. Leave empty to allow all.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="api-key" 
                    value={integrationSettings.apiKey}
                    onChange={(e) => handleIntegrationChange('apiKey', e.target.value)}
                    type="password"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input 
                  id="webhook-url" 
                  placeholder="https://"
                  value={integrationSettings.webhookUrl}
                  onChange={(e) => handleIntegrationChange('webhookUrl', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  URL to receive system events and notifications
                </p>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch 
                    id="enable-analytics" 
                    checked={integrationSettings.enableGoogleAnalytics}
                    onCheckedChange={(checked) => handleIntegrationChange('enableGoogleAnalytics', checked)}
                  />
                  <Label htmlFor="enable-analytics">Enable Google Analytics</Label>
                </div>
                
                {integrationSettings.enableGoogleAnalytics && (
                  <Input 
                    id="analytics-id" 
                    placeholder="Google Analytics ID (e.g., G-XXXXXXXXXX)"
                    value={integrationSettings.googleAnalyticsId}
                    onChange={(e) => handleIntegrationChange('googleAnalyticsId', e.target.value)}
                  />
                )}
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch 
                    id="enable-crm" 
                    checked={integrationSettings.enableCRM}
                    onCheckedChange={(checked) => handleIntegrationChange('enableCRM', checked)}
                  />
                  <Label htmlFor="enable-crm">Enable CRM Integration</Label>
                </div>
                
                {integrationSettings.enableCRM && (
                  <Input 
                    id="crm-endpoint" 
                    placeholder="CRM API Endpoint"
                    value={integrationSettings.crmEndpoint}
                    onChange={(e) => handleIntegrationChange('crmEndpoint', e.target.value)}
                  />
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end pt-6 border-t mt-6">
          <Button onClick={saveSettings} className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettingsManager;
