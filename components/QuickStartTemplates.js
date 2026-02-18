import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Data from '../utlils/Data.json';

export const QuickStartTemplates = ({ t, navigation }) => {
    // Select a few specific templates for "Quick Start"
    // Using IDs from Data.json or just picking the first few
    const quickTemplates = Data.slice(0, 4);

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: t.text.primary }]}>Quick Start</Text>
            <FlatList
                data={quickTemplates}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                snapToInterval={155}
                decelerationRate="normal"
                snapToAlignment="start"
                renderItem={({ item: template }) => (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }]}
                        onPress={() => navigation.navigate("CreatePlan", { template })}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: t.background.surfaceHighlight }]}>
                            <Ionicons name="flash" size={24} color={t.brand.primary} />
                        </View>
                        <Text style={[styles.title, { color: t.text.primary }]} numberOfLines={2}>
                            {template.title}
                        </Text>
                        <Text style={[styles.duration, { color: t.text.secondary }]}>
                            {template.duration}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: -20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    card: {
        width: 140,
        padding: 15,
        borderRadius: 16,
        marginRight: 15,

    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 4,
        height: 40,
    },
    duration: {
        fontSize: 12,
    },
});
