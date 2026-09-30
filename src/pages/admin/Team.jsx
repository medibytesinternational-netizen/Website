import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { UserPlus, Trash2, ShieldCheck } from 'lucide-react';
import { db } from '../../lib/firebase';
import { OWNER_EMAIL, ROLE_LABELS } from '../../lib/roles';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const dateFmt = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function useTeam() {
  const [state, setState] = useState({ status: 'loading', members: [] });
  useEffect(
    () =>
      onSnapshot(
        collection(db, 'roles'),
        (snap) =>
          setState({
            status: 'ready',
            members: snap.docs
              .map((d) => {
                const data = d.data({ serverTimestamps: 'estimate' });
                return {
                  email: d.id,
                  role: data.role,
                  addedBy: data.addedBy,
                  addedAt: data.addedAt?.toDate?.() ?? null,
                };
              })
              .filter((m) => m.email !== OWNER_EMAIL)
              .sort((a, b) => a.email.localeCompare(b.email)),
          }),
        () => setState({ status: 'error', members: [] })
      ),
    []
  );
  return state;
}

/** Admin-only: invite people and set who is an admin or a user. */
export default function Team({ myEmail }) {
  const { status, members } = useTeam();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const save = (target, newRole) =>
    setDoc(doc(db, 'roles', target), {
      role: newRole,
      addedBy: myEmail,
      addedAt: serverTimestamp(),
    });

  const invite = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    const target = email.trim().toLowerCase();
    if (!EMAIL_RE.test(target)) {
      setError('Enter a valid email address.');
      return;
    }
    if (target === OWNER_EMAIL || target === myEmail) {
      setError('That account already has full access.');
      return;
    }
    if (members.some((m) => m.email === target)) {
      setError('That person is already on the team — change their role below.');
      return;
    }
    setBusy(true);
    try {
      await save(target, role);
      setEmail('');
      setNotice(
        `Added ${target} as ${ROLE_LABELS[role]}. Ask them to open /admin/login, choose “Create an account” with this email, and verify it.`
      );
    } catch {
      setError('Couldn’t add that person. Please try again.');
    }
    setBusy(false);
  };

  const changeRole = async (m, newRole) => {
    setError('');
    setNotice('');
    try {
      await save(m.email, newRole);
    } catch {
      setError(`Couldn’t change the role for ${m.email}.`);
    }
  };

  const remove = async (m) => {
    if (!window.confirm(`Remove ${m.email}'s access to the dashboard?`)) return;
    setError('');
    setNotice('');
    try {
      await deleteDoc(doc(db, 'roles', m.email));
    } catch {
      setError(`Couldn’t remove ${m.email}.`);
    }
  };

  return (
    <>
      <div className="adm-heading">
        <h1>Team</h1>
        <p className="adm-sub">
          <strong>Admins</strong> can view, mark handled, export and delete enquiries, and manage
          the team. <strong>Users</strong> can view, mark handled and export.
        </p>
      </div>

      <form className="adm-panel adm-invite" onSubmit={invite} noValidate>
        <label className="adm-field">
          <span>Email</span>
          <input
            type="email"
            inputMode="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="adm-field">
          <span>Role</span>
          <select className="adm-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" className="adm-btn adm-btn-primary" disabled={busy}>
          <UserPlus aria-hidden="true" /> {busy ? 'Adding…' : 'Add to team'}
        </button>
      </form>

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

      <ul className="adm-list adm-team">
        <li className="adm-member">
          <div className="adm-member-who">
            <strong>{OWNER_EMAIL}</strong>
            <span>Always has full access{OWNER_EMAIL === myEmail ? ' · you' : ''}</span>
          </div>
          <span className="adm-role owner">
            <ShieldCheck aria-hidden="true" /> Owner
          </span>
        </li>

        {status === 'loading' && <li className="adm-member adm-sub">Loading team…</li>}
        {status === 'error' && (
          <li className="adm-member adm-error" role="alert">
            Couldn’t load the team. Refresh the page to try again.
          </li>
        )}

        {members.map((m) => {
          const me = m.email === myEmail;
          return (
            <li className="adm-member" key={m.email}>
              <div className="adm-member-who">
                <strong>{m.email}</strong>
                <span>
                  {me
                    ? 'You'
                    : `Set by ${m.addedBy ?? 'unknown'}${m.addedAt ? ` · ${dateFmt.format(m.addedAt)}` : ''}`}
                </span>
              </div>
              <select
                className="adm-select"
                value={m.role}
                onChange={(e) => changeRole(m, e.target.value)}
                disabled={me}
                aria-label={`Role for ${m.email}`}
                title={me ? 'You can’t change your own role' : undefined}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="button"
                className="adm-btn adm-btn-danger"
                onClick={() => remove(m)}
                disabled={me}
                aria-label={`Remove ${m.email}`}
                title={me ? 'You can’t remove yourself' : undefined}
              >
                <Trash2 aria-hidden="true" /> Remove
              </button>
            </li>
          );
        })}

        {status === 'ready' && members.length === 0 && (
          <li className="adm-member adm-sub">No one else yet — add a teammate above.</li>
        )}
      </ul>
    </>
  );
}
