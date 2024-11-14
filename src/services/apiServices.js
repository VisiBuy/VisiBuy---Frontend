
import axios from 'axios';
import API_BASE_URL from '../configs/apiConfigs';

// const api = axios.create({
//     baseURL: API_BASE_URL,
//   });
  
//   // Add a request interceptor to include the token in headers
//   api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('authToken');
      
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
//       }
      
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
//   export default api;


  // Create an Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
  });
  
  // Function to check token validity
  const isTokenExpired = () => {
    const expiry = localStorage.getItem('tokenExpiry');
    return !expiry || Date.now() > expiry; // Check if token is expired
  };
  
  // Add a request interceptor to include the token in headers
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
  
      if (isTokenExpired()) {
        console.warn('Token is expired. Please log in again.');
        // Optional: Redirect user to login page or refresh token here
        // e.g., navigate('/login');
        return Promise.reject(new Error('Token expired'));
      }
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Optional: Add a response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.warn('Unauthorized access - logging out.');
        // Handle logout logic here (e.g., clear local storage, navigate to login)
      }
      return Promise.reject(error);
    }
  );
  
  export default api;


//   export const login = async (email, password, phoneNumber) => {
//     try {
//       const response = await api.post('/auth/login/buyer', {
//         email,
//         pass: password,
//         phone: phoneNumber,
//       });
//       return response.data; // Assuming the API returns the data you need
//     } catch (error) {
//       throw error.response ? error.response.data : new Error("Login failed");
//     }
//   };