/**
 * The one Firebase app + Firestore instance for the whole site.
 *
 * Never import this statically from a public page: it pulls in the Firebase
 * SDK. Public forms load it lazily on submit (see enquiries.js); the admin
 * pages are lazy route chunks, so they can import it directly.
 *
 * Config comes from VITE_FIREBASE_* (.env). These are public web identifiers,
 * not secrets; access is governed by firestore.rules.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
