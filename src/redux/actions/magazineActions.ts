import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { APIIns } from '@/axios/EchoInstance';
import { Magazine } from '@/redux/slices/magazineSlice';

interface MagazineResponse {
  success: boolean;
  message: string;
  data: Magazine[];
}

interface MagazineDetailResponse {
  success: boolean;
  message: string;
  data: Magazine;
}

export const fetchMagazines = createAsyncThunk(
  'magazine/fetchMagazines',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔍 Magazine Debug - Fetching magazines from API');
      
      const response = await APIIns.get<MagazineResponse>('/user/magzines');
      console.log('🔍 Magazine Debug - API Response:', response.data);
      
      if (response.data.success) {
        console.log('🔍 Magazine Debug - Magazines fetched successfully:', response.data.data.length);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch magazines');
      }
    } catch (error: any) {
      console.error('❌ Magazine Debug - Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
      });
      
      const message = error.response?.data?.message || 'Failed to fetch magazines';
      Toast.show({
        type: 'error',
        text1: 'Fetch Failed',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
);

export const fetchMagazineDetail = createAsyncThunk(
  'magazine/fetchMagazineDetail',
  async (magazineId: string, { rejectWithValue }) => {
    try {
      console.log('🔍 Magazine Detail Debug - Fetching magazine with ID:', magazineId);
      
      const response = await APIIns.get<MagazineDetailResponse>(`/user/magzines/${magazineId}`);
      console.log('🔍 Magazine Detail Debug - API Response:', response.data);
      
      if (response.data.success) {
        console.log('🔍 Magazine Detail Debug - Magazine detail fetched successfully');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch magazine details');
      }
    } catch (error: any) {
      console.error('❌ Magazine Detail Debug - Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
      });
      
      const message = error.response?.data?.message || 'Failed to fetch magazine details';
      Toast.show({
        type: 'error',
        text1: 'Fetch Failed',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
); 