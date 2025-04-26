import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "@/store/store"; // Your Redux store

import dotenv from "dotenv";
import { handleLogout } from "./handleLogout";
//dotenv.config();
const baseURL = process.env.REACT_APP_BASE_URL;
const apiClient = axios.create({
  baseURL,
});
const axiosWithAuth = axios.create({
  baseURL,
});
// Request interceptor
axiosWithAuth.interceptors.request.use(
  (config:InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth.token;
    console.log(window.location)
    // save last accessed path
    localStorage.setItem('redirectPath', window.location.href + window.location.search);
    if (token) {
      config.headers['auth-token'] = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Check if error is due to token expiration (401 status)
    if (error.response?.status === 401 ) {
      

      try {
        
        
        // If no refresh token or refresh fails, handle logout
        handleLogout();
        
        // Reject the promise to stop the request chain
        return Promise.reject(error);
      } catch (refreshError) {
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  })
export { axiosWithAuth, apiClient };
