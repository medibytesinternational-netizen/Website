import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { LogOut, MailCheck } from 'lucide-react';
import { auth, useAuthUser } from '../../lib/auth';
import { can, ROLE_LABELS, useRole } from '../../lib/roles';
import { useAdminPage } from './useAdminPage';
import Enquiries from './Enquiries';
import Team from './Team';
import './admin.css';

/**
 * /admin shell: gates on sign-in → verified email → role, then shows the
 * sections that role may use. Firestore rules enforce the same checks.
 */
export default function Dashboard({ section = 'enquiries' }) {
  useAdminPage(section === 'team' ? 'Team | Medibytes Admin' : 'Enquiries | Medibytes Admin');
  const { user, version } = useAuthUser();
  const role = useRole(user, version);

  if (user === undefined)
    return (
      <main id="main" className="adm adm-center">
        Loading…
      </main>
    );
  if (!user) return <Navigate to="/admin/login" replace />;

  const email = user.email.toLowerCase();
  const allowed = role === 'owner' || role === 'admin' || role === 'user';
  if (section === 'team' && allowed && !can(role, 'team')) return <Navigate to="/admin" replace />;

  return (
    <main id="main" className="adm adm-dash">
      <header className="adm-top">
        <div className="adm-top-left">
          <div className="adm-brand">
            Medibytes<span>.</span> <em>Admin</em>
          </div>
          {allowed && can(role, 'team') && (
            <nav className="adm-nav" aria-label="Dashboard">
              <NavLink to="/admin" end>
                Enquiries
              </NavLink>
              <NavLink to="/admin/team">Team</NavLink>
            </nav>
          )}
        </div>
        <div className="adm-user">
          <span title={email}>{email}</span>
          {allowed && <span className={`adm-role ${role}`}>{ROLE_LABELS[role]}</span>}
          <button type="button" className="adm-btn adm-btn-ghost" onClick={() => signOut(auth)}>
            <LogOut aria-hidden="true" /> <span className="adm-hide-sm">Sign out</span>
          </button>
        </div>
      </header>

      <div className="adm-wrap">
        {role === 'loading' && <div className="adm-panel adm-empty">Checking your access…</div>}
        {role === 'unverified' && <VerifyEmail user={user} />}
        {role === 'none' && (
          <div className="adm-panel adm-empty" role="alert">
            <h2>No access yet</h2>
            <p>
              <strong>{email}</strong> isn’t on the team. Ask an admin to add this email from the
              Team tab, then refresh this page.
            </p>
          </div>
        )}
        {allowed && section === 'team' && <Team myEmail={email} />}
        {allowed && section !== 'team' && <Enquiries role={role} />}
      </div>
    </main>
  );
}

function VerifyEmail({ user }) {
  const [state, setState] = useState('idle'); // idle | sending | sent | checking | still
  const [error, setError] = useState('');

  const resend = async () => {
    setError('');
    setState('sending');
    try {
      await sendEmailVerification(user);
      setState('sent');
    } catch (err) {
      setState('idle');
      setError(
        err.code === 'auth/too-many-requests'
          ? 'A link was sent recently — check your inbox (and spam) before asking again.'
          : 'Couldn’t send the email. Please try again.'
      );
    }
  };

  const recheck = async () => {
    setError('');
    setState('checking');
    await user.reload();
    if (user.emailVerified) {
      await user.getIdToken(true); // new token carries email_verified; the shell re-renders
    } else {
      setState('still');
    }
  };

  return (
    <div className="adm-panel adm-empty">
      <MailCheck aria-hidden="true" />
      <h2>Verify your email</h2>
      <p>
        We need to confirm <strong>{user.email}</strong> belongs to you before showing any
        enquiries. Open the link we emailed you, then come back here.
      </p>
      {state === 'sent' && <p className="adm-notice adm-inline">Verification email sent.</p>}
      {state === 'still' && (
        <p className="adm-error adm-inline">Not verified yet — open the link in the email first.</p>
      )}
      {error && <p className="adm-error adm-inline">{error}</p>}
      <div className="adm-empty-actions">
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={recheck}
          disabled={state === 'checking'}
        >
          {state === 'checking' ? 'Checking…' : 'I’ve verified it'}
        </button>
        <button
          type="button"
          className="adm-btn adm-btn-ghost"
          onClick={resend}
          disabled={state === 'sending'}
        >
          {state === 'sending' ? 'Sending…' : 'Send the email again'}
        </button>
      </div>
    </div>
  );
}
