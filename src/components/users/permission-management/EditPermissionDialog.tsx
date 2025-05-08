
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PermissionForm, { PermissionFormData } from './PermissionForm';
import { useUpdatePermission } from '@/hooks/useApi';
import { Permission } from '@/types/mockDb';

interface EditPermissionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPermission: Permission | null;
  onSelectedPermissionChange: (permission: Permission) => void;
  onSuccess: () => void;
}

const EditPermissionDialog: React.FC<EditPermissionDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedPermission,
  onSelectedPermissionChange,
  onSuccess
}) => {
  const { toast } = useToast();
  const { execute: updatePermission, isLoading } = useUpdatePermission();
  const [formData, setFormData] = useState<PermissionFormData>({
    name: '',
    description: '',
    module: ''
  });
  
  // Update form data when selected permission changes
  useEffect(() => {
    if (selectedPermission) {
      setFormData({
        name: selectedPermission.name,
        description: selectedPermission.description || '',
        module: selectedPermission.module || ''
      });
    }
  }, [selectedPermission]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPermission) return;
    
    if (!formData.name) {
      toast({
        title: "Validation Error",
        description: "Permission name is required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await updatePermission(selectedPermission.id, {
        name: formData.name,
        description: formData.description,
        module: formData.module
      });
      
      toast({
        title: "Permission updated",
        description: "The permission has been updated successfully"
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update permission",
        variant: "destructive"
      });
    }
  };
  
  if (!selectedPermission) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Permission</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <PermissionForm 
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
              {isLoading ? "Updating..." : "Update Permission"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPermissionDialog;
