import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../utlils/theme";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../src/redux/slices/themeSlice";

const CustomSheet = ({
  visible,
  onClose,
  title,
  children,
  animationType = "slide",
}) => {
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: t.background.main }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: t.text.primary }]}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color={t.text.primary} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
});

export default CustomSheet;
