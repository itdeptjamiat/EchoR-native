import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// Create axios instance
export const APIIns: AxiosInstance = axios.create({
  baseURL: 'https://api.echoreads.online/api/v1', // Updated API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
let authToken: string | null = null;

export const attachAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    APIIns.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete APIIns.defaults.headers.common['Authorization'];
  }
};

export const attachAuthTokenToAsyncStorage = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    attachAuthToken(token);
  } catch (error) {
    console.error('Failed to store auth token:', error);
  }
};

// Request interceptor
APIIns.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor with 401 handling
let isRetrying = false;

APIIns.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !isRetrying) {
      isRetrying = true;
      
      // Clear token and redirect to auth
      attachAuthToken(null);
      await AsyncStorage.removeItem('authToken');
      
      Toast.show({
        type: 'error',
        text1: 'Session Expired',
        text2: 'Please log in again',
      });
      
      // Dispatch logout action (will be handled by the store)
      // This should trigger navigation to auth screens
      
      isRetrying = false;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default APIIns;