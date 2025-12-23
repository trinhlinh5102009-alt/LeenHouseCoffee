import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { Coffee, Gift, Home, User } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Ẩn Android Navigation Bar
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('inset-swipe');
    }
  }, []);
  
  // Màu sắc ngọt ngào hơn
  const tintColor = '#EC4899'; // Pink
  const activeBackground = '#FDF2F8'; // Light pink
  const inactiveColor = '#D1D5DB';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
          shadowColor: '#EC4899',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 6,
          letterSpacing: 0.3,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[
                styles.iconContainer, 
                focused && styles.iconContainerActive,
                focused && { backgroundColor: activeBackground }
              ]}>
                <Home 
                  size={focused ? 26 : 23} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2}
                  fill={focused ? color : 'transparent'}
                />
              </View>
              {focused && (
                <View style={styles.activeIndicator}>
                  <View style={styles.activeIndicatorDot} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[
                styles.iconContainer, 
                focused && styles.iconContainerActive,
                focused && { backgroundColor: activeBackground }
              ]}>
                <Coffee 
                  size={focused ? 26 : 23} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2}
                  fill={focused ? color : 'transparent'}
                />
              </View>
              {focused && (
                <View style={styles.activeIndicator}>
                  <View style={styles.activeIndicatorDot} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Ưu đãi',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[
                styles.iconContainer, 
                focused && styles.iconContainerActive,
                focused && { backgroundColor: activeBackground }
              ]}>
                <Gift 
                  size={focused ? 26 : 23} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2}
                  fill={focused ? color : 'transparent'}
                />
              </View>
              {focused && (
                <View style={styles.activeIndicator}>
                  <View style={styles.activeIndicatorDot} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[
                styles.iconContainer, 
                focused && styles.iconContainerActive,
                focused && { backgroundColor: activeBackground }
              ]}>
                <User 
                  size={focused ? 26 : 23} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2}
                  fill={focused ? color : 'transparent'}
                />
              </View>
              {focused && (
                <View style={styles.activeIndicator}>
                  <View style={styles.activeIndicatorDot} />
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 55,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.05 }],
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EC4899',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});