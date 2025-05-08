
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import RoleTable from './RoleTable';
import AddRoleDialog from './AddRoleDialog';
import EditRoleDialog from './EditRoleDialog';
import { useGetRoles, useDeleteRole } from '@/hooks/useApi';
import { Role } from '@/types/mockDb';
import { RoleFormData } from './RoleForm';

const RoleManagement = () => {
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<RoleFormData>({
    name: '',
    description: '',
    is_default: false,
    permissions: []
  });
  
  const { toast } = useToast();
  const { data: roles, isLoading, execute: fetchRoles } = useGetRoles();
  const { execute: deleteRole } = useDeleteRole();
  
  useEffect(() => {
    fetchRoles();
  }, []);
  
  const handleDeleteRole = async (id: string) => {
    try {
      await deleteRole(id);
      toast({
        title: "Role deleted",
        description: "The role has been removed"
      });
      fetchRoles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Role Management</CardTitle>
        <Button onClick={() => setIsAddRoleOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </CardHeader>
      <CardContent>
        <RoleTable 
          roles={roles || []} 
          isLoading={isLoading}
          onEditRole={(role) => {
            setSelectedRole(role);
            setIsEditRoleOpen(true);
          }}
          onDeleteRole={handleDeleteRole}
        />
        
        <AddRoleDialog 
          isOpen={isAddRoleOpen}
          onOpenChange={setIsAddRoleOpen}
          roleData={newRole}
          onRoleDataChange={setNewRole}
          onAddRole={() => {/* Role is added via form */}}
          onSuccess={() => {
            setIsAddRoleOpen(false);
            fetchRoles();
            setNewRole({
              name: '',
              description: '',
              is_default: false,
              permissions: []
            });
          }}
        />
        
        <EditRoleDialog 
          isOpen={isEditRoleOpen}
          onOpenChange={setIsEditRoleOpen}
          selectedRole={selectedRole}
          onSelectedRoleChange={setSelectedRole}
          onSuccess={() => {
            setIsEditRoleOpen(false);
            fetchRoles();
          }}
        />
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
