import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../utlils/theme";

import { WelcomeIllustration } from "../../assets/SVGS";
import CustomBtn from "../../components/CustomBtn";
import { selectThemeMode } from "../redux/slices/themeSlice";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

export const AuthSelection = ({ navigation }) => {
  const themeMode = useSelector(selectThemeMode);
  const themeColors = useTheme(themeMode);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background.main },
      ]}
    >
      <View style={styles.topSection}>
        <View
          style={[
            styles.blob,
            {
              backgroundColor: themeColors.brand.primary,
              opacity: 0.1,
            },
          ]}
        />

        {/* Main Illustration */}
        <View style={styles.imageContainer}>
          {/* You should import a specific SVG for this screen */}
          <WelcomeIllustration width={width * 0.8} height={width * 0.8} />
        </View>
      </View>

      {/* --- Bottom Section: Actions --- */}
      <View
        style={[
          styles.bottomSheet,
          {
            backgroundColor: themeColors.background.main,
            paddingBottom: 40 + insets.bottom,
            borderWidth: 0.5,
            borderColor: themeColors.border.subtle
          },
        ]}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: themeColors.text.primary }]}>
            Ready to start{"\n"}your journey?
          </Text>
          <Text
            style={[styles.subtitle, { color: themeColors.text.secondary }]}
          >
            Join our community today. Create an account to get started or log in
            to continue.
          </Text>
          <CustomBtn
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
          <CustomBtn
            title="Create Account"
            onPress={() => navigation.navigate("SignUp")}
            textStyle={{ color: themeColors.text.primary }}
            style={{ marginTop: 10, borderColor: themeColors.border.subtle }}
            variant="outline"
          />
        </View>
      </View>
    </View>
  );
};

// Helper Component for Social Buttons
const SocialButton = ({ icon, color, themeColors }) => (
  <TouchableOpacity
    style={[
      styles.socialBtn,
      {
        backgroundColor: themeColors.background.surface,
        borderColor: themeColors.border.subtle,
        borderWidth: 0.5,
      },
    ]}
  >
    <Ionicons name={icon} size={24} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // TOP SECTION
  topSection: {
    flex: 1, // Takes up remaining space above the sheet
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  blob: {
    position: "absolute",
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    top: -width * 0.4,
    right: -width * 0.3,
  },
  imageContainer: {
    marginBottom: 40, // Push image up a bit so it's not hidden by sheet
  },

  // BOTTOM SHEET
  bottomSheet: {
    width: width,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40, // Add safe area padding for bottom
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    // Shadow

  },
  contentContainer: {
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 10,
  },

  // BUTTONS
  btnPrimary: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,

  },
  btnTextPrimary: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  btnSecondary: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  btnTextSecondary: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // DIVIDER & SOCIAL
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20, // React Native 0.71+ supports gap
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,

  },
});
