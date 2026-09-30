import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Dashboard roles. This file only decides what the UI shows — the real
 * enforcement is firestore.rules, which must stay in step with it
 * (OWNER_EMAIL there is ownerEmail()).
 */
export const OWNER_EMAIL = 'medibytesinternational@gmail.com';

export const ROLE_LABELS = { owner: 'Owner', admin: 'Admin', user: 'User' };

const PERMISSIONS = {
  owner: ['view', 'handle', 'export', 'delete', 'team'],
  admin: ['view', 'handle', 'export', 'delete', 'team'],
  user: ['view', 'handle', 'export'],
};

export const can = (role, action) => Boolean(PERMISSIONS[role]?.includes(action));

/**
 * The signed-in user's role: 'loading' | 'unverified' | 'none' | 'owner' | 'admin' | 'user'.
 * `version` changes whenever the ID token refreshes (e.g. after verifying email).
 */
export function useRole(user, version) {
  const email = user?.email?.toLowerCase();
  const verified = Boolean(user?.emailVerified);
  const [role, setRole] = useState('loading');

  useEffect(() => {
    if (!user) return undefined;
    if (!verified) {
      setRole('unverified');
      return undefined;
    }
    if (email === OWNER_EMAIL) {
      setRole('owner');
      return undefined;
    }
    setRole('loading');
    return onSnapshot(
      doc(db, 'roles', email),
      (snap) => {
        const r = snap.data()?.role;
        setRole(r === 'admin' || r === 'user' ? r : 'none');
      },
      () => setRole('none')
    );
  }, [user, email, verified, version]);

  return role;
}
