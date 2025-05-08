
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import RoleForm, { RoleFormData } from './RoleForm';
import { useCreateRole } from '@/hooks/useApi';

interface AddRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  roleData: RoleFormData;
  onRoleDataChange: (data: RoleFormData) => void;
  onAddRole: () => void;
  onSuccess: () => void;
}

const AddRoleDialog: React.FC<AddRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  roleData,
  onRoleDataChange,
  onAddRole,
  onSuccess
}) => {
  const { toast } = useToast();
  const { execute: createRole, isLoading } = useCreateRole();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roleData.name) {
      toast({
        title: "Validation Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await createRole({
        name: roleData.name,
        description: roleData.description,
        is_default: roleData.is_default,
        permissions: roleData.permissions
      });
      
      toast({
        title: "Role created",
        description: "The new role has been added successfully"
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <RoleForm 
            data={roleData} 
            onChange={onRoleDataChange} 
            disabled={isLoading}
          />
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoleDialog;
