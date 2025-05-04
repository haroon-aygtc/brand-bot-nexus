
/**
 * Get the appropriate badge variant based on the user role
 */
export const getRoleBadgeVariant = (role: string) => {
  switch(role) {
    case 'admin':
      return 'default';
    case 'user':
      return 'secondary';
    case 'guest':
      return 'outline';
    default:
      return 'outline';
  }
};

/**
 * Filter users based on search query
 */
export const filterUsers = (users: any[] | null, searchQuery: string) => {
  if (!users) return [];
  
  return users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
