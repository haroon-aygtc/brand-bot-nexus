
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface UserFormData {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  password?: string;
  roles: string[];
}

interface UserFormProps {
  data: UserFormData;
  onChange: (data: UserFormData) => void;
}

const UserForm: React.FC<UserFormProps> = ({ data, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };
  
  const handleRoleChange = (value: 'admin' | 'user' | 'guest') => {
    onChange({ ...data, role: value });
  };
  
  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleInputChange}
          placeholder="Enter user name"
        />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
          placeholder="Enter user email"
        />
      </div>
      
      {data.password !== undefined && (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            placeholder="Enter password"
          />
        </div>
      )}
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Select 
          value={data.role} 
          onValueChange={(value: string) => handleRoleChange(value as 'admin' | 'user' | 'guest')}
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserForm;
