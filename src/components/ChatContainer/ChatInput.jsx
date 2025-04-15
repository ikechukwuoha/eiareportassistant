import { useState, useRef } from 'react';
import { PaperclipIcon, MicIcon, SendIcon } from 'lucide-react';
import Dropdown from '../UI/Dropdown';
import useClickOutside from '../../hooks/useClickOutside';

export default function ChatInput({ input, setInput, handleSubmit }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-3xl mx-auto relative">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
            <div className="flex relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-3 focus:outline-none rounded-lg resize-none max-h-36"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute right-2 bottom-2 flex space-x-1">
                <Dropdown 
                  open={dropdownOpen} 
                  setOpen={setDropdownOpen} 
                  ref={dropdownRef}
                />
              </div>
            </div>
            <div className="flex items-center px-3 py-2 border-t border-gray-100">
              <button type="button" className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100">
                <PaperclipIcon size={18} />
              </button>
              <button type="button" className="text-gray-500 hover:text-gray-700 ml-1 p-1 rounded-md hover:bg-gray-100">
                <MicIcon size={18} />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={input.trim() === ''}
          >
            <SendIcon size={18} />
          </button>
        </form>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Our AI assistant is here to help. Your data remains private and secure.
        </p>
      </div>
    </div>
  );
}