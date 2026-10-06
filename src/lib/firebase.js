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

/**
 * False when the VITE_FIREBASE_* env vars were missing at build time (e.g. a
 * hosting deploy where they were never added). Admin screens check this and
 * render a readable "unavailable" state instead of hanging on Loading.
 */
export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let firebaseApp = null;
if (firebaseConfigured) {
  try {
    firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  } catch {
    firebaseApp = null;
  }
}

export const app = firebaseApp;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;
