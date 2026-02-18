import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";

// Internal Sub-component for Filters
const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  t,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{ marginBottom: 20, maxHeight: 40 }}
    contentContainerStyle={{ paddingRight: 20 }}
  >
    {categories.map((cat) => (
      <TouchableOpacity
        key={cat}
        onPress={() => setSelectedCategory(cat)}
        style={[
          styles.catPill,
          {
            backgroundColor:
              selectedCategory === cat ? t.brand.primary : t.background.surface,
            borderColor:
              selectedCategory === cat ? t.brand.primary : t.border.subtle,
            borderWidth: 1,
          },
        ]}
      >
        <Text
          style={{
            color: selectedCategory === cat ? "white" : t.text.secondary,
            fontWeight: "600",
            fontSize: 13,
          }}
        >
          {cat}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export const ExploreHeader = ({
  t,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  onCreatePress,
  hasResults,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <Text style={[styles.headerTitle, { color: t.text.primary }]}>
          Explore Plans
        </Text>
      </View>

      <CustomTextInput
        leftIcon={<Ionicons name="search" size={20} color={t.text.secondary} />}
        placeholder="Find a plan..."
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <View style={{ height: 15 }} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        t={t}
      />

      <TouchableOpacity
        onPress={onCreatePress}
        style={[
          styles.createCard,
          {
            backgroundColor: t.background.surface,
            borderColor: t.brand.primary,
          },
        ]}
      >
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: t.background.surfaceHighlight },
          ]}
        >
          <Ionicons name="add" size={32} color={t.brand.primary} />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={[styles.createTitle, { color: t.brand.primary }]}>
            Create Custom Plan
          </Text>
          <Text style={[styles.createSub, { color: t.text.secondary }]}>
            Build your own roadmap
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { marginTop: 10 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  catPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  createCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  createTitle: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  createSub: { fontSize: 12 },
});
