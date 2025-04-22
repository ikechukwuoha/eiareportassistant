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
    messagesEndRef,
    formatApiResult
  } = useChat();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);

  const onSubmitMessage = async (e, messageContent, files) => {
    e.preventDefault();
    
    if ((!messageContent || messageContent.trim() === '') && (!files || files.length === 0)) return;
    
    setIsSubmitting(true);
    setError(null);
    setWaitingForResponse(true);
    
    try {
      const formData = new FormData();
      
      if (messageContent && messageContent.trim()) {
        formData.append('message', messageContent);
      }
      
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('file', file);
        });
      }
      
      if (files && files.length > 0) {
        // Add user message
        const userMessage = {
          id: Date.now(), // Use timestamp as temporary ID
          role: 'user',
          content: messageContent || '',
          files: files && files.length > 0 ? [...files] : undefined
        };
        
        handleSubmit(e, messageContent, files, null);
        
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
        const formattedResponse = formatApiResult(result);
        
        // Create AI message with streaming
        const aiMessage = {
          id: Date.now() + 1, // New ID for AI message
          role: 'assistant',
          content: formattedResponse
        };
        
        setStreamingMessageId(aiMessage.id);
        handleSubmit(null, '', null, aiMessage);
      } else {
        handleSubmit(e, messageContent, null, null);
      }
    } catch (error) {
      console.error('Error submitting:', error);
      setError(error.message);
      handleSubmit(null, `Error processing request: ${error.message}`, null, null);
    } finally {
      setIsSubmitting(false);
      setWaitingForResponse(false);
      setTimeout(() => setStreamingMessageId(null), 1000); // Small delay to finish streaming
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
            <MessageBubble 
              key={message.id} 
              message={message} 
              isThinking={waitingForResponse && message.id === streamingMessageId}
              isStreaming={message.id === streamingMessageId}
            />
          ))}
          {waitingForResponse && !streamingMessageId && (
            <MessageBubble 
              message={{ id: 'thinking', role: 'assistant', content: '' }}
              isThinking={true}
            />
          )}
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



// export default function ChatContainer({ currentChat, setSidebarOpen }) {
//   const {
//     messages,
//     input,
//     setInput,
//     isLoading,
//     handleSubmit,
//     messagesEndRef
//   } = useChat();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [waitingForResponse, setWaitingForResponse] = useState(false);

//   const onSubmitMessage = async (e, messageContent, files) => {
//     e.preventDefault();
    
//     if ((!messageContent || messageContent.trim() === '') && (!files || files.length === 0)) return;
    
//     setIsSubmitting(true);
//     setError(null);
//     setWaitingForResponse(true); // Start showing thinking indicator
    
//     try {
//       const formData = new FormData();
      
//       if (messageContent && messageContent.trim()) {
//         formData.append('message', messageContent);
//       }
      
//       if (files && files.length > 0) {
//         files.forEach(file => {
//           formData.append('file', file);
//         });
//       }
      
//       if (files && files.length > 0) {
//         handleSubmit(e, messageContent, files, null);
        
//         const response = await fetch('https://7191-92-40-213-19.ngrok-free.app/api/v1/eia/review', {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'Authorization': 'Bearer 2sHFoVegnt2dYHzP70MXjfhI1pd_4QGgASHPFBhEEWpEaJbsP'
//           },
//         });
        
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Error ${response.status}: ${errorText}`);
//         }
        
//         const result = await response.json();
//         handleSubmit(null, '', null, result);
//       } else {
//         handleSubmit(e, messageContent, null, null);
//       }
//     } catch (error) {
//       console.error('Error submitting:', error);
//       setError(error.message);
//       handleSubmit(null, `Error processing request: ${error.message}`, null, null);
//     } finally {
//       setIsSubmitting(false);
//       setWaitingForResponse(false); // Stop showing thinking indicator
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       <ChatHeader 
//         currentChat={currentChat} 
//         setSidebarOpen={setSidebarOpen} 
//       />
      
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//         {error && (
//           <div className="max-w-3xl mx-auto mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-200">
//             {error}
//           </div>
//         )}
        
//         <div className="max-w-3xl mx-auto space-y-6">
//           {messages.map((message) => (
//             <MessageBubble 
//               key={message.id} 
//               message={message} 
//             />
//           ))}
//           {waitingForResponse && (
//             <MessageBubble 
//               message={{ id: 'thinking', role: 'assistant', content: '' }}
//               isThinking={true}
//             />
//           )}
//           {isLoading && <LoadingIndicator />}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
      
//       <ChatInput 
//         input={input}
//         setInput={setInput}
//         handleSubmit={onSubmitMessage}
//         isSubmitting={isSubmitting}
//       />
//     </div>
//   );
// }
