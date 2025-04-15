
import { MessageSquare, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function SidebarItem({ chat, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full flex items-center px-3 py-3 my-1 text-sm rounded-lg transition-all duration-200 group ${
        isActive
          ? 'bg-green-600 text-white shadow-md'
          : 'text-green-100 hover:bg-green-700 hover:text-white'
      }`}
    >
      <div className={`flex items-center justify-center h-8 w-8 rounded-md ${isActive ? 'bg-green-500' : 'bg-green-700'} mr-3 flex-shrink-0`}>
        <MessageSquare size={16} className={`${isActive ? 'text-white' : 'text-green-300'}`} />
      </div>
      <div className="flex-1 text-left truncate pr-1">{chat.title}</div>
      <div className={`text-xs ${isActive ? 'text-green-100' : 'text-green-300'}`}>
        {formatDate(chat.date)}
      </div>
      <ChevronRight size={16} className={`ml-1 transform transition-transform duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'} ${isActive ? 'text-white' : 'text-green-300'}`} />
    </button>
  );
}