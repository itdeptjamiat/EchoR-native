import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Body } from '@/typography';

interface Category {
  id: string;
  title: string;
  icon: string;
  count: number;
}

interface ButtonSelectorGroupProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const ButtonSelectorGroup: React.FC<ButtonSelectorGroupProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.sm,
    },
    button: {
      flex: 1,
      height: 80,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      ...theme.shadows.md,
      elevation: 4,
    },
    buttonContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.sm,
    },
    icon: {
      marginBottom: theme.spacing.xs,
    },
    title: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold as any,
      textAlign: 'center',
    },
    count: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.medium as any,
      opacity: 0.8,
    },
  });

  const getCategoryColors = (categoryId: string) => {
    switch (categoryId) {
      case 'magazines':
        return [theme.colors.primary, theme.colors.primaryDark];
      case 'articles':
        return [theme.colors.info, theme.colors.primaryDark];
      case 'digests':
        return [theme.colors.warning, theme.colors.primaryDark];
      default:
        return [theme.colors.primary, theme.colors.primaryDark];
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'magazines':
        return 'book-outline';
      case 'articles':
        return 'document-text-outline';
      case 'digests':
        return 'newspaper-outline';
      default:
        return 'book-outline';
    }
  };

    return (
    <View style={styles.container}>
      {categories.map((category: any) => {
        const isSelected = selectedCategory === category.id;
        const scale = useSharedValue(isSelected ? 1.05 : 1);
        const opacity = useSharedValue(isSelected ? 1 : 0.8);

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
          opacity: opacity.value,
        }));

        const handlePress = () => {
          scale.value = withSpring(0.95, { duration: 100 });
          opacity.value = withSpring(1);
          
          setTimeout(() => {
            scale.value = withSpring(1.05);
            onSelectCategory(category.id);
          }, 100);
        };

        return (
          <Animated.View key={category.id} style={animatedStyle}>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={getCategoryColors(category.id) as [string, string]}
                style={styles.buttonContent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name={getCategoryIcon(category.id) as any}
                  size={24}
                  color={theme.colors.textInverse}
                  style={styles.icon}
                />
                <Body style={styles.title} weight="semibold">
                  {category.title}
                </Body>
                <Body style={styles.count} size="xs">
                  {category.count}
                </Body>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
}; 