import {
    ChevronDown,
    Coffee as CoffeeIcon,
    Heart,
    MapPin,
    Plus,
    Search,
    ShoppingBag,
    ShoppingCart,
    Truck,
    X,
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 68;

// Mock data
const categories = [
  { id: '1', name: 'Món Mới\nPhải Thử', icon: '🔥', color: '#FDF2F8' },
  { id: '2', name: 'Ưu đãi\nriêng bạn', icon: '🎁', color: '#FCE7F3' },
  { id: '3', name: 'Americano', icon: '☕' },
  { id: '4', name: 'Espresso', icon: '☕' },
  { id: '5', name: 'Latte', icon: '☕' },
  { id: '6', name: 'Cà Phê\nPhin', icon: '🫖' },
  { id: '7', name: 'Cold Brew', icon: '🧊' },
  { id: '8', name: 'Matcha', icon: '🍵' },
  { id: '9', name: 'Frappe', icon: '🥤' },
  { id: '10', name: 'Trà Sữa', icon: '🧋' },
  { id: '11', name: 'Trà Trái Cây', icon: '🍊' },
  { id: '12', name: 'Topping', icon: '✨' },
  { id: '13', name: 'Bánh Ngọt', icon: '🧁' },
  { id: '14', name: 'Bánh Mặn', icon: '🥐' },
  { id: '15', name: 'Món Nóng', icon: '🔥' },
];

const products = [
  {
    id: '1',
    name: 'Floaty Pistachio',
    price: '89.000đ',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    isNew: true,
    category: 'Món Mới\nPhải Thử',
  },
  {
    id: '2',
    name: 'Mocha Frappe',
    price: '89.000đ',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    isNew: true,
    category: 'Món Mới\nPhải Thử',
  },
  {
    id: '3',
    name: 'Cheesecake Frappe',
    price: '89.000đ',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
    isNew: true,
    category: 'Món Mới\nPhải Thử',
  },
  {
    id: '4',
    name: 'Pistachio Frappe',
    price: '89.000đ',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    isNew: true,
    category: 'Món Mới\nPhải Thử',
  },
  {
    id: '5',
    name: 'Pistachio Hot Latte',
    price: '79.000đ',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    isNew: true,
    category: 'Món Mới\nPhải Thử',
  },
  {
    id: '6',
    name: 'Cheesecake Hot Latte',
    price: '79.000đ',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    isNew: true,
    category: 'Món Mới\nPhải Thử',
  },
  {
    id: '7',
    name: 'Ethiopia Americano',
    price: '69.000đ',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    hasPromo: true,
    category: 'Món Mới\nPhải Thử',
  },
  {
    id: '8',
    name: 'Ethiopia Americano Nóng',
    price: '69.000đ',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    hasPromo: true,
    category: 'Món Mới\nPhải Thử',
  },
];

const banners = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    title: 'TẶNG KEY CHARM',
    subtitle: 'CHỈ HOÀN TỪ',
    price: '89K',
  },
];

const deliveryOptions = [
  {
    id: '1',
    icon: <Truck size={24} color="#EC4899" />,
    title: 'Giao hàng tận nơi',
    subtitle: '💝 Miễn phí với đơn từ 100K',
  },
  {
    id: '2',
    icon: <MapPin size={24} color="#EC4899" />,
    title: 'Đến lấy mang đi',
    subtitle: '🌸 Giảm 10% cho đơn mang đi',
  },
  {
    id: '3',
    icon: <CoffeeIcon size={24} color="#EC4899" />,
    title: 'Uống tại quán',
    subtitle: '✨ Không gian thơ mộng',
  },
];

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [favorites, setFavorites] = useState<string[]>([]);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const openDeliveryModal = () => {
    setShowDeliveryModal(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const closeDeliveryModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowDeliveryModal(false);
    });
  };

  const addToCart = (productId: string) => {
    setCartCount(cartCount + 1);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const CategoryItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive,
        item.color && { backgroundColor: item.color },
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const ProductItem = ({ item }: any) => {
    const isFavorite = favorites.includes(item.id);
    
    return (
      <TouchableOpacity style={styles.productItem} activeOpacity={0.8}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          {item.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
          {item.hasPromo && (
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>💝</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
            activeOpacity={0.7}
          >
            <Heart
              size={16}
              color="#EC4899"
              fill={isFavorite ? '#EC4899' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item.id)}
              activeOpacity={0.7}
            >
              <Plus size={18} color="#FFF" strokeWidth={3} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={openDeliveryModal}
          activeOpacity={0.7}
        >
          <MapPin size={18} color="#EC4899" />
          <Text style={styles.locationText}>Đến lấy mang đi</Text>
          <ChevronDown size={18} color="#831843" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton} activeOpacity={0.7}>
          <ShoppingCart size={24} color="#831843" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#EC4899" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm món yêu thích 💖"
          placeholderTextColor="#F9A8D4"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Category Sidebar */}
        <View style={styles.categorySidebar}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CategoryItem item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        {/* Products Area */}
        <ScrollView
          style={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: TAB_BAR_HEIGHT + 20,
          }}
        >
          {/* Banner */}
          <View style={styles.bannerContainer}>
            <Image
              source={{ uri: banners[0].image }}
              style={styles.bannerImage}
            />
            <View style={styles.bannerGradient} />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{banners[0].title}</Text>
              <Text style={styles.bannerSubtitle}>💖 {banners[0].subtitle}</Text>
              <View style={styles.bannerPriceTag}>
                <Text style={styles.bannerPrice}>{banners[0].price}</Text>
              </View>
              <View style={styles.bannerFooter}>
                <Text style={styles.bannerFooterText}>🌸 Một chỗ ngồi</Text>
                <View style={styles.bannerCartInfo}>
                  <ShoppingBag size={16} color="#FFF" />
                  <Text style={styles.bannerCartText}>0</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Category Title */}
          <View style={styles.categoryHeader}>
            <View style={styles.categoryHeaderBadge}>
              <Text style={styles.categoryHeaderIcon}>🔥</Text>
            </View>
            <Text style={styles.categoryHeaderTitle}>Món Mới Phải Thử</Text>
          </View>

          {/* Product List */}
          <View style={styles.productsList}>
            {products.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Delivery Options Modal */}
      <Modal
        visible={showDeliveryModal}
        transparent
        animationType="none"
        onRequestClose={closeDeliveryModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDeliveryModal}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Chọn phương thức nhận hàng</Text>
                  <Text style={styles.modalSubtitle}>🌸 Chọn cách bạn muốn thưởng thức</Text>
                </View>
                <TouchableOpacity onPress={closeDeliveryModal}>
                  <X size={24} color="#831843" />
                </TouchableOpacity>
              </View>

              {/* Delivery Options */}
              <View style={styles.deliveryOptions}>
                {deliveryOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.deliveryOption}
                    onPress={closeDeliveryModal}
                    activeOpacity={0.7}
                  >
                    <View style={styles.deliveryIconContainer}>
                      {option.icon}
                    </View>
                    <View style={styles.deliveryTextContainer}>
                      <Text style={styles.deliveryOptionText}>
                        {option.title}
                      </Text>
                      <Text style={styles.deliveryOptionSubtext}>
                        {option.subtitle}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F9A8D4',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#831843',
  },
  cartButton: {
    position: 'relative',
    padding: 4,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EC4899',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 10,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#831843',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  categorySidebar: {
    width: 90,
    backgroundColor: '#FFF',
    borderRightWidth: 1,
    borderRightColor: '#FCE7F3',
  },
  categoryList: {
    paddingVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  categoryItemActive: {
    backgroundColor: '#FDF2F8',
    borderRightWidth: 3,
    borderRightColor: '#EC4899',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 11,
    color: '#F9A8D4',
    textAlign: 'center',
    lineHeight: 14,
  },
  categoryTextActive: {
    color: '#EC4899',
    fontWeight: '600',
  },
  productsContainer: {
    flex: 1,
  },
  bannerContainer: {
    height: 200,
    margin: 12,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FCE7F3',
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
    backgroundColor: 'rgba(236, 72, 153, 0.35)',
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 4,
    opacity: 0.95,
  },
  bannerPriceTag: {
    backgroundColor: '#EC4899',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  bannerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bannerFooter: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerFooterText: {
    fontSize: 13,
    color: '#FFF',
    opacity: 0.95,
    fontWeight: '500',
  },
  bannerCartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  bannerCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: '#FDF2F8',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  categoryHeaderBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeaderIcon: {
    fontSize: 20,
  },
  categoryHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  productsList: {
    paddingHorizontal: 12,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  productImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#EC4899',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  newBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  promoBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FDF2F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  promoBadgeText: {
    fontSize: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#831843',
    marginBottom: 8,
    lineHeight: 20,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(131, 24, 67, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 32,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#831843',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#F9A8D4',
    fontStyle: 'italic',
  },
  deliveryOptions: {
    padding: 16,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FDF2F8',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  deliveryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliveryOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#831843',
    marginBottom: 4,
  },
  deliveryOptionSubtext: {
    fontSize: 13,
    color: '#F9A8D4',
  },
});