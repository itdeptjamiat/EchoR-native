import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage service utilities
// This file contains storage-related service functions

export const storageService = {
  // Placeholder for storage service functions
};

export const checkTokenExists = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('persist:root');
    if (token) {
      const parsed = JSON.parse(token);
      if (parsed.auth) {
        const authData = JSON.parse(parsed.auth);
        return !!(authData.token && authData.isAuthenticated);
      }
    }
    return false;
  } catch (error) {
    console.error('Error checking token:', error);
    return false;
  }
}; 