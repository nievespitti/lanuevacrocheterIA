
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

// This configuration is now primarily driven by environment variables.
// The build process in App Hosting will pick these up from the .env file
// in your private repository.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// A function to safely get the initialized Firebase app.
export function getFirebaseApp(): FirebaseApp | null {
  // If the config is still missing after the build, it means the .env file
  // was not configured correctly. The app will still run, but Firebase features
  // will be unavailable, and this message will appear in the server logs.
  if (!firebaseConfig?.apiKey) {
    console.error("Firebase config not found. Firebase features will be unavailable.");
    return null;
  }
  
  // Return the existing app if it's already initialized, otherwise initialize it.
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}
