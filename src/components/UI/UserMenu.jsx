// import { useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
// import useClickOutside from '../../hooks/useClickOutside';

// export default function UserMenu() {
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);
//   useClickOutside(ref, () => setOpen(false));

//   const user = useSelector((state) => state.auth.user);

//   const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  
//   // Avatar display logic
//   const renderAvatar = () => {
//     if (user?.avatar) {
//       return (
//         <img 
//           src={user.avatar} 
//           alt="User avatar" 
//           className="h-9 w-9 rounded-full object-cover"
//         />
//       );
//     } else if (user?.first_name) {
//       return (
//         <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white">
//           {user.first_name.charAt(0).toUpperCase()}
//         </div>
//       );
//     } else {
//       return (
//         <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white">
//           <User size={20} />
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center space-x-2 focus:outline-none"
//       >
//         {renderAvatar()}
//         <span className="hidden md:inline-block font-medium">{fullName}</span>
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10">
//           <div className="px-4 py-2 border-b border-gray-100">
//             <p className="font-medium truncate">{fullName}</p>
//             <p className="text-sm text-gray-500 truncate">{user?.email}</p>
//           </div>
//           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
//             <User size={16} className="mr-2" /> Profile
//           </a>
//           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
//             <Settings size={16} className="mr-2" /> Settings
//           </a>
//           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
//             <HelpCircle size={16} className="mr-2" /> Help Center
//           </a>
//           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
//             <LogOut size={16} className="mr-2" /> Sign out
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { logoutUser } from '../../redux/slices/authSlice.js';
import useClickOutside from '../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useClickOutside(ref, () => setOpen(false));

  const user = useSelector((state) => state.auth.user);
  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();

  // Avatar display logic
  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img 
          src={user.avatar} 
          alt="User avatar" 
          className="h-9 w-9 rounded-full object-cover"
        />
      );
    } else if (user?.first_name) {
      const firstInitial = user.first_name.charAt(0).toUpperCase();
      const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
      return (
        <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white">
          {`${firstInitial}${lastInitial}`}
        </div>
      );
    } else {
      return (
        <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white">
          <User size={20} />
        </div>
      );
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {renderAvatar()}
        <span className="hidden md:inline-block font-medium">{fullName}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="font-medium truncate">{fullName}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
            <User size={16} className="mr-2" /> Profile
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
            <Settings size={16} className="mr-2" /> Settings
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
            <HelpCircle size={16} className="mr-2" /> Help Center
          </a>
          <button 
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <LogOut size={16} className="mr-2" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}