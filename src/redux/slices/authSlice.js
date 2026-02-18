import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from '../../../configs/FirebaseConfig';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser, signOut } from 'firebase/auth';
import { RevenueCatManager } from '../../utils/RevenueCatManager';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// ... (existing imports)

export const changeUserPassword = createAsyncThunk(
  'auth/changeUserPassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No user logged in");

      // Re-authenticate if current password is provided
      if (currentPassword) {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
      }

      await updatePassword(currentUser, newPassword);
      return true;
    } catch (error) {
      return rejectWithValue(error.code || error.message);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'auth/deleteUserAccount',
  async (password, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No user logged in");

      // Re-authenticate is required for sensitive operations like deletion
      if (password) {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        await reauthenticateWithCredential(currentUser, credential);
      }

      // Delete user data from Firestore (optional, but good practice)
      // await deleteDoc(doc(db, 'users', currentUser.uid)); 
      // Note: Deleting a document doesn't delete subcollections. 
      // For a full cleanup, you'd need a Cloud Function or recursive delete.
      // For now, we'll just delete the Auth account.

      await deleteUser(currentUser);
      await dispatch(signOutUser()); // Clean up local state
      return true;
    } catch (error) {
      return rejectWithValue(error.code || error.message);
    }
  }
);
export const loadUserSession = createAsyncThunk(
  'auth/loadUserSession',
  async (_, { dispatch }) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');

      if (userToken) {
        const customerInfo = await RevenueCatManager.login(userToken);
        if (customerInfo) {
          await dispatch(syncSubscriptionData(customerInfo));
        }
      }

      return {
        userToken,
        isFirstLaunch: isFirstLaunch === null // If null, it's first launch (default true)
      };
    } catch (e) {
      console.error('Failed to load user session', e);
      return { userToken: null, isFirstLaunch: true };
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (token, { dispatch }) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      const customerInfo = await RevenueCatManager.login(token); // token is the uid in this app's context

      if (customerInfo) {
        await dispatch(syncSubscriptionData(customerInfo));
      }

      return token;
    } catch (e) {
      console.error('Failed to save user session', e);
      throw e;
    }
  }
);

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async () => {
    try {
      // Ensure Google Signin is configured before signing out
      // Using the Web Client ID
      GoogleSignin.configure({
        webClientId: '487352363512-9je2ggba411clbmm4hcqvgtede264mr8.apps.googleusercontent.com',
      });

      try {
        await GoogleSignin.signOut();
      } catch (e) {
        console.log("Google SignOut error (benign):", e);
      }

      // Sign out from Firebase Auth first - this is crucial!
      // This will trigger the onAuthStateChanged listener in App.js
      await signOut(auth);

      // Then remove local token and RevenueCat session
      await AsyncStorage.removeItem('userToken');
      await RevenueCatManager.logout();
    } catch (e) {
      console.error('Failed to sign out user', e);
    }
  }
);

export const completeOnboarding = createAsyncThunk(
  'auth/completeOnboarding',
  async () => {
    try {
      await AsyncStorage.setItem('isFirstLaunch', 'false');
    } catch (e) {
      console.error('Failed to set onboarding status', e);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return null;

      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        // Initialize user data if it doesn't exist
        const initialData = { xp: 0, level: 1, isPro: false, hasCompletedQuiz: false };
        await setDoc(userDocRef, initialData, { merge: true });
        return initialData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addXP = createAsyncThunk(
  'auth/addXP',
  async (amount, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const state = getState().auth;
      const newXP = state.xp + amount;
      const newLevel = Math.floor(newXP / 200) + 1;

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { xp: newXP, level: newLevel });

      return { xp: newXP, level: newLevel };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setProStatus = createAsyncThunk(
  'auth/setProStatus',
  async (status, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { isPro: status });

      return status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const syncSubscriptionData = createAsyncThunk(
  'auth/syncSubscriptionData',
  async (customerInfo, { dispatch, rejectWithValue, getState }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      // Check for 'pro' entitlement - ensure this matches your RevenueCat dashboard identifier
      const entitlement = customerInfo?.entitlements?.active?.['UnPlug Pro'];
      const isPro = entitlement !== undefined;

      // Extract detailed metadata
      let planType = 'unknown';
      if (entitlement?.productIdentifier) {
        const pid = entitlement.productIdentifier.toLowerCase();
        if (pid.includes('month')) planType = 'monthly';
        else if (pid.includes('year') || pid.includes('annual')) planType = 'yearly';
      }

      const subscriptionData = {
        activeEntitlements: customerInfo?.entitlements?.active ? Object.keys(customerInfo.entitlements.active) : [],
        latestExpirationDate: entitlement?.expirationDate || customerInfo?.latestExpirationDate,
        renewalDate: entitlement?.expirationDate, // Usually same as expiration for auto-renewing
        purchaseDate: entitlement?.latestPurchaseDate,
        originalPurchaseDate: entitlement?.originalPurchaseDate || customerInfo?.originalPurchaseDate,
        productIdentifier: entitlement?.productIdentifier,
        planType: planType,
        willRenew: entitlement?.willRenew,
        periodType: entitlement?.periodType, // 'normal', 'intro', 'trial'
        managementURL: customerInfo.managementURL,
        originalAppUserId: customerInfo.originalAppUserId,
        requestDate: customerInfo.requestDate,
        firstSeen: customerInfo.firstSeen,
        provider: 'revenuecat',
        updatedAt: new Date().toISOString(),
      };

      // Optimization: Check if update is needed
      const state = getState().auth;
      const currentSub = state.user?.subscription;

      // We update if:
      // 1. Pro status changed
      // 2. Expiration date changed (renewal happened)
      // 3. No previous subscription data exists
      const shouldUpdate =
        state.isPro !== isPro ||
        currentSub?.latestExpirationDate !== subscriptionData.latestExpirationDate ||
        !currentSub;

      if (shouldUpdate) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          isPro: isPro,
          subscription: subscriptionData
        });
        return { isPro, subscription: subscriptionData, updated: true };
      } else {
        // Return existing data but mark as not updated in DB
        return { isPro, subscription: { ...currentSub, ...subscriptionData, updatedAt: currentSub.updatedAt }, updated: false };
      }

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeQuiz = createAsyncThunk(
  'auth/completeQuiz',
  async (preferences, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        dispatch(signOutUser());
        return rejectWithValue("User not authenticated");
      }

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        hasCompletedQuiz: true,
        preferences: preferences
      });

      return preferences;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStreak = createAsyncThunk(
  'auth/updateStreak',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const state = getState().auth;
      const today = new Date().toISOString().split('T')[0];
      const lastActive = state.lastActiveDate;

      let newStreak = state.streak;

      if (lastActive === today) {
        // Already active today, do nothing
        return { streak: newStreak, lastActiveDate: today };
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActive === yesterdayStr) {
        // Active yesterday, increment streak
        newStreak += 1;
      } else {
        // Streak broken or first time
        newStreak = 1;
      }

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { streak: newStreak, lastActiveDate: today });

      return { streak: newStreak, lastActiveDate: today };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ displayName }, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No user logged in");

      // Update Auth Profile
      await updateProfile(currentUser, { displayName });

      // Update Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { displayName });

      return { displayName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const initialState = {
  userToken: null,
  user: null, // Add user object
  isFirstLaunch: true,
  isLoading: true,
  isSignout: false,
  xp: 0,
  level: 1,
  isPro: false,
  hasCompletedQuiz: false,
  preferences: null,
  streak: 0,
  lastActiveDate: null,
  isRevenueCatInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRevenueCatInitialized: (state, action) => {
      state.isRevenueCatInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load User Session
      .addCase(loadUserSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserSession.fulfilled, (state, action) => {
        state.userToken = action.payload.userToken;
        state.isFirstLaunch = action.payload.isFirstLaunch;
        // If no token, we are done loading. If token exists, we wait for fetchUserData.
        if (!action.payload.userToken) {
          state.isLoading = false;
        }
      })
      .addCase(loadUserSession.rejected, (state) => {
        state.isLoading = false;
        state.userToken = null;
        state.isFirstLaunch = true;
      })
      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isSignout = false;
        state.userToken = action.payload;
        state.isLoading = true; // Keep loading until user data is fetched
      })
      .addCase(signInUser.rejected, (state) => {
        state.isLoading = false;
        state.userToken = null;
      })
      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.isSignout = true;
        state.userToken = null;
        state.user = null; // Clear user object
        state.xp = 0; // Reset XP
        state.level = 1; // Reset level
        state.isPro = false; // Reset pro status
        state.hasCompletedQuiz = false; // Reset on sign out
        state.preferences = null;
        state.streak = 0; // Reset streak
        state.lastActiveDate = null; // Clear last active date
        state.isLoading = false; // Stop any loading
      })
      // Complete Onboarding
      .addCase(completeOnboarding.fulfilled, (state) => {
        state.isFirstLaunch = false;
      })
      // Fetch User Data
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false; // Data loaded, stop loading
        if (action.payload) {
          state.user = {
            uid: auth.currentUser?.uid,
            email: auth.currentUser?.email,
            displayName: action.payload.displayName || auth.currentUser?.displayName || "User",
            ...action.payload
          };
          state.xp = action.payload.xp || 0;
          state.level = action.payload.level || 1;
          state.isPro = action.payload.isPro || false;
          state.hasCompletedQuiz = action.payload.hasCompletedQuiz !== undefined ? action.payload.hasCompletedQuiz : true;
          state.preferences = action.payload.preferences || null;
          state.streak = action.payload.streak || 0;
          state.lastActiveDate = action.payload.lastActiveDate || null;
        }
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isLoading = false; // Stop loading even on error
      })
      // Add XP
      .addCase(addXP.fulfilled, (state, action) => {
        state.xp = action.payload.xp;
        state.level = action.payload.level;
      })
      // Set Pro Status
      .addCase(setProStatus.fulfilled, (state, action) => {
        state.isPro = action.payload;
      })
      // Sync Subscription Data
      .addCase(syncSubscriptionData.fulfilled, (state, action) => {
        state.isPro = action.payload.isPro;
        if (state.user) {
          state.user.subscription = action.payload.subscription;
        }
      })
      // Complete Quiz
      .addCase(completeQuiz.fulfilled, (state, action) => {
        state.hasCompletedQuiz = true;
        state.preferences = action.payload;
      })
      // Update Streak
      .addCase(updateStreak.fulfilled, (state, action) => {
        if (action.payload) {
          state.streak = action.payload.streak;
          state.lastActiveDate = action.payload.lastActiveDate;
        }
      })
      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.displayName = action.payload.displayName;
        }
      });
  },
});

export const { setRevenueCatInitialized } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsPro = (state) => state.auth.isPro;
export const selectIsRevenueCatInitialized = (state) => state.auth.isRevenueCatInitialized;

export default authSlice.reducer;
