// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import ChatContainer from './components/ChatContainer/ChatContainer';
// import Sidebar from './components/Sidebar/Sidebar';
// import { LoginForm } from './pages/Login/Login';
// import { SignupForm } from './pages/Register/Register';
// import { CHAT_HISTORY } from './utils/constants';
// import './index.css';

// export default function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentChat, setCurrentChat] = useState({ id: 'default', title: 'New conversation' });
//   const [user, setUser] = useState(null);

//   const handleLogin = (email, password) => {
//     // Authentication logic
//     setUser({ email });
//   };

//   const handleRegister = (email, password) => {
//     // Registration logic
//     setUser({ email });
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   // In App.js, modify the return statement:
//   return (
//     <Router>
//       <div className="h-screen bg-gray-50 text-gray-900">
//         {user ? (
//           <div className="flex h-full">
//             <Sidebar 
//               open={sidebarOpen} 
//               onClose={() => setSidebarOpen(false)}
//               currentChat={currentChat}
//               setCurrentChat={setCurrentChat}
//               chatHistory={CHAT_HISTORY}
//               onLogout={handleLogout}
//             />
//             <ChatContainer 
//               currentChat={currentChat}
//               setSidebarOpen={setSidebarOpen}
//             />
//           </div>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
//             <Route path="/register" element={<SignupForm onRegister={handleRegister} />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         )}
//       </div>
//     </Router>
//   );
// }


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './redux/store';
import ChatContainer from './components/ChatContainer/ChatContainer';
import Sidebar from './components/Sidebar/Sidebar';
import { LoginForm } from './pages/Login/Login';
import { SignupForm } from './pages/Register/Register';
import { CHAT_HISTORY } from './utils/constants';
import { logoutUser, fetchUser } from './redux/slices/authSlice';
import './index.css';

// Auth checker component to verify authentication on app load
const AuthChecker = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Check authentication status when the app loads
    dispatch(fetchUser());
  }, [dispatch]);
  
  return null;
};

// Protected route component
const ProtectedLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState({ id: 'default', title: 'New conversation' });
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  // Show loading indicator while checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex h-full">
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        chatHistory={CHAT_HISTORY}
        onLogout={handleLogout}
        user={user}
      />
      <ChatContainer 
        currentChat={currentChat}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
};

// App component with Redux Provider
function AppContent() {
  const { isAuthenticated, loading, authChecked } = useSelector(state => state.auth);
  console.log(loading)

  // 🔁 Show loading spinner while checking auth status
  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 text-gray-900">
      <AuthChecker />
      <Routes>
        {/* Protected Routes */}
        <Route path="/*" element={<ProtectedLayout />} />
        
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignupForm />
          } 
        />
        
        {/* Default Redirect */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/" : "/login"} replace />
          } 
        />
      </Routes>
    </div>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}