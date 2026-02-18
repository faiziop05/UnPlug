import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  Vibration,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import {
  updatePlanProgress,
  deletePlan,
  toggleFavorite,
} from "../redux/slices/plansSlice";
import { addXP, updateStreak } from "../redux/slices/authSlice";
import { setDailyGoalAchieved, checkAchievements } from "../redux/slices/achievementsSlice";

// Utils & Components
import { useTheme } from "../../utlils/theme";
import { DashboardHeader } from "../../components/DashboardHeader";

// NEW Sub-Components
import { PlanEmptyState } from "../../components/PlanEmptyState";
import { PlanCard } from "../../components/PlanCard";
import { PlanItemCard } from "../../components/PlanItemCard"; // Import PlanItemCard
import { HomeActionModals } from "../../components/HomeActionModals";
import { FocusTaskCard } from "../../components/FocusTaskCard";
import { QuickStartTemplates } from "../../components/QuickStartTemplates";
import { PlanCompletionModal } from "../../components/PlanCompletionModal";
import { SCREEN_HEIGHT } from "../../utlils/Dimentions";
import { selectThemeMode } from "../redux/slices/themeSlice";
import Data from "../../utlils/Data.json"; // Import Data
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { plans, isLoading, favorites } = useSelector((state) => state.plans); // Get favorites
  const { xp, level, preferences } = useSelector((state) => state.auth); // Get preferences
  const { dailyGoalAchieved } = useSelector((state) => state.achievements);
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);

  // --- STATE ---
  const [expanded, setExpanded] = useState(null);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [tempInput, setTempInput] = useState({ title: "", link: "" });

  // NEW: Completion Modal State
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [completedPlan, setCompletedPlan] = useState(null);

  // Data is fetched globally in MainStack via fetchAllData
  // useEffect(() => {
  //   dispatch(fetchPlans());
  //   dispatch(fetchUserData());
  //   dispatch(fetchAchievements());
  // }, [dispatch]);

  // --- COMPUTED DATA ---
  const stats = useMemo(() => {
    const totalPlans = plans.length;
    let totalTasks = 0,
      completedTasks = 0;

    // Global completion check
    let globalCompletedCount = 0;
    plans.forEach((p) => {
      globalCompletedCount += p.tasks.filter((t) => t.completed).length;
      totalTasks += p.tasks.length;
      completedTasks += p.tasks.filter((t) => t.completed).length;
    });

    const globalPercentage =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const hasGlobalCompletion = globalCompletedCount > 0;

    const barData = plans
      .filter(p => p.progress < 100)
      .map((p) => ({
        value: p.progress,
        label: p.title.length > 14 ? p.title.substring(0, 12) + "..." : p.title,
        frontColor: t.brand.primary,
      }));

    const pieData = [
      { value: completedTasks, color: t.brand.primary, focused: true },
      {
        value: totalTasks - completedTasks,
        color: t.background.surfaceHighlight,
      },
    ];

    return {
      totalPlans,
      completedTasks,
      totalTasks,
      globalPercentage,
      barData,
      pieData,
      hasGlobalCompletion,
    };
  }, [plans, t]);

  const filteredPlans = useMemo(() => {
    // Only show active plans (progress < 100)
    return plans.filter((p) => p.progress >= 0 && p.progress < 100);
  }, [plans]);

  // --- RECOMMENDATIONS ---
  const recommendedPlans = useMemo(() => {
    // 1. If no preferences, return empty (or default popular)
    if (!preferences) return [];

    // 2. Filter by Interests (Categories)
    let recs = Data.filter(plan =>
      plan.categories && plan.categories.some(cat => (preferences.interests || []).includes(cat))
    );

    // 3. Filter/Sort by Experience Level (Difficulty)
    if (preferences.experience) {
      const difficultyMap = {
        'Beginner': 'Easy',
        'Intermediate': 'Medium',
        'Advanced': 'Hard'
      };
      const targetDifficulty = difficultyMap[preferences.experience];
      if (targetDifficulty) {
        // Prioritize matching difficulty, but don't strictly exclude others to ensure variety
        recs.sort((a, b) => {
          if (a.difficulty === targetDifficulty && b.difficulty !== targetDifficulty) return -1;
          if (a.difficulty !== targetDifficulty && b.difficulty === targetDifficulty) return 1;
          return 0;
        });
      }
    }

    // 4. Exclude already active or completed plans (by title or ID if available)
    const activePlanTitles = plans.map(p => p.title);
    recs = recs.filter(p => !activePlanTitles.includes(p.title));

    // 5. Return top 5
    return recs.slice(0, 5).map(p => ({
      ...p,
      isFavorite: (favorites || []).includes(p.id),
      isPremium: p.difficulty === "Hard" || p.tags.includes("Premium"),
    }));
  }, [preferences, plans, favorites]);

  const handleViewDetails = (plan) => {
    navigation.navigate("CreatePlan", { template: plan });
    navigation.navigate("CreatePlan", { template: plan });
  };

  const handleToggleFavorite = (planId) => {
    dispatch(toggleFavorite(planId));
  };

  // --- ACTIONS ---
  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const toggleTaskCompletion = (planId, taskId) => {
    Vibration.vibrate(50);
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    const updatedTasks = plan.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const completedCount = updatedTasks.filter((t) => t.completed).length;
    const newProgress = Math.round(
      (completedCount / updatedTasks.length) * 100
    );

    if (!dailyGoalAchieved && newProgress > plan.progress)
      dispatch(setDailyGoalAchieved(true));

    const task = plan.tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      dispatch(addXP(10));
    }

    // Check for plan completion
    if (newProgress === 100 && plan.progress < 100) {
      dispatch(addXP(100)); // Bonus XP for finishing plan
      setCompletedPlan(plan);
      setCompletionModalVisible(true);
    }

    dispatch(
      updatePlanProgress({ planId, tasks: updatedTasks, progress: newProgress })
    ).then(() => {
      // Check for achievements and streak after progress update
      dispatch(updateStreak());
      dispatch(checkAchievements());
    });
  };

  const confirmDeletePlan = (planId) => {
    setSelectedItem({ planId });
    setModalType("CONFIRM_DELETE");
  };

  const handleDeletePlan = () => {
    dispatch(deletePlan(selectedItem.planId));
    closeModal();
  };

  const openNoteModal = (planId, task) => {
    setSelectedItem({ planId, taskId: task.id });
    setTempInput({ ...tempInput, title: task.notes || "" });
    setModalType("EDIT_NOTE");
  };

  const saveNote = () => {
    const plan = plans.find((p) => p.id === selectedItem.planId);
    if (!plan) return;
    const updatedTasks = plan.tasks.map((task) =>
      task.id !== selectedItem.taskId
        ? task
        : { ...task, notes: tempInput.title }
    );
    dispatch(
      updatePlanProgress({
        planId: selectedItem.planId,
        tasks: updatedTasks,
        progress: plan.progress,
      })
    );
    closeModal();
  };

  const openAddResourceModal = (planId, taskId) => {
    setSelectedItem({ planId, taskId });
    setTempInput({ title: "", link: "" });
    setModalType("ADD_RESOURCE");
  };

  const saveResource = () => {
    if (!tempInput.title || !tempInput.link) return;
    const plan = plans.find((p) => p.id === selectedItem.planId);
    if (!plan) return;
    const updatedTasks = plan.tasks.map((task) => {
      if (task.id !== selectedItem.taskId) return task;
      return {
        ...task,
        customResources: [
          ...(task.customResources || []),
          {
            id: Date.now().toString(),
            title: tempInput.title,
            url: tempInput.link,
          },
        ],
      };
    });
    dispatch(
      updatePlanProgress({
        planId: selectedItem.planId,
        tasks: updatedTasks,
        progress: plan.progress,
      })
    );
    closeModal();
  };

  const deleteCustomResource = (planId, taskId, resourceId) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;
    const updatedTasks = plan.tasks.map((task) => {
      if (task.id !== taskId) return task;
      return {
        ...task,
        customResources: task.customResources.filter(
          (r) => r.id !== resourceId
        ),
      };
    });
    dispatch(
      updatePlanProgress({
        planId,
        tasks: updatedTasks,
        progress: plan.progress,
      })
    );
  };

  const closeModal = () => {
    setModalType("");
    setSelectedItem(null);
    setTempInput({ title: "", link: "" });
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: t.background.main }]}
      edges={['top', 'left', 'right']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          ListHeaderComponent={
            <View>
              <DashboardHeader
                stats={stats}
                t={t}
                hasGlobalCompletion={stats.hasGlobalCompletion}
                level={level}
                navigation={navigation}
                showPieChart={false}
                showBarChart={true}
              />
              <FocusTaskCard
                plans={plans}
                t={t}
                onToggleTaskCompletion={toggleTaskCompletion}
              />
            </View>
          }
          data={filteredPlans}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 20,
            minHeight: SCREEN_HEIGHT,
          }}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <PlanCard
              plan={item}
              t={t}
              expanded={expanded}
              onToggleExpand={toggleExpand}
              onConfirmDelete={confirmDeletePlan}
              onToggleTaskCompletion={toggleTaskCompletion}
              onEditNote={openNoteModal}
              onAddResource={openAddResourceModal}
              onDeleteResource={deleteCustomResource}
            />
          )}
          ListEmptyComponent={
            <View>
              <PlanEmptyState
                isLoading={isLoading}
                filter="Active"
                navigation={navigation}
                t={t}
              />
              {/* Show Recommendations if no active plans */}
              {!isLoading && recommendedPlans.length > 0 && (
                <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: -20 }}>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: t.text.primary, marginBottom: 15, marginTop: 10, paddingHorizontal: 20 }}>
                    Recommended for You
                  </Text>
                  <FlatList
                    data={recommendedPlans}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `home-rec-${item.id}`}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    snapToInterval={295}
                    decelerationRate="fast"
                    snapToAlignment="start"
                    renderItem={({ item }) => (
                      <View style={{ width: 280, marginRight: 15 }}>
                        <PlanItemCard
                          item={item}
                          t={t}
                          onPress={handleViewDetails}
                          onToggleFavorite={handleToggleFavorite}
                          containerStyle={{ height: 240 }}
                        />
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          }

          ListFooterComponent={
            <View>
              <QuickStartTemplates t={t} navigation={navigation} />
              {filteredPlans.length > 0 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreatePlan")}
                  style={styles.browseBtn}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: t.brand.primary,
                    }}
                  >
                    Browse More Plans
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />

        <HomeActionModals
          modalType={modalType}
          closeModal={closeModal}
          handleDeletePlan={handleDeletePlan}
          saveNote={saveNote}
          saveResource={saveResource}
          tempInput={tempInput}
          setTempInput={setTempInput}
          t={t}
        />

        {/* Completion Celebration Modal */}
        <PlanCompletionModal
          visible={completionModalVisible}
          plan={completedPlan}
          t={t}
          onClose={() => setCompletionModalVisible(false)}
          onExplore={() => {
            setCompletionModalVisible(false);
            navigation.navigate("CreatePlan");
          }}
        />

      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  browseBtn: { marginTop: 24, alignSelf: "center", marginBottom: 40 },
});
