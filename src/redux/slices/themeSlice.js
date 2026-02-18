import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEMES, getThemeById } from '../../../utlils/theme';

const THEME_KEY = '@theme_mode';

const initialState = {
    themeId: 'teal_light', // ID of current theme
    colors: THEMES.teal_light, // Current theme colors
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            const themeId = action.payload;
            state.themeId = themeId;
            state.colors = getThemeById(themeId);
            // Persist to AsyncStorage
            AsyncStorage.setItem(THEME_KEY, themeId);
        },
        loadTheme: (state, action) => {
            const themeId = action.payload || 'teal_light';
            state.themeId = themeId;
            state.colors = getThemeById(themeId);
        },
    },
});

export const { setTheme, loadTheme } = themeSlice.actions;

// Thunk to load theme from AsyncStorage
export const initializeTheme = () => async (dispatch) => {
    try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
            dispatch(loadTheme(savedTheme));
        }
    } catch (error) {
        console.error('Failed to load theme:', error);
    }
};

export const selectTheme = (state) => state.theme;
export const selectThemeId = (state) => state.theme.themeId;
export const selectThemeColors = (state) => state.theme.colors;
export const selectThemeMode = (state) => state.theme.themeId; // For compatibility

export default themeSlice.reducer;
