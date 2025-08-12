import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

const createTypographyComponent = (
  defaultSize: TypographyProps['size'], 
  defaultWeight: TypographyProps['weight'] = 'normal'
) => {
  return React.forwardRef<Text, TypographyProps>(({
    children,
    size = defaultSize,
    weight = defaultWeight,
    color,
    align = 'left',
    style,
    ...props
  }, ref) => {
    const { theme } = useTheme();
    
    const textStyle = StyleSheet.create({
      text: {
        fontSize: theme.typography.fontSize[size!],
        fontWeight: theme.typography.fontWeight[weight] as any,
        color: color || theme.colors.text,
        textAlign: align,
        lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize[size!],
      },
    });

    return (
      <Text
        ref={ref}
        style={[textStyle.text, style]}
        {...props}
      >
        {children}
      </Text>
    );
  });
};

// Typography Components with default weights
export const H1 = createTypographyComponent('4xl', 'bold');
export const H2 = createTypographyComponent('3xl', 'bold');
export const H3 = createTypographyComponent('2xl', 'semibold');
export const H4 = createTypographyComponent('xl', 'semibold');
export const H5 = createTypographyComponent('lg', 'medium');
export const H6 = createTypographyComponent('base', 'medium');

export const Body = createTypographyComponent('base');
export const Caption = createTypographyComponent('sm');
export const Small = createTypographyComponent('xs');