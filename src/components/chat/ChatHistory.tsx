
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, MessageSquare, MoreVertical, Plus, Search, Trash } from 'lucide-react';

// Mock chat history data
const mockChats = [
  { id: '1', title: 'Product information inquiry', updatedAt: new Date('2025-04-15T14:32:00'), messageCount: 12 },
  { id: '2', title: 'Pricing questions', updatedAt: new Date('2025-04-14T09:15:00'), messageCount: 8 },
  { id: '3', title: 'Technical support', updatedAt: new Date('2025-04-12T16:20:00'), messageCount: 15 },
  { id: '4', title: 'Refund request', updatedAt: new Date('2025-04-10T11:45:00'), messageCount: 6 },
  { id: '5', title: 'New feature inquiry', updatedAt: new Date('2025-04-09T13:10:00'), messageCount: 9 },
];

interface ChatHistoryProps {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  selectedChatId?: string;
}

const ChatHistory = ({ onSelectChat, onNewChat, selectedChatId }: ChatHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = searchQuery 
    ? mockChats.filter(chat => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockChats;
  
  return (
    <div className="w-full max-w-xs border-r border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <Button 
          onClick={onNewChat}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          New Chat
        </Button>
      </div>
      
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search chats..."
            className="w-full bg-background pl-8 rounded-md border border-input h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="divide-y divide-border">
          {filteredChats.length === 0 ? (
            <li className="p-4 text-center text-muted-foreground">
              No chats found
            </li>
          ) : (
            filteredChats.map((chat) => (
              <li 
                key={chat.id}
                className={cn(
                  "relative",
                  selectedChatId === chat.id && "bg-accent"
                )}
              >
                <button
                  className="w-full text-left p-4 hover:bg-muted/50 transition-colors flex flex-col gap-1"
                  onClick={() => onSelectChat(chat.id)}
                >
                  <span className="font-medium truncate">{chat.title}</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={12} className="mr-1" />
                    <span>
                      {chat.updatedAt.toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <MessageSquare size={12} className="mr-1" />
                    <span>{chat.messageCount}</span>
                  </div>
                </button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-3 h-8 w-8 hover:bg-background/80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash size={16} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatHistory;
