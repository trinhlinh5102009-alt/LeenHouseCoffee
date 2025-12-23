import {
  Award,
  Bell,
  BookOpen,
  ChevronRight,
  CreditCard,
  FileText,
  Gift,
  Heart,
  Info,
  LogOut,
  MapPin,
  MessageCircle,
  Settings,
  Shield,
  ShoppingCart,
  Star,
  User,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 68;

// Quick action cards data
const quickActions = [
  {
    id: '1',
    title: 'Lịch sử đơn hàng',
    icon: <FileText size={28} color="#EC4899" />,
    route: '/order-history',
    gradient: ['#FDF2F8', '#FCE7F3'],
  },
  {
    id: '2',
    title: 'Điều Khoản',
    icon: <Shield size={28} color="#EC4899" />,
    route: '/terms',
    gradient: ['#FDF2F8', '#FCE7F3'],
  },
  {
    id: '3',
    title: 'Tìm kiếm đơn hàng',
    icon: <ShoppingCart size={28} color="#EC4899" />,
    route: '/search-order',
    gradient: ['#FDF2F8', '#FCE7F3'],
  },
  {
    id: '4',
    title: 'Ưu đãi riêng bạn',
    icon: <Gift size={28} color="#EC4899" />,
    route: '/personal-offers',
    gradient: ['#FDF2F8', '#FCE7F3'],
  },
];

// Support section items
const supportItems = [
  {
    id: '1',
    title: 'Đánh giá đơn hàng',
    icon: <Star size={24} color="#EC4899" />,
    route: '/rate-order',
    locked: true,
  },
  {
    id: '2',
    title: 'Điều khoản VNPAY',
    icon: <CreditCard size={24} color="#EC4899" />,
    route: '/vnpay-terms',
  },
  {
    id: '3',
    title: 'Liên hệ và góp ý',
    icon: <MessageCircle size={24} color="#EC4899" />,
    route: '/contact',
  },
  {
    id: '4',
    title: 'Hướng dẫn xuất hoá đơn GTGT',
    icon: <BookOpen size={24} color="#EC4899" />,
    route: '/invoice-guide',
  },
];

// Account section items
const accountItems = [
  {
    id: '1',
    title: 'Thông tin cá nhân',
    icon: <User size={24} color="#EC4899" />,
    route: '/personal-info',
    locked: true,
  },
  {
    id: '2',
    title: 'Địa chỉ đã lưu',
    icon: <MapPin size={24} color="#EC4899" />,
    route: '/saved-addresses',
    locked: true,
  },
  {
    id: '3',
    title: 'Cài đặt',
    icon: <Settings size={24} color="#EC4899" />,
    route: '/settings',
  },
  {
    id: '4',
    title: 'Về chúng tôi',
    icon: <Info size={24} color="#EC4899" />,
    route: '/about',
  },
  {
    id: '5',
    title: 'Đăng xuất',
    icon: <LogOut size={24} color="#DB2777" />,
    route: '/logout',
    isLogout: true,
  },
];

export default function ProfileScreen() {
  const [userPoints, setUserPoints] = useState(120);
  const [userName] = useState('Khách hàng');

  const handleQuickAction = (item: any) => {
    Alert.alert('Thông báo', `Đang mở: ${item.title}`);
  };

  const handleSupportItem = (item: any) => {
    if (item.locked) {
      Alert.alert('Thông báo', 'Tính năng này yêu cầu đăng nhập');
      return;
    }
    Alert.alert('Thông báo', `Đang mở: ${item.title}`);
  };

  const handleAccountItem = (item: any) => {
    if (item.isLogout) {
      Alert.alert(
        'Đăng xuất',
        'Bạn có chắc chắn muốn đăng xuất?',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Đăng xuất',
            style: 'destructive',
            onPress: () => {
              Alert.alert('Thành công', 'Đã đăng xuất');
            },
          },
        ]
      );
      return;
    }

    if (item.locked) {
      Alert.alert('Thông báo', 'Tính năng này yêu cầu đăng nhập');
      return;
    }

    Alert.alert('Thông báo', `Đang mở: ${item.title}`);
  };

  const QuickActionCard = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.quickActionCard, { backgroundColor: item.gradient[0] }]}
      onPress={() => handleQuickAction(item)}
      activeOpacity={0.7}
    >
      <View style={styles.quickActionIconContainer}>
        {item.icon}
      </View>
      <Text style={styles.quickActionTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const ListItem = ({ item, onPress }: any) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.listItemLeft}>
        <View style={styles.listItemIconContainer}>
          {item.icon}
        </View>
        <Text style={[
          styles.listItemTitle,
          item.isLogout && styles.listItemTitleLogout,
        ]}>
          {item.title}
        </Text>
      </View>
      <View style={styles.listItemRight}>
        {item.locked ? (
          <Shield size={20} color="#F9A8D4" />
        ) : (
          <ChevronRight size={20} color="#F9A8D4" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <User size={28} color="#FFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.headerTitle}>Xin chào,</Text>
            <Text style={styles.userName}>{userName} 💖</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.pointsButton} activeOpacity={0.7}>
            <Award size={18} color="#EC4899" />
            <Text style={styles.pointsText}>{userPoints}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
            <Bell size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: TAB_BAR_HEIGHT + 20,
        }}
      >
        {/* Quick Actions Grid */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((item) => (
              <QuickActionCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Heart size={18} color="#EC4899" fill="#EC4899" /> Hỗ trợ
          </Text>
          <View style={styles.listContainer}>
            {supportItems.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onPress={handleSupportItem}
              />
            ))}
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <User size={18} color="#EC4899" /> Tài khoản
          </Text>
          <View style={styles.listContainer}>
            {accountItems.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onPress={handleAccountItem}
              />
            ))}
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>☕ LeenHouse Coffee v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with 💖 in Vietnam</Text>
          <View style={styles.versionDivider} />
          <Text style={styles.versionFooter}>
            🌸 Mỗi tách cà phê là một câu chuyện 🌸
          </Text>
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
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  userInfo: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F9A8D4',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EC4899',
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC4899',
  },
  scrollView: {
    flex: 1,
  },
  quickActionsContainer: {
    padding: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#FDF2F8',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  quickActionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#831843',
    textAlign: 'center',
    lineHeight: 18,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#831843',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  listItemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FDF2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#831843',
    flex: 1,
  },
  listItemTitleLogout: {
    color: '#DB2777',
    fontWeight: '600',
  },
  listItemRight: {
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  versionText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '600',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 11,
    color: '#F9A8D4',
    marginBottom: 12,
  },
  versionDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#FCE7F3',
    borderRadius: 1,
    marginVertical: 8,
  },
  versionFooter: {
    fontSize: 10,
    color: '#F472B6',
    fontStyle: 'italic',
  },
});