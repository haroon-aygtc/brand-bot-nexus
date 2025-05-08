
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PermissionForm, { PermissionFormData } from './PermissionForm';
import { useCreatePermission } from '@/hooks/useApi';

interface AddPermissionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  permissionData: PermissionFormData;
  onPermissionDataChange: (data: PermissionFormData) => void;
  onSuccess: () => void;
}

const AddPermissionDialog: React.FC<AddPermissionDialogProps> = ({
  isOpen,
  onOpenChange,
  permissionData,
  onPermissionDataChange,
  onSuccess
}) => {
  const { toast } = useToast();
  const { execute: createPermission, isLoading } = useCreatePermission();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!permissionData.name) {
      toast({
        title: "Validation Error",
        description: "Permission name is required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await createPermission({
        name: permissionData.name,
        description: permissionData.description,
        module: permissionData.module
      });
      
      toast({
        title: "Permission created",
        description: "The new permission has been added successfully"
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create permission",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Permission</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <PermissionForm 
            data={permissionData} 
            onChange={onPermissionDataChange} 
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
              {isLoading ? "Creating..." : "Create Permission"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPermissionDialog;
