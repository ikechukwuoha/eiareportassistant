// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader, ArrowLeft } from 'lucide-react';
// import { loginUser, clearError } from '../../redux/slices/authSlice';

// // Reset Password Form Component (unchanged)
// function ResetPasswordForm({ onBack }) {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email) {
//       setMessage({ type: 'error', text: 'Please enter your email address' });
//       return;
//     }
    
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setMessage({ 
//         type: 'success', 
//         text: 'Password reset instructions have been sent to your email' 
//       });
//     }, 1500);
//   };

//   return (
//     <div>
//       <button 
//         onClick={onBack}
//         className="flex items-center text-green-600 hover:text-green-800 mb-6"
//       >
//         <ArrowLeft size={16} className="mr-1" />
//         <span>Back to login</span>
//       </button>
      
//       <div className="flex items-center justify-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
//       </div>
      
//       {message && (
//         <div className={`mb-4 p-3 rounded-md border text-sm ${
//           message.type === 'error' 
//             ? 'bg-red-50 text-red-700 border-red-200' 
//             : 'bg-green-50 text-green-700 border-green-200'
//         }`}>
//           {message.text}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail size={18} className="text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                 placeholder="Your email address"
//                 required
//               />
//             </div>
//             <p className="mt-2 text-sm text-gray-500">
//               We'll send instructions to reset your password
//             </p>
//           </div>
          
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
//           >
//             {isLoading ? (
//               <Loader size={20} className="animate-spin" />
//             ) : (
//               <>
//                 Send Reset Instructions <ArrowRight size={18} className="ml-2" />
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// // Login Form Component with Redux
// export function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);
//   const navigate = useNavigate();
  
//   // Redux hooks
//   const dispatch = useDispatch();
//   const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

//   // Effect to handle redirect after successful login
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!email || !password) {
//       dispatch(clearError());
//       dispatch({
//         type: 'auth/login/rejected',
//         payload: 'Please fill in all fields',
//         error: true
//       });
//       return;
//     }
    
//     // Clear any previous errors
//     dispatch(clearError());
    
//     // Dispatch login action
//     dispatch(loginUser({ email, password }));
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
//         <div className="p-8">
//           {!showResetPassword ? (
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-col items-center justify-center mb-8">
//                 <div className="h-14 w-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg mb-4">
//                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#16A34A"/>
//                     <path d="M8 13L10 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800">EIA-PRAA</h1>
//                 <p className="text-gray-500 mt-2">Sign in to access your account</p>
//               </div>
              
//               {error && (
//                 <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
//                   {typeof error === 'string' ? error : error.message || 'An error occurred'}
//                 </div>
//               )}
              
//               <div className="space-y-5">
//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Your email address"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Password Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Your password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
                  
//                   <div className="mt-2 text-right">
//                     <button 
//                       type="button" 
//                       onClick={() => setShowResetPassword(true)}
//                       className="text-sm text-green-600 hover:text-green-800 hover:underline"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                 </div>
                
//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <Loader size={20} className="animate-spin" />
//                   ) : (
//                     <>
//                       Sign in <ArrowRight size={18} className="ml-2" />
//                     </>
//                   )}
//                 </button>
                
//                 {/* Sign up link */}
//                 <div className="text-center mt-6">
//                   <p className="text-gray-600">
//                     Don't have an account?{' '}
//                     <button 
//                       type="button"
//                       onClick={() => navigate('/register')}
//                       className="text-green-600 font-medium hover:text-green-800 hover:underline"
//                     >
//                       Sign up
//                     </button>
//                   </p>
//                 </div>
//               </div>
//             </form>
//           ) : (
//             <ResetPasswordForm onBack={() => setShowResetPassword(false)} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader, ArrowLeft } from 'lucide-react';
import { loginUser, clearError } from '../../redux/slices/authSlice';

// Reset Password Form Component (unchanged)
function ResetPasswordForm({ onBack }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Password reset instructions have been sent to your email' 
      });
    }, 1500);
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-green-600 hover:text-green-800 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        <span>Back to login</span>
      </button>
      
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
      </div>
      
      {message && (
        <div className={`mb-4 p-3 rounded-md border text-sm ${
          message.type === 'error' 
            ? 'bg-red-50 text-red-700 border-red-200' 
            : 'bg-green-50 text-green-700 border-green-200'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                placeholder="Your email address"
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              We'll send instructions to reset your password
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <>
                Send Reset Instructions <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Login Form Component with Redux
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  
  // Redux hooks
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Clear errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  // Effect to handle redirect after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset form errors
    setFormError('');
    dispatch(clearError());
    
    // Basic validation
    if (!email) {
      setFormError('Please enter your email address');
      return;
    }
    
    if (!password) {
      setFormError('Please enter your password');
      return;
    }
    
    // Dispatch login action
    try {
      dispatch(loginUser({ email, password }));
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  
  // Determine what error to show - either from form validation or from the API
  const displayError = formError || (typeof error === 'string' 
    ? error 
    : error?.message || error?.detail || (error && 'Login failed. Please check your credentials.'));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          {!showResetPassword ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="h-14 w-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#16A34A"/>
                    <path d="M8 13L10 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">EIA-PRAA</h1>
                <p className="text-gray-500 mt-2">Sign in to access your account</p>
              </div>
              
              {displayError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                  {displayError}
                </div>
              )}
              
              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="Your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  <div className="mt-2 text-right">
                    <button 
                      type="button" 
                      onClick={() => setShowResetPassword(true)}
                      className="text-sm text-green-600 hover:text-green-800 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    <>
                      Sign in <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
                
                {/* Sign up link */}
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => navigate('/register')}
                      className="text-green-600 font-medium hover:text-green-800 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <ResetPasswordForm onBack={() => setShowResetPassword(false)} />
          )}
        </div>
      </div>
    </div>
  );
}