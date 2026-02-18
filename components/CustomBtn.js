import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SCREEN_WIDTH } from "../utlils/Dimentions";
import { useTheme } from "../utlils/theme";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../src/redux/slices/themeSlice";

const CustomBtn = ({
  title = "Button",
  onPress,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  variant = "solid", // "solid" | "outline" | "text"
  size = "md", // "sm" | "md" | "lg"
  fullWidth = true,
  radius = 40,
  style,
  textStyle,
}) => {
  const themeMode = useSelector(selectThemeMode);
  const theme = useTheme(themeMode);

  const sizes = {
    sm: { height: 38, fontSize: 14, paddingHorizontal: 12 },
    md: { height: 45, fontSize: 15, paddingHorizontal: 15 },
    lg: { height: 52, fontSize: 17, paddingHorizontal: 18 },
  };

  const background =
    variant === "solid"
      ? theme.brand.primary
      : variant === "outline"
        ? "transparent"
        : "transparent";

  const border = variant === "outline" ? theme.brand.primary : "transparent";

  const textColor =
    variant === "solid" ? theme.text.inverted : theme.text.inverted;

  const disabledOpacity = disabled ? 0.6 : 1;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: background,
          borderColor: border,
          borderWidth: variant === "outline" ? 1 : 0,
          height: sizes[size].height,
          borderRadius: radius,
          opacity: disabledOpacity,
          width: fullWidth ? SCREEN_WIDTH * 0.9 : "auto",
        },
        style,
      ]}
    >
      {/* Left Icon */}
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

      {/* Title or Loading */}
      {loading ? (
        <ActivityIndicator size="small" color={theme.text.inverse} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: sizes[size].fontSize,
              color: textColor,
              fontWeight: "800",
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}

      {/* Right Icon */}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontWeight: "600",
  },
  leftIcon: {
    marginRight: 6,
  },
  rightIcon: {
    marginLeft: 6,
  },
});
