import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  toggleFavorite,
  addPlan,
} from "../redux/slices/plansSlice";

// Utils
import { useTheme } from "../../utlils/theme";
import CustomAlert from "../../components/CustomAlert";
import Data from "../../utlils/Data.json";

// NEW Components
import { ExploreHeader } from "../../components/ExploreHeader";
import { PlanItemCard } from "../../components/PlanItemCard";
import { CreateCustomPlanSheet } from "../../components/CreateCustomPlanSheet";
import { PlanDetailSheet } from "../../components/PlanDetailSheet";
import { selectThemeMode } from "../redux/slices/themeSlice";
import { checkAndRequestReview } from "../utils/ratingUtils";

const CATEGORIES = [
  // --- Your Original List ---
  "All",
  "Technology",
  "Health",
  "Lifestyle",
  "Language",
  "Music",

  // --- Tech & Logic ---
  "Computer",       // General IT, hardware, software basics
  "Programming",    // Coding and software development
  "Mathematics",    // Math, logic, statistics
  "Science",        // Physics, chemistry, biology, etc.
  "Engineering",    // Mechanical, civil, electrical

  // --- Business & Career ---
  "Business",       // Entrepreneurship, management, strategy
  "Finance",        // Investing, economics, personal finance
  "Marketing",      // Branding, sales, digital marketing
  "Design",         // UI/UX, graphic design, product design

  // --- Arts & Humanities ---
  "Art",            // Drawing, painting, sculpture
  "History",        // World history, civilizations
  "Writing",        // Creative writing, journalism, blogging
  "Philosophy",     // Ethics, logic, critical thinking
  "Social Science", // Psychology, sociology, politics

  // --- Practical & Personal ---
  "Cooking",        // Culinary arts, baking
  "DIY",            // Crafts, home improvement, woodworking
  "Sports",         // Fitness, athletics, training
  "Photography",    // Photo, video, editing
  "Personal Growth" // Productivity, soft skills, leadership
];

const CreatePlan = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.plans);
  const { plans } = useSelector((state) => state.plans);

  const { isPro, preferences } = useSelector((state) => state.auth);
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    buttons: [],
  });

  const showAlert = (title, message, buttons) => {
    setAlertConfig({ title, message, buttons });
    setAlertVisible(true);
  };

  useEffect(() => {
    // Data is fetched globally in MainStack via fetchAllData
    // const fetch = async () => {
    //   try {
    //     setIsLoading(true);
    //     await dispatch(fetchFavorites());
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetch();

    // Check for template param from Quick Start
    if (route.params?.template) {
      const template = route.params.template;
      // Small delay to ensure modal opens smoothly after navigation
      setTimeout(() => {
        handleViewDetails(template);
      }, 500);
      // Clear params to prevent reopening on re-render (optional, but good practice if possible)
      navigation.setParams({ template: null });
    }
  }, [dispatch, route.params?.template]);

  // --- LOGIC ---
  const filteredList = useMemo(() => {
    let result = Data;

    // Filter out plans the user already has (Active or Completed)
    const userPlanTitles = plans.map(p => p.title);
    result = result.filter(p => !userPlanTitles.includes(p.title));

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.categories && p.categories.includes(selectedCategory));
    }
    if (searchQuery) {
      result = result.filter((plan) =>
        plan.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result.map((t) => ({
      ...t,
      isFavorite: favorites.includes(t.id),
      isPremium: t.difficulty === "Hard" || t.tags.includes("Premium"),
    }));
  }, [searchQuery, selectedCategory, favorites, plans]);

  const recommendedList = useMemo(() => {
    if (!preferences?.interests || preferences.interests.length === 0) return [];
    return filteredList.filter(plan =>
      plan.categories && plan.categories.some(cat => preferences.interests.includes(cat))
    ).slice(0, 3); // Top 3 recommendations
  }, [filteredList, preferences]);

  const handleToggleFavorite = (id) => dispatch(toggleFavorite(id));

  const handleViewDetails = (plan) => {
    if (plan.isPremium && !isPro) {
      showAlert(
        "Premium Plan 💎",
        "This plan is available only for Pro members.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setAlertVisible(false),
          },
          {
            text: "Upgrade",
            onPress: () => {
              setAlertVisible(false);
              navigation.navigate("Subscription");
            },
          },
        ]
      );
      return;
    }
    setSelectedPlan(plan);
    setDetailModalVisible(true);
  };

  const handleStartPlan = (plan) => {
    // Only count ACTIVE plans (progress < 100) towards the limit
    const activePlans = plans.filter(p => p.progress < 100);

    if (!isPro && activePlans.length >= 1) {
      showAlert(
        "Limit Reached 🔒",
        "Free members can only have 1 active plan. Upgrade to Pro for unlimited plans!",
        [
          { text: "Cancel", style: "cancel", onPress: () => setAlertVisible(false) },
          {
            text: "Upgrade",
            onPress: () => {
              setAlertVisible(false);
              navigation.navigate("Subscription");
            },
          },
        ]
      );
      return;
    }
    setDetailModalVisible(false);
    const newPlan = {
      title: plan.title,
      description: plan.description,
      categories: plan.categories,
      difficulty: plan.difficulty,
      duration: plan.duration,
      rating: plan.rating,
      tags: plan.tags,
      tasks: plan.tasks.map((t) => ({ ...t, completed: false })),
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    const isAlreadyExist = plans.some((plan) => plan.title == newPlan.title);
    if (isAlreadyExist === true) {
      showAlert("Already Exist!!", `"${plan.title}" has already been added.`, [
        { text: "Go to Dashboard", onPress: () => navigation.goBack() },
      ]);
      return
    }
    dispatch(addPlan(newPlan));
    showAlert("Plan Started! 🚀", `"${plan.title}" has been added.`, [
      { text: "Go to Dashboard", onPress: () => navigation.goBack() },
    ]);
  };

  const handleCreateCustomPlan = (customData) => {
    const newPlan = {
      title: customData.title,
      description: customData.description || "Custom created plan",
      categories: ["Custom"],
      difficulty: "Medium",
      duration: "Self-paced",
      rating: 5.0,
      progress: 0,
      tags: ["Custom"],
      tasks: customData.tasks,
      createdAt: new Date().toISOString(),
    };
    dispatch(addPlan(newPlan));
    checkAndRequestReview();
    showAlert("Success", "Custom plan created successfully!", [
      { text: "Go to Dashboard", onPress: () => navigation.goBack() },
    ]);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      setSelectedCategory("All");
    }
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
          data={filteredList}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            isLoading ? (
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <ActivityIndicator size="large" color={t.brand.primary} />
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <PlanItemCard
              item={item}
              t={t}
              onPress={handleViewDetails}
              onToggleFavorite={handleToggleFavorite}
              isLocked={item.isPremium && !isPro}
            />
          )}
          ListHeaderComponent={
            <View>
              <ExploreHeader
                t={t}
                searchQuery={searchQuery}
                setSearchQuery={handleSearch}
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onCreatePress={() => {
                  if (!isPro) {
                    showAlert(
                      "Premium Feature 💎",
                      "Custom Plans are available only for Pro members.",
                      [
                        { text: "Cancel", style: "cancel", onPress: () => setAlertVisible(false) },
                        {
                          text: "Upgrade",
                          onPress: () => {
                            setAlertVisible(false);
                            navigation.navigate("Subscription");
                          },
                        },
                      ]
                    );
                    return;
                  }
                  setCreateModalVisible(true);
                }}
                hasResults={filteredList && filteredList.length > 0}
              />
              {recommendedList.length > 0 && !searchQuery && selectedCategory === "All" && (
                <View style={{ marginBottom: -20, marginHorizontal: -20 }}>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: t.text.primary, marginBottom: 15, marginTop: 10, paddingHorizontal: 20 }}>
                    Recommended for You
                  </Text>

                  <FlatList
                    data={recommendedList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `rec-${item.id}`}
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
              {filteredList.length > 0 && (
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: t.text.primary, marginTop: 25, marginBottom: 10 },
                  ]}
                >
                  {selectedCategory === "All"
                    ? "Popular Templates"
                    : `${selectedCategory} Plans`}
                </Text>
              )}
            </View>
          }
          contentContainerStyle={styles.inner}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        {/* MODALS */}
        <CreateCustomPlanSheet
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onCreatePlan={handleCreateCustomPlan}
          t={t}
        />

        <PlanDetailSheet
          visible={detailModalVisible}
          onClose={() => setDetailModalVisible(false)}
          plan={selectedPlan}
          onStartPlan={handleStartPlan}
          t={t}
        />

        <CustomAlert
          visible={alertVisible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          onClose={() => setAlertVisible(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

export default CreatePlan;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  inner: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 20 },

});
