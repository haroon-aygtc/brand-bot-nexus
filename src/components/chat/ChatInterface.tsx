
import { useState, useEffect, useRef } from 'react';
import ChatMessage, { ChatMessageProps, MessageRole } from './ChatMessage';
import ChatInput from './ChatInput';

// Mock data
const mockInitialMessages: Omit<ChatMessageProps, 'isLoading'>[] = [
  {
    role: 'assistant',
    content: "👋 Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date('2025-04-16T10:00:00'),
  }
];

interface ChatInterfaceProps {
  chatId?: string;
  onNewMessage?: (message: string) => void;
}

const ChatInterface = ({ chatId }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(mockInitialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Reset messages when chatId changes
    if (chatId) {
      setMessages(mockInitialMessages);
    }
  }, [chatId]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Add AI loading message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isLoading: true,
        },
      ]);
      
      // Simulate API call delay
      setTimeout(() => {
        setIsTyping(false);
        
        // Replace loading message with actual response
        setMessages((prev) => {
          const newMessages = [...prev];
          const loadingIndex = newMessages.findIndex(
            (msg) => msg.role === 'assistant' && msg.isLoading
          );
          
          if (loadingIndex !== -1) {
            newMessages[loadingIndex] = {
              role: 'assistant',
              content: generateResponse(content),
              timestamp: new Date(),
            };
          }
          
          return newMessages;
        });
      }, 2000);
    }, 500);
  };
  
  // Simulate AI response based on user input
  const generateResponse = (input: string): string => {
    const lowercasedInput = input.toLowerCase();
    
    if (lowercasedInput.includes('hello') || lowercasedInput.includes('hi')) {
      return "Hello! How can I assist you today?";
    } else if (lowercasedInput.includes('feature') || lowercasedInput.includes('features')) {
      return "# Key Features of Our Platform\n\n- **Dynamic Prompt Handling**: Route prompts to different AI models based on business rules\n- **Response Enhancement**: Format AI responses with branded styling\n- **Knowledge Base Integration**: Utilize internal data for more accurate responses\n- **Live Web Scraping**: Extract data from websites to keep responses up-to-date\n\nWhich feature would you like to learn more about?";
    } else if (lowercasedInput.includes('price') || lowercasedInput.includes('cost') || lowercasedInput.includes('subscription')) {
      return "## Pricing Plans\n\n* **Starter**: $49/month - Basic AI chat with limited customization\n* **Professional**: $99/month - Full customization, knowledge base, and analytics\n* **Enterprise**: Custom pricing - Advanced integrations and dedicated support\n\nAll plans include a 14-day free trial. Would you like to know more about a specific plan?";
    } else if (lowercasedInput.includes('scraping') || lowercasedInput.includes('scraper')) {
      return "Our web scraping engine allows you to extract data from websites to keep your AI responses up-to-date. Features include:\n\n- Single URL or bulk scraping\n- Visual selector builder\n- Scheduled scraping jobs\n- Data cleaning and formatting\n- Storage in your knowledge base\n\nThis helps ensure your AI always has the most current information.";
    } else {
      return "Thank you for your message. Our AI chat system is designed to help businesses create customized AI experiences. Would you like to know more about specific features like:\n\n- Knowledge base integration\n- Prompt management\n- Response formatting\n- Analytics and monitoring\n\nFeel free to ask about any of these topics!";
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="divide-y divide-border">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              isLoading={message.isLoading}
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
};

export default ChatInterface;
