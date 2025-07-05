
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

// This configuration is automatically provided by Firebase App Hosting on the server.
let firebaseConfig: any = null;
if (process.env.FIREBASE_CONFIG) {
    try {
        firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    } catch (e) {
        console.error("Failed to parse FIREBASE_CONFIG:", e);
    }
}

// For client-side rendering, we fall back to the public environment variables.
// These should be configured in the App Hosting settings, NOT in a committed .env file.
if (!firebaseConfig?.apiKey) {
    firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };
}

// A function to safely get the initialized Firebase app.
export function getFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfig?.apiKey) {
    // This message will appear in server logs if the configuration is missing.
    console.error("Firebase config is missing or invalid. Firebase features will be unavailable.");
    return null;
  }
  
  // Return the existing app if it's already initialized, otherwise initialize it.
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}
