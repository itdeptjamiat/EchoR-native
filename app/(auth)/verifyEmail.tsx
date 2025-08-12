import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuthLoading } from '@/redux/selectors';
import { verifyEmail } from '@/redux/actions/authActions';
import { FormProvider } from '@/form/FormProvider';
import { TextField } from '@/form/TextField';
import { CustomButton } from '@/components/CustomButton';
import { H1, Body } from '@/typography';
import { verifyEmailSchema, VerifyEmailFormData } from '@/form/schemas/authSchema';

export default function VerifyEmailScreen() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);

  const methods = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: '',
      otp: '',
    },
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    const result = await dispatch(verifyEmail(data));
    if (verifyEmail.fulfilled.match(result)) {
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
        <H1 style={styles.title}>Verify Email</H1>
        <Body style={styles.subtitle}>
          Enter the verification code sent to your email
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
          
          <TextField
            name="otp"
            label="Verification Code"
            placeholder="Enter 6-digit code"
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        <CustomButton
          title="Verify Email"
          onPress={methods.handleSubmit(onSubmit)}
          variant="gradient"
          loading={loading}
        />
      </FormProvider>
    </SafeAreaView>
  );
}