import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export const FocusTaskCard = ({ plans, t, onToggleTaskCompletion }) => {

    const focusItem = useMemo(() => {
        // Find the first active plan with incomplete tasks
        for (const plan of plans) {
            if (plan.progress < 100) {
                const nextTask = plan.tasks.find(t => !t.completed);
                if (nextTask) {
                    return { plan, task: nextTask };
                }
            }
        }
        return null;
    }, [plans]);

    if (!focusItem) {
        return null;
    }

    const { plan, task } = focusItem;

    return (
        <View style={[styles.container, {
            backgroundColor: t.background.surface,
            borderColor: t.border.subtle, // Match PlanCard border
            borderWidth: 1,
            // Remove shadows to match "other cards" request
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0
        }]}>
            {/* Header: Gradient "Focus" Badge */}
            <View style={styles.header}>
                <LinearGradient
                    colors={[t.brand.primary, t.brand.primaryHover]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.focusBadge}
                >
                    <Ionicons name="flash" size={12} color={t.text.inverted} style={{ marginRight: 4 }} />
                    <Text style={[styles.label, { color: t.text.inverted }]}>UP NEXT</Text>
                </LinearGradient>
                <Text style={[styles.planTitle, { color: t.text.secondary }]}>{plan.title}</Text>
            </View>

            {/* Main Task Content */}
            <View style={styles.content}>
                <Text style={[styles.taskTitle, { color: t.text.primary }]}>{task.title}</Text>

                <View style={styles.metaRow}>
                    <View style={[styles.metaItem, { backgroundColor: t.background.surfaceHighlight }]}>
                        <Ionicons name="time-outline" size={14} color={t.text.secondary} />
                        <Text style={[styles.metaText, { color: t.text.secondary }]}>{task.time}</Text>
                    </View>
                    {task.type && (
                        <View style={[styles.metaItem, { backgroundColor: t.background.surfaceHighlight }]}>
                            <Ionicons name="pricetag-outline" size={14} color={t.text.secondary} />
                            <Text style={[styles.metaText, { color: t.text.secondary, textTransform: 'capitalize' }]}>{task.type}</Text>
                        </View>
                    )}
                </View>

                {/* Notes */}
                {task.notes && (
                    <View style={[styles.noteBlock, { borderLeftColor: t.brand.primary }]}>
                        <Text style={[styles.taskNotes, { color: t.text.secondary }]}>
                            {task.notes}
                        </Text>
                    </View>
                )}

                {/* Resources */}
                {task.resources && (
                    <View style={styles.resourceRow}>
                        {task.resources.web && (
                            <TouchableOpacity
                                onPress={() => Linking.openURL(task.resources.web)}
                                style={[styles.resourceBtn, { borderColor: t.border.subtle }]}
                            >
                                <Ionicons name="globe-outline" size={16} color={t.brand.primary} />
                                <Text style={[styles.resourceText, { color: t.brand.primary }]}>Read</Text>
                            </TouchableOpacity>
                        )}
                        {task.resources.youtube && (
                            <TouchableOpacity
                                onPress={() => Linking.openURL(task.resources.youtube)}
                                style={[styles.resourceBtn, { borderColor: t.border.subtle }]}
                            >
                                <Ionicons name="logo-youtube" size={16} color="#FF0000" />
                                <Text style={[styles.resourceText, { color: t.text.primary }]}>Watch</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>

            {/* Action Button */}
            <TouchableOpacity
                onPress={() => onToggleTaskCompletion(plan.id, task.id)}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={[t.brand.primary, t.brand.primaryHover]}
                    style={styles.completeBtn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                    <Text style={styles.completeBtnText}>Complete Task</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20, // Match PlanCard radius (20)
        padding: 20,
        marginBottom: 20, // Match PlanCard margin
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    focusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    label: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    planTitle: {
        fontSize: 12,
        fontWeight: '600',
        maxWidth: '60%',
    },
    content: {
        marginBottom: 20,
    },
    taskTitle: {
        fontSize: 22, // Larger for emphasis
        fontWeight: '800',
        marginBottom: 12,
        lineHeight: 28,
        letterSpacing: -0.5,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    metaText: {
        fontSize: 12,
        fontWeight: '600',
    },
    noteBlock: {
        paddingLeft: 12,
        borderLeftWidth: 3,
        marginBottom: 16,
    },
    taskNotes: {
        fontSize: 14,
        fontStyle: 'italic',
        lineHeight: 20,
    },
    resourceRow: {
        flexDirection: 'row',
        gap: 12,
    },
    resourceBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8,
    },
    resourceText: {
        fontSize: 13,
        fontWeight: '700',
    },
    completeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    completeBtnText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});
