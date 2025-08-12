import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { useTheme } from '@/context/ThemeContext';
import { Body } from '@/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface TextFieldProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  icon?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  icon,
  ...props
}) => {
  const { theme } = useTheme();
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      marginBottom: theme.spacing.xs,
      color: theme.colors.text,
    },

    inputContainer: {
      position: 'relative',
      marginBottom: theme.spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: error ? theme.colors.error : (isFocused ? theme.colors.primary : theme.colors.border),
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: icon ? theme.spacing.xl + 24 : theme.spacing.md,
      paddingVertical: theme.spacing.md,
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
      minHeight: multiline ? numberOfLines * 24 + theme.spacing.md : 52,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: isFocused ? 4 : 2 },
      shadowOpacity: isFocused ? 0.3 : 0.1,
      shadowRadius: isFocused ? 8 : 4,
      elevation: isFocused ? 8 : 4,
    },
    iconContainer: {
      position: 'absolute',
      left: theme.spacing.md,
      top: 16,
      zIndex: 1,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    error: {
      marginTop: theme.spacing.xs,
      color: theme.colors.error,
    },
  });

  return (
    <View style={styles.container}>
      {label && (
        <Body style={styles.label} weight="medium">
          {label}
        </Body>
      )}
      <View style={styles.inputContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={isFocused 
                ? [theme.colors.primary, theme.colors.primaryLight]
                : [theme.colors.textSecondary, theme.colors.textTertiary]
              }
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons 
                name={icon as any} 
                size={12} 
                color={isFocused ? theme.colors.textInverse : theme.colors.textSecondary}
              />
            </LinearGradient>
          </View>
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          onBlur={(e) => {
            onBlur();
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...props}
        />
      </View>
      {error && (
        <Body style={styles.error} size="sm">
          {error.message}
        </Body>
      )}
    </View>
  );
};