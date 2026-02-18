import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { selectThemeMode } from '../redux/slices/themeSlice';
import { DailyGoalWidget } from '../../components/DailyGoalWidget';
import { setDailyGoalAchieved } from '../redux/slices/achievementsSlice';

const Achievements = ({ navigation }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const dispatch = useDispatch();
    const { list, dailyGoalAchieved } = useSelector((state) => state.achievements);

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: t.background.surface, opacity: item.unlocked ? 1 : 0.6, borderWidth: 0.5, borderColor: t.border.subtle }]}>
            <View style={[styles.iconContainer, { backgroundColor: item.unlocked ? t.brand.primary : t.background.surfaceHighlight }]}>
                <Ionicons name={item.icon} size={32} color={item.unlocked ? "white" : t.text.secondary} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: t.text.primary }]}>{item.title}</Text>
                <Text style={[styles.description, { color: t.text.secondary }]}>{item.description}</Text>
            </View>
            {item.unlocked && (
                <Ionicons name="checkmark-circle" size={24} color={t.status.success} />
            )}
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>Achievements</Text>
            </View>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <DailyGoalWidget
                            t={t}
                            dailyGoalAchieved={dailyGoalAchieved}
                            setDailyGoalAchieved={(val) => dispatch(setDailyGoalAchieved(val))}
                        />
                        <TouchableOpacity
                            style={[styles.historyBtn, { backgroundColor: t.background.surface }]}
                            onPress={() => navigation.navigate("CompletedPlans")}
                        >
                            <Text style={[styles.historyBtnText, { color: t.text.primary }]}>View Completed Plans</Text>
                            <Ionicons name="chevron-forward" size={16} color={t.text.secondary} />
                        </TouchableOpacity>
                    </View>
                }
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, paddingBottom: 10 },
    headerTitle: { fontSize: 28, fontWeight: '800' },
    listContent: { padding: 20 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,

    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: { flex: 1 },
    title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    description: { fontSize: 14 },
    historyBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 12,
        marginTop: 5,
        marginBottom: 15,
        height: 80,
    },
    historyBtnText: {
        fontSize: 14,
        fontWeight: "600",
    },
});

export default Achievements;
