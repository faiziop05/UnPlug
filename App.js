import { StyleSheet, Text, View, Alert } from "react-native";
import MainStack from "./navigation/MainStack.js";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect, useState, useCallback } from "react";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import NoNetwork from "./components/NoNetwork";
import { initializeTheme, selectThemeMode } from "./src/redux/slices/themeSlice";
import { syncSubscriptionData, setRevenueCatInitialized, signInUser, loadUserSession } from "./src/redux/slices/authSlice";
import { auth } from "./configs/FirebaseConfig";
import * as NavigationBar from 'expo-navigation-bar';
import { useTheme } from "./utlils/theme";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RevenueCatManager } from "./src/utils/RevenueCatManager";
import ErrorBoundary from "./components/ErrorBoundary";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const dispatch = useDispatch();
  const { isOffline } = useNetworkStatus();
  const [appIsReady, setAppIsReady] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [manualRetry, setManualRetry] = useState(0);
  const themeMode = useSelector(selectThemeMode);
  const t = useTheme(themeMode);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(t.background.main);
      NavigationBar.setButtonStyleAsync(t.mode === 'light' ? 'dark' : 'light');
    }
  }, [t, themeMode]);

  // Check for OTA Updates
  useEffect(() => {
    async function onFetchUpdateAsync() {
      if (__DEV__) {
        return;
      }
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert(
            'Update Available',
            'A new version of the app is available. Restart now to apply changes?',
            [
              { text: 'Later', style: 'cancel' },
              {
                text: 'Restart',
                onPress: async () => {
                  try {
                    await Updates.reloadAsync();
                  } catch (e) {
                    Alert.alert('Error', 'Failed to restart app. Please restart manually.');
                    console.error(e);
                  }
                }
              }
            ]
          );
        }
      } catch (error) {
        // Only log errors in production if needed, or ignore
        console.log(`Error fetching latest Expo update: ${error}`);
      }
    }

    onFetchUpdateAsync();
  }, []);

  // Firebase Auth State Listener - This handles session restoration
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in - sync with Redux
          console.log("App.js: Firebase user detected:", user.uid);
          await dispatch(signInUser(user.uid));
        } else {
          // No user signed in - load session from AsyncStorage
          console.log("App.js: No Firebase user, loading from AsyncStorage");
          await dispatch(loadUserSession());
        }
      } catch (error) {
        console.error("App.js: Error in auth state change handler", error);
      } finally {
        setAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for auth check to complete
        if (!authChecked) {
          return;
        }

        // Only initialize theme if not already done, but here it's safe to call idempotently or it's cheap
        dispatch(initializeTheme());

        // Initialize RevenueCat
        try {
          // If we are offline, this might fail or just not work. 
          // We will retry when isOffline changes or manualRetry changes.
          await RevenueCatManager.configure();

          // ONLY dispatch this if configure() succeeds
          dispatch(setRevenueCatInitialized(true));

          // Sync Subscription Status (Check for cancellations/expirations)
          const customerInfo = await RevenueCatManager.getCustomerInfo();
          if (customerInfo) {
            await dispatch(syncSubscriptionData(customerInfo));
          }
        } catch (rcError) {
          console.error("App.js: RevenueCat initialization failed", rcError);
          // Don't mark as initialized if it failed
          // App will still work, but subscription features will be disabled
        }

      } catch (e) {
        console.error("App.js: Error in prepare()", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [dispatch, authChecked, isOffline, manualRetry]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("App.js: Error hiding splash screen", e);
      }
    }
  }, [appIsReady]);

  const handleRetry = () => {
    // Trigger a re-run of the prepare effect
    setManualRetry(prev => prev + 1);
  };

  if (!appIsReady) {
    return null;
  }

  if (isOffline) {
    return (
      <View style={{ flex: 1, backgroundColor: t.background.main }} onLayout={onLayoutRootView}>
        <StatusBar
          style={t.mode === 'light' ? 'dark' : 'light'}
          backgroundColor={t.background.main}
        />
        <NoNetwork onRetry={handleRetry} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer style={styles.container}>
        <StatusBar
          style={t.mode === 'light' ? 'dark' : 'light'}
          backgroundColor={t.background.main}
        />
        <MainStack />
      </NavigationContainer>
    </View>
  );
}



export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
});
