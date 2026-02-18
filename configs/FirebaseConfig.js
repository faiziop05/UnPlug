// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBazG1lwZyWxQ0cqOlCTJ9lURtdOYb9J7w",
  authDomain: "unplug-84000.firebaseapp.com",
  projectId: "unplug-84000",
  storageBucket: "unplug-84000.firebasestorage.app",
  messagingSenderId: "487352363512",
  appId: "1:487352363512:web:7c8736d3e64f39a3eece0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);