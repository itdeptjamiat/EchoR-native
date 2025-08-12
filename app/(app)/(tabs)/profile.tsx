import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectUser } from '@/redux/selectors';
import { logout } from '@/redux/slices/authSlice';
import { H1, H2, H3, Body } from '@/typography';
import { CustomButton } from '@/components/CustomButton';

const { width: screenWidth } = Dimensions.get('window');

interface ProfileMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'navigation' | 'toggle' | 'action';
  value?: boolean;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const isTablet = screenWidth >= 768;

  const userStats = {
    magazinesRead: 24,
    totalDownloads: 67,
    readingTime: 156, // hours
    favoriteCategories: 8
  };

  const profileMenuItems: ProfileMenuItem[] = [
    {
      id: 'account',
      title: 'Account Settings',
      subtitle: 'Manage your account information',
      icon: 'person-outline',
      type: 'navigation',
      onPress: () => console.log('🔍 Account settings pressed')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      icon: 'notifications-outline',
      type: 'toggle',
      value: notificationsEnabled,
      onPress: () => setNotificationsEnabled(!notificationsEnabled)
    },
    {
      id: 'appearance',
      title: 'Appearance',
      subtitle: 'Dark mode and theme settings',
      icon: 'color-palette-outline',
      type: 'toggle',
      value: darkModeEnabled,
      onPress: () => setDarkModeEnabled(!darkModeEnabled)
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      icon: 'shield-outline',
      type: 'navigation',
      onPress: () => console.log('🔍 Privacy settings pressed')
    },
    {
      id: 'storage',
      title: 'Storage & Data',
      subtitle: 'Manage downloads and cache',
      icon: 'folder-outline',
      type: 'navigation',
      onPress: () => console.log('🔍 Storage settings pressed')
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: 'help-circle-outline',
      type: 'navigation',
      onPress: () => console.log('🔍 Help pressed')
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'App version and information',
      icon: 'information-circle-outline',
      type: 'navigation',
      onPress: () => console.log('🔍 About pressed')
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/(auth)/login');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    profileSection: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    profileImageContainer: {
      position: 'relative',
      marginBottom: theme.spacing.lg,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor: theme.colors.primary,
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
      elevation: 4,
    },
    profileInfo: {
      alignItems: 'center',
    },
    profileName: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.xs,
    },
    profileEmail: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.base,
      marginBottom: theme.spacing.lg,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: theme.spacing.xl,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      color: theme.colors.primary,
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.xs,
    },
    statLabel: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
    },
    sectionHeader: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.xs,
    },
    sectionSubtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
    },
    menuContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.md,
      elevation: 4,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginBottom: theme.spacing.xs,
    },
    menuSubtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
    },
    menuAction: {
      marginLeft: theme.spacing.md,
    },
    logoutContainer: {
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl,
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      ...theme.shadows.md,
      elevation: 4,
    },
    logoutText: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginLeft: theme.spacing.sm,
    },
    versionText: {
      color: theme.colors.textTertiary,
      fontSize: theme.typography.fontSize.xs,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ 
                  uri: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
                }} 
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="camera" size={18} color={theme.colors.textInverse} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.name || 'John Doe'}
              </Text>
              <Text style={styles.profileEmail}>
                {user?.email || 'john.doe@example.com'}
              </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userStats.magazinesRead}</Text>
                <Text style={styles.statLabel}>Magazines Read</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userStats.totalDownloads}</Text>
                <Text style={styles.statLabel}>Downloads</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userStats.readingTime}h</Text>
                <Text style={styles.statLabel}>Reading Time</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userStats.favoriteCategories}</Text>
                <Text style={styles.statLabel}>Categories</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.content}>
          {/* Settings Section */}
          <View style={styles.sectionHeader}>
            <H2 style={styles.sectionTitle}>Settings</H2>
            <Body style={styles.sectionSubtitle}>
              Manage your account and preferences
            </Body>
          </View>

          <View style={styles.menuContainer}>
            {profileMenuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === profileMenuItems.length - 1 && styles.menuItemLast
                ]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.menuIcon}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={20} 
                    color={theme.colors.primary} 
                  />
                </View>
                
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
                
                <View style={styles.menuAction}>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onPress}
                      trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                      thumbColor={theme.colors.textInverse}
                    />
                  ) : (
                    <Ionicons 
                      name="chevron-forward" 
                      size={20} 
                      color={theme.colors.textSecondary} 
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Section */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={20} color={theme.colors.textInverse} />
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          {/* Version Info */}
          <Text style={styles.versionText}>
            EchoReads v1.0.0
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}