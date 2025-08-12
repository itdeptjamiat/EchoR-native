export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Theme {
  colors: {
    // Primary Colors
    primary: string;
    primaryLight: string;
    primaryDark: string;
    
    // Background Colors
    background: string;
    surface: string;
    surfaceLight: string;
    surfaceDark: string;
    
    // Text Colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;
    
    // Status Colors
    success: string;
    error: string;
    warning: string;
    info: string;
    
    // Border Colors
    border: string;
    borderLight: string;
    borderDark: string;
  };
  
  typography: {
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
    };
    
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
    };
    
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
  
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    full: number;
  };
  
  shadows: {
    sm: ShadowStyle;
    md: ShadowStyle;
    lg: ShadowStyle;
    xl: ShadowStyle;
  };
}