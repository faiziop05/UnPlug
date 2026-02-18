import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';


// TODO: Replace with your actual RevenueCat API Keys
const API_KEYS = {
    apple: '',
    google: 'goog_KsbXVIXDiFrkZYDbwthAYePhaoZ'
};

export const RevenueCatManager = {
    configure: async () => {
        if (Platform.OS === 'web') return;
        try {
            console.log("Configuring RevenueCat...", {
                platform: Platform.OS,
                hasAppleKey: !!API_KEYS.apple,
                hasGoogleKey: !!API_KEYS.google
            });

            // Enable debug logs BEFORE configuration
            Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

            if (Platform.OS === 'ios') {
                if (!API_KEYS.apple) {
                    console.error("RevenueCat: Missing Apple API Key");
                    throw new Error("Missing Apple API Key");
                }
                await Purchases.configure({ apiKey: API_KEYS.apple });
            } else if (Platform.OS === 'android') {
                if (!API_KEYS.google) {
                    console.error("RevenueCat: Missing Google API Key");
                    throw new Error("Missing Google API Key");
                }
                await Purchases.configure({ apiKey: API_KEYS.google });
            }

            console.log("RevenueCat configured successfully");
        } catch (error) {
            console.error("RevenueCat configuration failed:", error);
            throw error; // Rethrow so App.js handles it
        }
    },

    getOfferings: async () => {
        if (Platform.OS === 'web') return [];
        try {
            console.log("Fetching offerings...");
            const offerings = await Purchases.getOfferings();
            console.log("Offerings fetched:", JSON.stringify(offerings, null, 2));
            if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
                return offerings.current.availablePackages;
            }
            console.warn("No current offering or packages found.");
            return [];
        } catch (error) {
            console.error("Error fetching offerings detailed:", error);
            if (error.userInfo) {
                console.error("Error userInfo:", JSON.stringify(error.userInfo, null, 2));
            }
            return [];
        }
    },

    purchasePackage: async (packageToPurchase) => {
        if (Platform.OS === 'web') {
            alert("Purchases are not supported on web.");
            return null;
        }
        try {
            const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
            return customerInfo;
        } catch (error) {
            if (!error.userCancelled) {
                console.warn("Purchase failed:", error);
                throw error;
            }
            return null; // User cancelled
        }
    },

    restorePurchases: async () => {
        if (Platform.OS === 'web') return null;
        try {
            const customerInfo = await Purchases.restorePurchases();
            return customerInfo;
        } catch (error) {
            console.warn("Restore failed:", error);
            throw error;
        }
    },

    getCustomerInfo: async () => {
        if (Platform.OS === 'web') return null;
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            return customerInfo;
        } catch (error) {
            console.warn("Error getting customer info:", error);
            return null;
        }
    },

    // Helper to check if user is pro based on entitlement
    isPro: (customerInfo) => {
        if (!customerInfo) return false;
        // Replace 'pro' with your actual Entitlement Identifier from RevenueCat dashboard
        return typeof customerInfo.entitlements.active['UnPlug Pro'] !== "undefined";
    },

    login: async (uid) => {
        if (Platform.OS === 'web') return;
        try {
            const { customerInfo } = await Purchases.logIn(uid);
            return customerInfo;
        } catch (error) {
            console.warn("RevenueCat login failed:", error);
        }
    },

    logout: async () => {
        if (Platform.OS === 'web') return;
        try {
            await Purchases.logOut();
        } catch (error) {
            console.warn("RevenueCat logout failed:", error);
        }
    }
};
