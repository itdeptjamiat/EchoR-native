import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { Body } from '@/typography';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
  loading?: boolean;
  style?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onSearch,
  onFilterPress,
  showFilter = false,
  loading = false,
  style,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  const focusAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withSpring(1);
    scaleAnim.value = withSpring(1.02);
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withSpring(0);
    scaleAnim.value = withSpring(1);
  };

  const handleSubmit = () => {
    if (onSearch && value.trim()) {
      onSearch(value.trim());
    }
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.focus();
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
    shadowOpacity: interpolate(
      focusAnim.value,
      [0, 1],
      [0.1, 0.2],
      Extrapolate.CLAMP
    ),
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      focusAnim.value,
      [0, 1],
      [0.6, 1],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        scale: interpolate(
          focusAnim.value,
          [0, 1],
          [0.9, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 2,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 48,
      ...theme.shadows.sm,
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text,
      paddingVertical: theme.spacing.xs,
    },
    clearButton: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.xs,
    },
    filterButton: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.xs,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
    },
    loadingContainer: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.xs,
    },
  });

  return (
    <Animated.View style={[
      styles.container, 
      { borderColor: isFocused ? theme.colors.primary : theme.colors.border },
      animatedContainerStyle, 
      style
    ]}>
      <Animated.View style={[styles.searchIcon, animatedIconStyle]}>
        <Ionicons
          name="search"
          size={20}
          color={isFocused ? theme.colors.primary : theme.colors.textTertiary}
        />
      </Animated.View>

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <Animated.View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: theme.colors.primary,
              borderTopColor: 'transparent',
            }}
          />
        </View>
      )}

      {value.length > 0 && !loading && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Ionicons
            name="close-circle"
            size={20}
            color={theme.colors.textTertiary}
          />
        </TouchableOpacity>
      )}

      {showFilter && onFilterPress && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons
            name="filter"
            size={16}
            color={theme.colors.textInverse}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}; 