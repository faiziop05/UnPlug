import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useTheme } from "../utlils/theme";
import { SCREEN_WIDTH } from "../utlils/Dimentions";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../src/redux/slices/themeSlice";

const CustomTextInput = ({
  errorMessage,
  isDisabled,
  value,
  onChange,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconPress,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  multiline, // Destructure this prop
  style,
}) => {
  const themeMode = useSelector(selectThemeMode);
  const theme = useTheme(themeMode);

  return (
    // 1. Update Container to allow growth if multiline
    <View
      style={[
        styles.container,
        multiline && { height: "auto", paddingBottom: 10 },
      ]}
    >
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: errorMessage
              ? theme.status.error
              : theme.border.subtle,
            backgroundColor: theme.background.surface,
          },
          // 2. Conditional styles for multiline (Taller, align top)
          multiline && {
            height: 120,
            alignItems: "flex-start",
            paddingVertical: 12,
          },
          style,
        ]}
      >
        {/* Fix icon position for multiline (keep it at top) */}
        {leftIcon && (
          <View style={[styles.leftIcon, multiline && { marginTop: 2 }]}>
            {leftIcon}
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            { color: theme.text.primary },
            // 3. Android fix: ensure text starts at top
            multiline && { textAlignVertical: "top", height: "100%" },
          ]}
          multiline={multiline}
          onChangeText={onChange}
          cursorColor={theme.brand.primary} // Simplified theme usage
          value={value}
          editable={!isDisabled}
          placeholder={placeholder}
          placeholderTextColor={theme.text.muted}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />

        {rightIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            style={[styles.rightIcon, multiline && { marginTop: 2 }]}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text style={[styles.errorText, { color: theme.status.error }]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 65, // Default height for single line
    justifyContent: "flex-start", marginBottom: 15
  },
  inputWrapper: {
    width: SCREEN_WIDTH * 0.9,
    height: 45, // Default height
    borderWidth: 0.5,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center", // Default center for single line
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0, // Removes default native padding alignment issues
    height: "100%",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  errorText: {
    marginTop: 2,
    fontSize: 12,
  },
});

export default CustomTextInput;
