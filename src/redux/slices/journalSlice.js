import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../../configs/FirebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const initialState = {
    entries: [],
    isLoading: false,
    error: null,
};

export const fetchJournal = createAsyncThunk(
    'journal/fetchJournal',
    async (_, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return [];

            const q = query(
                collection(db, 'users', currentUser.uid, 'journal'),
                orderBy('date', 'desc')
            );
            const querySnapshot = await getDocs(q);

            const entries = [];
            querySnapshot.forEach((doc) => {
                entries.push({ id: doc.id, ...doc.data() });
            });

            return entries;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addEntry = createAsyncThunk(
    'journal/addEntry',
    async (entryData, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");

            const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'journal'), entryData);
            return { id: docRef.id, ...entryData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteEntry = createAsyncThunk(
    'journal/deleteEntry',
    async (entryId, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");

            await deleteDoc(doc(db, 'users', currentUser.uid, 'journal', entryId));
            return entryId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJournal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchJournal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.entries = action.payload;
            })
            .addCase(fetchJournal.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addEntry.fulfilled, (state, action) => {
                state.entries.unshift(action.payload);
            })
            .addCase(deleteEntry.fulfilled, (state, action) => {
                state.entries = state.entries.filter(e => e.id !== action.payload);
            });
    },
});

export default journalSlice.reducer;
