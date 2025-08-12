import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@/context/ThemeContext';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { H1, H2, H3, Body } from '@/typography';
import { CustomButton } from '@/components/CustomButton';
import { fetchMagazineDetail } from '@/redux/actions/magazineActions';
import { clearSelectedMagazine } from '@/redux/slices/magazineSlice';
import { 
  selectSelectedMagazine, 
  selectMagazineDetailLoading, 
  selectMagazineError 
} from '@/redux/selectors/magazineSelectors';
import { AppDispatch } from '@/redux/store';

const { width: screenWidth } = Dimensions.get('window');

export default function MagazineDetailScreen() {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const magazine = useSelector(selectSelectedMagazine);
  const loading = useSelector(selectMagazineDetailLoading);
  const error = useSelector(selectMagazineError);

  const isTablet = screenWidth >= 768;

  useEffect(() => {
    if (id) {
      dispatch(fetchMagazineDetail(id));
    }

    // Cleanup when component unmounts
    return () => {
      dispatch(clearSelectedMagazine());
    };
  }, [id, dispatch]);

  const handleReadMagazine = () => {
    if (magazine?.file) {
      console.log('🔍 Magazine Detail - Opening magazine file:', magazine.file);
      // TODO: Implement PDF viewer or download functionality
      // For now, just log the file URL
    }
  };

  const handleDownload = () => {
    if (magazine?.file) {
      console.log('🔍 Magazine Detail - Downloading magazine:', magazine.file);
      // TODO: Implement download functionality
    }
  };

  const getMagazineTypeColor = () => {
    if (!magazine) return [theme.colors.primary, theme.colors.primaryDark];
    
    switch (magazine.magzineType) {
      case 'magzine':
        return [theme.colors.primary, theme.colors.primaryDark];
      case 'article':
        return [theme.colors.info, theme.colors.primaryDark];
      case 'digest':
        return [theme.colors.warning, theme.colors.primaryDark];
      default:
        return [theme.colors.primary, theme.colors.primaryDark];
    }
  };

  const getMagazineTypeIcon = () => {
    if (!magazine) return 'book-outline';
    
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      position: 'relative',
      height: screenHeight * 0.5,
    },
    coverImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    headerContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60%',
      justifyContent: 'flex-end',
      padding: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay for text visibility
    },
    backButton: {
      position: 'absolute',
      top: theme.spacing.lg,
      left: theme.spacing.lg,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    typeBadge: {
      position: 'absolute',
      top: theme.spacing.lg,
      right: theme.spacing.lg,
      backgroundColor: magazine?.type === 'pro' ? theme.colors.primary : theme.colors.success,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
      zIndex: 10,
    },
    typeText: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.bold as any,
    },
    title: {
      color: theme.colors.textInverse,
      fontSize: isTablet ? theme.typography.fontSize['3xl'] : theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold as any,
      marginBottom: theme.spacing.sm,
      lineHeight: theme.typography.lineHeight.tight * (isTablet ? theme.typography.fontSize['3xl'] : theme.typography.fontSize['2xl']),
    },
    category: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginBottom: theme.spacing.sm,
      opacity: 0.9,
    },
    metaInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginLeft: theme.spacing.xs,
    },
    downloads: {
      color: theme.colors.textInverse,
      fontSize: theme.typography.fontSize.sm,
      opacity: 0.8,
    },
    content: {
      flex: 1,
      padding: isTablet ? theme.spacing['2xl'] : theme.spacing.lg,
    },
    description: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.base,
      lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.base,
      marginBottom: theme.spacing.xl,
    },
    infoSection: {
      marginBottom: theme.spacing.xl,
    },
    infoTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold as any,
      marginBottom: theme.spacing.md,
    },
    infoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    infoItem: {
      flex: 1,
      minWidth: 150,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
    },
    infoIcon: {
      marginBottom: theme.spacing.sm,
    },
    infoLabel: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      marginBottom: theme.spacing.xs,
    },
    infoValue: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium as any,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      marginTop: theme.spacing.xl,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.fontSize.base,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
    reviewsContainer: {
      gap: theme.spacing.md,
    },
    reviewItem: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    reviewRating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewRatingText: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium as any,
      marginLeft: theme.spacing.xs,
    },
    reviewDate: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
    },
    reviewText: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.sm,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ color: theme.colors.text, marginTop: theme.spacing.md }}>
            Loading magazine...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !magazine) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={theme.colors.error} />
          <Text style={styles.errorText}>
            {error || 'Magazine not found'}
          </Text>
          <CustomButton
            title="Go Back"
            onPress={() => router.back()}
            variant="gradient"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Cover Image */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
          <Image 
            source={{ uri: magazine.image }} 
            style={styles.coverImage}
          />
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.textInverse} />
          </TouchableOpacity>

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              {magazine.type.toUpperCase()}
            </Text>
          </View>

          {/* Content overlay without gradient */}
          <View style={styles.headerContent}>
            <Text style={styles.title} numberOfLines={3}>
              {magazine.name}
            </Text>
            
            <Text style={styles.category}>
              {magazine.category}
            </Text>
            
            <View style={styles.metaInfo}>
              <View style={styles.ratingContainer}>
                <Ionicons 
                  name="star" 
                  size={16} 
                  color={theme.colors.warning} 
                />
                <Text style={styles.rating}>
                  {magazine.rating.toFixed(1)}
                </Text>
              </View>
              
              <Text style={styles.downloads}>
                {magazine.downloads} downloads
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.content}>
          <Text style={styles.description}>
            {magazine.description}
          </Text>

          {/* Magazine Info */}
          <View style={styles.infoSection}>
            <H3 style={styles.infoTitle}>Magazine Details</H3>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons 
                  name={getMagazineTypeIcon()} 
                  size={24} 
                  color={theme.colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>
                  {magazine.magzineType.charAt(0).toUpperCase() + magazine.magzineType.slice(1)}
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons 
                  name="calendar-outline" 
                  size={24} 
                  color={theme.colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>Published</Text>
                <Text style={styles.infoValue}>
                  {formatDate(magazine.createdAt)}
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons 
                  name="star-outline" 
                  size={24} 
                  color={theme.colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>Rating</Text>
                <Text style={styles.infoValue}>
                  {magazine.rating.toFixed(1)}/5
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons 
                  name="download-outline" 
                  size={24} 
                  color={theme.colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>Downloads</Text>
                <Text style={styles.infoValue}>
                  {magazine.downloads}
                </Text>
              </View>
            </View>
          </View>

          {/* File Information */}
          <View style={styles.infoSection}>
            <H3 style={styles.infoTitle}>File Information</H3>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons 
                  name="document-outline" 
                  size={24} 
                  color={theme.colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>File Type</Text>
                <Text style={styles.infoValue}>
                  {magazine.fileType.toUpperCase()}
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons 
                  name="link-outline" 
                  size={24} 
                  color={theme.colors.primary}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoValue}>
                  {magazine.isActive ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
          </View>

          {/* Reviews Section */}
          {magazine.reviews && magazine.reviews.length > 0 && (
            <View style={styles.infoSection}>
              <H3 style={styles.infoTitle}>Reviews ({magazine.reviews.length})</H3>
              <View style={styles.reviewsContainer}>
                {magazine.reviews.slice(0, 3).map((review, index) => (
                  <View key={review._id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewRating}>
                        <Ionicons 
                          name="star" 
                          size={16} 
                          color={theme.colors.warning} 
                        />
                        <Text style={styles.reviewRatingText}>
                          {review.rating}/5
                        </Text>
                      </View>
                      <Text style={styles.reviewDate}>
                        {formatDate(review.time)}
                      </Text>
                    </View>
                    <Text style={styles.reviewText} numberOfLines={3}>
                      {review.review}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <CustomButton
              title="Read Now"
              onPress={handleReadMagazine}
              variant="gradient"
              style={{ flex: 1 }}
            />
            <CustomButton
              title="Download"
              onPress={handleDownload}
              variant="primary"
              style={{ flex: 1 }}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
} 