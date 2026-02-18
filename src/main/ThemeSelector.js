import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, getAllThemes } from "../../utlils/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, selectThemeId } from "../redux/slices/themeSlice";
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const ThemeSelector = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentThemeId = useSelector(selectThemeId);
    const t = useTheme(currentThemeId);
    const allThemes = getAllThemes();

    const handleThemeSelect = (themeId) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        dispatch(setTheme(themeId));
    };

    const ThemeCard = ({ theme }) => {
        const isSelected = currentThemeId === theme.id;

        return (
            <TouchableOpacity
                style={[
                    styles.themeCard,
                    {
                        backgroundColor: t.background.surface,
                        borderWidth: 2,
                        borderColor: isSelected ? t.brand.primary : t.border.subtle,
                    },
                ]}
                onPress={() => handleThemeSelect(theme.id)}
                activeOpacity={0.7}
            >
                {isSelected && (
                    <View style={[styles.checkmark, { backgroundColor: t.brand.primary }]}>
                        <Ionicons name="checkmark" size={20} color={t.text.inverted} />
                    </View>
                )}

                <View style={styles.themeHeader}>
                    <Text style={[styles.themeName, { color: t.text.primary }]}>
                        {theme.name}
                    </Text>
                    <View style={[styles.modeBadge, { backgroundColor: theme.mode === 'dark' ? '#1F2937' : '#F9FAFB' }]}>
                        <Ionicons
                            name={theme.mode === 'dark' ? 'moon' : 'sunny'}
                            size={12}
                            color={theme.mode === 'dark' ? '#F9FAFB' : '#1F2937'}
                        />
                    </View>
                </View>

                <Text style={[styles.themeDescription, { color: t.text.secondary }]}>
                    {theme.description}
                </Text>

                {/* Color Preview Swatches */}
                <View style={styles.colorSwatches}>
                    <View style={[styles.swatch, { backgroundColor: theme.brand.primary }]} />
                    <View style={[styles.swatch, { backgroundColor: theme.brand.secondary }]} />
                    <View style={[styles.swatch, { backgroundColor: theme.brand.accent }]} />
                    <View style={[styles.swatch, { backgroundColor: theme.background.main }]} />
                    <View style={[styles.swatch, { backgroundColor: theme.background.surface }]} />
                </View>

                {/* Theme Preview */}
                <View style={[styles.preview, { backgroundColor: theme.background.main }]}>
                    <View style={[styles.previewCard, { backgroundColor: theme.background.surface }]}>
                        <View style={[styles.previewButton, { backgroundColor: theme.brand.primary }]}>
                            <View style={styles.previewButtonInner} />
                        </View>
                        <View style={styles.previewText}>
                            <View style={[styles.previewLine, { backgroundColor: theme.text.primary }]} />
                            <View style={[styles.previewLine, { backgroundColor: theme.text.secondary, width: '70%' }]} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={t.text.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>Choose Theme</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.subtitle, { color: t.text.secondary }]}>
                    Select a theme to personalize your experience
                </Text>

                {allThemes.map((theme) => (
                    <ThemeCard key={theme.id} theme={theme} />
                ))}

                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ThemeSelector;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    placeholder: {
        width: 40,
    },
    scrollContainer: {
        padding: 20,
        paddingTop: 0,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    themeCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        position: 'relative',
    },
    checkmark: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    themeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    themeName: {
        fontSize: 20,
        fontWeight: '700',
        marginRight: 10,
    },
    modeBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeDescription: {
        fontSize: 14,
        marginBottom: 16,
    },
    colorSwatches: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    swatch: {
        width: 32,
        height: 32,
        borderRadius: 8,
    },
    preview: {
        borderRadius: 12,
        padding: 12,
        height: 100,
    },
    previewCard: {
        borderRadius: 8,
        padding: 12,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    previewButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    previewButtonInner: {
        width: 20,
        height: 20,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    previewText: {
        flex: 1,
        gap: 8,
    },
    previewLine: {
        height: 8,
        borderRadius: 4,
        width: '100%',
    },
    bottomPadding: {
        height: 40,
    },
});
