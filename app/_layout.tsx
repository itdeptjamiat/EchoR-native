import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store, persistor } from '@/redux/store';
import { ThemeProvider } from '@/context/ThemeContext';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectToken, selectUser } from '@/redux/selectors';
import { attachAuthToken } from '@/axios/EchoInstance';
import { checkTokenExists } from '@/services/storage';

// Loading component with theme colors
const LoadingScreen = () => {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#121212' // This will be overridden by theme
    }}>
      <Text style={{ 
        color: '#FFA500', 
        fontSize: 18 
      }}>
        Loading...
      </Text>
    </View>
  );
};

function RootLayoutNav() {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isRehydrated, setIsRehydrated] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Check if Redux Persist has rehydrated
    const checkRehydration = async () => {
      try {
        // Wait for persistor to be ready
        await persistor.persist();
        console.log('🔍 App Debug - Persistor ready');
        
        // Give a bit more time for state to settle
        setTimeout(() => {
          setIsRehydrated(true);
        }, 1500);
      } catch (error) {
        console.error('🔍 App Debug - Error waiting for persistor:', error);
        setIsRehydrated(true);
      }
    };

    checkRehydration();
  }, []);

  useEffect(() => {
    // Only check authentication after rehydration is complete
    if (!isRehydrated) {
      console.log('🔍 App Debug - Waiting for rehydration...');
      return;
    }

    // Attach token to axios instance when token changes
    if (token) {
      console.log('🔍 App Debug - Token found, attaching to axios:', token.substring(0, 20) + '...');
      attachAuthToken(token);
    } else {
      console.log('🔍 App Debug - No token found in Redux state');
    }
  }, [token, isRehydrated]);

  // Authentication check - only after rehydration and only once
  useEffect(() => {
    if (!isRehydrated || hasCheckedAuth) {
      return;
    }

    console.log('🔍 App Debug - Checking authentication state...');
    setHasCheckedAuth(true);

    const performAuthCheck = async () => {
      if (token) {
        console.log('🔍 App Debug - Token found in Redux, staying on app');
        return;
      }

      // Backup check: look directly in AsyncStorage
      const tokenExists = await checkTokenExists();
      if (tokenExists) {
        console.log('🔍 App Debug - Token found in AsyncStorage, waiting for Redux to catch up');
        // Don't redirect, let Redux catch up
        return;
      }

      console.log('🔍 App Debug - No token found anywhere, redirecting to login');
      router.replace('/(auth)/login');
    };

    performAuthCheck();
  }, [token, router, isRehydrated, hasCheckedAuth]);

  // Show loading while rehydrating
  if (!isRehydrated) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate 
          loading={<LoadingScreen />}
          persistor={persistor}
        >
          <ThemeProvider>
            <RootLayoutNav />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}