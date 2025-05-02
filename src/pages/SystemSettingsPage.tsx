
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Users, Building, Shield, Database, Mail } from 'lucide-react';

const SystemSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">System Settings</h1>
        <p className="text-muted-foreground">
          Configure system-wide settings and manage global preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="tenants" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Tenants
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Application</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input id="app-name" defaultValue="AI Chat System" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-domain">Primary Domain</Label>
                    <Input id="primary-domain" defaultValue="chat.example.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" placeholder="smtp.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">SMTP Username</Label>
                    <Input id="smtp-user" placeholder="user@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-pass">SMTP Password</Label>
                    <Input id="smtp-pass" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" />
                  <Label htmlFor="email-notifications">Enable email notifications</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure user-related settings and default permissions
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">User Registration</h4>
                    <p className="text-xs text-muted-foreground">Allow new users to register</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Email Verification</h4>
                    <p className="text-xs text-muted-foreground">Require email verification</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Password Requirements</h4>
                    <p className="text-xs text-muted-foreground">Enforce strong passwords</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Session Timeout</h4>
                    <p className="text-xs text-muted-foreground">Automatically log out inactive users</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input className="w-20 h-8" defaultValue="30" />
                    <span className="text-sm">minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save User Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tenants">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Tenant Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure tenant-related settings and isolation policies
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Multi-tenant Mode</h4>
                    <p className="text-xs text-muted-foreground">Enable multiple isolated tenants</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Custom Domains</h4>
                    <p className="text-xs text-muted-foreground">Allow tenants to use custom domains</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Data Isolation</h4>
                    <p className="text-xs text-muted-foreground">Strict data isolation between tenants</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Tenant Settings</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storage-limit" className="text-xs">Storage Limit</Label>
                      <div className="flex items-center space-x-2">
                        <Input id="storage-limit" className="h-8" defaultValue="5" />
                        <span className="text-sm">GB</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-limit" className="text-xs">User Limit</Label>
                      <Input id="user-limit" className="h-8" defaultValue="10" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save Tenant Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure security policies and access controls
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">IP Restrictions</h4>
                    <p className="text-xs text-muted-foreground">Restrict access by IP address</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Rate Limiting</h4>
                    <p className="text-xs text-muted-foreground">Limit API requests per minute</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input className="w-20 h-8" defaultValue="60" />
                    <span className="text-sm">req/min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Audit Logging</h4>
                    <p className="text-xs text-muted-foreground">Enable detailed audit logs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure external services and API integrations
              </p>
              
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Email Provider</h4>
                        <p className="text-xs text-muted-foreground">Configure email delivery service</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Provider</Label>
                      <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                        <option>SMTP</option>
                        <option>Mailgun</option>
                        <option>SendGrid</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Database Configuration</h4>
                        <p className="text-xs text-muted-foreground">Configure database connection</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Database Host</Label>
                      <Input placeholder="localhost" />
                    </div>
                    <div className="space-y-2">
                      <Label>Database Name</Label>
                      <Input placeholder="ai_chat_db" />
                    </div>
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input placeholder="dbuser" />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save Integration Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettingsPage;
