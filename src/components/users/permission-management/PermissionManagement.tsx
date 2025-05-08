
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PermissionTable from './PermissionTable';
import AddPermissionDialog from './AddPermissionDialog';
import EditPermissionDialog from './EditPermissionDialog';
import { useGetPermissions, useDeletePermission } from '@/hooks/useApi';
import { Permission } from '@/types/mockDb';
import { PermissionFormData } from './PermissionForm';

const PermissionManagement = () => {
  const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);
  const [isEditPermissionOpen, setIsEditPermissionOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [newPermission, setNewPermission] = useState<PermissionFormData>({
    name: '',
    description: '',
    module: ''
  });
  
  const { toast } = useToast();
  const { data: permissions, isLoading, execute: fetchPermissions } = useGetPermissions();
  const { execute: deletePermission } = useDeletePermission();
  
  useEffect(() => {
    fetchPermissions();
  }, []);
  
  const handleDeletePermission = async (id: string) => {
    try {
      await deletePermission(id);
      toast({
        title: "Permission deleted",
        description: "The permission has been removed"
      });
      fetchPermissions();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete permission",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Permission Management</CardTitle>
        <Button onClick={() => setIsAddPermissionOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Permission
        </Button>
      </CardHeader>
      <CardContent>
        <PermissionTable 
          permissions={permissions || []} 
          isLoading={isLoading}
          onEditPermission={(permission) => {
            setSelectedPermission(permission);
            setIsEditPermissionOpen(true);
          }}
          onDeletePermission={handleDeletePermission}
        />
        
        <AddPermissionDialog 
          isOpen={isAddPermissionOpen}
          onOpenChange={setIsAddPermissionOpen}
          permissionData={newPermission}
          onPermissionDataChange={setNewPermission}
          onSuccess={() => {
            setIsAddPermissionOpen(false);
            fetchPermissions();
            setNewPermission({
              name: '',
              description: '',
              module: ''
            });
          }}
        />
        
        <EditPermissionDialog 
          isOpen={isEditPermissionOpen}
          onOpenChange={setIsEditPermissionOpen}
          selectedPermission={selectedPermission}
          onSelectedPermissionChange={setSelectedPermission}
          onSuccess={() => {
            setIsEditPermissionOpen(false);
            fetchPermissions();
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PermissionManagement;
