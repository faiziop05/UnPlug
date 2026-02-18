
import * as StoreReview from 'expo-store-review';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'user_has_rated_app';

export const checkAndRequestReview = async () => {
    try {
        const hasRated = await AsyncStorage.getItem(STORAGE_KEY);

        if (hasRated === 'true') {
            return;
        }

        if (await StoreReview.hasAction()) {
            await StoreReview.requestReview();
            await AsyncStorage.setItem(STORAGE_KEY, 'true');
        }
    } catch (error) {
        console.log("Error requesting review:", error);
    }
};
