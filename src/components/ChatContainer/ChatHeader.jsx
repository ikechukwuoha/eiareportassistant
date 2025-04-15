import { Menu, MessageSquare } from 'lucide-react';
import UserMenu from '../UI/UserMenu';

export default function ChatHeader({ currentChat, setSidebarOpen }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-green-600 flex items-center justify-center text-white mr-2">
              <MessageSquare size={16} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">{currentChat.title}</h1>
              <p className="text-sm text-gray-500">AI Assistant</p>
            </div>
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}