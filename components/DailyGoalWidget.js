import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const DailyGoalWidget = ({
  t,
  dailyGoalAchieved,
  setDailyGoalAchieved,
}) => (
  <View
    style={[styles.goalContainer, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }]}
  >
    <View style={{ flexDirection: "row", alignItems: "center", width: '70%' }}>
      <View
        style={[
          styles.goalIcon,
          {
            backgroundColor: dailyGoalAchieved
              ? t.status.success
              : t.background.surfaceHighlight,
          },
        ]}
      >
        <Ionicons
          name="flame"
          size={24}
          color={dailyGoalAchieved ? "white" : t.brand.primary}
        />
      </View>

      <View style={{ marginLeft: 15 }}>
        <Text style={[styles.goalTitle, { color: t.text.primary }]}>
          Daily Goal
        </Text>
        <Text style={[styles.goalSub, { color: t.text.secondary }]}>
          {dailyGoalAchieved
            ? "You're on fire! 🔥"
            : "Complete 1 task to keep streak"}
        </Text>
      </View>
    </View>

    {!dailyGoalAchieved && (
      <TouchableOpacity
        onPress={() => setDailyGoalAchieved(true)}
        style={[styles.checkBtn, { borderColor: t.brand.primary }]}
      >
        <Text
          style={{ color: t.brand.primary, fontSize: 12, fontWeight: "700" }}
        >
          MARK DONE
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginVertical: 10,
    borderRadius: 16,

  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  goalTitle: { fontSize: 16, fontWeight: "700" },
  goalSub: { fontSize: 12, width: '80%' },
  checkBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
});
