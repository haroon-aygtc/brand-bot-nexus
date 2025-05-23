
import React from 'react';
import UserManagement from '@/components/users/UserManagement';
import RoleManagement from '@/components/users/role-management/RoleManagement';
import PermissionManagement from '@/components/users/permission-management/PermissionManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, ShieldCheck, Key, Settings } from 'lucide-react';

const UserManagementPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage users, roles, and permissions for your AI chat system.
        </p>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Access Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>
        
        <TabsContent value="permissions">
          <PermissionManagement />
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="flex items-center justify-center h-48 border rounded-md border-dashed">
            <p className="text-muted-foreground">Access Control Settings - Coming Soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagementPage;
