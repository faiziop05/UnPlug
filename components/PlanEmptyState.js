import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const PlanEmptyState = ({ isLoading, filter, navigation, t }) => {
  if (isLoading) {
    return (
      <View style={[styles.emptyStateContainer, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={t.brand.primary} />
        <Text style={{ marginTop: 20, color: t.text.secondary }}>
          Loading your plans...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.emptyStateContainer}>
      <View style={[styles.svgPlaceholder, { backgroundColor: t.background.surfaceHighlight, padding: 20, borderRadius: 50 }]}>
        <Ionicons name="rocket-outline" size={64} color={t.brand.primary} />
      </View>

      <Text style={[styles.emptyTitle, { color: t.text.primary }]}>
        Ready to Launch?
      </Text>
      <Text style={[styles.emptySub, { color: t.text.secondary }]}>
        {filter !== "All"
          ? `You don't have any ${filter.toLowerCase()} plans right now.`
          : "Your dashboard is waiting for your first mission. Pick a plan to get started!"}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePlan")}
        style={[styles.emptyBtn, { backgroundColor: t.brand.primary, borderWidth: 0.5, borderColor: t.border.subtle }]}
      >
        <Text style={[styles.emptyBtnText, { color: t.text.inverted }]}>
          Explore Plans
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  svgPlaceholder: {
    marginBottom: 20,
    opacity: 0.9,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySub: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  emptyBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,

  },
  emptyBtnText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
