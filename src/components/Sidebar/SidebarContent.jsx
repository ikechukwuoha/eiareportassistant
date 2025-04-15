import { Plus, MessageSquare, User, Settings, Calendar, Search, ArrowRight, Sun, Moon, LogOut, HelpCircle, UserCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarItem from './SidebarItem';
import { useState, useRef, useEffect } from 'react';
import { logoutUser } from '../../redux/slices/authSlice.js';
import { useNavigate } from 'react-router-dom';


export default function SidebarContent({ currentChat, setCurrentChat, chatHistory, onClose, darkMode, toggleTheme }) {
  const { user } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settingsRef = useRef(null);
  
  // Close settings dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsRef]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const startNewChat = () => {
    const newChat = { 
      id: 'new-' + Date.now(), 
      title: 'New conversation',
      date: new Date().toLocaleDateString()
    };
    setCurrentChat(newChat);
    if (onClose) onClose(); // Close sidebar on mobile after selection
  };

  const filteredChats = searchTerm 
    ? chatHistory.filter(chat => 
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : chatHistory;

  const groupByDate = (chats) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    const grouped = {
      today: [],
      yesterday: [],
      earlier: []
    };
    
    chats.forEach(chat => {
      const chatDate = new Date(chat.date);
      if (chatDate.toDateString() === today) {
        grouped.today.push(chat);
      } else if (chatDate.toDateString() === yesterday) {
        grouped.yesterday.push(chat);
      } else {
        grouped.earlier.push(chat);
      }
    });
    
    return grouped;
  };
  
  const groupedChats = groupByDate(filteredChats);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-green-700 bg-green-900 bg-opacity-30">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#16A34A"/>
              <path d="M8 13L10 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold">EIA-PRAA</h1>
        </div>
        <button
          onClick={startNewChat}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white rounded-md px-3 py-2 font-medium transition-all hover:bg-green-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus size={18} /> New Conversation
        </button>
      </div>
      
      <div className="px-4 pt-4 pb-2">
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-green-300" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-green-700 bg-opacity-30 rounded-md text-sm text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-900">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-green-300 px-4 text-center">
            <MessageSquare size={24} className="mb-2 opacity-50" />
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          <nav className="px-2 pb-4">
            {groupedChats.today.length > 0 && (
              <>
                <div className="flex items-center px-2 py-2 text-xs font-semibold text-green-300 uppercase tracking-wider">
                  <Calendar size={14} className="mr-2" />
                  Today
                </div>
                {groupedChats.today.map((chat) => (
                  <SidebarItem
                    key={chat.id}
                    chat={chat}
                    isActive={currentChat.id === chat.id}
                    onClick={() => {
                      setCurrentChat(chat);
                      if (onClose) onClose();
                    }}
                  />
                ))}
              </>
            )}
            
            {groupedChats.yesterday.length > 0 && (
              <>
                <div className="flex items-center px-2 py-2 mt-2 text-xs font-semibold text-green-300 uppercase tracking-wider">
                  <Calendar size={14} className="mr-2" />
                  Yesterday
                </div>
                {groupedChats.yesterday.map((chat) => (
                  <SidebarItem
                    key={chat.id}
                    chat={chat}
                    isActive={currentChat.id === chat.id}
                    onClick={() => {
                      setCurrentChat(chat);
                      if (onClose) onClose();
                    }}
                  />
                ))}
              </>
            )}
            
            {groupedChats.earlier.length > 0 && (
              <>
                <div className="flex items-center px-2 py-2 mt-2 text-xs font-semibold text-green-300 uppercase tracking-wider">
                  <Calendar size={14} className="mr-2" />
                  Earlier
                </div>
                {groupedChats.earlier.map((chat) => (
                  <SidebarItem
                    key={chat.id}
                    chat={chat}
                    isActive={currentChat.id === chat.id}
                    onClick={() => {
                      setCurrentChat(chat);
                      if (onClose) onClose();
                    }}
                  />
                ))}
              </>
            )}
          </nav>
        )}
      </div>
      
      <div className="p-4 border-t border-green-700 bg-green-900 bg-opacity-20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-green-800 shadow-md">
            {user?.first_name ? (
              <span className="font-medium text-sm">
                {user.first_name.charAt(0)}{user.last_name?.charAt(0) || ''}
              </span>
            ) : (
              <User size={18} />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-green-200">
              {user?.department} • {user?.division}
            </p>
          </div>
          <div className="relative" ref={settingsRef}>
            <button 
              className="p-2 rounded-full text-green-200 hover:text-white hover:bg-green-700 transition-colors"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <Settings size={18} />
            </button>
            
            {/* Settings Dropdown Menu */}
            {settingsOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-green-700 rounded-lg shadow-lg overflow-hidden transform origin-bottom-right transition-all duration-200 z-50">
                <div className="py-2">
                  {/* Theme Toggle */}
                  <button 
                    onClick={toggleTheme}
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-green-600 transition-colors"
                  >
                    {darkMode ? (
                      <>
                        <Sun size={16} className="mr-2" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={16} className="mr-2" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                  
                  {/* User Profile */}
                  <button className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-green-600 transition-colors">
                    <UserCircle size={16} className="mr-2" />
                    <span>Your Profile</span>
                  </button>
                  
                  {/* Help */}
                  <button className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-green-600 transition-colors">
                    <HelpCircle size={16} className="mr-2" />
                    <span>Help & Support</span>
                  </button>
                  
                  <div className="border-t border-green-600 my-1"></div>
                  
                  {/* Logout */}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-green-600 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}