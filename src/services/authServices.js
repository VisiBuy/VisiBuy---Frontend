import API_BASE_URL from '../configs/apiConfigs';
import axios from 'axios';


// export const login = async (identifier, password, isMail) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         ...(isMail ? { email: identifier } : { phone: identifier }), 
//         pass: password, // Send as 'phone_number' if your API expects it this way
//       });
//       return response.data; // Assuming the API returns the data you need
//     } catch (error) {
//       throw error.response ? error.response.data : new Error("Login failed");
//     }
//   };
export const login = async (loginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Login failed");
    }
  };

export const register = async (fn,ln,email, password, address, phoneNumber, role) => {
   
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register/${role}`, {
        fn,
        ln,
        email,
        address,
        phone: phoneNumber,
        pass: password
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Registration failed");
    }
  };

export const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password/buyer`, { email });
      return response.data; // Return the response data
    } catch (error) {
      throw new Error(error.response.data.message || 'Error sending password reset email');
    }
  };