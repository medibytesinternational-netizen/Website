import { useEffect, useState } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);

/**
 * Current Firebase user: `user` is undefined while Firebase is still checking,
 * then a user or null. `version` bumps on every token refresh, so screens
 * re-check things like emailVerified after `user.getIdToken(true)`.
 */
export function useAuthUser() {
  const [state, setState] = useState({ user: auth.currentUser ?? undefined, version: 0 });
  useEffect(
    () => onIdTokenChanged(auth, (user) => setState((s) => ({ user, version: s.version + 1 }))),
    []
  );
  return state;
}
