// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbkmgujjVk1ppopikPsLxsOH7zh9LzfXg",
  authDomain: "gen-lang-client-0684439704.firebaseapp.com",
  projectId: "gen-lang-client-0684439704",
  storageBucket: "gen-lang-client-0684439704.firebasestorage.app",
  messagingSenderId: "515348212574",
  appId: "1:515348212574:web:ff9cb061f2897b632ebdcf",
  measurementId: "G-52F97L6ENG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

export { analytics };
export default app;
