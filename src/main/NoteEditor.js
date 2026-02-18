import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { addNote, updateNote, deleteNote } from '../redux/slices/notesSlice';
import { selectThemeMode } from '../redux/slices/themeSlice';
import CustomAlert from '../../components/CustomAlert';

const NoteEditor = ({ navigation, route }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const dispatch = useDispatch();

    const existingNote = route.params?.note;

    const [title, setTitle] = useState(existingNote?.title || "");
    const [content, setContent] = useState(existingNote?.content || "");
    const [isSaving, setIsSaving] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const handleSave = async () => {
        if (!title.trim() && !content.trim()) {
            navigation.goBack();
            return;
        }

        setIsSaving(true);
        try {
            if (existingNote) {
                await dispatch(updateNote({ id: existingNote.id, title, content }));
            } else {
                await dispatch(addNote({ title, content }));
            }
            navigation.goBack();
        } catch (error) {
            console.error("Failed to save note:", error);
            setIsSaving(false);
        }
    };

    const handleDelete = () => {
        setAlertVisible(true);
    };

    const confirmDelete = async () => {
        if (existingNote) {
            await dispatch(deleteNote(existingNote.id));
        }
        setAlertVisible(false);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={t.text.primary} />
                </TouchableOpacity>
                <View style={styles.actions}>
                    {existingNote && (
                        <TouchableOpacity onPress={handleDelete} style={styles.actionBtn}>
                            <Ionicons name="trash-outline" size={24} color={t.status.error} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handleSave} style={styles.actionBtn} disabled={isSaving}>
                        {isSaving ? (
                            <ActivityIndicator size="small" color={t.brand.primary} />
                        ) : (
                            <Ionicons name="checkmark" size={28} color={t.brand.primary} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                style={styles.contentContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TextInput
                    style={[styles.titleInput, { color: t.text.primary }]}
                    placeholder="Title"
                    placeholderTextColor={t.text.muted}
                    value={title}
                    onChangeText={setTitle}
                    maxLength={100}
                />
                <TextInput
                    style={[styles.contentInput, { color: t.text.secondary }]}
                    placeholder="Start typing..."
                    placeholderTextColor={t.text.muted}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                />
            </KeyboardAvoidingView>

            <CustomAlert
                visible={alertVisible}
                title="Delete Note"
                message="Are you sure you want to delete this note?"
                buttons={[
                    { text: "Cancel", style: "cancel", onPress: () => setAlertVisible(false) },
                    { text: "Delete", style: "destructive", onPress: confirmDelete }
                ]}
                onClose={() => setAlertVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backBtn: { padding: 5 },
    actions: { flexDirection: 'row', alignItems: 'center' },
    actionBtn: { padding: 5, marginLeft: 15 },
    contentContainer: { flex: 1, paddingHorizontal: 20 },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
    },
    contentInput: {
        fontSize: 16,
        flex: 1,
        lineHeight: 24,
    },
});

export default NoteEditor;
