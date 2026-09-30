/**
 * Stores form enquiries in Firestore (collection `enquiries`).
 *
 * The Firebase SDK is imported lazily on first submit so its ~100 kB never
 * lands on page load. Enquiries are read in the admin dashboard (/admin).
 */

export const enquiriesEnabled = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
);

/** Saves one submission; resolves on success, rejects if it could not be stored. */
export async function saveEnquiry(form, values) {
  const [{ db }, { addDoc, collection, serverTimestamp }] = await Promise.all([
    import('./firebase'),
    import('firebase/firestore'),
  ]);
  await addDoc(collection(db, 'enquiries'), {
    form,
    fields: values,
    page: window.location.pathname,
    createdAt: serverTimestamp(),
  });
}
