
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Edit,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { Role } from '@/types/mockDb';

interface RoleTableProps {
  roles: Role[];
  isLoading: boolean;
  onEditRole: (role: Role) => void;
  onDeleteRole: (id: string) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({
  roles,
  isLoading,
  onEditRole,
  onDeleteRole
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Loading roles...
              </TableCell>
            </TableRow>
          ) : roles && roles.length > 0 ? (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description || '-'}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions?.slice(0, 3).map((permission) => (
                      <Badge key={permission.id} variant="outline" className="mr-1">
                        {permission.name}
                      </Badge>
                    ))}
                    {role.permissions && role.permissions.length > 3 && (
                      <Badge variant="outline">+{role.permissions.length - 3} more</Badge>
                    )}
                    {(!role.permissions || role.permissions.length === 0) && (
                      <span className="text-muted-foreground text-sm">No permissions</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {role.is_default ? (
                    <Badge variant="secondary">Default</Badge>
                  ) : (
                    <Badge variant="outline">Custom</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onEditRole(role)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDeleteRole(role.id)}
                        disabled={role.is_default}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No roles found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoleTable;
