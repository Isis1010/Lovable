import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Firebase configuration
// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Check if Firebase is configured
export const isFirebaseConfigured = (): boolean => {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
};

// Lazy initialization - only initialize when needed
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export const getFirebaseAuth = (): Auth => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials.');
  }
  
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  
  if (!auth) {
    auth = getAuth(app);
  }
  
  return auth;
};

export default { getFirebaseAuth, isFirebaseConfigured };
