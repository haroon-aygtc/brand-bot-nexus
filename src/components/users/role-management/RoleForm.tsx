
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useGetPermissions } from '@/hooks/useApi';
import { Permission } from '@/types/mockDb';

export interface RoleFormData {
  name: string;
  description: string;
  is_default: boolean;
  permissions: string[];
}

interface RoleFormProps {
  data: RoleFormData;
  onChange: (data: RoleFormData) => void;
  disabled?: boolean;
}

const RoleForm: React.FC<RoleFormProps> = ({ data, onChange, disabled = false }) => {
  const { data: permissions, isLoading, execute: fetchPermissions } = useGetPermissions();
  
  useEffect(() => {
    fetchPermissions();
  }, []);
  
  // Group permissions by module
  const groupedPermissions: Record<string, Permission[]> = {};
  
  if (permissions) {
    permissions.forEach(permission => {
      const module = permission.module || 'General';
      if (!groupedPermissions[module]) {
        groupedPermissions[module] = [];
      }
      groupedPermissions[module].push(permission);
    });
  }
  
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    const updatedPermissions = checked
      ? [...data.permissions, permissionId]
      : data.permissions.filter(id => id !== permissionId);
    
    onChange({ ...data, permissions: updatedPermissions });
  };
  
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Role Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          disabled={disabled}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          disabled={disabled}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_default"
          checked={data.is_default}
          onCheckedChange={(checked) => 
            onChange({ ...data, is_default: checked === true })
          }
          disabled={disabled}
        />
        <Label htmlFor="is_default">Default Role</Label>
      </div>
      
      <div className="space-y-4">
        <Label>Permissions</Label>
        
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading permissions...</div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
              <div key={module} className="space-y-2">
                <h4 className="text-sm font-medium">{module}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {modulePermissions.map(permission => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={data.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(permission.id, checked === true)
                        }
                        disabled={disabled}
                      />
                      <Label 
                        htmlFor={`permission-${permission.id}`}
                        className="text-sm"
                      >
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {Object.keys(groupedPermissions).length === 0 && (
              <div className="text-sm text-muted-foreground">No permissions available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleForm;
