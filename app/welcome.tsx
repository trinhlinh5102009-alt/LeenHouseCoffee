import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');
const scale = (size: number) => (height / 812) * size;

export default function WelcomeScreen() {
  const router = useRouter();

  // 🎬 Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#0f172a', '#1e3a8a', '#3b82f6']}
      style={styles.container}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Logo/Header */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🧁</Text>
            </View>
            <Text style={styles.brandName}>Leen House</Text>
            <Text style={styles.tagline}>Không gian thư giãn - Đồ uống tuyệt vời</Text>
          </View>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionEmoji}>☕</Text>
              <Text style={styles.sectionTitle}>Về Leen House</Text>
              <Text style={styles.sectionDescription}>
                Một góc nhỏ ấm áp giữa lòng thành phố, nơi bạn có thể 
                thư giãn, làm việc hoặc gặp gỡ bạn bè trong không gian 
                sang trọng, hiện đại với đầy đủ tiện nghi.
              </Text>
            </View>

            {/* Space Features */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureCard}>
                <Text style={styles.featureEmoji}>🪴</Text>
                <Text style={styles.featureTitle}>Không gian xanh</Text>
                <Text style={styles.featureDesc}>Thiết kế tối giản, nhiều cây xanh</Text>
              </View>
              
              <View style={styles.featureCard}>
                <Text style={styles.featureEmoji}>📶</Text>
                <Text style={styles.featureTitle}>WiFi miễn phí</Text>
                <Text style={styles.featureDesc}>Tốc độ cao, không giới hạn</Text>
              </View>
            </View>

            {/* Menu Highlights */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>🌟 Menu đặc sắc</Text>
              
              <View style={styles.menuGrid}>
                {/* Drinks */}
                <View style={styles.menuCard}>
                  <View style={styles.menuIconContainer}>
                    <Text style={styles.menuIcon}>☕</Text>
                  </View>
                  <Text style={styles.menuItemTitle}>Đồ uống</Text>
                  <Text style={styles.menuItemList}>
                    • Cà phê đặc biệt{'\n'}
                    • Trà sữa thơm ngon{'\n'}
                    • Sinh tố tươi mát{'\n'}
                    • Soda trái cây
                  </Text>
                </View>

                {/* Cakes */}
                <View style={styles.menuCard}>
                  <View style={styles.menuIconContainer}>
                    <Text style={styles.menuIcon}>🍰</Text>
                  </View>
                  <Text style={styles.menuItemTitle}>Bánh ngọt</Text>
                  <Text style={styles.menuItemList}>
                    • Bánh kem tươi{'\n'}
                    • Tiramisu Ý{'\n'}
                    • Croissant bơ{'\n'}
                    • Macaron Pháp
                  </Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>100+</Text>
                  <Text style={styles.statLabel}>Món đồ uống</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>50+</Text>
                  <Text style={styles.statLabel}>Loại bánh ngọt</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>⭐ 4.8</Text>
                  <Text style={styles.statLabel}>Đánh giá</Text>
                </View>
              </View>
            </View>
          </View>

          {/* CTA Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/(auth)/login')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/(auth)/register')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Tạo tài khoản mới</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)')}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>Khám phá menu ngay </Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Decorative Elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
          <View style={styles.decorativeCircle3} />
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(24),
    paddingTop: scale(60),
    paddingBottom: scale(40),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: scale(32),
  },
  logoCircle: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: scale(60),
  },
  brandName: {
    fontSize: scale(42),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(8),
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: scale(16),
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    fontWeight: '600',
  },
  aboutSection: {
    marginBottom: scale(32),
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: scale(24),
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionEmoji: {
    fontSize: scale(40),
    textAlign: 'center',
    marginBottom: scale(12),
  },
  sectionTitle: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: scale(12),
  },
  sectionDescription: {
    fontSize: scale(15),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: scale(22),
  },
  featuresContainer: {
    flexDirection: 'row',
    gap: scale(12),
    marginBottom: scale(20),
  },
  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: scale(16),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  featureEmoji: {
    fontSize: scale(32),
    marginBottom: scale(8),
  },
  featureTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(4),
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: scale(11),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuTitle: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: scale(20),
  },
  menuGrid: {
    flexDirection: 'row',
    gap: scale(12),
    marginBottom: scale(20),
  },
  menuCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  menuIconContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(12),
    alignSelf: 'center',
  },
  menuIcon: {
    fontSize: scale(28),
  },
  menuItemTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(8),
    textAlign: 'center',
  },
  menuItemList: {
    fontSize: scale(12),
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: scale(18),
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: scale(16),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(4),
  },
  statLabel: {
    fontSize: scale(11),
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: scale(40),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonContainer: {
    gap: scale(14),
    marginTop: scale(8),
  },
  primaryButton: {
    backgroundColor: 'white',
    borderRadius: scale(16),
    padding: scale(18),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#0f172a',
    fontSize: scale(18),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: scale(16),
    padding: scale(18),
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: scale(18),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  skipButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(12),
  },
  skipText: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: '600',
  },
  arrow: {
    color: 'white',
    fontSize: scale(18),
    fontWeight: '700',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: '40%',
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});