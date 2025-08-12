import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Body } from '@/typography';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'gradient' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          minHeight: 36,
        };
      case 'lg':
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xl,
          minHeight: 56,
        };
      default:
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: 48,
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'sm' as const;
      case 'lg':
        return 'lg' as const;
      default:
        return 'base' as const;
    }
  };

  const baseStyles = StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...getSizeStyles(),
      opacity: disabled || loading ? 0.6 : 1,
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    text: {
      fontWeight: theme.typography.fontWeight.semibold as any,
    },
    primaryText: {
      color: theme.colors.textInverse,
    },
    ghostText: {
      color: theme.colors.primary,
    },
    iconContainer: {
      marginRight: theme.spacing.sm,
    },
  });

  const renderButton = () => {
    if (variant === 'gradient') {
      return (
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={[baseStyles.button, style]}
        >
          {icon && <View style={baseStyles.iconContainer}>{icon}</View>}
          <Body
            size={getTextSize()}
            weight="semibold"
            color={theme.colors.textInverse}
            style={[baseStyles.text, textStyle]}
          >
            {loading ? 'Loading...' : title}
          </Body>
        </LinearGradient>
      );
    }

    return (
      <Animated.View
        style={[
          baseStyles.button,
          variant === 'primary' ? baseStyles.primary : baseStyles.ghost,
          style,
        ]}
      >
        {icon && <View style={baseStyles.iconContainer}>{icon}</View>}
        <Body
          size={getTextSize()}
          weight="semibold"
          color={variant === 'primary' ? theme.colors.textInverse : theme.colors.primary}
          style={[baseStyles.text, textStyle]}
        >
          {loading ? 'Loading...' : title}
        </Body>
      </Animated.View>
    );
  };

  return (
    <AnimatedTouchableOpacity
      style={animatedStyle}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderButton()}
    </AnimatedTouchableOpacity>
  );
};