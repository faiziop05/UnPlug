import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import plansReducer from "./slices/plansSlice";
import notesReducer from "./slices/notesSlice";
import achievementsReducer from "./slices/achievementsSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: plansReducer,
    notes: notesReducer,
    achievements: achievementsReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
