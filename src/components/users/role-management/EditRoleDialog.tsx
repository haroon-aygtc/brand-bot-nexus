
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import RoleForm, { RoleFormData } from './RoleForm';
import { useUpdateRole } from '@/hooks/useApi';
import { Role } from '@/types/mockDb';

interface EditRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: Role | null;
  onSelectedRoleChange: (role: Role) => void;
  onSuccess: () => void;
}

const EditRoleDialog: React.FC<EditRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedRole,
  onSelectedRoleChange,
  onSuccess
}) => {
  const { toast } = useToast();
  const { execute: updateRole, isLoading } = useUpdateRole();
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    is_default: false,
    permissions: []
  });
  
  // Update form data when selected role changes
  useEffect(() => {
    if (selectedRole) {
      setFormData({
        name: selectedRole.name,
        description: selectedRole.description || '',
        is_default: selectedRole.is_default || false,
        permissions: selectedRole.permissions ? selectedRole.permissions.map(p => p.id) : []
      });
    }
  }, [selectedRole]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) return;
    
    if (!formData.name) {
      toast({
        title: "Validation Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await updateRole(selectedRole.id, {
        name: formData.name,
        description: formData.description,
        is_default: formData.is_default,
        permissions: formData.permissions
      });
      
      toast({
        title: "Role updated",
        description: "The role has been updated successfully"
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive"
      });
    }
  };
  
  if (!selectedRole) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <RoleForm 
            data={formData} 
            onChange={setFormData} 
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
              {isLoading ? "Updating..." : "Update Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoleDialog;
