import { useEffect } from 'react';
import useChat from '../../hooks/useChat';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import ChatInput from './ChatInput';

export default function ChatContainer({ currentChat, setSidebarOpen }) {
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    messagesEndRef
  } = useChat();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader 
        currentChat={currentChat} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput 
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}