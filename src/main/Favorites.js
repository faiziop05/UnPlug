import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../utlils/theme';
import { selectThemeMode } from '../redux/slices/themeSlice';
import { PlanItemCard } from '../../components/PlanItemCard';
import { PlanDetailSheet } from '../../components/PlanDetailSheet';
import { toggleFavorite, addPlan } from '../redux/slices/plansSlice';
import Data from '../../utlils/Data.json';
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from '../../components/CustomAlert';

const Favorites = ({ navigation }) => {
    const dispatch = useDispatch();
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const { favorites, plans } = useSelector((state) => state.plans);
    const { isPro } = useSelector((state) => state.auth);

    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: "", message: "", buttons: [] });

    const favoritePlans = useMemo(() => {
        return Data.filter(plan => favorites.includes(plan.id)).map(plan => ({
            ...plan,
            isFavorite: true,
            isPremium: plan.difficulty === "Hard" || plan.tags.includes("Premium"),
        }));
    }, [favorites]);

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };

    const showAlert = (title, message, buttons) => {
        setAlertConfig({ title, message, buttons });
        setAlertVisible(true);
    };

    const handleViewDetails = (plan) => {
        if (plan.isPremium && !isPro) {
            showAlert(
                "Premium Plan 💎",
                "This plan is available only for Pro members.",
                [
                    { text: "Cancel", style: "cancel", onPress: () => setAlertVisible(false) },
                    { text: "Upgrade", onPress: () => { setAlertVisible(false); navigation.navigate("Subscription"); } },
                ]
            );
            return;
        }
        setSelectedPlan(plan);
        setDetailModalVisible(true);
    };

    const handleStartPlan = (plan) => {
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
        const isAlreadyExist = plans.some((p) => p.title == newPlan.title);
        if (isAlreadyExist) {
            showAlert("Already Exist!!", `"${plan.title}" has already been added.`, [
                { text: "Go to Dashboard", onPress: () => navigation.navigate("Home") },
            ]);
            return;
        }
        dispatch(addPlan(newPlan));
        showAlert("Plan Started! 🚀", `"${plan.title}" has been added.`, [
            { text: "Go to Dashboard", onPress: () => navigation.navigate("Home") },
        ]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]} edges={['top']}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: t.text.primary }]}>Favorites</Text>
            </View>

            <FlatList
                data={favoritePlans}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <PlanItemCard
                        item={item}
                        t={t}
                        onPress={handleViewDetails}
                        onToggleFavorite={handleToggleFavorite}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="heart-dislike-outline" size={64} color={t.text.muted} />
                        <Text style={[styles.emptyText, { color: t.text.secondary }]}>
                            No favorites yet.
                        </Text>
                        <Text style={[styles.emptySubText, { color: t.text.muted }]}>
                            Browse plans and tap the heart icon to save them here.
                        </Text>
                    </View>
                }
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
    },
    listContent: {
        padding: 20,
        paddingTop: 0,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
    },
    emptySubText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 40,
    },
});

export default Favorites;
