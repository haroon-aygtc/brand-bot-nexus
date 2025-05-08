
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MultiSelect, 
  MultiSelectContent, 
  MultiSelectItem, 
  MultiSelectTrigger, 
  MultiSelectValue 
} from '@/components/ui/multi-select';
import { useGetRoles } from '@/hooks/useApi';

export interface UserFormData {
  name: string;
  email: string;
  role?: 'admin' | 'user' | 'guest';
  password?: string;
  roles?: string[];
}

interface UserFormProps {
  data: UserFormData;
  onChange: (data: UserFormData) => void;
  isNewUser?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ data, onChange, isNewUser = false }) => {
  const { data: roles, isLoading: rolesLoading, execute: fetchRoles } = useGetRoles();
  
  useEffect(() => {
    fetchRoles();
  }, []);
  
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />
      </div>
      {isNewUser && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={data.password || ''}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="role">Legacy Role</Label>
        <Select
          value={data.role}
          onValueChange={(value) => onChange({ ...data, role: value as 'admin' | 'user' | 'guest' })}
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Legacy role for backward compatibility. Consider using the roles selection below.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="roles">Roles</Label>
        {rolesLoading ? (
          <div className="text-sm text-muted-foreground">Loading roles...</div>
        ) : roles && roles.length > 0 ? (
          <MultiSelect
            value={data.roles || []}
            onValueChange={(value) => onChange({ ...data, roles: value })}
            placeholder="Select roles"
          >
            <MultiSelectTrigger id="roles" className="w-full">
              <MultiSelectValue placeholder="Select roles" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              {roles.map((role) => (
                <MultiSelectItem key={role.id} value={role.id}>
                  {role.name}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          </MultiSelect>
        ) : (
          <div className="text-sm text-muted-foreground">No roles available</div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
