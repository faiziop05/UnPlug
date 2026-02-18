import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateAccountIllustration } from "../../assets/SVGS";
import CustomTextInput from "../../components/CustomTextInput";
import CustomAlert from "../../components/CustomAlert";
import { useTheme } from "../../utlils/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomBtn from "../../components/CustomBtn";
import { SCREEN_WIDTH } from "../../utlils/Dimentions";

// --- FIREBASE IMPORTS ---
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import { selectThemeMode } from "../redux/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/slices/authSlice";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const SignUp = ({ navigation }) => {
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // --- UI STATES ---
  const [isLoading, setIsLoading] = useState(false);

  // Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    buttons: [],
  });

  const showAlert = (title, message, buttons = []) => {
    setAlertConfig({ title, message, buttons });
    setAlertVisible(true);
  };

  const validateInputs = () => {
    let newErrors = {};
    if (!form.FullName) newErrors.FullName = "Please Enter Full Name";
    if (!form.Email) newErrors.Email = "Please Enter Email";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.Email))
      newErrors.Email = "Invalid Email Format";
    if (!form.Password) newErrors.Password = "Please Enter Password";
    else if (form.Password.length < 8)
      newErrors.Password = "Password must be at least 8 characters";
    if (form.Password !== form.ConfirmPassword)
      newErrors.ConfirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      setIsLoading(false);
      if (error.code === 'SIGN_IN_CANCELLED') {
        // user cancelled
      } else if (error.code === 'IN_PROGRESS') {
        // in progress
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        showAlert("Error", "Google Play Services not available", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
      } else {
        showAlert("Login Failed", error.message || "Google Sign-In failed", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
      }
    }
  };

  const onSubmit = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      // 1. Create User in Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.Email,
        form.Password
      );
      const user = userCredential.user;

      // 2. Create DB Profile (Save Name/Data immediately)
      // Using ISO string for date to prevent compatibility issues
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: form.FullName,
        email: form.Email,
        xp: 0,
        level: 1,
        createdAt: new Date().toISOString(),
        isPro: false,
        hasCompletedQuiz: false,
        preferences: { theme: "light" },
      });

      // 3. Send Verification Link (Wrapped to prevent blocking)
      try {
        await sendEmailVerification(user);
      } catch (emailErr) {
        console.log("Email verification trigger warning:", emailErr.message);
      }

      // 4. Success!
      setIsLoading(false);
      showAlert("Verification Sent!", `We sent a link to ${form.Email}. Please verify your email before logging in.`, [
        { text: "Go to Login", onPress: handleModalClose }
      ]);
    } catch (error) {
      setIsLoading(false);
      let msg = error.message;
      if (error.code === "auth/email-already-in-use")
        msg = "This email is already registered.";
      if (error.code === "auth/weak-password") msg = "Password is too weak.";
      if (error.code === "auth/network-request-failed")
        msg = "Network error. Check connection.";

      showAlert("Registration Failed", msg, [{ text: "OK", onPress: () => setAlertVisible(false) }]);
    }
  };

  const handleModalClose = () => {
    setAlertVisible(false);
    navigation.navigate("SignIn");
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
            <CreateAccountIllustration
              width={SCREEN_WIDTH * 0.6}
              height={SCREEN_WIDTH * 0.6}
            />

            <Text style={{ ...styles.LoginHeading, color: t.brand.primary }}>
              Register
            </Text>
            <Text style={{ ...styles.LoginDesc, color: t.text.primary }}>
              Welcome! Please create an account
            </Text>

            <CustomTextInput
              leftIcon={
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={t.brand.primary}
                />
              }
              value={form.FullName}
              onChange={(value) => setForm({ ...form, FullName: value })}
              placeholder="Enter Full Name"
              errorMessage={errors?.FullName}
            />
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
            <CustomTextInput
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={t.brand.primary}
                />
              }
              value={form.ConfirmPassword}
              onChange={(value) => setForm({ ...form, ConfirmPassword: value })}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                <Ionicons
                  name={
                    !showConfirmPassword ? "eye-off-outline" : "eye-outline"
                  }
                  size={24}
                  color={t.text.primary}
                />
              }
              onRightIconPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              errorMessage={errors?.ConfirmPassword}
            />

            <View style={{ marginTop: 10, width: "100%", gap: 15 }}>
              {isLoading ? (
                <ActivityIndicator size="large" color={t.brand.primary} />
              ) : (
                <>
                  <CustomBtn title="Create Account" onPress={onSubmit} />

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
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={{ color: t.brand.primary, fontWeight: "700" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* --- SUCCESS MODAL --- */}
        {/* --- CUSTOM ALERT --- */}
        <CustomAlert
          visible={alertVisible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          onClose={() => setAlertVisible(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(15, 118, 110, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
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
