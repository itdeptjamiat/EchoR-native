import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectToken, selectUser } from '@/redux/selectors';
import { logout } from '@/redux/slices/authSlice';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PersistenceTest: React.FC = () => {
  const { theme } = useTheme();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('🔍 PersistenceTest - Current state:', {
      token: token ? 'Token exists' : 'No token',
      user: user?.name || 'No user',
      isAuthenticated: !!token
    });
  }, [token, user]);

  const handleLogout = () => {
    console.log('🔍 PersistenceTest - Logout button pressed');
    dispatch(logout());
    console.log('🔍 PersistenceTest - Logout dispatched');
  };

  const testAsyncStorage = async () => {
    try {
      // Test writing to AsyncStorage
      await AsyncStorage.setItem('test-key', 'test-value');
      console.log('🔍 PersistenceTest - Wrote to AsyncStorage');
      
      // Test reading from AsyncStorage
      const value = await AsyncStorage.getItem('test-key');
      console.log('🔍 PersistenceTest - Read from AsyncStorage:', value);
      
      // Check Redux Persist data
      const persistData = await AsyncStorage.getItem('persist:root');
      console.log('🔍 PersistenceTest - Redux Persist data:', persistData);
    } catch (error) {
      console.error('🔍 PersistenceTest - AsyncStorage error:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 100,
      right: 20,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.md,
      elevation: 4,
    },
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.sm,
      marginBottom: theme.spacing.xs,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium as any,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Token: {token ? '✅' : '❌'}</Text>
      <Text style={styles.text}>User: {user?.name || 'None'}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={testAsyncStorage}>
        <Text style={styles.buttonText}>Test Storage</Text>
      </TouchableOpacity>
    </View>
  );
}; 