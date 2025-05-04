
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface UserSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserSearch;
