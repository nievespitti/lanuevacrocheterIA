import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Firebase App Hosting provides the config as a JSON string in an environment variable.
// We fall back to the public env vars for local development.
const firebaseConfig = process.env.FIREBASE_CONFIG
  ? JSON.parse(process.env.FIREBASE_CONFIG)
  : {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

let app: FirebaseApp;
let auth: Auth;

// This check prevents Firebase from trying to initialize on the server during the build process,
// where environment variables might not be fully available.
if (firebaseConfig?.apiKey) {
  // Initialize Firebase only if it hasn't been initialized yet
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  // If the config is not available (e.g., during build), we log a warning
  // and create dummy objects. This allows the build to succeed without crashing.
  // The app will properly initialize on the client-side or server-side runtime
  // where the full config is available.
  console.warn("Firebase config not found. Firebase features may be unavailable during build.");
  app = {} as FirebaseApp; // Provide a dummy object to satisfy type requirements
  auth = {} as Auth;      // Provide a dummy object to satisfy type requirements
}

export { app, auth };
