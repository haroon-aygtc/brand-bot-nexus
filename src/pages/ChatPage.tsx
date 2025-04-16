
import { useState } from 'react';
import ChatHistory from '@/components/chat/ChatHistory';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [showHistory, setShowHistory] = useState(true);
  
  const handleNewChat = () => {
    setSelectedChatId(undefined);
  };
  
  return (
    <div className="flex h-full bg-card rounded-lg border border-border overflow-hidden">
      {showHistory && (
        <ChatHistory
          onSelectChat={setSelectedChatId}
          onNewChat={handleNewChat}
          selectedChatId={selectedChatId}
        />
      )}
      
      <div className="flex-1">
        <ChatInterface chatId={selectedChatId} />
      </div>
    </div>
  );
};

export default ChatPage;
