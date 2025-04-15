// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, User, Mail, Phone, Building, Lock, ArrowRight, Loader } from 'lucide-react';

// export function SignupForm() {
//     const [formData, setFormData] = useState({
//       firstName: '',
//       otherName: '',
//       lastName: '',
//       phone: '',
//       email: '',
//       department: '',
//       division: '',
//       password: '',
//       passwordConfirm: ''
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
    
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData(prev => ({ ...prev, [name]: value }));
//     };
    
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       setError('');
      
//       // Required fields validation
//       const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'department', 'password', 'passwordConfirm'];
//       for (const field of requiredFields) {
//         if (!formData[field]) {
//           setError(`Please fill in all required fields`);
//           return;
//         }
//       }
      
//       // Password validation
//       if (formData.password.length < 8) {
//         setError('Password must be at least 8 characters long');
//         return;
//       }
      
//       if (formData.password !== formData.passwordConfirm) {
//         setError('Passwords do not match');
//         return;
//       }
      
//       // Simulate signup
//       setIsLoading(true);
//       setTimeout(() => {
//         setIsLoading(false);
//         // Handle successful signup here
//         console.log('Signup success:', formData);
//       }, 2000);
//     };
    
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="flex flex-col items-center justify-center mb-8">
//                 <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-4">
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white" fillOpacity="0.9"/>
//                     <path d="M8 13L10 15L16 9" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
//                 <p className="text-gray-500 mt-2">Register for EIA-PRAA system access</p>
//               </div>
              
//               {error && (
//                 <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-start">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path>
//                   </svg>
//                   <span>{error}</span>
//                 </div>
//               )}
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* First Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="First name"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Other Name (Optional) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Other Name <span className="text-gray-400 text-xs">(Optional)</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="otherName"
//                       value={formData.otherName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Other name"
//                     />
//                   </div>
//                 </div>
                
//                 {/* Last Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Last name"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Phone size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Phone number"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail size={18} className="text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                     placeholder="Your email address"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* Department */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Building size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Your department"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Division */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Division <span className="text-gray-400 text-xs">(Optional)</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Building size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="division"
//                       value={formData.division}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Your division"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Create password"
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
//                 </div>
                
//                 {/* Confirm Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="passwordConfirm"
//                       value={formData.passwordConfirm}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Confirm password"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Password Hint */}
//               <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-100">
//                 <div className="font-medium mb-1">Password requirements:</div>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>At least 8 characters long</li>
//                   <li>Passwords must match</li>
//                 </ul>
//               </div>
              
//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center shadow-md"
//               >
//                 {isLoading ? (
//                   <Loader size={20} className="animate-spin" />
//                 ) : (
//                   <>
//                     Create Account <ArrowRight size={18} className="ml-2" />
//                   </>
//                 )}
//               </button>
              
//               {/* Login Link */}
//               <div className="text-center mt-6">
//                 <p className="text-gray-600">
//                   Already have an account?{' '}
//                   <button 
//                     type="button"
//                     onClick={() => navigate('/login')}
//                     className="text-green-600 font-medium hover:text-green-800 hover:underline"
//                   >
//                     Sign in
//                   </button>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
// }




// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Eye, EyeOff, User, Mail, Phone, Building, Lock, ArrowRight, Loader } from 'lucide-react';
// import { registerUser, clearError } from '../../redux/slices/authSlice'; // Adjust path as needed

// export function SignupForm() {
//     const [formData, setFormData] = useState({
//       firstName: '',
//       otherName: '',
//       lastName: '',
//       phone: '',
//       email: '',
//       department: '',
//       division: '',
//       password: '',
//       passwordConfirm: ''
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [validationError, setValidationError] = useState('');
//     const navigate = useNavigate();
    
//     // Redux hooks
//     const dispatch = useDispatch();
//     const { loading, error, registrationSuccess } = useSelector(state => state.auth);
    
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData(prev => ({ ...prev, [name]: value }));
//       // Clear validation errors when user starts typing
//       if (validationError) setValidationError('');
//       if (error) dispatch(clearError());
//     };
    
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setValidationError('');
      
//       // Required fields validation
//       const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'department', 'password', 'passwordConfirm'];
//       for (const field of requiredFields) {
//         if (!formData[field]) {
//           setValidationError(`Please fill in all required fields`);
//           return;
//         }
//       }
      
//       // Password validation
//       if (formData.password.length < 8) {
//         setValidationError('Password must be at least 8 characters long');
//         return;
//       }
      
//       if (formData.password !== formData.passwordConfirm) {
//         setValidationError('Passwords do not match');
//         return;
//       }
      
//       // Prepare data for API
//       const userData = {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         other_name: formData.otherName || "", // Optional
//         email: formData.email,
//         phone: formData.phone,
//         department: formData.department, // Required
//         division: formData.division || "", // Optional
//         password: formData.password,
//         passwordConfirm: formData.passwordConfirm, // Not password2
//       };
    
//       try {
//         const resultAction = await dispatch(registerUser({
//           data: userData,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }));
        
//         if (registerUser.fulfilled.match(resultAction)) {
//           setTimeout(() => {
//             navigate('/login');
//           }, 3000);
//         }
//       } catch (error) {
//         console.error('Registration error:', error);
//       }
//     };
    
//     // If registration was successful, show success message
//     if (registrationSuccess) {
//       return (
//         <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//           <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center">
//             <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
//                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
//             <p className="text-gray-600 mb-6">Your account has been created. You will be redirected to login.</p>
//             <button 
//               onClick={() => navigate('/login')} 
//               className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="flex flex-col items-center justify-center mb-8">
//                 <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-4">
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white" fillOpacity="0.9"/>
//                     <path d="M8 13L10 15L16 9" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
//                 <p className="text-gray-500 mt-2">Register for EIA-PRAA system access</p>
//               </div>
              
//               {/* Show validation errors from component state */}
//               {validationError && (
//                 <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-start">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path>
//                   </svg>
//                   <span>{validationError}</span>
//                 </div>
//               )}
              
//               {/* Show API errors from Redux state */}
//               {error && (
//                 <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-start">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path>
//                   </svg>
//                   <span>{typeof error === 'string' ? error : 
//                          error?.detail ? error.detail : 
//                          'Registration failed. Please try again.'}</span>
//                 </div>
//               )}
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* First Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="First name"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Other Name (Optional) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Other Name <span className="text-gray-400 text-xs">(Optional)</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="otherName"
//                       value={formData.otherName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Other name"
//                     />
//                   </div>
//                 </div>
                
//                 {/* Last Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Last name"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Phone size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Phone number"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail size={18} className="text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                     placeholder="Your email address"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* Department */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Building size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Your department"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Division */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Division <span className="text-gray-400 text-xs">(Optional)</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Building size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="division"
//                       value={formData.division}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Your division"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Create password"
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
//                 </div>
                
//                 {/* Confirm Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="passwordConfirm"
//                       value={formData.passwordConfirm}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
//                       placeholder="Confirm password"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Password Hint */}
//               <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-100">
//                 <div className="font-medium mb-1">Password requirements:</div>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>At least 8 characters long</li>
//                   <li>Passwords must match</li>
//                 </ul>
//               </div>
              
//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <Loader size={20} className="animate-spin" />
//                 ) : (
//                   <>
//                     Create Account <ArrowRight size={18} className="ml-2" />
//                   </>
//                 )}
//               </button>
              
//               {/* Login Link */}
//               <div className="text-center mt-6">
//                 <p className="text-gray-600">
//                   Already have an account?{' '}
//                   <button 
//                     type="button"
//                     onClick={() => navigate('/login')}
//                     className="text-green-600 font-medium hover:text-green-800 hover:underline"
//                   >
//                     Sign in
//                   </button>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
// }





import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { registerUser, clearError } from '../../redux/slices/authSlice';

export function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  
  // Redux hooks
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Effect to handle redirect after successful registration
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Clear any previous errors
    dispatch(clearError());
    
    // Dispatch register action
    dispatch(registerUser({ 
      firstName, 
      lastName, 
      email, 
      password 
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="h-14 w-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#16A34A"/>
                  <path d="M8 13L10 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-500 mt-2">Sign up to get started</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                {typeof error === 'string' ? error : error.message || 'An error occurred'}
              </div>
            )}
            
            <div className="space-y-4">
              {/* First Name & Last Name (side by side) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="First name"
                    />
                  </div>
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Last name"
                  />
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>
              
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Your email address"
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
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
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Confirm your password"
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
              
              {/* Sign in link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-green-600 font-medium hover:text-green-800 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}