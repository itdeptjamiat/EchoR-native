import { Theme } from './themeTypes';

export const darkTheme: Theme = {
  colors: {
    // Primary Colors - Orange/Gold accent (same as light for consistency)
    primary: '#FFA500', // Orange/Gold (your original choice)
    primaryLight: '#FFB84D', // Light Orange/Gold
    primaryDark: '#E69400', // Dark Orange/Gold
    
    // Background Colors - Even darker theme
    background: '#0A0A0A', // Very dark main background
    surface: '#1A1A1A', // Dark card/component backgrounds
    surfaceLight: '#2A2A2A', // Lighter dark surface
    surfaceDark: '#0F0F0F', // Darker surface variant
    
    // Text Colors - Light text on dark backgrounds
    text: '#FFFFFF', // Light primary text
    textSecondary: '#B0B0B0', // Muted secondary text
    textTertiary: '#808080', // Very muted tertiary text
    textInverse: '#0A0A0A', // Dark text on colored backgrounds
    
    // Status Colors
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    
    // Border Colors
    border: '#303030',
    borderLight: '#404040',
    borderDark: '#202020',
  },
  
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.45,
      shadowRadius: 16,
      elevation: 16,
    },
  },
};