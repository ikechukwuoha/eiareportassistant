import axios from 'axios';


axios.defaults.withCredentials = true
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  //https://eiareportassistantbackend.onrender.com',
  //http://localhost:8000
  credentials: 'include',
});

// Request interceptor to add auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    // No need to manually add token since we're using HTTP-only cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        await axiosInstance.post('/api/auth/refresh/');
        
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (refreshError.response?.status === 401) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;