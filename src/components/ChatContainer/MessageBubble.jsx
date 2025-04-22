import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserIcon } from 'lucide-react';
import Avatar from '../UI/Avatar';

export default function MessageBubble({ message }) {
  const [expanded, setExpanded] = useState(false);
  
  const isUserMessage = message.role === 'user';
  const hasLongContent = message.content.length > 1000;
  
  // Function to handle file downloads if needed
  const handleFileDownload = (file) => {
    // Implementation would depend on how files are stored
    console.log(`Download file: ${file.name}`);
    // Create object URL or fetch from server
  };
  
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3/4 flex ${isUserMessage ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        {/* Avatar */}
        {isUserMessage ? (
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <UserIcon size={16} className="text-white" />
          </div>
        ) : (
          <Avatar size="sm" />
        )}
        
        {/* Message content */}
        <div 
          className={`py-3 px-4 rounded-lg ${
            isUserMessage 
              ? 'bg-green-600 text-white' 
              : 'bg-white border border-gray-200'
          }`}
        >
          {/* Show only preview if content is long and not expanded */}
          {hasLongContent && !expanded ? (
            <>
              <div className="prose max-w-none">
                <ReactMarkdown>
                  {message.content.substring(0, 1000) + '...'}
                </ReactMarkdown>
              </div>
              <button 
                onClick={() => setExpanded(true)}
                className={`mt-2 text-sm font-medium ${
                  isUserMessage ? 'text-green-100' : 'text-green-600'
                }`}
              >
                Show more
              </button>
            </>
          ) : (
            <>
              <div className="prose max-w-none">
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>
              {hasLongContent && (
                <button 
                  onClick={() => setExpanded(false)}
                  className={`mt-2 text-sm font-medium ${
                    isUserMessage ? 'text-green-100' : 'text-green-600'
                  }`}
                >
                  Show less
                </button>
              )}
            </>
          )}
          
          {/* Display file attachments if any */}
          {message.files && message.files.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className={`text-sm ${isUserMessage ? 'text-green-100' : 'text-gray-500'}`}>
                Attachments:
              </div>
              <div className="flex flex-wrap gap-2">
                {message.files.map((file, index) => (
                  <div 
                    key={index} 
                    className={`py-1 px-3 rounded-full text-xs flex items-center ${
                      isUserMessage 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="truncate max-w-xs">{file.name}</span>
                    {!isUserMessage && (
                      <button 
                        onClick={() => handleFileDownload(file)}
                        className="ml-2 text-green-600 hover:text-green-700"
                      >
                        Download
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}