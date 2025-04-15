import { User } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-start max-w-md">
        {!isUser && (
          <div className="mr-3 bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill="currentColor"/>
              <path d="M5.5 8.5L7 10L10.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div 
          className={`p-4 rounded-lg ${
            isUser 
              ? 'bg-green-600 text-white rounded-br-none' 
              : 'bg-white border border-gray-200 shadow-sm rounded-bl-none'
          }`}
        >
          <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
        </div>
        {isUser && (
          <div className="ml-3 bg-green-100 text-green-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={16} />
          </div>
        )}
      </div>
    </div>
  );
}