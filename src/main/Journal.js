import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { deleteEntry } from '../redux/slices/journalSlice';
import { selectThemeMode } from '../redux/slices/themeSlice';

const Journal = ({ navigation }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const { entries } = useSelector((state) => state.journal);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteEntry(id));
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }]}>
            <View style={styles.headerRow}>
                <Text style={[styles.date, { color: t.text.secondary }]}>
                    {new Date(item.date).toLocaleDateString()}
                </Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color={t.status.error} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, { color: t.text.primary }]}>{item.title}</Text>
            <Text style={[styles.planTitle, { color: t.brand.primary }]}>{item.planTitle}</Text>
            {item.note && (
                <View style={[styles.noteContainer, { backgroundColor: t.background.surfaceHighlight }]}>
                    <Text style={[styles.note, { color: t.text.secondary }]}>{item.note}</Text>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>My Journal</Text>
            </View>
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="book-outline" size={64} color={t.text.muted} />
                        <Text style={[styles.emptyText, { color: t.text.secondary }]}>No journal entries yet.</Text>
                        <Text style={[styles.emptySub, { color: t.text.muted }]}>Complete tasks and add notes to see them here.</Text>
                    </View>
                }
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
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,

    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    date: { fontSize: 12, fontWeight: '600' },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
    planTitle: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
    noteContainer: { padding: 12, borderRadius: 8 },
    note: { fontSize: 14, fontStyle: 'italic' },
    emptyContainer: { alignItems: 'center', marginTop: 60 },
    emptyText: { fontSize: 18, fontWeight: '700', marginTop: 20 },
    emptySub: { fontSize: 14, marginTop: 8, textAlign: 'center', maxWidth: 250 },
});

export default Journal;
