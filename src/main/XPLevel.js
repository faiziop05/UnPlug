import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { selectThemeMode } from '../redux/slices/themeSlice';

const XPLevel = ({ navigation }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const { xp, level } = useSelector((state) => state.auth);

    const xpForNextLevel = 200;
    const currentLevelXP = xp % xpForNextLevel;
    const progress = currentLevelXP / xpForNextLevel;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                    <Ionicons name="close" size={28} color={t.text.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>Your Progress</Text>
            </View>

            <View style={styles.content}>
                <View style={[styles.levelBadge, { borderColor: t.brand.primary }]}>
                    <Text style={[styles.levelLabel, { color: t.text.secondary }]}>LEVEL</Text>
                    <Text style={[styles.levelValue, { color: t.brand.primary }]}>{level}</Text>
                </View>

                <Text style={[styles.xpText, { color: t.text.primary }]}>{xp} Total XP</Text>

                <View style={[styles.progressContainer, { backgroundColor: t.background.surfaceHighlight }]}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: t.brand.primary }]} />
                </View>

                <Text style={[styles.progressText, { color: t.text.secondary }]}>
                    {currentLevelXP} / {xpForNextLevel} XP to Level {level + 1}
                </Text>

                <View style={[styles.infoCard, { backgroundColor: t.background.surface }]}>
                    <Text style={[styles.infoTitle, { color: t.text.primary }]}>How to earn XP?</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="checkmark-circle-outline" size={20} color={t.brand.primary} />
                        <Text style={[styles.infoText, { color: t.text.secondary }]}>Complete a task: +10 XP</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="trophy-outline" size={20} color={t.brand.primary} />
                        <Text style={[styles.infoText, { color: t.text.secondary }]}>Finish a plan: +100 XP</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    closeBtn: { position: 'absolute', left: 20 },
    headerTitle: { fontSize: 20, fontWeight: '700' },
    content: { flex: 1, alignItems: 'center', padding: 40 },
    levelBadge: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    levelLabel: { fontSize: 14, fontWeight: '600', letterSpacing: 1 },
    levelValue: { fontSize: 48, fontWeight: '800' },
    xpText: { fontSize: 24, fontWeight: '700', marginBottom: 30 },
    progressContainer: {
        width: '100%',
        height: 12,
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBar: { height: '100%', borderRadius: 6 },
    progressText: { fontSize: 14, marginBottom: 50 },
    infoCard: {
        width: '100%',
        padding: 20,
        borderRadius: 16,
    },
    infoTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    infoText: { marginLeft: 10, fontSize: 16 },
});

export default XPLevel;
