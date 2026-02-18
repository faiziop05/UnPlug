import React, { useState } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../utlils/theme";
import { selectThemeMode } from "../redux/slices/themeSlice";
import { deletePlan } from "../redux/slices/plansSlice";
import { PlanCard } from "../../components/PlanCard";
import CustomAlert from "../../components/CustomAlert";

import { DashboardHeader } from "../../components/DashboardHeader";

const CompletedPlans = ({ navigation }) => {
    const dispatch = useDispatch();
    const { plans } = useSelector((state) => state.plans);
    const { level } = useSelector((state) => state.auth);
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);

    const [expanded, setExpanded] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    const completedPlans = plans.filter((p) => p.progress === 100);

    // Calculate Stats for DashboardHeader
    const stats = React.useMemo(() => {
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
            pieData,
            hasGlobalCompletion,
            barData: [] // Not needed here
        };
    }, [plans, t]);

    const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

    const confirmDeletePlan = (planId) => {
        setSelectedPlanId(planId);
        setAlertVisible(true);
    };

    const handleDeletePlan = () => {
        if (selectedPlanId) {
            dispatch(deletePlan(selectedPlanId));
            setAlertVisible(false);
            setSelectedPlanId(null);
        }
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: t.background.main }]}
            edges={['top', 'left', 'right']}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={t.text.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>
                    Completed Plans
                </Text>
            </View>

            <FlatList
                ListHeaderComponent={
                    <View style={{ marginBottom: 20 }}>
                        <DashboardHeader
                            stats={stats}
                            t={t}
                            hasGlobalCompletion={stats.hasGlobalCompletion}
                            level={level}
                            navigation={navigation}
                            showPieChart={true}
                            showBarChart={false}
                            showHeaderTop={false}
                        />
                    </View>
                }
                data={completedPlans}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <PlanCard
                        plan={item}
                        t={t}
                        expanded={expanded}
                        onToggleExpand={toggleExpand}
                        onConfirmDelete={confirmDeletePlan}
                        // Disable editing actions for completed plans if desired, 
                        // or keep them if users can still modify notes/resources
                        onToggleTaskCompletion={() => { }} // No-op for completed plans? Or allow un-completing?
                        onEditNote={() => { }}
                        onAddResource={() => { }}
                        onDeleteResource={() => { }}
                        isCompletedView={true} // Optional prop if PlanCard needs specific styling
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="checkmark-done-circle-outline" size={64} color={t.text.muted} />
                        <Text style={[styles.emptyText, { color: t.text.secondary }]}>
                            No completed plans yet.
                        </Text>
                        <Text style={[styles.emptySub, { color: t.text.muted }]}>
                            Keep working on your goals!
                        </Text>
                    </View>
                }
            />

            <CustomAlert
                visible={alertVisible}
                title="Delete Plan"
                message="Are you sure you want to delete this completed plan? This action cannot be undone."
                buttons={[
                    {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => setAlertVisible(false),
                    },
                    {
                        text: "Delete",
                        onPress: handleDeletePlan,
                        style: "destructive", // If CustomAlert supports it, otherwise handled by logic
                    },
                ]}
                onClose={() => setAlertVisible(false)}
            />
        </SafeAreaView>
    );
};

export default CompletedPlans;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        paddingBottom: 10,
    },
    backBtn: { marginRight: 15 },
    headerTitle: { fontSize: 24, fontWeight: "800" },
    listContent: { padding: 20, paddingBottom: 40 },
    emptyContainer: { alignItems: "center", marginTop: 60 },
    emptyText: { fontSize: 18, fontWeight: "700", marginTop: 20 },
    emptySub: { fontSize: 14, marginTop: 8 },
});
