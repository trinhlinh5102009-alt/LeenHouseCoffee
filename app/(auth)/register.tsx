import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,Image,ScrollView,Alert,StyleSheet,} from "react-native";
import {Eye,EyeOff,Mail,Lock,User,Phone,Check,Coffee,} from "lucide-react-native";
import { router } from 'expo-router';

interface RegistrationProps {
  onSwitchToLogin?: () => void;
}

export default function RegistrationScreen({ onSwitchToLogin }: RegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (!acceptTerms) {
      Alert.alert("Error", "You must accept the terms");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));

    console.log("Registration:", formData);
    Alert.alert("Success", "Account created successfully!");
    setLoading(false);
  };

  const passwordStrength = () => {
    const p = formData.password;

    if (!p) return null;
    if (p.length < 6) return { label: "Weak", color: "#dc2626", width: 0.33 };
    if (p.length < 10) return { label: "Medium", color: "#f59e0b", width: 0.66 };
    return { label: "Strong", color: "#059669", width: 1 };
  };

  const strength = passwordStrength();

  const passwordsMatch =
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const passwordsDontMatch =
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword;

  return (
    <ScrollView style={styles.container}>
      {/* TOP IMAGE */}
      <View style={styles.headerImageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80",
          }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Coffee size={40} color="#be185d" />
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Join Our Café!</Text>
        <Text style={styles.subtitle}>Start your sweet journey today 🌸</Text>

        {/* FULL NAME */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconLeft}>
              <User size={20} color="#be185d" />
            </View>
            <TextInput
              value={formData.fullName}
              onChangeText={(v) => handleChange("fullName", v)}
              placeholder="Your full name"
              placeholderTextColor="#9ca3af"
              style={styles.input}
            />
          </View>
        </View>

        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconLeft}>
              <Mail size={20} color="#be185d" />
            </View>
            <TextInput
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              placeholder="email@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>
        </View>

        {/* PHONE */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconLeft}>
              <Phone size={20} color="#be185d" />
            </View>
            <TextInput
              value={formData.phone}
              onChangeText={(v) => handleChange("phone", v)}
              placeholder="+84 000 000 000"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
        </View>

        {/* PASSWORD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconLeft}>
              <Lock size={20} color="#be185d" />
            </View>
            <TextInput
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(v) => handleChange("password", v)}
              placeholder="Create password"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              style={[styles.input, styles.inputWithRightIcon]}
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

          {/* Password Strength Indicator */}
          {strength && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBar}>
                <View
                  style={[
                    styles.strengthFill,
                    { backgroundColor: strength.color, width: `${strength.width * 100}%` },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.strengthText,
                  { color: strength.color },
                ]}
              >
                {strength.label} password
              </Text>
            </View>
          )}
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconLeft}>
              <Lock size={20} color="#be185d" />
            </View>
            <TextInput
              secureTextEntry={!showConfirmPassword}
              value={formData.confirmPassword}
              onChangeText={(v) => handleChange("confirmPassword", v)}
              placeholder="Confirm password"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              style={[styles.input, styles.inputWithRightIcon]}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.iconRight}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color="#be185d" />
              ) : (
                <Eye size={20} color="#be185d" />
              )}
            </TouchableOpacity>
          </View>

          {/* Password Match Indicators */}
          {passwordsDontMatch && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}

          {passwordsMatch && (
            <View style={styles.matchContainer}>
              <Check size={16} color="#059669" />
              <Text style={styles.successText}>Passwords match</Text>
            </View>
          )}
        </View>

        {/* TERMS */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAcceptTerms(!acceptTerms)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              acceptTerms && styles.checkboxChecked,
            ]}
          >
            {acceptTerms && <Check size={16} color="#ffffff" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the Terms & Conditions
          </Text>
        </TouchableOpacity>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Creating Account..." : "Create My Account"}
          </Text>
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

        {/* SWITCH TO LOGIN */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity 
            onPress={() => onSwitchToLogin ? onSwitchToLogin() : router.push('/(auth)/login')} 
            activeOpacity={0.7}
          >
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef5fa",
  },
  headerImageContainer: {
    height: 176,
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
    bottom: -40,
    left: 0,
    right: 0,
    alignItems: "center",
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
  },
  content: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#831843",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#be185d",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
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
    right: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: "#fdf2f8",
    borderWidth: 2,
    borderColor: "#fbcfe8",
    borderRadius: 16,
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 16,
    color: "#831843",
  },
  inputWithRightIcon: {
    paddingRight: 44,
  },
  strengthContainer: {
    marginTop: 8,
  },
  strengthBar: {
    height: 8,
    backgroundColor: "#f3e8ff",
    borderRadius: 4,
    overflow: "hidden",
  },
  strengthFill: {
    height: "100%",
  },
  strengthText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 4,
  },
  matchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  successText: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "600",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#f9a8d4",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  checkboxChecked: {
    backgroundColor: "#db2777",
    borderColor: "#db2777",
  },
  termsText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  submitButton: {
    backgroundColor: "#db2777",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#db2777",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    alignItems: "center",
    paddingVertical: 20,
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
  loginLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    paddingBottom: 24,
  },
  loginText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  loginLink: {
    fontSize: 14,
    color: "#db2777",
    fontWeight: "600",
  },
});