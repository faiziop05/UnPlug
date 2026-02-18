import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../../configs/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const initialState = {
    list: [
        {
            id: 'first_plan',
            title: 'First Steps',
            description: 'Complete your first plan.',
            icon: 'footsteps',
            unlocked: false,
        },
        {
            id: 'streak_7',
            title: 'Week Warrior',
            description: 'Maintain a 7-day streak.',
            icon: 'flame',
            unlocked: false,
        },
        {
            id: 'xp_1000',
            title: 'XP Hunter',
            description: 'Earn 1000 XP.',
            icon: 'trophy',
            unlocked: false,
        },
        {
            id: 'social_detox',
            title: 'Social Detox',
            description: 'Complete a "Social Media Detox" plan.',
            icon: 'leaf',
            unlocked: false,
        }
    ],
    isLoading: false,
    error: null,
    dailyGoalAchieved: false,
    lastDailyGoalDate: null,
};

export const fetchAchievements = createAsyncThunk(
    'achievements/fetchAchievements',
    async (_, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return { achievements: [], dailyGoalAchieved: false };

            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                const today = new Date().toISOString().split('T')[0];
                const isGoalToday = data.lastDailyGoalDate === today;

                return {
                    achievements: data.achievements || [],
                    dailyGoalAchieved: isGoalToday ? (data.dailyGoalAchieved || false) : false
                };
            }
            return { achievements: [], dailyGoalAchieved: false };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const setDailyGoalAchieved = createAsyncThunk(
    'achievements/setDailyGoalAchieved',
    async (achieved, { dispatch, rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return rejectWithValue("User not authenticated");

            const today = new Date().toISOString().split('T')[0];
            const userDocRef = doc(db, 'users', currentUser.uid);

            await setDoc(userDocRef, {
                dailyGoalAchieved: achieved,
                lastDailyGoalDate: today
            }, { merge: true });

            return achieved;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkAchievements = createAsyncThunk(
    'achievements/checkAchievements',
    async (_, { getState, dispatch }) => {
        const state = getState();
        const { auth: authState, plans: plansState, achievements: achievementsState } = state;

        const unlockedIds = [];

        // 1. First Steps: Complete your first plan
        const hasCompletedPlan = plansState.plans.some(p => p.progress === 100);
        if (hasCompletedPlan) unlockedIds.push('first_plan');

        // 2. Week Warrior: Maintain a 7-day streak
        if (authState.streak >= 7) unlockedIds.push('streak_7');

        // 3. XP Hunter: Earn 1000 XP
        if (authState.xp >= 1000) unlockedIds.push('xp_1000');

        // 4. Social Detox: Complete a "Social Media Detox" plan
        const hasDetox = plansState.plans.some(p =>
            p.title.toLowerCase().includes('social') &&
            p.title.toLowerCase().includes('detox') &&
            p.progress === 100
        );
        if (hasDetox) unlockedIds.push('social_detox');

        // Dispatch unlock for any NEW achievements
        for (const id of unlockedIds) {
            const achievement = achievementsState.list.find(a => a.id === id);
            if (achievement && !achievement.unlocked) {
                await dispatch(unlockAchievement(id));
            }
        }
    }
);

export const unlockAchievement = createAsyncThunk(
    'achievements/unlockAchievement',
    async (achievementId, { getState, rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");

            const state = getState().achievements;
            const achievement = state.list.find(a => a.id === achievementId);

            if (!achievement) return rejectWithValue("Achievement not found");
            if (achievement.unlocked) return achievementId; // Already unlocked

            // Get current unlocked IDs from state to ensure we don't overwrite
            const unlockedIds = state.list.filter(a => a.unlocked).map(a => a.id);
            // Add new ID if not present (though check above handles it, good to be safe)
            const newUnlockedIds = unlockedIds.includes(achievementId) ? unlockedIds : [...unlockedIds, achievementId];

            const userDocRef = doc(db, 'users', currentUser.uid);
            await setDoc(userDocRef, { achievements: newUnlockedIds }, { merge: true });

            return achievementId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        resetAchievements: (state) => {
            state.list.forEach(a => a.unlocked = false);
            state.dailyGoalAchieved = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAchievements.fulfilled, (state, action) => {
                const { achievements: unlockedIds, dailyGoalAchieved } = action.payload;
                state.dailyGoalAchieved = dailyGoalAchieved;
                state.list.forEach(a => {
                    if (unlockedIds.includes(a.id)) {
                        a.unlocked = true;
                    }
                });
            })
            .addCase(unlockAchievement.fulfilled, (state, action) => {
                const achievement = state.list.find(a => a.id === action.payload);
                if (achievement) {
                    achievement.unlocked = true;
                }
            })
            .addCase(setDailyGoalAchieved.fulfilled, (state, action) => {
                state.dailyGoalAchieved = action.payload;
            });
    },
});

export const { resetAchievements } = achievementsSlice.actions;
export default achievementsSlice.reducer;
