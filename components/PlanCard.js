import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TaskItem } from "./TaskItem";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const PlanCard = ({
  plan,
  t,
  expanded,
  onToggleExpand,
  onConfirmDelete,
  onToggleTaskCompletion,
  onEditNote,
  onAddResource,
  onDeleteResource,
}) => {
  const isExpanded = expanded === plan.id;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Sync rotation with expanded state
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleToggle = () => {
    // Basic LayoutAnimation for container height changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggleExpand(plan.id);
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Hard": return t.status.error; // Red-ish
      case "Medium": return t.status.warning; // Orange-ish
      case "Easy": return t.status.success; // Green-ish
      default: return t.text.secondary;
    }
  };

  return (
    <View
      style={[
        styles.planCard,
        {
          backgroundColor: t.background.surface,
          borderColor: isExpanded ? t.brand.primary : t.border.subtle,
          // Add a subtle shadow only when expanded to give it "lift"
          shadowColor: isExpanded ? t.brand.primary : "transparent",
          shadowOpacity: isExpanded ? 0.05 : 0,
        },
      ]}
    >
      {/* Clickable Header Area */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleToggle}
        style={styles.cardHeader}
      >
        <View style={styles.headerTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.planTitle, { color: t.text.primary }]}>
              {plan.title}
            </Text>
            <Text
              style={[styles.planDesc, { color: t.text.secondary }]}
              numberOfLines={isExpanded ? undefined : 2}
            >
              {plan.description}
            </Text>
          </View>

          <View style={styles.actionsColumn}>
            <TouchableOpacity
              onPress={() => onConfirmDelete(plan.id)}
              style={[styles.deletePlanBtn, { backgroundColor: t.background.surfaceHighlight }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash-outline" size={18} color={t.text.secondary} />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }], marginTop: 8 }}>
              <Ionicons name="chevron-down" size={20} color={t.text.muted} />
            </Animated.View>
          </View>
        </View>

        {/* Meta / Tags Row */}
        <View style={styles.metaRow}>
          {/* Difficulty Badge */}
          {plan.difficulty && (
            <View
              style={[
                styles.badge,
                { borderColor: getDifficultyColor(plan.difficulty) + '40', backgroundColor: getDifficultyColor(plan.difficulty) + '15' }
              ]}
            >
              <Text style={[styles.badgeText, { color: getDifficultyColor(plan.difficulty) }]}>
                {plan.difficulty}
              </Text>
            </View>
          )}

          {/* Rating Badge */}
          {plan.rating && (
            <View style={[styles.badge, { backgroundColor: t.brand.accent + '15', borderColor: t.brand.accent + '40' }]}>
              <Ionicons name="star" size={10} color={t.brand.accent} style={{ marginRight: 3 }} />
              <Text style={[styles.badgeText, { color: t.brand.accent }]}>
                {plan.rating}
              </Text>
            </View>
          )}

          {/* Tags (Show first 2) */}
          {plan.tags && plan.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={[styles.badge, { backgroundColor: t.background.surfaceHighlight, borderColor: t.border.subtle }]}>
              <Text style={[styles.badgeText, { color: t.text.secondary }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabelRow}>
            <Text style={[styles.progressText, { color: t.text.secondary }]}>
              Progress
            </Text>
            <Text style={[styles.progressPercentage, { color: t.brand.primary }]}>
              {plan.progress}%
            </Text>
          </View>

          <View
            style={[
              styles.progressBarTrack,
              { backgroundColor: t.background.surfaceHighlight },
            ]}
          >
            <LinearGradient
              colors={[t.brand.primary, t.brand.primaryHover]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressFill,
                { width: `${plan.progress}%` },
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Expanded Task List */}
      {isExpanded && (
        <View style={[styles.taskList, { borderTopColor: t.border.subtle }]}>
          {plan.tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              planId={plan.id}
              t={t}
              onToggleCompletion={onToggleTaskCompletion}
              onEditNote={onEditNote}
              onAddResource={onAddResource}
              onDeleteCustomResource={onDeleteResource}
              isLast={index === plan.tasks.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  planCard: {
    padding: 18,
    borderRadius: 20, // Slightly more rounded
    marginBottom: 20,
    borderWidth: 1,
    elevation: 1, // Subtle Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardHeader: {
    // No specific constraints
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  actionsColumn: {
    alignItems: 'center',
    marginLeft: 12,
  },
  deletePlanBtn: {
    padding: 6,
    borderRadius: 8,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  planDesc: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8, // More rounded badges
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: "800",
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  taskList: {
    marginTop: 20,
    paddingTop: 8,
    borderTopWidth: 1,
  },
});
