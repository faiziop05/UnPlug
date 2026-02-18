import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomSheet from "../components/CustomSheet";

export const PlanDetailSheet = ({ visible, onClose, plan, onStartPlan, t }) => {
  if (!plan) return null;

  return (
    <CustomSheet visible={visible} onClose={onClose} title={plan.title}>
      <View
        style={[styles.detailContainer, { backgroundColor: t.background.main }]}
      >
        <View
          style={[styles.detailBanner, { backgroundColor: t.brand.accent }]}
        >
          <Ionicons
            name="school-outline"
            size={60}
            color="rgba(255,255,255,0.3)"
          />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={[styles.detailDesc, { color: t.text.secondary }]}>
            {plan.description}
          </Text>

          <View style={styles.detailStatsRow}>
            <StatBox label="DIFFICULTY" value={plan.difficulty} t={t} />
            <StatBox label="DURATION" value={plan.duration} t={t} />
            <StatBox label="TASKS" value={plan.tasks.length} t={t} />
          </View>

          <Text
            style={[
              styles.sectionTitle,
              { color: t.text.primary, marginTop: 30 },
            ]}
          >
            Curriculum
          </Text>

          {plan.tasks.map((task, index) => (
            <View
              key={index}
              style={[
                styles.curriculumItem,
                { borderBottomColor: t.border.subtle },
              ]}
            >
              <View
                style={[
                  styles.indexCircle,
                  { backgroundColor: t.background.surfaceHighlight },
                ]}
              >
                <Text style={{ color: t.brand.primary, fontWeight: "bold" }}>
                  {index + 1}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.currTitle, { color: t.text.primary }]}>
                  {task.title}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={task.type === "video" ? "play-circle" : "book"}
                    size={12}
                    color={t.text.secondary}
                  />
                  <Text
                    style={{
                      color: t.text.secondary,
                      fontSize: 12,
                      marginLeft: 4,
                    }}
                  >
                    {task.time} • {task.type}
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
        <View
          style={[
            styles.bottomActionContainer,
            {
              backgroundColor: t.background.surface,
              borderTopColor: t.border.subtle,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => onStartPlan(plan)}
            style={[
              styles.createBtnFull,
              { backgroundColor: t.brand.primary, marginTop: 0 },
            ]}
          >
            <Text style={styles.createBtnText}>Start This Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomSheet>
  );
};

const StatBox = ({ label, value, t }) => (
  <View style={[styles.detailStat, { backgroundColor: t.background.surface }]}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, { color: t.text.primary }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  detailContainer: { flex: 1 },
  detailBanner: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  detailDesc: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  detailStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailStat: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#999",
    marginBottom: 4,
  },
  statValue: { fontSize: 16, fontWeight: "700" },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  curriculumItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  indexCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  currTitle: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  bottomActionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  createBtnFull: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  createBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
});
