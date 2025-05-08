
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
  Key
} from 'lucide-react';
import { Permission } from '@/types/mockDb';

interface PermissionTableProps {
  permissions: Permission[];
  isLoading: boolean;
  onEditPermission: (permission: Permission) => void;
  onDeletePermission: (id: string) => void;
}

const PermissionTable: React.FC<PermissionTableProps> = ({
  permissions,
  isLoading,
  onEditPermission,
  onDeletePermission
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Loading permissions...
              </TableCell>
            </TableRow>
          ) : permissions && permissions.length > 0 ? (
            permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell>{permission.description || '-'}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {permission.module || 'General'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    {permission.slug}
                  </code>
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
                        onClick={() => onEditPermission(permission)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDeletePermission(permission.id)}
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
                No permissions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PermissionTable;
