import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);

/** Current Firebase user: undefined while Firebase is still checking, then a user or null. */
export function useAuthUser() {
  const [user, setUser] = useState(auth.currentUser ?? undefined);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  return user;
}
