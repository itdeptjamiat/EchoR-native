import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuthLoading } from '@/redux/selectors';
import { forgotPassword } from '@/redux/actions/authActions';
import { FormProvider } from '@/form/FormProvider';
import { TextField } from '@/form/TextField';
import { CustomButton } from '@/components/CustomButton';
import { H1, Body } from '@/typography';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/form/schemas/authSchema';

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);

  const methods = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await dispatch(forgotPassword(data));
    if (forgotPassword.fulfilled.match(result)) {
      router.push('/(auth)/resetPassword');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing['3xl'],
    },
    header: {
      marginBottom: theme.spacing.xl,
      alignItems: 'center',
    },
    title: {
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
    },
    form: {
      marginBottom: theme.spacing.xl,
    },
    footer: {
      alignItems: 'center',
      marginTop: theme.spacing.lg,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <H1 style={styles.title}>Reset Password</H1>
        <Body style={styles.subtitle}>
          Enter your email to receive reset instructions
        </Body>
      </View>

      <FormProvider methods={methods}>
        <View style={styles.form}>
          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <CustomButton
          title="Send Reset Link"
          onPress={methods.handleSubmit(onSubmit)}
          variant="gradient"
          loading={loading}
        />
      </FormProvider>

      <View style={styles.footer}>
        <Body
          style={styles.link}
          onPress={() => router.back()}
        >
          Back to Sign In
        </Body>
      </View>
    </SafeAreaView>
  );
}