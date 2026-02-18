import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../utlils/theme";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../src/redux/slices/themeSlice";

const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  animationType = "fade",
}) => {
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: t.text.primary }]}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={t.text.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 24,
    padding: 20,

  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalBody: {
    width: "100%",
  },
});

export default CustomModal;
