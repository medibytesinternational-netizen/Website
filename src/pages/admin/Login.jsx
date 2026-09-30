import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
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
  'auth/email-already-in-use': 'An account with this email already exists — sign in instead.',
  'auth/weak-password': 'Choose a password of at least 8 characters.',
  'auth/operation-not-allowed': 'New accounts are switched off. Ask an admin to create yours.',
};

export default function Login() {
  const [mode, setMode] = useState('signin'); // signin | signup
  const signup = mode === 'signup';
  useAdminPage(signup ? 'Create account | Medibytes Admin' : 'Sign in | Medibytes Admin');
  const { user } = useAuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => setError(''), [email, password, mode]);

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    if (signup && password.length < 8) {
      setError(MESSAGES['auth/weak-password']);
      return;
    }
    setBusy(true);
    setNotice('');
    try {
      if (signup) {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await sendEmailVerification(cred.user);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      setError(MESSAGES[err.code] ?? 'That didn’t work. Please try again.');
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
      <form className="adm-login-card" onSubmit={submit} noValidate>
        <div className="adm-login-mark" aria-hidden="true">
          <LockKeyhole />
        </div>
        <h1>{signup ? 'Create your account' : 'Medibytes Admin'}</h1>
        <p className="adm-sub">
          {signup
            ? 'Use the email an admin invited. You’ll verify it before you get access.'
            : 'Sign in to view website enquiries.'}
        </p>

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
          <span>Password{signup && <small> (8+ characters)</small>}</span>
          <input
            type="password"
            autoComplete={signup ? 'new-password' : 'current-password'}
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

        <button
          type="submit"
          className="adm-btn adm-btn-primary adm-btn-block"
          disabled={busy || user === undefined}
        >
          {busy ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}
        </button>
        {!signup && (
          <button type="button" className="adm-link" onClick={resetPassword}>
            Forgot password?
          </button>
        )}
        <p className="adm-switch">
          {signup ? 'Already have an account?' : 'Invited to the team?'}{' '}
          <button
            type="button"
            className="adm-link"
            onClick={() => setMode(signup ? 'signin' : 'signup')}
          >
            {signup ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </form>
    </main>
  );
}
