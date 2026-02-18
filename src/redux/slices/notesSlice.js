import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../../configs/FirebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';

const initialState = {
    notes: [],
    isLoading: false,
    error: null,
};

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (_, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return [];

            const q = query(
                collection(db, 'users', currentUser.uid, 'notes'),
                orderBy('updatedAt', 'desc')
            );
            const querySnapshot = await getDocs(q);

            const notes = [];
            querySnapshot.forEach((doc) => {
                notes.push({ id: doc.id, ...doc.data() });
            });

            return notes;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNote = createAsyncThunk(
    'notes/addNote',
    async (noteData, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");

            const newNote = {
                ...noteData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'notes'), newNote);
            return { id: docRef.id, ...newNote };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, ...updates }, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");

            const updatedData = {
                ...updates,
                updatedAt: new Date().toISOString(),
            };

            await updateDoc(doc(db, 'users', currentUser.uid, 'notes', id), updatedData);
            return { id, ...updatedData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");

            await deleteDoc(doc(db, 'users', currentUser.uid, 'notes', noteId));
            return noteId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.notes.unshift(action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.notes.findIndex(n => n.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = { ...state.notes[index], ...action.payload };
                    // Re-sort could be done here, but might be jarring for user
                }
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(n => n.id !== action.payload);
            });
    },
});

export default notesSlice.reducer;
