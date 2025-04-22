import { useState, useEffect } from 'react';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Combined function to handle both message and file submissions
  const onSubmitMessage = async (e, messageContent, files) => {
    e.preventDefault();
    
    // Don't submit if there's nothing to send
    if ((!messageContent || messageContent.trim() === '') && (!files || files.length === 0)) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create form data for API call
      const formData = new FormData();
      
      // Add text input if any
      if (messageContent && messageContent.trim()) {
        formData.append('message', messageContent);
      }
      
      // Add files
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('file', file);
        });
      }
      
      // Only make API call if files are being submitted
      if (files && files.length > 0) {
        // First add the user message (before API response)
        handleSubmit(e, messageContent, files, null);
        
        // Make API call
        const response = await fetch('https://7191-92-40-213-19.ngrok-free.app/api/v1/eia/review', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': 'Bearer 2sHFoVegnt2dYHzP70MXjfhI1pd_4QGgASHPFBhEEWpEaJbsP'
          },
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        
        // Now add the API response
        handleSubmit(null, '', null, result);
      } else {
        // Just a text message, no API call needed
        handleSubmit(e, messageContent, null, null);
      }
    } catch (error) {
      console.error('Error submitting:', error);
      setError(error.message);
      
      // Add error message to chat
      handleSubmit(null, `Error processing request: ${error.message}`, null, null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader 
        currentChat={currentChat} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {error && (
          <div className="max-w-3xl mx-auto mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}
        
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
        handleSubmit={onSubmitMessage}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}