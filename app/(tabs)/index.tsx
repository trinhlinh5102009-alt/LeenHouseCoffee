import {
  ChevronRight,
  Clock,
  Coffee as CoffeeIcon,
  Gift,
  Heart,
  MapPin,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tab bar height
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 68;

const { width } = Dimensions.get('window');

// Mock data - NHIỀU BANNERS
const bannerData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
    title: 'TẶNG KEY CHARM',
    subtitle: 'CHỈ HOÀN TỪ',
    price: '89K',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    title: 'SUMMER SPECIAL',
    subtitle: 'GIẢM ĐẾN 50%',
    price: '45K',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    title: 'NEW COLLECTION',
    subtitle: 'HI-TEA SERIES',
    price: '39K',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
    title: 'HAPPY HOUR',
    subtitle: 'MUA 1 TẶNG 1',
    price: '69K',
  },
];

// TYPING TEXTS
const typingTexts = [
  'Tìm món yêu thích 💖',
  'Cà phê sáng thơm ngon ☕',
  'Trà sữa ngọt ngào 🧋',
  'Bánh ngọt mới nướng 🧁',
  'Đồ uống giải nhiệt 🧊',
];

const collectionProducts = [
  {
    id: '1',
    name: 'Sữm phồm cho buổi - Giá đặc biệt',
    price: '39.000đ',
    originalPrice: '45.000đ',
    tag: 'MUA 1 TẶNG 1',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
  },
  {
    id: '2',
    name: 'Hi-Tea Americano',
    price: '39.000đ',
    originalPrice: '45.000đ',
    tag: 'MUA 1 TẶNG 1',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
  },
];

const appointmentDeals = [
  {
    id: '1',
    name: 'Latte Cốc Túc',
    price: '39.000đ',
    originalPrice: '60.000đ',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
  },
  {
    id: '2',
    name: 'Chocolate Americano',
    price: '39.000đ',
    originalPrice: '60.000đ',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
  },
  {
    id: '3',
    name: 'Trà Sữa Hoàng Hôn',
    price: '39.000đ',
    originalPrice: '60.000đ',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
  },
];

const freeshipProducts = [
  {
    id: '1',
    name: 'Trà Chia Cam Đá - Chá',
    price: '39.000đ',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
  },
  {
    id: '2',
    name: 'Trà Cher Macchiato',
    price: '45.000đ',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
  },
  {
    id: '3',
    name: 'Matcha Lát',
    price: '49.000đ',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
  },
];

const bestsellers = [
  {
    id: '1',
    name: 'Caramel Macchiato',
    price: '55.000đ',
    rating: 4.8,
    orders: '2.5k',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
  },
  {
    id: '2',
    name: 'Brown Sugar Milk Tea',
    price: '49.000đ',
    rating: 4.9,
    orders: '3.2k',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
  },
  {
    id: '3',
    name: 'Strawberry Smoothie',
    price: '52.000đ',
    rating: 4.7,
    orders: '1.8k',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
  },
];

const occasions = [
  {
    id: '1',
    title: 'Sinh nhật',
    subtitle: 'Bánh & đồ uống đặc biệt',
    icon: '🎂',
    color: '#FDF2F8',
  },
  {
    id: '2',
    title: 'Hẹn hò',
    subtitle: 'Set couple lãng mạn',
    icon: '💕',
    color: '#FCE7F3',
  },
  {
    id: '3',
    title: 'Họp nhóm',
    subtitle: 'Combo cho team',
    icon: '👥',
    color: '#FEF3C7',
  },
];

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const bannerScrollRef = useRef<ScrollView>(null);
  
  // Banner carousel state
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Typing animation state
  const [typingText, setTypingText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // BANNER AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % bannerData.length;
        
        // Scroll to next banner
        if (bannerScrollRef.current) {
          bannerScrollRef.current.scrollTo({
            x: nextIndex * width,
            animated: true,
          });
        }
        
        return nextIndex;
      });
    }, 4000); // Chuyển banner mỗi 4 giây

    return () => clearInterval(interval);
  }, []);

  // TYPING ANIMATION
  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    
    const typingSpeed = isDeleting ? 50 : 100; // Xóa nhanh hơn gõ
    const pauseTime = isDeleting ? 500 : 2000; // Dừng 2s khi gõ xong, 0.5s khi xóa xong

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Đang gõ
        if (typingText.length < currentFullText.length) {
          setTypingText(currentFullText.slice(0, typingText.length + 1));
        } else {
          // Gõ xong, chờ rồi bắt đầu xóa
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Đang xóa
        if (typingText.length > 0) {
          setTypingText(typingText.slice(0, -1));
        } else {
          // Xóa xong, chuyển sang text tiếp theo
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, currentTextIndex]);

  const renderProductCard = (item: any, showTag = false) => (
    <TouchableOpacity key={item.id} style={styles.productCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      {showTag && item.tag && (
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
        <Heart size={18} color="#EC4899" />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>CHỌN</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://via.placeholder.com/120x40/EC4899/FFFFFF?text=LeenHouse' }}
            style={styles.logo}
          />
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#EC4899" />
            <Text style={styles.locationText}>Giao hàng</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#831843" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <ShoppingCart size={24} color="#831843" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: TAB_BAR_HEIGHT + 20,
        }}
      >
        {/* Banner Carousel */}
        <View style={styles.bannerWrapper}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentBannerIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {bannerData.map((banner) => (
              <View key={banner.id} style={styles.bannerContainer}>
                <Image
                  source={{ uri: banner.image }}
                  style={styles.bannerImage}
                />
                <View style={styles.bannerGradient} />
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSubtitle}>💖 {banner.subtitle}</Text>
                  <View style={styles.bannerPriceContainer}>
                    <Text style={styles.bannerPrice}>{banner.price}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Banner Dots Indicator */}
          <View style={styles.dotsContainer}>
            {bannerData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentBannerIndex === index && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Search Bar with Typing Animation */}
        <View style={styles.searchBarContainer}>
          <Search size={20} color="#EC4899" />
          <View style={styles.typingContainer}>
            <Text style={styles.searchPlaceholder}>
              {typingText}
              <Text style={styles.cursor}>|</Text>
            </Text>
          </View>
        </View>

        {/* Collection Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={20} color="#EC4899" />
              <Text style={styles.sectionTitle}>BỘ SƯU TẬP</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <ChevronRight size={20} color="#EC4899" />
            </TouchableOpacity>
          </View>

          <View style={styles.collectionBanner}>
            <Text style={styles.collectionMainText}>HI-TEA</Text>
            <Text style={styles.collectionSecondaryText}>AMERICANO</Text>
            <View style={styles.collectionPriceTag}>
              <Text style={styles.collectionPrice}>39K</Text>
            </View>
            <Text style={styles.collectionSubtext}>💕 Mua 1 tặng 1</Text>
          </View>

          <View style={styles.productsRow}>
            {collectionProducts.map((item) => renderProductCard(item, true))}
          </View>
        </View>

        {/* Appointment Deal Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={styles.sectionTitleContainer}>
                <Clock size={20} color="#EC4899" />
                <Text style={styles.sectionTitle}>ƯU ĐÃI GIỜ HẸN - GIẢM 39%</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                🌸 Khỏe xế khởi hành chuyến - mùa mong
              </Text>
            </View>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={appointmentDeals}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.horizontalProductCard}>
                <Image source={{ uri: item.image }} style={styles.horizontalProductImage} />
                <TouchableOpacity style={styles.favoriteButtonSmall} activeOpacity={0.7}>
                  <Heart size={16} color="#EC4899" />
                </TouchableOpacity>
                <Text style={styles.horizontalProductName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.orderButton}>
                  <Text style={styles.orderButtonText}>CHỌN</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Freeship Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={styles.sectionTitleContainer}>
                <Gift size={20} color="#EC4899" />
                <Text style={styles.sectionTitle}>1 LY CHỈ 45K + FREESHIP</Text>
              </View>
              <Text style={styles.sectionSubtitle}>💝 Khỏe xế xẽ 3 hoắm lưới xéng</Text>
            </View>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={freeshipProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.horizontalProductCard}>
                <Image source={{ uri: item.image }} style={styles.horizontalProductImage} />
                <TouchableOpacity style={styles.favoriteButtonSmall} activeOpacity={0.7}>
                  <Heart size={16} color="#EC4899" />
                </TouchableOpacity>
                <Text style={styles.horizontalProductName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.orderButton}>
                  <Text style={styles.orderButtonText}>CHỌN</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* News Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Sparkles size={20} color="#EC4899" />
            <Text style={styles.sectionTitle}>TIN TỨC</Text>
          </View>
          <TouchableOpacity style={styles.newsCard} activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800' }}
              style={styles.newsImage}
            />
            <View style={styles.newsOverlay}>
              <Text style={styles.newsTitle}>
                QUÀ LÀ TRÒ CHƠI CÙNG BESTFRIDAY MÙI
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bestsellers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Star size={20} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.sectionTitle}>BESTSELLERS</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={bestsellers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.bestsellerCard}>
                <Image source={{ uri: item.image }} style={styles.bestsellerImage} />
                <View style={styles.bestsellerBadge}>
                  <Star size={12} color="#FFF" fill="#FFF" />
                  <Text style={styles.bestsellerRating}>{item.rating}</Text>
                </View>
                <View style={styles.bestsellerInfo}>
                  <Text style={styles.bestsellerName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.bestsellerOrders}>💖 {item.orders} đơn</Text>
                  <View style={styles.bestsellerFooter}>
                    <Text style={styles.bestsellerPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Special Occasions */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Heart size={20} color="#EC4899" fill="#EC4899" />
            <Text style={styles.sectionTitle}>DỊCH VỤ ĐẶC BIỆT</Text>
          </View>
          <Text style={styles.sectionDescription}>
            🌸 Những dịp đặc biệt cần những món đặc biệt
          </Text>

          <View style={styles.occasionsGrid}>
            {occasions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.occasionCard, { backgroundColor: item.color }]}
                activeOpacity={0.7}
              >
                <Text style={styles.occasionIcon}>{item.icon}</Text>
                <Text style={styles.occasionTitle}>{item.title}</Text>
                <Text style={styles.occasionSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <View style={styles.whyChooseCard}>
            <View style={styles.whyChooseHeader}>
              <CoffeeIcon size={32} color="#EC4899" />
              <Text style={styles.whyChooseTitle}>Tại sao chọn LeenHouse?</Text>
            </View>

            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>☕</Text>
                <Text style={styles.featureText}>100% hạt cà phê Arabica</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🌸</Text>
                <Text style={styles.featureText}>Không gian thơ mộng</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>💝</Text>
                <Text style={styles.featureText}>Phục vụ tận tâm</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✨</Text>
                <Text style={styles.featureText}>Giá cả hợp lý</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Quote */}
        <View style={styles.footerQuote}>
          <Text style={styles.quoteText}>
            Mỗi tách cà phê là một câu chuyện,{'\n'}
            mỗi khoảnh khắc là một kỷ niệm
          </Text>
          <Text style={styles.quoteAuthor}>— LeenHouse Coffee 💖</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF5FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 100,
    height: 32,
    resizeMode: 'contain',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EC4899',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  // Banner Carousel
  bannerWrapper: {
    position: 'relative',
  },
  bannerContainer: {
    width: width,
    height: 280,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(236, 72, 153, 0.3)',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerPriceContainer: {
    marginTop: 12,
    backgroundColor: '#EC4899',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  bannerPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  // Dots Indicator
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#FFF',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  // Search Bar with Typing
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: -24,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  typingContainer: {
    flex: 1,
    minHeight: 20,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#F9A8D4',
  },
  cursor: {
    color: '#EC4899',
    fontWeight: 'bold',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#831843',
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#F472B6',
    marginTop: 4,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#F9A8D4',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '600',
  },
  detailButton: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  detailButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  collectionBanner: {
    backgroundColor: '#FDF2F8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  collectionMainText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  collectionSecondaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#831843',
  },
  collectionPriceTag: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#EC4899',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  collectionPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  collectionSubtext: {
    fontSize: 12,
    color: '#EC4899',
    marginTop: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  productsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  tagBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EC4899',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#831843',
    marginBottom: 8,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  originalPrice: {
    fontSize: 12,
    color: '#F9A8D4',
    textDecorationLine: 'line-through',
  },
  orderButton: {
    backgroundColor: '#EC4899',
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  horizontalList: {
    paddingRight: 16,
  },
  horizontalProductCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    width: 140,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  horizontalProductImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  favoriteButtonSmall: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalProductName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#831843',
    marginBottom: 4,
  },
  newsCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 12,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  newsImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  newsOverlay: {
    padding: 16,
    backgroundColor: '#FDF2F8',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#831843',
    textTransform: 'uppercase',
  },
  bestsellerCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: 160,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  bestsellerImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestsellerRating: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bestsellerInfo: {
    padding: 12,
  },
  bestsellerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#831843',
    marginBottom: 4,
  },
  bestsellerOrders: {
    fontSize: 11,
    color: '#F9A8D4',
    marginBottom: 8,
  },
  bestsellerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bestsellerPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  occasionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  occasionCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  occasionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  occasionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#831843',
    marginBottom: 4,
    textAlign: 'center',
  },
  occasionSubtitle: {
    fontSize: 10,
    color: '#F9A8D4',
    textAlign: 'center',
  },
  whyChooseCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  whyChooseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  whyChooseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#831843',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 14,
    color: '#831843',
    flex: 1,
  },
  footerQuote: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  quoteText: {
    fontSize: 15,
    color: '#EC4899',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 12,
    color: '#F9A8D4',
    fontWeight: '600',
  },
});