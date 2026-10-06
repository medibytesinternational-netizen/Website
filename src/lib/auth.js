import { useEffect, useState } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { app, firebaseConfigured } from './firebase';

/** Null when Firebase wasn't configured at build time — see firebase.js. */
export const auth = app ? getAuth(app) : null;
export { firebaseConfigured };

/**
 * Current Firebase user: `user` is undefined while Firebase is still checking,
 * then a user or null. `version` bumps on every token refresh, so screens
 * re-check things like emailVerified after `user.getIdToken(true)`.
 */
export function useAuthUser() {
  const [state, setState] = useState({ user: auth?.currentUser ?? undefined, version: 0 });
  useEffect(() => {
    if (!auth) {
      // No backend to check against — settle as signed out so callers that
      // don't check firebaseConfigured still land somewhere deterministic.
      setState((s) => (s.user === null ? s : { user: null, version: s.version + 1 }));
      return undefined;
    }
    return onIdTokenChanged(auth, (user) =>
      setState((s) => ({ user, version: s.version + 1 }))
    );
  }, []);
  return state;
}
