import React, { useState } from "react";
import {View,Text,TextInput,Image,TouchableOpacity,ActivityIndicator,ScrollView,StyleSheet,Alert,} from "react-native";
import { Mail, ArrowLeft, Coffee, Send } from "lucide-react-native";
import { router } from 'expo-router';

interface ForgotPasswordProps {
  onBackToLogin?: () => void;
}

export default function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    
    console.log("Password reset email sent to:", email);
    setEmailSent(true);
    setLoading(false);
  };

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleBackToLogin}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color="#be185d" />
      </TouchableOpacity>

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
          {!emailSent ? (
            <>
              {/* Title */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                  No worries! Enter your email and we will send you reset instructions 💌
                </Text>
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
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

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                activeOpacity={0.8}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#fff" />
                    <Text style={styles.submitButtonText}>Sending...</Text>
                  </View>
                ) : (
                  <View style={styles.buttonContent}>
                    <Send size={20} color="#ffffff" />
                    <Text style={styles.submitButtonText}>Send Reset Link</Text>
                  </View>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Success Message */}
              <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                  <Send size={48} color="#db2777" />
                </View>
                <Text style={styles.successTitle}>Check Your Email!</Text>
                <Text style={styles.successMessage}>
                  We have sent password reset instructions to{"\n"}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>
                <Text style={styles.successNote}>
                  Please check your inbox and spam folder 📬
                </Text>

                {/* Resend Button */}
                <TouchableOpacity
                  onPress={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  style={styles.resendButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.resendButtonText}>Send Again</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Back to Login */}
          <View style={styles.backToLoginContainer}>
            <Text style={styles.backToLoginText}>Remember your password? </Text>
            <TouchableOpacity onPress={handleBackToLogin} activeOpacity={0.7}>
              <Text style={styles.backToLoginLink}>Back to Sign In</Text>
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
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#831843",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  inputGroup: {
    marginBottom: 24,
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
  submitButton: {
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  successContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  successIcon: {
    width: 96,
    height: 96,
    backgroundColor: "#fdf2f8",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#831843",
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 15,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
  },
  emailText: {
    color: "#be185d",
    fontWeight: "600",
  },
  successNote: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 32,
  },
  resendButton: {
    borderWidth: 2,
    borderColor: "#fbcfe8",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#ffffff",
  },
  resendButtonText: {
    fontSize: 16,
    color: "#db2777",
    fontWeight: "600",
  },
  backToLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  backToLoginText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  backToLoginLink: {
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