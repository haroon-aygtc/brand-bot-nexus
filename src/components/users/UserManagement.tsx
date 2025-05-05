
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { User } from '@/types/mockDb';

// Import our components
import UserTable from './user-table/UserTable';
import UserSearch from './user-search/UserSearch';
import AddUserDialog from './user-dialogs/AddUserDialog';
import EditUserDialog from './user-dialogs/EditUserDialog';
import { getRoleBadgeVariant, filterUsers } from './utils/userUtils';
import { UserFormData } from './user-form/UserForm';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user' | 'guest',
    password: '' // Add password field for creating new users
  });
  
  const { toast } = useToast();
  const { data: users, isLoading, execute: fetchUsers } = useApi(async () => {
    try {
      const apiUsers = await api.users.getAll();
      
      // Map API response to match our User type
      return apiUsers.map((user: any) => ({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenant_id ? user.tenant_id.toString() : undefined,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
      return [];
    }
  });
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleAddUser = async () => {
    try {
      await api.users.create({
        ...newUser,
        tenantId: undefined,
      });
      setIsAddUserOpen(false);
      setNewUser({
        name: '',
        email: '',
        role: 'user',
        password: ''
      });
      toast({
        title: "User created",
        description: "The user has been added successfully"
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive"
      });
    }
  };
  
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      await api.users.update(selectedUser.id, {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role
      });
      setIsEditUserOpen(false);
      toast({
        title: "User updated",
        description: "The user has been updated successfully"
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteUser = async (id: string) => {
    try {
      await api.users.delete(id);
      toast({
        title: "User deleted",
        description: "The user has been removed"
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };
  
  const filteredUsers = filterUsers(users || [], searchQuery);
  
  // Define a handler function to update the newUser state
  const handleUserDataChange = (data: UserFormData) => {
    setNewUser(data);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">User Management</CardTitle>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        {/* Search Component */}
        <UserSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Table Component */}
        <UserTable 
          users={filteredUsers}
          isLoading={isLoading}
          onEditUser={(user) => {
            setSelectedUser(user);
            setIsEditUserOpen(true);
          }}
          onDeleteUser={handleDeleteUser}
          getRoleBadgeVariant={getRoleBadgeVariant}
        />
        
        {/* Add User Dialog */}
        <AddUserDialog 
          isOpen={isAddUserOpen}
          onOpenChange={setIsAddUserOpen}
          userData={newUser}
          onUserDataChange={handleUserDataChange}
          onAddUser={handleAddUser}
        />
        
        {/* Edit User Dialog */}
        <EditUserDialog 
          isOpen={isEditUserOpen}
          onOpenChange={setIsEditUserOpen}
          selectedUser={selectedUser}
          onSelectedUserChange={setSelectedUser}
          onUpdateUser={handleUpdateUser}
        />
      </CardContent>
    </Card>
  );
};

export default UserManagement;
