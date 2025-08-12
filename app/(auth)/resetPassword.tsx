import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuthLoading } from '@/redux/selectors';
import { resetPassword } from '@/redux/actions/authActions';
import { FormProvider } from '@/form/FormProvider';
import { TextField } from '@/form/TextField';
import { CustomButton } from '@/components/CustomButton';
import { H1, Body } from '@/typography';
import { resetPasswordSchema, ResetPasswordFormData } from '@/form/schemas/authSchema';

export default function ResetPasswordScreen() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);

  const methods = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const { confirmPassword, ...resetData } = data;
    const result = await dispatch(resetPassword(resetData));
    if (resetPassword.fulfilled.match(result)) {
      router.replace('/(auth)/login');
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
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <H1 style={styles.title}>New Password</H1>
        <Body style={styles.subtitle}>
          Enter your reset token and new password
        </Body>
      </View>

      <FormProvider methods={methods}>
        <View style={styles.form}>
          <TextField
            name="token"
            label="Reset Token"
            placeholder="Enter reset token from email"
          />
          
          <TextField
            name="password"
            label="New Password"
            placeholder="Enter new password"
            secureTextEntry
          />
          
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm new password"
            secureTextEntry
          />
        </View>

        <CustomButton
          title="Reset Password"
          onPress={methods.handleSubmit(onSubmit)}
          variant="gradient"
          loading={loading}
        />
      </FormProvider>
    </SafeAreaView>
  );
}