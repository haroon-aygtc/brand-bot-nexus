
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface PermissionFormData {
  name: string;
  description: string;
  module: string;
}

interface PermissionFormProps {
  data: PermissionFormData;
  onChange: (data: PermissionFormData) => void;
  disabled?: boolean;
}

const modules = [
  'User Management',
  'Role Management',
  'Content Management',
  'Knowledge Base',
  'AI Configuration',
  'System Settings',
  'Analytics',
  'Reporting'
];

const PermissionForm: React.FC<PermissionFormProps> = ({ data, onChange, disabled = false }) => {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Permission Name</Label>
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
      
      <div className="space-y-2">
        <Label htmlFor="module">Module</Label>
        <Select
          value={data.module}
          onValueChange={(value) => onChange({ ...data, module: value })}
          disabled={disabled}
        >
          <SelectTrigger id="module">
            <SelectValue placeholder="Select module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">General</SelectItem>
            {modules.map((module) => (
              <SelectItem key={module} value={module}>
                {module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PermissionForm;
