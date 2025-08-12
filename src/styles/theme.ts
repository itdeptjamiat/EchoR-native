import { Theme } from './themeTypes';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

// Export theme configurations
export { lightTheme, darkTheme };

// Default theme (will be overridden by ThemeContext)
export const defaultTheme: Theme = lightTheme;

// Theme utilities
export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};

// Theme validation
export const validateTheme = (theme: Theme): boolean => {
  return !!(
    theme.colors &&
    theme.typography &&
    theme.spacing &&
    theme.borderRadius &&
    theme.shadows
  );
};

// Export theme types
export type { Theme } from './themeTypes'; 