# UnPlug

A digital wellbeing / focus app for building screen-time habits, built with React Native and Expo.

## Overview

UnPlug is a cross-platform (iOS/Android) mobile app that helps users reduce phone usage and build focus habits through structured "plans" made up of daily tasks. Users can pick a quick-start template or build a custom plan, track daily goals and streaks, journal their progress, earn XP/achievements, and get gamified feedback for staying consistent. It ships to app stores via EAS with over-the-air updates and in-app subscriptions.

## Problem it solves

Digital-detox and focus apps typically offer either rigid, one-size-fits-all challenges or unstructured timers. UnPlug gives users a plan-based framework — pick a template or build a custom multi-day plan of specific tasks — combined with streaks, daily goals, and journaling to make sticking with a digital-detox habit feel like progress rather than a restriction.

## Key features

- **Plans engine**: browse quick-start templates or create a fully custom plan (`CreateCustomPlanSheet`), track per-task completion, mark plans as favourites, and view a history of completed plans.
- **Daily goal & streak tracking**: a `DailyGoalWidget` on the home dashboard shows streak status and lets users mark a task complete to keep their streak alive.
- **Gamification**: XP/level system (`XPLevel`) and an achievements screen, giving users a game-like progression layer around habit consistency.
- **Journaling**: a dedicated journal module (`Journal`, `journalSlice`) alongside a separate free-form notes feature (`Notes`, `NoteEditor`, `notesSlice`) for reflection.
- **Firebase-backed data & auth**: Firestore stores per-user plans, templates, and favourites (`plans/fetchPlans`, `fetchTemplates`, `fetchFavorites` async thunks); Firebase Auth handles sign-in, including Google Sign-In, with session persistence to AsyncStorage for offline app restarts.
- **Subscriptions via RevenueCat**: `RevenueCatManager` (with a separate web stub) configures RevenueCat on launch, syncs subscription/customer info into Redux, and gates premium features.
- **Offline/network awareness**: a `useNetworkStatus` hook and `NoNetwork` screen prevent the app from operating in a broken state when connectivity drops.
- **OTA updates**: uses `expo-updates` to check for and apply over-the-air JS bundle updates on launch (skipped in dev), with a user-facing prompt to restart.
- **Guided tours & theming**: `rn-tourguide` for onboarding walkthroughs, plus a light/dark theme system (`themeSlice`, `theme.js`) with per-platform navigation bar styling on Android.
- **Personalization quiz** to tailor the initial plan/task recommendations to the user.

## What's unique about it

- **Template + custom plan hybrid model**: rather than forcing users into fixed challenges, plans are first-class Firestore documents that can come from a shared `templates` collection or be authored by the user, unifying both flows through the same `plansSlice` state and completion/streak logic.
- **Full commercial mobile app stack in one repo**: production concerns most side projects skip are all wired up together — RevenueCat subscriptions, Firebase Auth + Firestore, EAS OTA updates, Google Sign-In, and an app-wide `ErrorBoundary` with offline handling — rather than being a bare prototype.

## Tech stack

- React Native 0.81 + React 19, Expo SDK 54 (managed workflow, EAS)
- Redux Toolkit for state management (`plansSlice`, `authSlice`, `journalSlice`, `notesSlice`, `achievementsSlice`, `themeSlice`)
- Firebase (`firebase`, `@react-native-firebase/app`) — Auth + Firestore
- `@react-native-google-signin/google-signin` for Google OAuth
- `react-native-purchases` / `react-native-purchases-ui` (RevenueCat) for subscriptions
- React Navigation (native-stack, bottom-tabs, stack)
- `expo-updates` for OTA delivery, `expo-notifications`-adjacent alarm permissions for scheduled reminders
- `react-native-gifted-charts` for progress visualizations
- `rn-tourguide` for onboarding tours
- `@react-native-async-storage/async-storage` for local session persistence

## Setup / running instructions

```bash
npm install
```

Requires a `configs/FirebaseConfig.js` with valid Firebase project credentials and a `google-services.json` (Android) already present in the repo — verify these match your own Firebase project before running.

```bash
npm start          # expo start (Metro bundler, choose platform from the CLI/QR code)
npm run android     # expo run:android
npm run ios         # expo run:ios
npm run web         # expo start --web
```

Seed Firestore plan templates (optional, requires Firebase Admin credentials configured for the script):

```bash
node scripts/seedTemplates.js
```

Production builds/publishing are handled via EAS (`eas.json` present) — e.g. `eas build` / `eas update`.
