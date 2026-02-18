import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ActivityIndicator,
    NativeModules,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../utlils/theme";
import { useSelector, useDispatch } from "react-redux";
import {
    setProStatus,
    completeQuiz,
    syncSubscriptionData,
    selectIsRevenueCatInitialized,
} from "../redux/slices/authSlice";
import { selectThemeMode } from "../redux/slices/themeSlice";
import RevenueCatUI from "react-native-purchases-ui";
import { RevenueCatManager } from "../utils/RevenueCatManager";
import Constants from "expo-constants";
import ErrorBoundary from "../components/ErrorBoundary";

const Subscription = ({ navigation, route }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const dispatch = useDispatch();

    const isRevenueCatReady = useSelector(selectIsRevenueCatInitialized);

    const { fromQuiz, preferences } = route.params || {};

    const handlePurchaseCompleted = async (customerInfo) => {

        if (RevenueCatManager.isPro(customerInfo)) {
            await dispatch(syncSubscriptionData(customerInfo));
            Alert.alert("Success", "You are now a Pro member!");
            handleSuccess();
        } else {
            Alert.alert(
                "Purchase Successful",
                "But we couldn't verify your Pro status. Please contact support."
            );
        }
    };

    const handleRestoreCompleted = async (customerInfo) => {
        if (RevenueCatManager.isPro(customerInfo)) {
            await dispatch(syncSubscriptionData(customerInfo));
            Alert.alert("Success", "Your subscription has been restored.");
            handleSuccess();
        } else {
            Alert.alert("Restore Failed", "No active subscription found to restore.");
        }
    };

    const handlePurchaseError = (error) => {
        // userCancelled is handled by onPurchaseCancelled, so we ignore it here if it comes through
        if (!error.userCancelled) {
            Alert.alert(
                "Purchase Failed",
                error.message || "An error occurred during purchase."
            );
        }
    };

    const handlePurchaseCancelled = () => {
        // Optional: You can show an alert or just do nothing
        // Alert.alert("Cancelled", "Purchase was cancelled.");
    };

    const handleSuccess = async () => {
        if (fromQuiz && preferences) {
            await dispatch(completeQuiz(preferences));
            navigation.replace("BottomTabStack");
        } else {
            navigation.goBack();
        }
    };

    const handleDismiss = async () => {
        console.log("handleDismiss called. fromQuiz:", fromQuiz, "preferences:", !!preferences);
        if (fromQuiz && preferences) {
            console.log("Skipping paywall, saving quiz and navigating to BottomTabStack");
            // User skipped paywall during onboarding
            // We still need to save their preferences and mark quiz as complete
            await dispatch(completeQuiz(preferences));
            navigation.replace("BottomTabStack");
        } else {
            console.log("Going back");
            navigation.goBack();
        }
    };

    const isExpoGo = Constants.executionEnvironment === "storeClient";
    const isNativeModuleAvailable = !!NativeModules.RNPurchases;

    if (!isRevenueCatReady) {
        return (
            <View style={[styles.container, { backgroundColor: t.background.main, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={t.brand.primary} />
                <Text style={{ marginTop: 10, color: t.text.primary }}>Loading products...</Text>
            </View>
        );
    }

    if (Platform.OS === "web" || isExpoGo || !isNativeModuleAvailable) {
        return (
            <SafeAreaView
                style={[
                    styles.container,
                    {
                        backgroundColor: t.background.main,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                <Text style={{ color: t.text.primary, fontSize: 18, marginBottom: 20 }}>
                    {Platform.OS === "web"
                        ? "Subscriptions not supported on Web."
                        : "Paywall not supported in this environment."}
                </Text>
                <Text
                    style={{
                        color: t.text.secondary,
                        marginBottom: 20,
                        textAlign: "center",
                        paddingHorizontal: 20,
                    }}
                >
                    {Platform.OS === "web"
                        ? "Please use the mobile app to subscribe."
                        : "RevenueCat Paywall requires a Development Build with native code. Please rebuild your app with 'npx expo run:android' or 'npx expo run:ios'."}
                </Text>
                <Text
                    onPress={() => navigation.goBack()}
                    style={{ color: t.brand.primary, fontSize: 16 }}
                >
                    Go Back
                </Text>
            </SafeAreaView>
        );
    }

    console.log("Subscription Screen Rendering");

    return (
        <View style={[styles.container, { backgroundColor: t.background.main }]}>
            <ErrorBoundary>
                <RevenueCatUI.Paywall
                    onPurchaseCompleted={({ customerInfo }) =>
                        handlePurchaseCompleted(customerInfo)
                    }
                    onRestoreCompleted={({ customerInfo }) =>
                        handleRestoreCompleted(customerInfo)
                    }
                    onPurchaseError={({ error }) => handlePurchaseError(error)}
                    onPurchaseCancelled={handlePurchaseCancelled}
                    onDismiss={handleDismiss}
                />
            </ErrorBoundary>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default Subscription;