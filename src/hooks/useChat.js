// import { useState, useEffect, useRef } from 'react';

// export default function useChat() {
//   const [messages, setMessages] = useState([
//     { id: 1, role: 'assistant', content: 'Hello! How can I help you today?' }
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim() === '') return;

//     // Add user message
//     const newMessage = { id: messages.length + 1, role: 'user', content: input };
//     setMessages([...messages, newMessage]);
//     setInput('');
    
//     // Simulate AI response
//     setIsLoading(true);
//     setTimeout(() => {
//       setMessages(prev => [
//         ...prev, 
//         { id: prev.length + 1, role: 'assistant', content: `This is a simulated response to: "${input}"` }
//       ]);
//       setIsLoading(false);
//     }, 1500);
//   };

//   const startNewChat = () => {
//     setMessages([{ id: 1, role: 'assistant', content: 'How can I help you today?' }]);
//   };

//   return {
//     messages,
//     input,
//     setInput,
//     isLoading,
//     handleSubmit,
//     startNewChat,
//     messagesEndRef
//   };
// }



import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function useChat() {
  // Get user directly from Redux store
  const user = useSelector((state) => state.auth.user);
  
  // Create personalized greeting based on available user data
  const createGreeting = () => {
    if (!user) return 'Hello! How can I help you today?';
    
    // Include first_name, other_name, and last_name if available
    const nameParts = [
      user.first_name || '', 
      user.other_name || '', 
      user.last_name || ''
    ].filter(Boolean);
    
    const fullName = nameParts.join(' ').trim();
    
    return fullName 
      ? `Hello ${fullName}! Let us review your EIA Document today kindly share the document...`
      : 'Hello! How can I help you today?';
  };

  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: createGreeting() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update greeting if user data changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ id: 1, role: 'assistant', content: createGreeting() }]);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const newMessage = { id: messages.length + 1, role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: prev.length + 1, role: 'assistant', content: `This is a simulated response to: "${input}"` }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const startNewChat = () => {
    setMessages([{ id: 1, role: 'assistant', content: createGreeting() }]);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    startNewChat,
    messagesEndRef
  };
}