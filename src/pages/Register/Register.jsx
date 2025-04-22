import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader, Phone, Building } from 'lucide-react';
import { registerUser, clearError } from '../../redux/slices/authSlice';

export function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    other_name: '',
    phone: '',
    email: '',
    department: '',
    division: '',
    password: '',
    passwordConfirm: ''
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
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
    dispatch(registerUser(formData));
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
              {/* First Name & Other Name (side by side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="First name"
                    />
                  </div>
                  {validationErrors.first_name && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.first_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Other Name <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="other_name"
                      value={formData.other_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="Other name"
                    />
                  </div>
                  {/* Empty div to maintain spacing consistency with error messages */}
                  <div className="min-h-4"></div>
                </div>
              </div>
              
              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Last name"
                  />
                </div>
                {validationErrors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.last_name}</p>
                )}
              </div>
              
              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Phone number"
                    required
                  />
                </div>
                {validationErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Your email address"
                    required
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="Your department"
                      required
                    />
                  </div>
                  {validationErrors.department && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.department}</p>
                  )}
                </div>
                
                {/* Division */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Division <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="Your division"
                    />
                  </div>
                  {/* Empty div to balance layout */}
                  <div className="min-h-4"></div>
                </div>
              </div>
              
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    placeholder="Confirm your password"
                  />
                </div>
                {validationErrors.passwordConfirm && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.passwordConfirm}</p>
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