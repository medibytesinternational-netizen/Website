import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { LockKeyhole } from 'lucide-react';
import { auth, useAuthUser } from '../../lib/auth';
import { useAdminPage } from './useAdminPage';
import './admin.css';

const MESSAGES = {
  'auth/invalid-credential': 'That email and password don’t match an account.',
  'auth/invalid-email': 'That email doesn’t look right — please check it.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many attempts. Wait a few minutes, or reset your password.',
  'auth/network-request-failed': 'Couldn’t reach the server. Check your connection and try again.',
};

export default function Login() {
  useAdminPage('Sign in | Medibytes Admin');
  const user = useAuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => setError(''), [email, password]);

  if (user) return <Navigate to="/admin" replace />;

  const signIn = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setBusy(true);
    setNotice('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(MESSAGES[err.code] ?? 'Sign-in failed. Please try again.');
      setBusy(false);
    }
  };

  const resetPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email above first, then choose “Forgot password”.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch {
      // Same message either way, so the form doesn't reveal which emails exist.
    }
    setNotice('If that email has an account, a reset link is on its way.');
  };

  return (
    <main id="main" className="adm adm-login">
      <form className="adm-login-card" onSubmit={signIn} noValidate>
        <div className="adm-login-mark" aria-hidden="true">
          <LockKeyhole />
        </div>
        <h1>Medibytes Admin</h1>
        <p className="adm-sub">Sign in to view website enquiries.</p>

        <label className="adm-field">
          <span>Email</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </label>
        <label className="adm-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && (
          <p role="alert" className="adm-error">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="adm-notice">
            {notice}
          </p>
        )}

        <button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={busy || user === undefined}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <button type="button" className="adm-link" onClick={resetPassword}>
          Forgot password?
        </button>
      </form>
    </main>
  );
}
