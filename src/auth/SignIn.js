import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginIllustration } from "../../assets/SVGS";
import CustomTextInput from "../../components/CustomTextInput";
import { useTheme } from "../../utlils/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomBtn from "../../components/CustomBtn";
import { SCREEN_WIDTH } from "../../utlils/Dimentions";

// --- FIREBASE ---
import {
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from "../../configs/FirebaseConfig";

import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/slices/authSlice";
import { selectThemeMode } from "../redux/slices/themeSlice";

const SignIn = ({ navigation }) => {
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // --- UI STATES ---
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Modal Content State
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
    status: "error", // 'error', 'success', 'verification'
  });

  const validateInputs = () => {
    let newErrors = {};
    if (!form.Email) newErrors.Email = "Please Enter Email";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.Email))
      newErrors.Email = "Invalid Email Format";
    if (!form.Password) newErrors.Password = "Please Enter Password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- MODAL HELPER ---
  const showModal = (title, body, status = "error") => {
    setModalContent({ title, body, status });
    setModalVisible(true);
  };

  // --- GOOGLE SIGN IN ---
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '487352363512-9je2ggba411clbmm4hcqvgtede264mr8.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      console.log("Google Sign-In Response:", JSON.stringify(response, null, 2));

      // Handle structure difference in recent versions
      const idToken = response.data?.idToken || response.idToken;
      console.log("Extracted ID Token:", idToken ? "Present" : "MISSING");

      if (!idToken) {
        throw new Error("No ID token found in Google Sign-In response");
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);

      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;
      const token = await user.getIdToken();
      dispatch(signInUser(token));
    } catch (error) {
      console.log(error);
      if (error.code === 'SIGN_IN_CANCELLED') {
        // user cancelled the login flow
        setIsLoading(false);
      } else if (error.code === 'IN_PROGRESS') {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        showModal("Error", "Google Play Services not available", "error");
        setIsLoading(false);
      } else {
        showModal("Login Failed", error.message || "Google Sign-In failed", "error");
        setIsLoading(false);
      }
    }
  };

  // --- 1. LOGIN LOGIC ---
  const onSubmit = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.Email,
        form.Password
      );
      const user = userCredential.user;

      // Check Verification
      if (!user.emailVerified) {
        showModal(
          "Email Not Verified",
          "You haven't verified your email yet. Please check your inbox.",
          "verification"
        );
        setIsLoading(false);
        return;
      }

      // Success -> Dispatch Action
      // We can pass the token or the whole user object. For now, let's pass the UID or a token.
      // Ideally get the token: await user.getIdToken()
      const token = await user.getIdToken();
      dispatch(signInUser(token));

      // Navigation will be handled by MainStack automatically
    } catch (error) {
      let msg = "Something went wrong. Please try again.";
      let title = "Login Failed";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {
        msg = "Incorrect email or password.";
      } else if (error.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        title = "Connection Error";
        msg = "Please check your internet connection.";
      }

      showModal(title, msg, "error");
      setIsLoading(false);
    }
  };

  // --- 2. FORGOT PASSWORD LOGIC ---
  const handleForgotPassword = async () => {
    // User must type email first
    if (!form.Email) {
      setErrors({ Email: "Please enter email to reset password" });
      return showModal(
        "Email Required",
        "Please enter your email address in the field above so we can send you a reset link.",
        "error"
      );
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, form.Email);
      showModal(
        "Reset Link Sent 📧",
        `We sent a password reset link to ${form.Email}. Please check your inbox (and spam).`,
        "success"
      );
    } catch (error) {
      let msg = error.message;
      if (error.code === "auth/user-not-found")
        msg = "No account found with this email.";
      if (error.code === "auth/invalid-email")
        msg = "That doesn't look like a valid email.";

      showModal("Error", msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. RESEND VERIFICATION LOGIC ---
  const handleResendEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        showModal(
          "Link Sent!",
          `A new verification link has been sent to ${form.Email}.`,
          "success"
        );
      } catch (e) {
        showModal("Error", "Too many requests. Please wait a moment.", "error");
      }
    }
  };

  const handleModalClose = async () => {
    // If verification flow was active, sign out user when closing modal
    if (
      modalContent.status === "verification" ||
      modalContent.status === "success"
    ) {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        await signOut(auth);
      }
    }
    setModalVisible(false);
  };

  // --- DYNAMIC STYLES ---
  const getModalIcon = () => {
    switch (modalContent.status) {
      case "success":
        return {
          name: "checkmark-circle-outline",
          color: t.status.success,
          bg: "rgba(16, 185, 129, 0.1)",
        };
      case "verification":
        return {
          name: "mail-unread-outline",
          color: t.brand.primary,
          bg: "rgba(15, 118, 110, 0.1)",
        };
      default:
        return {
          name: "alert-circle-outline",
          color: t.status.error,
          bg: "rgba(239, 68, 68, 0.1)",
        };
    }
  };

  const iconProps = getModalIcon();

  const smartNavigate = (nav, targetScreen) => {
    const state = nav.getState();
    if (state.routes.length > 1) {
      const prevRoute = state.routes[state.routes.length - 2];
      if (prevRoute.name === targetScreen) {
        nav.goBack();
        return;
      }
    }
    nav.navigate(targetScreen);
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.safeArea, { backgroundColor: t.background.main }]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, width: SCREEN_WIDTH }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            <LoginIllustration
              width={SCREEN_WIDTH * 0.6}
              height={SCREEN_WIDTH * 0.6}
            />

            <Text style={{ ...styles.LoginHeading, color: t.brand.primary }}>
              Login
            </Text>
            <Text style={{ ...styles.LoginDesc, color: t.text.primary }}>
              Welcome! Please Sign in to continue
            </Text>

            <CustomTextInput
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color={t.brand.primary}
                />
              }
              value={form.Email}
              onChange={(value) => setForm({ ...form, Email: value })}
              placeholder="Enter Email"
              errorMessage={errors?.Email}
              autoCapitalize="none"
            />

            <CustomTextInput
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={t.brand.primary}
                />
              }
              value={form.Password}
              onChange={(value) => setForm({ ...form, Password: value })}
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              rightIcon={
                <Ionicons
                  name={!showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={t.text.primary}
                />
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
              errorMessage={errors?.Password}
            />

            <View style={{ alignItems: 'flex-end', width: '90%', marginBottom: 20 }}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={{ color: t.brand.primary, fontWeight: "600", fontSize: 14 }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "100%", gap: 15 }}>
              {isLoading ? (
                <ActivityIndicator size="large" color={t.brand.primary} />
              ) : (
                <>
                  <CustomBtn title="Sign In" onPress={onSubmit} />

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: t.border.subtle }} />
                    <Text style={{ marginHorizontal: 10, color: t.text.secondary }}>OR</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: t.border.subtle }} />
                  </View>

                  <TouchableOpacity
                    onPress={onGoogleButtonPress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: t.background.surface,
                      paddingVertical: 14,
                      borderRadius: 50,
                      borderWidth: 1,
                      width: '90%',
                      borderColor: t.border.subtle,
                      alignSelf: 'center'
                    }}
                  >
                    <Ionicons name="logo-google" size={20} color={t.text.primary} style={{ marginRight: 10 }} />
                    <Text style={{ color: t.text.primary, fontWeight: "600", fontSize: 16 }}>
                      Sign in with Google
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.footerRow}>
              <Text style={{ color: t.text.primary }}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => smartNavigate(navigation, "SignUp")}
              >
                <Text style={{ color: t.brand.primary, fontWeight: "700" }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* --- UNIFIED MODAL --- */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle },
              ]}
            >
              <View
                style={[styles.iconCircle, { backgroundColor: iconProps.bg }]}
              >
                <Ionicons
                  name={iconProps.name}
                  size={40}
                  color={iconProps.color}
                />
              </View>

              <Text style={[styles.modalTitle, { color: t.text.primary }]}>
                {modalContent.title}
              </Text>

              <Text style={[styles.modalText, { color: t.text.secondary }]}>
                {modalContent.body}
              </Text>

              {/* RESEND BUTTON (Only for verification status) */}
              {modalContent.status === "verification" && (
                <TouchableOpacity
                  style={[
                    styles.modalBtn,
                    { backgroundColor: t.brand.primary, marginBottom: 10 },
                  ]}
                  onPress={handleResendEmail}
                >
                  <Text
                    style={{
                      color: t.text.inverted,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Resend Verification Link
                  </Text>
                </TouchableOpacity>
              )}

              {/* CLOSE BUTTON */}
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  {
                    backgroundColor:
                      modalContent.status === "verification"
                        ? "transparent"
                        : t.brand.primary,
                    borderWidth: modalContent.status === "verification" ? 1 : 0,
                    borderColor: t.border.subtle,
                  },
                ]}
                onPress={handleModalClose}
              >
                <Text
                  style={{
                    color:
                      modalContent.status === "verification"
                        ? t.text.primary
                        : t.text.inverted,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {modalContent.status === "verification" ? "Cancel" : "OK"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  LoginHeading: {
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: 2,
    alignSelf: "flex-start",
    marginLeft: SCREEN_WIDTH * 0.05,
  },
  LoginDesc: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
    alignSelf: "flex-start",
    marginLeft: SCREEN_WIDTH * 0.05,
    marginTop: 10,
    marginBottom: 20,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  // --- MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    padding: 25,
    borderRadius: 24,
    alignItems: "center",


  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25,
  },
  modalBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
});
