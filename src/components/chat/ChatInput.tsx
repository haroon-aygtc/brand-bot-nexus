
import { useState, FormEvent, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 border-t border-border"
    >
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[100px] resize-none pr-12"
            disabled={disabled}
          />
          <Button
            type="button" 
            size="icon"
            variant="ghost"
            className="absolute right-2 bottom-2"
            disabled={disabled}
          >
            <Paperclip size={18} />
          </Button>
        </div>
        <Button 
          type="submit"
          size="icon"
          className="h-10 w-10"
          disabled={!input.trim() || disabled}
        >
          <Send size={18} />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
