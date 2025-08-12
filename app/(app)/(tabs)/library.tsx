import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { H1, H2, H3, Body } from '@/typography';

const { width: screenWidth } = Dimensions.get('window');

interface LibraryItem {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  isFavorite: boolean;
  progress: number; // 0-100
  type: 'magazine' | 'article' | 'digest';
  lastRead?: string;
  downloadDate?: string;
}

type LibraryTab = 'favorites' | 'downloads' | 'recently' | 'books';

export default function LibraryScreen() {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<LibraryTab>('favorites');
  const [isEditing, setIsEditing] = useState(false);

  const isTablet = screenWidth >= 768;

  // Mock data for library items
  const libraryItems: LibraryItem[] = [
    {
      id: '1',
      title: 'NATIONAL GEOGRAPHIC TRAVELLER ITALY',
      subtitle: 'Discover the beauty of Italy',
      coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=600&fit=crop',
      isFavorite: true,
      progress: 75,
      type: 'magazine',
      lastRead: '2024-01-15'
    },
    {
      id: '2',
      title: 'COUNTRY LIFE',
      subtitle: 'Georgian glory - The revival of a lost vision',
      coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=600&fit=crop',
      isFavorite: false,
      progress: 0,
      type: 'magazine',
      downloadDate: '2024-01-10'
    },
    {
      id: '3',
      title: 'TECHNOLOGY WEEKLY',
      subtitle: 'Latest innovations in AI and Machine Learning',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      isFavorite: true,
      progress: 45,
      type: 'magazine',
      lastRead: '2024-01-12'
    },
    {
      id: '4',
      title: 'CULINARY ARTS',
      subtitle: 'Master the art of French cuisine',
      coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
      isFavorite: false,
      progress: 90,
      type: 'article',
      lastRead: '2024-01-14'
    }
  ];

  const getFilteredItems = () => {
    switch (activeTab) {
      case 'favorites':
        return libraryItems.filter(item => item.isFavorite);
      case 'downloads':
        return libraryItems.filter(item => item.downloadDate);
      case 'recently':
        return libraryItems.filter(item => item.lastRead).sort((a, b) => 
          new Date(b.lastRead!).getTime() - new Date(a.lastRead!).getTime()
        );
      case 'books':
        return libraryItems.filter(item => item.type === 'magazine');
      default:
        return libraryItems;
    }
  };

  const getTabTitle = (tab: LibraryTab) => {
    switch (tab) {
      case 'favorites': return 'Favorites';
      case 'downloads': return 'Downloads';
      case 'recently': return 'Recently Read';
      case 'books': return 'Books';
      default: return '';
    }
  };

  const getTabIcon = (tab: LibraryTab) => {
    switch (tab) {
      case 'favorites': return 'heart';
      case 'downloads': return 'download';
      case 'recently': return 'time';
      case 'books': return 'library';
      default: return 'book';
    }
  };

  const handleItemPress = (item: LibraryItem) => {
    console.log('🔍 Library item pressed:', item.title);
    // TODO: Navigate to magazine detail or reader
  };

  const handleFavoriteToggle = (item: LibraryItem) => {
    console.log('🔍 Toggle favorite for:', item.title);
    // TODO: Update favorite status
  };

  const handleSortPress = () => {
    console.log('🔍 Sort button pressed');
    // TODO: Show sort options
  };

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
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
    tabsContainer: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    tabsRow: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.xs,
      ...theme.shadows.sm,
      elevation: 2,
    },
    tabButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
    tabButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    tabIcon: {
      marginRight: theme.spacing.xs,
    },
    tabText: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium as any,
    },
    tabTextActive: {
      color: theme.colors.textInverse,
    },
    tabTextInactive: {
      color: theme.colors.textSecondary,
    },
    controlsContainer: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.sm,
      elevation: 2,
    },
    sortText: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginLeft: theme.spacing.xs,
    },
    editButton: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.lg,
    },
    editText: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium as any,
    },
    content: {
      flex: 1,
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
    },
    itemsContainer: {
      gap: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    itemCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.lg,
      elevation: 8,
    },
    itemContent: {
      flexDirection: 'row',
      padding: theme.spacing.lg,
    },
    itemImage: {
      width: 80,
      height: 120,
      borderRadius: theme.borderRadius.lg,
      marginRight: theme.spacing.lg,
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'space-between',
    },
    itemTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.xs,
      lineHeight: theme.typography.lineHeight.tight * theme.typography.fontSize.lg,
    },
    itemSubtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      marginBottom: theme.spacing.sm,
      lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.sm,
    },
    itemMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemDate: {
      color: theme.colors.textTertiary,
      fontSize: theme.typography.fontSize.xs,
    },
    itemActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    actionButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surfaceLight,
    },
    progressContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.success,
    },
    progressText: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.bold as any,
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

  const filteredItems = getFilteredItems();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
        <View style={styles.headerLeft}>
          <H1 style={styles.title}>My Library</H1>
          <Body style={styles.subtitle}>Your personal collection</Body>
        </View>
        
        <TouchableOpacity style={styles.profileButton}>
          <Text style={{ color: theme.colors.textInverse, fontSize: 18, fontWeight: 'bold' }}>
            H
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Tabs */}
      <Animated.View entering={FadeInDown.delay(300)} style={styles.tabsContainer}>
        <View style={styles.tabsRow}>
          {(['favorites', 'downloads', 'recently', 'books'] as LibraryTab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={getTabIcon(tab) as any}
                size={16}
                color={activeTab === tab ? theme.colors.textInverse : theme.colors.textSecondary}
                style={styles.tabIcon}
              />
              <Text style={[
                styles.tabText,
                activeTab === tab ? styles.tabTextActive : styles.tabTextInactive
              ]}>
                {getTabTitle(tab)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Controls */}
      <Animated.View entering={FadeInDown.delay(400)} style={styles.controlsContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={handleSortPress}>
          <Ionicons name="funnel-outline" size={16} color={theme.colors.text} />
          <Text style={styles.sortText}>Sort By New Arrivals</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.editButton, isEditing && { backgroundColor: theme.colors.error }]} 
          onPress={handleEditPress}
        >
          <Text style={styles.editText}>
            {isEditing ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length > 0 ? (
          <View style={styles.itemsContainer}>
            {filteredItems.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInUp.delay(500 + index * 100)}
              >
                <TouchableOpacity
                  style={styles.itemCard}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.9}
                >
                  <View style={styles.itemContent}>
                    <Image 
                      source={{ uri: item.coverImage }} 
                      style={styles.itemImage}
                    />
                    
                    <View style={styles.itemDetails}>
                      <View>
                        <Text style={styles.itemTitle} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <Text style={styles.itemSubtitle} numberOfLines={2}>
                          {item.subtitle}
                        </Text>
                      </View>
                      
                      <View style={styles.itemMeta}>
                        <Text style={styles.itemDate}>
                          {item.lastRead ? formatDate(item.lastRead) : 
                           item.downloadDate ? formatDate(item.downloadDate) : ''}
                        </Text>
                        
                        <View style={styles.itemActions}>
                          <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => handleFavoriteToggle(item)}
                          >
                            <Ionicons
                              name={item.isFavorite ? 'heart' : 'heart-outline'}
                              size={16}
                              color={item.isFavorite ? theme.colors.error : theme.colors.textSecondary}
                            />
                          </TouchableOpacity>
                          
                          {item.progress > 0 ? (
                            <View style={styles.progressContainer}>
                              <Text style={styles.progressText}>
                                {item.progress}%
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.actionButton}>
                              <Ionicons
                                name="ellipsis-horizontal"
                                size={16}
                                color={theme.colors.textSecondary}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name={getTabIcon(activeTab) as any}
              size={64}
              color={theme.colors.textTertiary}
              style={styles.emptyIcon}
            />
            <H2 style={styles.emptyTitle}>No {getTabTitle(activeTab).toLowerCase()} yet</H2>
            <Body style={styles.emptySubtitle}>
              {activeTab === 'favorites' && 'Start adding items to your favorites'}
              {activeTab === 'downloads' && 'Download some magazines to read offline'}
              {activeTab === 'recently' && 'Your reading history will appear here'}
              {activeTab === 'books' && 'Your book collection will appear here'}
            </Body>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}