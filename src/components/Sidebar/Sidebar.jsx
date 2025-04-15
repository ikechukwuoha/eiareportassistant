import { X, Plus, MessageSquare, User, Settings, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import SidebarContent from './SidebarContent';

export default function Sidebar({ open, onClose, currentChat, setCurrentChat, chatHistory, darkMode, toggleTheme }) {
  return (
    <>
      {/* Mobile sidebar (overlay with smooth transition) */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 flex transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div 
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`} 
          onClick={onClose}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-green-800 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-4">
            <button
              className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white bg-green-900 bg-opacity-25 hover:bg-opacity-50 transition-all"
              onClick={onClose}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent 
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            chatHistory={chatHistory}
            onClose={onClose}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>

      {/* Desktop sidebar with refined styling */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 bg-green-800 text-white shadow-lg transition-all duration-300">
        <SidebarContent 
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          chatHistory={chatHistory}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
      </div>
    </>
  );
}