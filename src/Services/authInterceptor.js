// import axios from 'axios';


// axios.defaults.withCredentials = true
// const axiosInstance = axios.create({
//   baseURL: 'https://eiareportassistantbackend.onrender.com',
//   //https://eiareportassistantbackend.onrender.com',
//   //http://localhost:8000
//   credentials: 'include',
// });

// // Request interceptor to add auth token if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // No need to manually add token since we're using HTTP-only cookies
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If error is 401 and we haven't already tried to refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Attempt to refresh token
//         await axiosInstance.post('/api/auth/refresh/');
        
//         // Retry the original request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // If refresh fails, redirect to login
//         if (refreshError.response?.status === 401) {
//           window.location.href = '/login';
//         }
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;








// authInterceptor.js
import axios from 'axios';

// Create axios instance with proper configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // This sets credentials: 'include' for cross-origin requests
});

// Request interceptor - not much needed since we're using cookies
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Track if we're currently refreshing to prevent multiple refresh requests
let isRefreshing = false;
// Store pending requests that should be retried after token refresh
let failedQueue = [];

// Process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  
  failedQueue = [];
};

// Response interceptor with improved refresh token handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, add this request to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Attempt to refresh token
        await axiosInstance.post('/api/auth/refresh/');
        
        // Token refresh successful, process queue and retry request
        processQueue(null);
        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear queue and redirect to login
        processQueue(refreshError);
        isRefreshing = false;
        
        // Only redirect if it's a real auth failure (not during initial app load)
        if (refreshError.response?.status === 401 && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;