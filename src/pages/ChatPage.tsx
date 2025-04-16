
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Chat History</h1>
      </div>
      
      <div className="flex h-[calc(100%-2rem)] bg-card rounded-lg border border-border overflow-hidden">
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
    </div>
  );
};

export default ChatPage;
