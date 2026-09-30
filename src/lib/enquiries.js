/**
 * Stores form enquiries in Firestore (collection `enquiries`).
 *
 * The Firebase SDK is imported lazily on first submit so its ~100 kB never
 * lands on page load. Config comes from VITE_FIREBASE_* variables (.env);
 * these are public web identifiers, not secrets — access is governed by
 * firestore.rules, which only allows well-formed creates.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const enquiriesEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let dbPromise;

function getDb() {
  dbPromise ??= Promise.all([import('firebase/app'), import('firebase/firestore')]).then(
    ([{ initializeApp }, { getFirestore }]) => getFirestore(initializeApp(firebaseConfig))
  );
  return dbPromise;
}

/** Saves one submission; resolves on success, rejects if it could not be stored. */
export async function saveEnquiry(form, values) {
  const db = await getDb();
  const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
  await addDoc(collection(db, 'enquiries'), {
    form,
    fields: values,
    page: window.location.pathname,
    createdAt: serverTimestamp(),
  });
}
