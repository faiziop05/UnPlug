import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const PlanItemCard = ({ item, t, onPress, onToggleFavorite, containerStyle, isLocked }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => onPress(item)}
    style={[styles.planCard, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }, containerStyle]}
  >
    <View>
      <View style={styles.cardTopRow}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginRight: 8 }}>
            <Text style={[styles.itemTitle, { color: t.text.primary, marginBottom: 0, marginRight: 8, flexShrink: 1 }]} numberOfLines={1}>
              {item.title}
            </Text>
            {isLocked && (
              <Ionicons name="lock-closed" size={16} color={t.text.secondary} />
            )}
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={12} color="#FFB300" />
              <Text style={[styles.metaText, { color: t.text.secondary }]}>
                {item.rating}
              </Text>
            </View>
            <View style={[styles.metaItem, { marginLeft: 12 }]}>
              <Ionicons
                name="speedometer-outline"
                size={12}
                color={t.text.secondary}
              />
              <Text style={[styles.metaText, { color: t.text.secondary }]}>
                {item.difficulty}
              </Text>
            </View>
            <View style={[styles.metaItem, { marginLeft: 12 }]}>
              <Ionicons
                name="layers-outline"
                size={12}
                color={t.text.secondary}
              />
              <Text style={[styles.metaText, { color: t.text.secondary }]}>
                {item.tasks.length} Tasks
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => onToggleFavorite && onToggleFavorite(item.id)}>
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={item.isFavorite ? t.status.error : t.text.secondary}
          />
        </TouchableOpacity>
      </View>

      <Text
        numberOfLines={2}
        style={[styles.itemDesc, { color: t.text.secondary }]}
      >
        {item.description}
      </Text>

      <View style={styles.tagsRow}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <View
            key={index}
            style={[
              styles.tag,
              { backgroundColor: t.background.surfaceHighlight },
            ]}
          >
            <Text style={[styles.tagText, { color: t.text.secondary }]}>
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
      <Text style={{ color: t.brand.primary, fontWeight: "700", fontSize: 14 }}>
        View Details
      </Text>
      <Ionicons name="chevron-forward" color={t.brand.primary} size={16} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  planCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,

    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  itemDesc: { fontSize: 14, marginTop: 12, lineHeight: 20 },
  metaRow: { flexDirection: "row", alignItems: "center" },
  metaItem: { flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 12, fontWeight: "600", marginLeft: 4 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: { fontSize: 11, fontWeight: "600" },
});
