import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { H1, H2, Body } from '@/typography';
import { PostCard } from '@/components/PostCard';
import { CustomButton } from '@/components/CustomButton';
import { 
  fetchMagazines,
  selectMagazines,
  selectArticles,
  selectDigests,
  selectMagazineLoading,
  selectMagazineError,
  selectMagazinesCount,
  selectArticlesCount,
  selectDigestsCount,
} from '@/redux/selectors';
import { AppDispatch } from '@/redux/store';
import { router } from 'expo-router';

type ContentType = 'magazines' | 'articles' | 'digests';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('magazines');
  const [refreshing, setRefreshing] = useState(false);

  // Selectors
  const magazines = useSelector(selectMagazines);
  const articles = useSelector(selectArticles);
  const digests = useSelector(selectDigests);
  const loading = useSelector(selectMagazineLoading);
  const error = useSelector(selectMagazineError);
  const magazinesCount = useSelector(selectMagazinesCount);
  const articlesCount = useSelector(selectArticlesCount);
  const digestsCount = useSelector(selectDigestsCount);

  const isTablet = screenWidth >= 768;

  useEffect(() => {
    dispatch(fetchMagazines());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchMagazines());
    setRefreshing(false);
  };

  const getCurrentItems = () => {
    switch (selectedContentType) {
      case 'magazines':
        return magazines;
      case 'articles':
        return articles;
      case 'digests':
        return digests;
      default:
        return magazines;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 17) return 'Good afternoon!';
    return 'Good evening!';
  };

  const contentTypes = [
    {
      id: 'magazines',
      title: 'Magazines',
      icon: 'book-outline',
      count: magazinesCount,
    },
    {
      id: 'articles',
      title: 'Articles',
      icon: 'document-text-outline',
      count: articlesCount,
    },
    {
      id: 'digests',
      title: 'Digests',
      icon: 'newspaper-outline',
      count: digestsCount,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
    },
    header: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    welcomeSection: {
      marginBottom: theme.spacing.xl,
    },
    greeting: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      marginBottom: theme.spacing.xs,
    },
    welcomeTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.sm,
    },
    notificationButton: {
      position: 'absolute',
      top: theme.spacing.lg,
      right: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
      elevation: 4,
    },
    contentTypeNavigation: {
      flexDirection: 'row',
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      marginBottom: theme.spacing.xl,
      gap: theme.spacing.sm,
    },
    contentTypeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.sm,
      elevation: 2,
    },
    contentTypeButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    contentTypeButtonText: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginLeft: theme.spacing.xs,
    },
    contentTypeButtonTextActive: {
      color: theme.colors.textInverse,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      marginBottom: theme.spacing.md,
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
    featuredContainer: {
      paddingLeft: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
    },
    allMagazinesContainer: {
      paddingHorizontal: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
    },
    magazineGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    magazineCard: {
      width: (screenWidth - (isTablet ? theme.spacing['2xl'] * 2 : theme.spacing.lg * 2) - theme.spacing.md) / 2,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      ...theme.shadows.md,
      elevation: 4,
    },
    magazineImageContainer: {
      width: '100%',
      height: 160, // Increased height for better image display
      position: 'relative',
    },
    magazineImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    magazineTypeBadge: {
      position: 'absolute',
      top: theme.spacing.sm,
      right: theme.spacing.sm,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
    },
    magazineTypeText: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.bold as any,
    },
    magazineContent: {
      padding: theme.spacing.md,
    },
    magazineTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold as any,
      marginBottom: theme.spacing.xs,
    },
    magazineCategory: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      marginBottom: theme.spacing.sm,
      backgroundColor: theme.colors.surfaceLight,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
      alignSelf: 'flex-start',
    },
    magazineMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    magazineDownloads: {
      color: theme.colors.textTertiary,
      fontSize: theme.typography.fontSize.xs,
    },
    magazineType: {
      backgroundColor: theme.colors.success,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
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
      marginBottom: theme.spacing.xl,
    },
  });

  const handleMagazinePress = (magazine: any) => {
    console.log('🔍 Magazine pressed:', magazine.name);
    router.push(`/(app)/magazine/${magazine.mid}`);
  };

  const renderContentTypeButton = (contentType: any) => {
    const isActive = selectedContentType === contentType.id;
    
    return (
      <TouchableOpacity
        key={contentType.id}
        style={[
          styles.contentTypeButton,
          isActive && styles.contentTypeButtonActive
        ]}
        onPress={() => setSelectedContentType(contentType.id as ContentType)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={contentType.icon as any}
          size={20}
          color={isActive ? theme.colors.textInverse : theme.colors.text}
        />
        <Text style={[
          styles.contentTypeButtonText,
          isActive && styles.contentTypeButtonTextActive
        ]}>
          {contentType.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMagazineCard = (magazine: any, index: number) => (
    <TouchableOpacity
      key={magazine._id}
      style={styles.magazineCard}
      onPress={() => handleMagazinePress(magazine)}
      activeOpacity={0.9}
    >
      <View style={styles.magazineImageContainer}>
        <Image 
          source={{ uri: magazine.image }} 
          style={styles.magazineImage}
        />
        <View style={[
          styles.magazineTypeBadge,
          { backgroundColor: magazine.type === 'pro' ? theme.colors.primary : theme.colors.success }
        ]}>
          <Text style={styles.magazineTypeText}>
            {magazine.type.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.magazineContent}>
        <Text style={styles.magazineTitle} numberOfLines={1}>
          {magazine.name}
        </Text>
        <Text style={styles.magazineCategory}>
          {magazine.category}
        </Text>
        <View style={styles.magazineMeta}>
          <Text style={styles.magazineDownloads}>
            {magazine.downloads} downloads
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="book-outline"
        size={64}
        color={theme.colors.textTertiary}
        style={styles.emptyIcon}
      />
      <H2 style={styles.emptyTitle}>No {selectedContentType} found</H2>
      <Body style={styles.emptySubtitle}>
        {loading 
          ? 'Loading your content...' 
          : 'Check back later for new content'
        }
      </Body>
      {!loading && (
        <CustomButton
          title="Refresh"
          onPress={onRefresh}
          variant="gradient"
        />
      )}
    </View>
  );

  const currentItems = getCurrentItems();
  const featuredItems = currentItems.slice(0, 3);
  const allItems = currentItems.slice(3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <H1 style={styles.welcomeTitle}>Welcome back</H1>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Content Type Navigation */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.contentTypeNavigation}>
          {contentTypes.map(renderContentTypeButton)}
        </Animated.View>

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <Animated.View entering={FadeInUp.delay(600)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <H2 style={styles.sectionTitle}>Featured {selectedContentType.charAt(0).toUpperCase() + selectedContentType.slice(1)}</H2>
              <Body style={styles.sectionSubtitle}>
                Handpicked content for you
              </Body>
            </View>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
              decelerationRate="fast"
              snapToInterval={screenWidth * 0.75 + theme.spacing.md}
              snapToAlignment="start"
            >
              {featuredItems.map((item, index) => (
                <PostCard
                  key={item._id}
                  magazine={item}
                  onPress={() => handleMagazinePress(item)}
                  index={index}
                />
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* All Magazines Section */}
        {allItems.length > 0 && (
          <Animated.View entering={FadeInUp.delay(800)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <H2 style={styles.sectionTitle}>All {selectedContentType.charAt(0).toUpperCase() + selectedContentType.slice(1)}</H2>
              <Body style={styles.sectionSubtitle}>
                {allItems.length} items available
              </Body>
            </View>
            
            <View style={styles.allMagazinesContainer}>
              <View style={styles.magazineGrid}>
                {allItems.map((item, index) => renderMagazineCard(item, index))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Empty State */}
        {currentItems.length === 0 && !loading && renderEmptyState()}
      </ScrollView>
    </SafeAreaView>
  );
}