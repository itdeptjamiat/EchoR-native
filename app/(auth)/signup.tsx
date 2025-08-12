import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuthLoading, selectToken, selectIsAuthenticated } from '@/redux/selectors';
import { signupUser } from '@/redux/actions/authActions';
import { FormProvider } from '@/form/FormProvider';
import { TextField } from '@/form/TextField';
import { CustomButton } from '@/components/CustomButton';
import { H1, Body } from '@/typography';
import { signupSchema, SignupFormData } from '@/form/schemas/authSchema';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Check if user is already authenticated
  useEffect(() => {
    if (token && isAuthenticated) {
      console.log('🔍 Signup Debug - User already authenticated, redirecting to app');
      router.replace('/(app)/(tabs)');
    }
  }, [token, isAuthenticated]);

  // Responsive breakpoints
  const isTablet = screenWidth >= 768;
  const isLargeScreen = screenWidth >= 1024;

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log('🔍 Form Debug - Form data submitted:', data);
    console.log('🔍 Form Debug - Form validation passed');
    
    try {
      const result = await dispatch(signupUser(data));
      console.log('🔍 Form Debug - Dispatch result:', result);
      
      if (signupUser.fulfilled.match(result)) {
        console.log('🔍 Form Debug - Signup successful');
        
        // Check if we have user data (immediate login) or just success message
        if (result.payload.user && result.payload.token) {
          console.log('🔍 Form Debug - User data received, navigating to app');
          router.replace('/(app)/(tabs)');
        } else {
          console.log('🔍 Form Debug - Account created, redirecting to login');
          // Navigate to login page for user to login with new credentials
          router.replace('/(auth)/login');
        }
      } else {
        console.log('🔍 Form Debug - Signup failed or rejected');
      }
    } catch (error) {
      console.error('❌ Form Debug - Form submission error:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backgroundGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: screenHeight * 0.6,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      paddingTop: theme.spacing['2xl'],
      paddingBottom: theme.spacing['3xl'],
      justifyContent: 'flex-start',
      minHeight: screenHeight,
    },
    header: {
      marginBottom: theme.spacing.xl,
      alignItems: 'center',
    },
    logoWrapper: {
      position: 'relative',
      marginBottom: theme.spacing.xl,
    },
    logoContainer: {
      width: isTablet ? 120 : 100,
      height: isTablet ? 120 : 100,
      borderRadius: isTablet ? 60 : 50,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.xl,
      elevation: 8,
    },
    floatingIcon: {
      position: 'absolute',
      top: -10,
      right: -10,
      width: isTablet ? 40 : 32,
      height: isTablet ? 40 : 32,
      borderRadius: isTablet ? 20 : 16,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.lg,
      elevation: 6,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    logoText: {
      color: theme.colors.primary,
      fontSize: isTablet ? 48 : 40,
      fontWeight: 'bold',
    },
    title: {
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
      color: theme.colors.text,
    },
    subtitle: {
      textAlign: 'center',
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: '500' as any,
      lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.lg,
      marginTop: theme.spacing.sm,
      opacity: 0.9,
    },
    formContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius['2xl'],
      padding: isTablet ? theme.spacing['2xl'] : theme.spacing.xl,
      marginBottom: theme.spacing.xl,
      marginHorizontal: isTablet ? theme.spacing.xl : theme.spacing.md,
      ...theme.shadows.xl,
      borderWidth: 1,
      borderColor: theme.colors.border,
      elevation: 12,
    },
    form: {
      marginBottom: theme.spacing.lg,
    },
    button: {
      marginBottom: theme.spacing.md,
    },
    footer: {
      alignItems: 'center',
      marginTop: theme.spacing.lg,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: theme.spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      marginHorizontal: theme.spacing.md,
      color: theme.colors.textTertiary,
    },

  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark, theme.colors.primaryLight]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >
                      <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
              <View style={styles.logoWrapper}>
                <LinearGradient
                  colors={[theme.colors.primary, theme.colors.primaryLight]}
                  style={styles.logoContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="person-add" size={isTablet ? 56 : 48} color={theme.colors.textInverse} />
                </LinearGradient>
                <View style={styles.floatingIcon}>
                  <Ionicons name="star" size={isTablet ? 24 : 20} color={theme.colors.primary} />
                </View>
              </View>
              <H1 style={styles.title}>Create Account</H1>
              <Body style={styles.subtitle}>
                Join EchoReads and start your reading journey
              </Body>
            </Animated.View>

          <Animated.View entering={FadeInUp.delay(400)} style={styles.formContainer}>
            <FormProvider methods={methods}>
              <View style={styles.form}>
                <TextField
                  name="name"
                  label="Full Name"
                  placeholder="Name"
                  autoCapitalize="words"
                  autoComplete="name"
                  icon="person-outline"
                />
                
                <TextField
                  name="username"
                  label="Username"
                  placeholder="Username"
                  autoCapitalize="none"
                  autoComplete="username"
                  icon="at-outline"
                />
                
                <TextField
                  name="email"
                  label="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  icon="mail-outline"
                />
                
                <TextField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  secureTextEntry
                  autoComplete="new-password"
                  icon="lock-closed-outline"
                />
                
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm"
                  secureTextEntry
                  autoComplete="new-password"
                  icon="shield-checkmark-outline"
                />
              </View>

              <CustomButton
                title="Create Account"
                onPress={methods.handleSubmit(onSubmit)}
                variant="gradient"
                loading={loading}
                style={styles.button}
                icon={<Ionicons name="checkmark" size={24} color={theme.colors.textInverse} />}
              />
            </FormProvider>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(600)} style={styles.footer}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Body style={styles.dividerText}>or</Body>
              <View style={styles.dividerLine} />
            </View>
            
            <Body>
              Already have an account?{' '}
              <Body
                style={styles.link}
                onPress={() => router.push('/(auth)/login')}
              >
                <Ionicons name="log-in-outline" size={18} color={theme.colors.primary} style={{ marginRight: 6 }} />
                Sign In
              </Body>
            </Body>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}