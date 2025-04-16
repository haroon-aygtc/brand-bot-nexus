
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessageProps {
  role: MessageRole;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

const ChatMessage = ({ role, content, timestamp, isLoading }: ChatMessageProps) => {
  const isUser = role === 'user';
  
  return (
    <div className={cn(
      'flex gap-3 p-4 animate-fade-in',
      isUser ? 'bg-white' : 'bg-muted/30'
    )}>
      <div className={cn(
        'flex-shrink-0 rounded-full w-8 h-8 flex items-center justify-center',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-brand-blue text-white'
      )}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{isUser ? 'You' : 'Assistant'}</span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className={cn(
          'chat-message-content',
          !isUser && 'markdown-content'
        )}>
          {isLoading ? (
            <LoadingContent />
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingContent = () => (
  <div className="flex flex-col gap-2">
    <div className="h-4 w-full max-w-[300px] bg-muted animate-pulse-subtle rounded" />
    <div className="h-4 w-full max-w-[250px] bg-muted animate-pulse-subtle rounded" />
    <div className="h-4 w-full max-w-[320px] bg-muted animate-pulse-subtle rounded" />
  </div>
);

export default ChatMessage;
