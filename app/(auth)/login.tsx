import { useAuth } from '@/src/contexts/AuthContext';
import { router } from 'expo-router';
import { Coffee, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface LoginProps {
  onSwitchToRegister?: () => void;
}

export default function Login({ onSwitchToRegister }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

// app/(auth)/login.tsx - CHỈ THAY ĐỔI PHẦN handleSubmit
// ... (giữ nguyên các import và state)

const handleSubmit = async () => {
  // Validation
  if (!email || !password) {
    Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Alert.alert('Lỗi', 'Email không hợp lệ');
    return;
  }

  setLoading(true);
  try {
    // Gọi API login từ AuthContext
    await login(email, password);
    
    // Thành công → Navigate to home
    Alert.alert('Thành công', 'Đăng nhập thành công! 🎉', [
      {
        text: 'OK',
        onPress: () => router.replace('/(tabs)')
      }
    ]);
  } catch (error: any) {
    // Show error từ backend
    Alert.alert(
      'Đăng nhập thất bại', 
      error.message || 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'
    );
  } finally {
    setLoading(false);
  }
};

// ... (giữ nguyên phần UI)
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        {/* Header Image */}
        <View style={styles.headerImageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80",
            }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Coffee size={42} color="#be185d" />
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Your favorite treats await 🌸</Text>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconLeft}>
                <Mail size={20} color="#be185d" />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="your@email.com"
                placeholderTextColor="#9ca3af"
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconLeft}>
                <Lock size={20} color="#be185d" />
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                style={[styles.input, styles.inputWithRightIcon]}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconRight}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#be185d" />
                ) : (
                  <Eye size={20} color="#be185d" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember + Forgot */}
          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Text style={styles.dividerText}>🌸 Or continue with 🌸</Text>
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Sign up */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>New to our café? </Text>
            <TouchableOpacity 
              onPress={() => onSwitchToRegister ? onSwitchToRegister() : router.push('/(auth)/register')} 
              activeOpacity={0.7}
            >
              <Text style={styles.signupLink}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer Emoji */}
      <View style={styles.footer}>
        <Text style={styles.footerEmoji}>🧁 🌸 🍰</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef5fa",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  headerImageContainer: {
    height: 192,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(190, 24, 93, 0.3)",
  },
  logoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ translateY: 40 }],
  },
  formContainer: {
    padding: 32,
    paddingTop: 64,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#831843",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#be185d",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9f1239",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  iconLeft: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  iconRight: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: "#fdf2f8",
    borderWidth: 2,
    borderColor: "#fbcfe8",
    borderRadius: 16,
    paddingVertical: 14,
    paddingLeft: 44,
    paddingRight: 16,
    fontSize: 16,
    color: "#831843",
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#f9a8d4",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  checkboxChecked: {
    backgroundColor: "#db2777",
    borderColor: "#db2777",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
  rememberMeText: {
    fontSize: 14,
    color: "#9f1239",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#be185d",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#db2777",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#db2777",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  dividerContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  dividerText: {
    fontSize: 14,
    color: "#be185d",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#fbcfe8",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  socialButtonText: {
    fontSize: 16,
    color: "#9f1239",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  signupLink: {
    fontSize: 14,
    color: "#db2777",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  footerEmoji: {
    fontSize: 20,
    color: "#ec4899",
    opacity: 0.6,
  },
});