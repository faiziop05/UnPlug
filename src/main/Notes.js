import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { fetchNotes, deleteNote } from '../redux/slices/notesSlice';
import { selectThemeMode } from '../redux/slices/themeSlice';

const Notes = ({ navigation }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const { notes, isLoading } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    // Data is fetched globally in MainStack via fetchAllData
    // useEffect(() => {
    //     dispatch(fetchNotes());
    // }, [dispatch]);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }]}
            onPress={() => navigation.navigate('NoteEditor', { note: item })}
        >
            <Text style={[styles.title, { color: t.text.primary }]} numberOfLines={1}>{item.title || "Untitled"}</Text>
            <Text style={[styles.content, { color: t.text.secondary }]} numberOfLines={3}>{item.content}</Text>
            <Text style={[styles.date, { color: t.text.muted }]}>
                {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>Notes</Text>
            </View>

            <View style={[styles.searchContainer, { backgroundColor: t.background.surface }]}>
                <Ionicons name="search" size={20} color={t.text.muted} />
                <TextInput
                    style={[styles.searchInput, { color: t.text.primary }]}
                    placeholder="Search notes..."
                    placeholderTextColor={t.text.muted}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={64} color={t.text.muted} />
                        <Text style={[styles.emptyText, { color: t.text.secondary }]}>No notes yet.</Text>
                        <Text style={[styles.emptySub, { color: t.text.muted }]}>Tap the + button to create one.</Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={[styles.fab, { backgroundColor: t.brand.primary, borderWidth: 0.5, borderColor: t.border.subtle }]}
                onPress={() => navigation.navigate('NoteEditor')}
            >
                <Ionicons name="add" size={32} color={t.text.inverted} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, paddingBottom: 10 },
    headerTitle: { fontSize: 32, fontWeight: '800' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
        paddingHorizontal: 15,
        height: 45,
        borderRadius: 12,
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
    listContent: { padding: 10, paddingBottom: 80 },
    columnWrapper: { justifyContent: 'space-between', paddingHorizontal: 10 },
    card: {
        width: '48%',
        padding: 15,
        borderRadius: 16,
        marginBottom: 15,

        height: 150,
    },
    title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
    content: { fontSize: 14, lineHeight: 20, flex: 1 },
    date: { fontSize: 10, marginTop: 8, alignSelf: 'flex-end' },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    emptyContainer: { alignItems: 'center', marginTop: 60, width: '100%' },
    emptyText: { fontSize: 18, fontWeight: '700', marginTop: 20 },
    emptySub: { fontSize: 14, marginTop: 8 },
});

export default Notes;
