import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../utlils/theme";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../src/redux/slices/themeSlice";

const CustomAlert = ({ visible, title, message, buttons = [], onClose }) => {
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);


  if (!visible) return null;

  const isError = title?.toLowerCase().includes("error");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: t.background.surfaceHighlight },
            ]}
          >
            <Ionicons
              name={isError ? "alert" : "checkmark"}
              size={32}
              color={isError ? t.status.error : t.brand.primary}
            />
          </View>

          <Text style={[styles.modalTitle, { color: t.text.primary }]}>
            {title}
          </Text>
          <Text style={[styles.modalText, { color: t.text.secondary }]}>
            {message}
          </Text>

          <View style={styles.buttonContainer}>
            {buttons.map((btn, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (onClose) onClose();
                  if (btn.onPress) btn.onPress();
                }}
                style={[
                  styles.modalBtn,
                  {
                    backgroundColor:
                      btn.style === "cancel"
                        ? t.background.surfaceHighlight
                        : t.brand.primary,
                    flex: buttons.length > 1 ? 1 : 0,
                    width: buttons.length === 1 ? "100%" : undefined,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      btn.style === "cancel" ? t.text.primary : t.text.inverted,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
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
    maxWidth: 320,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",

  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    justifyContent: "center",
  },
  modalBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
});

export default CustomAlert;
