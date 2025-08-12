import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { APIIns, attachAuthToken } from '@/axios/EchoInstance';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

interface VerifyEmailData {
  email: string;
  otp: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log('🔍 Login Debug - Input credentials:', credentials);
      console.log('🔍 Login Debug - API URL:', '/user/login');
      
      const response = await APIIns.post('/user/login', credentials);
      console.log('🔍 Login Debug - API Response:', response.data);
      
      // Handle different response structures
      let user, token;
      
      if (response.data.user && response.data.user.token) {
        // Response has nested user object with token
        user = response.data.user.user;
        token = response.data.user.token;
      } else if (response.data.user && response.data.token) {
        // Response has separate user and token
        user = response.data.user;
        token = response.data.token;
      } else if (response.data.user && response.data.user.user) {
        // Response has double nested user structure
        user = response.data.user.user;
        token = response.data.user.token;
      } else {
        // Fallback for other structures
        user = response.data.user || response.data;
        token = response.data.token || response.data.user?.token;
      }
      
      console.log('🔍 Login Debug - Parsed user:', user);
      console.log('🔍 Login Debug - Parsed token:', token);
      
      // Attach token to axios instance
      if (token) {
        attachAuthToken(token);
      } else {
        console.error('❌ Login Debug - No token found in response');
      }
      
      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: `Hello ${user.name}`,
      });
      
      return { user, token };
    } catch (error: any) {
      console.error('❌ Login Debug - Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
      });
      
      const message = error.response?.data?.message || 'Login failed';
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      console.log('🔍 Signup Debug - Input credentials:', credentials);
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signupData } = credentials;
      console.log('🔍 Signup Debug - Data being sent to API:', signupData);
      console.log('🔍 Signup Debug - API URL:', '/user/signup');
      
      const response = await APIIns.post('/user/signup', signupData);
      console.log('🔍 Signup Debug - API Response:', response.data);
      
      // Handle different response structures
      if (response.data.message === 'User created successfully') {
        // For successful creation without immediate user data
        Toast.show({
          type: 'success',
          text1: 'Account Created!',
          text2: 'Please log in with your credentials',
        });
        
        // Return success without user/token since we need to login separately
        return { success: true, message: response.data.message };
      } else if (response.data.user && response.data.token) {
        // For responses that include user and token
        const { user, token } = response.data;
        
        // Attach token to axios instance
        attachAuthToken(token);
        
        Toast.show({
          type: 'success',
          text1: 'Account Created!',
          text2: `Welcome to EchoReads, ${user.name}`,
        });
        
        return { user, token };
      } else if (response.data.user && response.data.user.token) {
        // For responses with nested user object
        const user = response.data.user.user;
        const token = response.data.user.token;
        
        // Attach token to axios instance
        attachAuthToken(token);
        
        Toast.show({
          type: 'success',
          text1: 'Account Created!',
          text2: `Welcome to EchoReads, ${user.name}`,
        });
        
        return { user, token };
      } else {
        // Unexpected response structure
        throw new Error('Unexpected response structure from signup API');
      }
    } catch (error: any) {
      console.error('❌ Signup Debug - Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
      });
      
      const message = error.response?.data?.message || 'Signup failed';
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (data: VerifyEmailData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post('/auth/verify-email', data);
      
      Toast.show({
        type: 'success',
        text1: 'Email Verified!',
        text2: 'Your account has been verified successfully',
      });
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Verification failed';
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: ForgotPasswordData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post('/auth/forgot-password', data);
      
      Toast.show({
        type: 'success',
        text1: 'Reset Link Sent!',
        text2: 'Check your email for password reset instructions',
      });
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Request failed';
      Toast.show({
        type: 'error',
        text1: 'Request Failed',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post('/auth/reset-password', data);
      
      Toast.show({
        type: 'success',
        text1: 'Password Reset!',
        text2: 'Your password has been updated successfully',
      });
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Reset failed';
      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
);