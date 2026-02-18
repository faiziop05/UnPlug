// Web implementation of RevenueCatManager
// RevenueCat does not support web, so we return mock/empty data to prevent crashes.

export const RevenueCatManager = {
    configure: async () => {
        console.log("RevenueCatManager: configure called on web (no-op)");
    },

    getOfferings: async () => {
        console.log("RevenueCatManager: getOfferings called on web (returning empty)");
        return [];
    },

    purchasePackage: async (packageToPurchase) => {
        console.warn("RevenueCatManager: purchasePackage called on web (not supported)");
        alert("In-app purchases are not supported on the web.");
        return null;
    },

    restorePurchases: async () => {
        console.log("RevenueCatManager: restorePurchases called on web (no-op)");
        return null;
    },

    getCustomerInfo: async () => {
        console.log("RevenueCatManager: getCustomerInfo called on web (no-op)");
        return null;
    },

    isPro: (customerInfo) => {
        return false;
    }
};
