import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Magazine } from '@/redux/slices/magazineSlice';

interface PostCardProps {
  magazine: Magazine;
  onPress?: () => void;
  index?: number;
}

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.75;
const cardHeight = 280; // Increased height for better image display

export const PostCard: React.FC<PostCardProps> = ({ 
  magazine, 
  onPress, 
  index = 0 
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: cardWidth,
      height: cardHeight,
      marginHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      ...theme.shadows.lg,
      elevation: 8,
    },
    imageContainer: {
      width: '100%',
      height: cardHeight * 0.7, // 70% of card height for image
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    typeBadge: {
      position: 'absolute',
      top: theme.spacing.sm,
      right: theme.spacing.sm,
      backgroundColor: magazine.type === 'pro' ? theme.colors.primary : theme.colors.success,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
    },
    typeText: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.bold as any,
    },
    content: {
      flex: 1,
      padding: theme.spacing.md,
      justifyContent: 'space-between',
    },
    title: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.xs,
      lineHeight: theme.typography.lineHeight.tight * theme.typography.fontSize.lg,
    },
    description: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.sm,
      marginBottom: theme.spacing.sm,
    },
    metaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    category: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.medium as any,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginLeft: theme.spacing.xs,
    },
  });

  const getMagazineTypeIcon = () => {
    switch (magazine.magzineType) {
      case 'magzine':
        return 'book-outline';
      case 'article':
        return 'document-text-outline';
      case 'digest':
        return 'newspaper-outline';
      default:
        return 'book-outline';
    }
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100)}
      style={styles.container}
    >
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={onPress}
        style={{ flex: 1 }}
      >
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: magazine.image }} 
            style={styles.image}
          />
          
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              {magazine.type.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {magazine.name}
            </Text>
            
            <Text style={styles.description} numberOfLines={2}>
              {magazine.description}
            </Text>
          </View>
          
          <View style={styles.metaContainer}>
            <Text style={styles.category}>
              {magazine.category}
            </Text>
            
            <View style={styles.ratingContainer}>
              <Ionicons 
                name="star" 
                size={12} 
                color={theme.colors.warning} 
              />
              <Text style={styles.rating}>
                {magazine.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}; 