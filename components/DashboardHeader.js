import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { SCREEN_WIDTH } from "../utlils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export const DashboardHeader = React.memo(
  ({ stats, t, hasGlobalCompletion, level, navigation, showPieChart = true, showBarChart = true, showHeaderTop = true }) => {
    return (
      <View style={styles.headerContainer}>
        {/* Top Bar */}
        {showHeaderTop && (
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.headerGreeting, { color: t.text.secondary }]}>
                Overview
              </Text>
              <Text style={[styles.headerTitle, { color: t.text.primary }]}>
                My Dashboard
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity
                style={[
                  styles.profileIcon,
                  {
                    backgroundColor: t.background.surfaceHighlight,
                    width: 40,
                    paddingHorizontal: 0,
                  },
                ]}
                onPress={() => navigation.navigate("Profile")}
              >
                <Ionicons name="person-circle-outline" size={24} color={t.text.secondary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.profileIcon,
                  {
                    backgroundColor: t.background.surfaceHighlight,
                    flexDirection: "row",
                    width: "auto",
                    paddingHorizontal: 12,
                  },
                ]}
                onPress={() => navigation.navigate("XPLevel")}
              >
                <Text
                  style={{
                    color: t.brand.primary,
                    fontWeight: "bold",
                    marginRight: 8,
                  }}
                >
                  Lvl {level}
                </Text>
                <Ionicons name="trophy" size={20} color={t.brand.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* MAIN CARD: Only show if user has completed AT LEAST ONE task ever AND showPieChart is true */}
        {hasGlobalCompletion && stats.totalPlans > 0 && showPieChart ? (
          <View
            style={[
              styles.dashboardCard,
              { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle },
            ]}
          >
            <Text style={[styles.cardTitle, { color: t.text.secondary }]}>
              Overall Completion
            </Text>

            <View style={styles.donutContainer}>
              <PieChart
                key={`pie-${stats.globalPercentage}`}
                data={stats.pieData}
                donut
                radius={70}
                innerRadius={55}
                innerCircleColor={t.background.surface}
                isAnimated
                animationDuration={800}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 28,
                          color: t.text.primary,
                          fontWeight: "bold",
                        }}
                      >
                        {stats.globalPercentage}%
                      </Text>
                      <Text style={{ fontSize: 12, color: t.text.secondary }}>
                        Done
                      </Text>
                    </View>
                  );
                }}
              />

              {/* Legend */}
              <View style={styles.statsLegend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.dot, { backgroundColor: t.brand.primary }]}
                  />
                  <View>
                    <Text style={[styles.statValue, { color: t.text.primary }]}>
                      {stats.totalPlans}
                    </Text>
                    <Text
                      style={[styles.statLabel, { color: t.text.secondary }]}
                    >
                      Total Plans
                    </Text>
                  </View>
                </View>
                <View style={[styles.legendItem, { marginTop: 15 }]}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: t.background.surfaceHighlight },
                    ]}
                  />
                  <View>
                    <Text style={[styles.statValue, { color: t.text.primary }]}>
                      {stats.totalTasks}
                    </Text>
                    <Text
                      style={[styles.statLabel, { color: t.text.secondary }]}
                    >
                      Total Tasks
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {/* SECOND CARD: Bar Chart (Only show if user has activity AND showBarChart is true AND there is data) */}
        {hasGlobalCompletion && stats.totalPlans > 0 && showBarChart && stats.barData.length > 0 && (
          <View
            style={[
              styles.dashboardCard,
              { marginTop: 20, backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle },
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                { color: t.text.secondary, marginBottom: 20 },
              ]}
            >
              Progress by Plan
            </Text>
            <BarChart
              key={`bar-${stats.completedTasks}-${stats.totalPlans}`}
              //   topLabelContainerStyle={{ width: 23 ,color:t.text.secondary}}
              data={stats.barData}
              barWidth={20}
              maxValue={100}
              noOfSections={5}
              yAxisThickness={1}
              xAxisThickness={1}
              xAxisColor={t.border.subtle}
              yAxisColor={t.border.subtle}
              yAxisTextStyle={{ color: t.text.secondary, fontSize: 10 }}
              xAxisLabelTextStyle={{
                color: t.text.secondary,
                fontSize: 10,
                width: 60,
                textAlign: "center",
              }}
              hideRules={false}
              rulesColor={t.border.subtle + "40"}
              height={160}
              width={SCREEN_WIDTH * 0.65}
              isAnimated
              animationDuration={300}
              spacing={20}
            />
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  headerContainer: { marginBottom: 20, marginTop: 10 },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  headerGreeting: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  headerTitle: { fontSize: 28, fontWeight: "800" },

  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  dashboardCard: {
    borderRadius: 20,
    padding: 20,

  },

  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 15 },

  donutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statsLegend: { flex: 1, marginLeft: 20, justifyContent: "center" },

  legendItem: { flexDirection: "row", alignItems: "center" },

  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },

  statValue: { fontSize: 18, fontWeight: "800" },

  statLabel: { fontSize: 12, fontWeight: "500" },
});
