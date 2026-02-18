import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../../configs/FirebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { signOutUser } from './authSlice';

// --- Async Thunks ---

export const fetchPlans = createAsyncThunk(
  'plans/fetchPlans',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const q = query(collection(db, 'users', currentUser.uid, 'plans'));
      const querySnapshot = await getDocs(q);

      const plans = [];
      querySnapshot.forEach((doc) => {
        plans.push({ id: doc.id, ...doc.data() });
      });

      return plans;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTemplates = createAsyncThunk(
  'plans/fetchTemplates',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'templates'));
      const querySnapshot = await getDocs(q);

      const templates = [];
      querySnapshot.forEach((doc) => {
        templates.push({ id: doc.id, ...doc.data() });
      });

      return templates;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'plans/fetchFavorites',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data().favorites || [];
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'plans/toggleFavorite',
  async (templateId, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const state = getState();
      const currentFavorites = state.plans.favorites;
      let newFavorites;

      if (currentFavorites.includes(templateId)) {
        newFavorites = currentFavorites.filter(id => id !== templateId);
      } else {
        newFavorites = [...currentFavorites, templateId];
      }

      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, { favorites: newFavorites }, { merge: true });

      return newFavorites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPlan = createAsyncThunk(
  'plans/addPlan',
  async (planData, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'plans'), planData);
      return { id: docRef.id, ...planData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlanProgress = createAsyncThunk(
  'plans/updatePlanProgress',
  async ({ planId, tasks, progress }, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const planRef = doc(db, 'users', currentUser.uid, 'plans', planId);
      await updateDoc(planRef, { tasks, progress });
      return { planId, tasks, progress };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  'plans/deletePlan',
  async (planId, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      await deleteDoc(doc(db, 'users', currentUser.uid, 'plans', planId));
      return planId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice ---

const initialState = {
  plans: [],
  templates: [],
  favorites: [],
  isLoading: false,
  error: null,
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Plans
      .addCase(fetchPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Templates
      .addCase(fetchTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Favorites
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      // Toggle Favorite
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      // Add Plan
      .addCase(addPlan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans.unshift(action.payload); // Add to top
      })
      .addCase(addPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Progress
      .addCase(updatePlanProgress.fulfilled, (state, action) => {
        const { planId, tasks, progress } = action.payload;
        const index = state.plans.findIndex(p => p.id === planId);
        if (index !== -1) {
          state.plans[index].tasks = tasks;
          state.plans[index].progress = progress;
        }
      })
      // Delete Plan
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(p => p.id !== action.payload);
      });
  },
});

export const { clearError } = plansSlice.actions;
export default plansSlice.reducer;
