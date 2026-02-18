import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { checkAndRequestReview } from "../src/utils/ratingUtils";

export const PlanCompletionModal = ({ visible, plan, t, onClose, onExplore }) => {
    const handleClose = () => {
        checkAndRequestReview();
        onClose();
    };

    const handleExplore = () => {
        checkAndRequestReview();
        onExplore();
    };

    if (!plan) return null;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <BlurView intensity={20} style={styles.blur} tint="dark">
                    <TouchableOpacity style={styles.backdropPress} onPress={handleClose} />
                </BlurView>

                <View style={[styles.card, { backgroundColor: t.background.surface }]}>
                    {/* Confetti/Star Icon Header */}
                    <LinearGradient
                        colors={[t.brand.primary, t.brand.primaryHover]}
                        style={styles.headerIconContainer}
                    >
                        <Ionicons name="trophy" size={40} color="white" />
                    </LinearGradient>

                    <Text style={[styles.title, { color: t.text.primary }]}>
                        Congratulations!
                    </Text>
                    <Text style={[styles.subtitle, { color: t.text.secondary }]}>
                        You've completed
                    </Text>
                    <Text style={[styles.planName, { color: t.brand.primary }]}>
                        {plan.title}
                    </Text>

                    <View style={[styles.rewardBadge, { backgroundColor: t.brand.accent + '20' }]}>
                        <Ionicons name="star" size={16} color={t.brand.accent} />
                        <Text style={[styles.rewardText, { color: t.brand.accent }]}>+100 XP Earned</Text>
                    </View>

                    <Text style={[styles.description, { color: t.text.secondary }]}>
                        One step closer to your goals. Ready for the next challenge?
                    </Text>

                    <TouchableOpacity onPress={handleExplore} activeOpacity={0.8} style={{ width: '100%' }}>
                        <LinearGradient
                            colors={[t.brand.primary, t.brand.primaryHover]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.exploreBtn}
                        >
                            <Text style={styles.exploreBtnText}>Explore New Plans</Text>
                            <Ionicons name="arrow-forward" size={18} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                        <Text style={[styles.closeBtnText, { color: t.text.muted }]}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
    backdropPress: {
        flex: 1,
    },
    card: {
        width: "85%",
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    headerIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginTop: -40, // Pull up to overlap top
        borderWidth: 4,
        borderColor: "white", // Or match background
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    planName: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 16,
        marginTop: 4,
    },
    rewardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
        marginBottom: 24,
    },
    rewardText: {
        fontWeight: '700',
        fontSize: 14,
    },
    description: {
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    exploreBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    exploreBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
    closeBtn: {
        marginTop: 16,
        padding: 10,
    },
    closeBtnText: {
        fontSize: 14,
        fontWeight: "600",
    },
});
