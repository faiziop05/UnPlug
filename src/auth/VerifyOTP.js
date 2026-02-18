import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VerifyOtpIllustration } from "../../assets/SVGS";
import CustomTextInput from "../../components/CustomTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomBtn from "../../components/CustomBtn";
import { SCREEN_WIDTH } from "../../utlils/Dimentions";
import { useTheme } from "../../utlils/theme";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../redux/slices/themeSlice";

const VerifyOTP = ({ navigation }) => {
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [expiryTime, setExpiryTime] = useState(Date.now() + 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.round((expiryTime - now) / 1000));
      setTimer(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const validateOTP = () => {
    if (!otp) return setError("Please enter OTP"), false;
    if (otp.length < 6) return setError("OTP must be 6 digits"), false;
    return true;
  };

  const onSubmit = () => {
    if (validateOTP()) console.log("OTP verified:", otp);
  };

  const resendOtp = () => {
    setExpiryTime(Date.now() + 60 * 1000);
    console.log("OTP resent");
  };
  const resetAndNavigate = (navigation, targetScreen) => {
    navigation.reset({
      index: 0,
      routes: [{ name: targetScreen }],
    });
  };
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: t.background.main }]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            {/* Illustration */}
            <VerifyOtpIllustration
              width={SCREEN_WIDTH * 0.65}
              height={SCREEN_WIDTH * 0.65}
            />

            {/* Heading */}
            <Text style={[styles.heading, { color: t.text.primary }]}>
              Verify OTP
            </Text>

            {/* Subheading */}
            <Text style={[styles.subHeading, { color: t.text.secondary }]}>
              A 6-digit code has been sent to your email.
            </Text>

            {/* OTP Input */}
            <CustomTextInput
              leftIcon={
                <Ionicons
                  name="key-outline"
                  size={22}
                  color={t.brand.primary}
                />
              }
              value={otp}
              onChange={setOtp}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              maxLength={6}
              errorMessage={error}
            />

            {/* Verify Button */}
            <View style={{ width: "100%", marginTop: 15 }}>
              <CustomBtn title="Verify" onPress={onSubmit} />
            </View>

            {/* Resend OTP */}
            <View style={styles.resendRow}>
              <Text style={{ color: t.text.secondary }}>
                Didn’t get the code?
              </Text>
              <TouchableOpacity disabled={timer > 0} onPress={resendOtp}>
                <Text
                  style={[
                    styles.resendText,
                    { color: timer === 0 ? t.brand.primary : "#8e9ba7" },
                  ]}
                >
                  {timer === 0 ? "Resend OTP" : `Resend in ${timer}s`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Back to login */}
            <TouchableOpacity
              onPress={() => resetAndNavigate(navigation, "AuthSelection")}
              style={{ marginTop: 26 }}
            >
              <Text
                style={{
                  color: t.brand.primary,
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  inner: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 34,
    fontWeight: "800",
    marginTop: 20,
    letterSpacing: 1,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 6,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
    width: SCREEN_WIDTH * 0.78,
  },
  resendRow: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
  },
  resendText: {
    marginLeft: 6,
    fontWeight: "600",
  },
});
