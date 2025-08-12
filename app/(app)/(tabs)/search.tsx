import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/context/ThemeContext';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { H1, H2, Body } from '@/typography';

const { width: screenWidth } = Dimensions.get('window');

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string[];
  image?: string;
  count: number;
}

export default function ExploreScreen() {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isTablet = screenWidth >= 768;

  const categories: Category[] = [
    {
      id: 'newspapers',
      name: 'Newspapers',
      icon: 'newspaper-outline',
      color: theme.colors.info,
      gradient: [theme.colors.info, theme.colors.primaryDark],
      count: 45
    },
    {
      id: 'aeroplanes',
      name: 'Aeroplanes & Transport',
      icon: 'airplane-outline',
      color: theme.colors.primary,
      gradient: [theme.colors.primary, theme.colors.primaryDark],
      count: 32
    },
    {
      id: 'animals',
      name: 'Animals & Equestrian',
      icon: 'paw-outline',
      color: theme.colors.warning,
      gradient: [theme.colors.warning, theme.colors.primaryDark],
      count: 28
    },
    {
      id: 'art',
      name: 'Art & Culture',
      icon: 'color-palette-outline',
      color: theme.colors.success,
      gradient: [theme.colors.success, theme.colors.primaryDark],
      count: 67
    },
    {
      id: 'boats',
      name: 'Boats & Watersports',
      icon: 'boat-outline',
      color: theme.colors.primary,
      gradient: [theme.colors.primary, theme.colors.primaryDark],
      count: 23
    },
    {
      id: 'business',
      name: 'Business & Finance',
      icon: 'trending-up-outline',
      color: theme.colors.warning,
      gradient: [theme.colors.warning, theme.colors.primaryDark],
      count: 89
    },
    {
      id: 'cars',
      name: 'Cars & Motoring',
      icon: 'car-outline',
      color: theme.colors.info,
      gradient: [theme.colors.info, theme.colors.primaryDark],
      count: 54
    },
    {
      id: 'celebrity',
      name: 'Celebrity & Entertainment',
      icon: 'star-outline',
      color: theme.colors.primary,
      gradient: [theme.colors.primary, theme.colors.primaryDark],
      count: 76
    },
    {
      id: 'comics',
      name: 'Comics',
      icon: 'color-wand-outline',
      color: theme.colors.error,
      gradient: [theme.colors.error, theme.colors.primaryDark],
      count: 41
    },
    {
      id: 'craft',
      name: 'Craft & DIY',
      icon: 'construct-outline',
      color: theme.colors.success,
      gradient: [theme.colors.success, theme.colors.primaryDark],
      count: 38
    },
    {
      id: 'education',
      name: 'Education',
      icon: 'school-outline',
      color: theme.colors.warning,
      gradient: [theme.colors.warning, theme.colors.primaryDark],
      count: 92
    },
    {
      id: 'fashion',
      name: 'Fashion & Style',
      icon: 'shirt-outline',
      color: theme.colors.error,
      gradient: [theme.colors.error, theme.colors.primaryDark],
      count: 65
    },
    {
      id: 'food',
      name: 'Food & Cooking',
      icon: 'restaurant-outline',
      color: theme.colors.warning,
      gradient: [theme.colors.warning, theme.colors.primaryDark],
      count: 47
    },
    {
      id: 'health',
      name: 'Health & Fitness',
      icon: 'fitness-outline',
      color: theme.colors.success,
      gradient: [theme.colors.success, theme.colors.primaryDark],
      count: 58
    },
    {
      id: 'history',
      name: 'History',
      icon: 'library-outline',
      color: theme.colors.warning,
      gradient: [theme.colors.warning, theme.colors.primaryDark],
      count: 34
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: 'laptop-outline',
      color: theme.colors.info,
      gradient: [theme.colors.info, theme.colors.primaryDark],
      count: 73
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category.id);
    // TODO: Navigate to category detail or filter magazines
    console.log('🔍 Category pressed:', category.name);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLeft: {
      flex: 1,
    },
    title: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.base,
    },
    profileButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
      elevation: 4,
    },
    searchContainer: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      marginBottom: theme.spacing.xl,
    },
    searchBar: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      ...theme.shadows.sm,
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.base,
      marginLeft: theme.spacing.sm,
    },
    searchIcon: {
      color: theme.colors.textSecondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
    },
    sectionHeader: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.xs,
    },
    sectionSubtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
    categoryCard: {
      width: (screenWidth - (isTablet ? theme.spacing['2xl'] * 2 : theme.spacing.lg * 2) - theme.spacing.md) / 2,
      height: 120,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.lg,
      elevation: 8,
    },
    categoryGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.md,
    },
    categoryIcon: {
      marginBottom: theme.spacing.sm,
    },
    categoryName: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold as any,
      textAlign: 'center',
      lineHeight: theme.typography.lineHeight.tight * theme.typography.fontSize.sm,
    },
    categoryCount: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.xs,
      opacity: 0.8,
      marginTop: theme.spacing.xs,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.xl,
    },
    emptyIcon: {
      marginBottom: theme.spacing.lg,
    },
    emptyTitle: {
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    emptySubtitle: {
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
        <View style={styles.headerLeft}>
          <H1 style={styles.title}>Explore</H1>
          <Body style={styles.subtitle}>Discover amazing content</Body>
        </View>
        
        <TouchableOpacity style={styles.profileButton}>
          <Text style={{ color: theme.colors.textInverse, fontSize: 18, fontWeight: 'bold' }}>
            H
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View entering={FadeInDown.delay(300)} style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Animated.View>

      {/* Categories */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.delay(400)} style={styles.sectionHeader}>
          <H2 style={styles.sectionTitle}>Categories</H2>
          <Body style={styles.sectionSubtitle}>
            {filteredCategories.length} categories available
          </Body>
        </Animated.View>

        {filteredCategories.length > 0 ? (
          <View style={styles.categoriesGrid}>
            {filteredCategories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInUp.delay(500 + index * 50)}
              >
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={category.gradient as [string, string]}
                    style={styles.categoryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={32}
                      color={theme.colors.textInverse}
                      style={styles.categoryIcon}
                    />
                    <Text style={styles.categoryName} numberOfLines={2}>
                      {category.name}
                    </Text>
                    <Text style={styles.categoryCount}>
                      {category.count} items
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={64}
              color={theme.colors.textTertiary}
              style={styles.emptyIcon}
            />
            <H2 style={styles.emptyTitle}>No categories found</H2>
            <Body style={styles.emptySubtitle}>
              Try adjusting your search terms
            </Body>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}