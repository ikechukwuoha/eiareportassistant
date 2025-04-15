import { useState, useEffect, useRef } from 'react';

export default function useChat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! How can I help you today?' }
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
    setMessages([{ id: 1, role: 'assistant', content: 'How can I help you today?' }]);
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