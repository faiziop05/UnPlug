import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData, updateStreak } from '../slices/authSlice';
import { fetchNotes } from '../slices/notesSlice';
import { fetchPlans, fetchTemplates, fetchFavorites } from '../slices/plansSlice';
import { fetchJournal } from '../slices/journalSlice';
import { fetchAchievements, checkAchievements } from '../slices/achievementsSlice';

export const fetchAllData = createAsyncThunk(
    'data/fetchAllData',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            // Fetch user data first to ensure we have the latest profile
            await dispatch(fetchUserData()).unwrap();

            // Fetch all other data in parallel
            await Promise.all([
                dispatch(fetchNotes()),
                dispatch(fetchPlans()),
                dispatch(fetchTemplates()),
                dispatch(fetchFavorites()),
                dispatch(fetchJournal()),
                dispatch(fetchAchievements())
            ]);

            // Update streak and check achievements after data is loaded
            // We don't necessarily need to await these for the splash screen to hide,
            // but it's good to start them now.
            dispatch(updateStreak());
            dispatch(checkAchievements());

            return true;
        } catch (error) {
            console.error("Error fetching all data:", error);
            return rejectWithValue(error.message);
        }
    }
);
