
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import UserForm, { UserFormData } from '../user-form/UserForm';
import { User, Role } from '@/types/mockDb';

interface EditUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  onSelectedUserChange: (user: User) => void;
  onUpdateUser: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  onSelectedUserChange,
  onUpdateUser
}) => {
  if (!selectedUser) return null;
  
  // Convert User to UserFormData
  const userFormData: UserFormData = {
    name: selectedUser.name,
    email: selectedUser.email,
    role: selectedUser.role,
    password: '',
    roles: Array.isArray(selectedUser.roles) 
      ? selectedUser.roles.map((role: any) => typeof role === 'object' ? role.id : role)
      : []
  };
  
  const handleFormChange = (data: UserFormData) => {
    onSelectedUserChange({
      ...selectedUser,
      name: data.name,
      email: data.email,
      role: data.role,
      roles: data.roles.map(roleId => ({ id: roleId } as Role))
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <UserForm 
          data={userFormData}
          onChange={handleFormChange} 
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onUpdateUser}>
            <Check className="mr-2 h-4 w-4" />
            Update User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
