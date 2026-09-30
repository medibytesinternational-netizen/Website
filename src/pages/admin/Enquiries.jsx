import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import {
  Check,
  ChevronDown,
  Download,
  Inbox,
  Mail,
  MessageCircle,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { can } from '../../lib/roles';

const FORMS = { contact: 'Contact', demo: 'Demo request' };
const FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  message: 'Message',
  facility: 'Facility type',
  whatsapp: 'WhatsApp',
};
const MAX_ROWS = 500;

const dateFmt = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const formatDate = (d) => (d ? dateFmt.format(d) : 'Just now');

/** One-line summary of whatever the form collected beyond name and email. */
function preview(e) {
  if (e.fields.message) return e.fields.message;
  return [e.fields.facility, e.fields.whatsapp].filter(Boolean).join(' · ');
}

function toCsv(rows) {
  const cols = ['received', 'form', 'status', ...Object.keys(FIELD_LABELS), 'page'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((e) =>
    [
      e.createdAt?.toISOString() ?? '',
      FORMS[e.form] ?? e.form,
      e.status,
      ...Object.keys(FIELD_LABELS).map((k) => e.fields[k]),
      e.page,
    ]
      .map(esc)
      .join(',')
  );
  return [cols.map(esc).join(','), ...lines].join('\r\n');
}

function downloadCsv(rows) {
  const blob = new Blob(['﻿' + toCsv(rows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), {
    href: url,
    download: `medibytes-enquiries-${new Date().toISOString().slice(0, 10)}.csv`,
  });
  a.click();
  URL.revokeObjectURL(url);
}

function useEnquiries(enabled) {
  const [state, setState] = useState({ status: 'loading', rows: [] });

  useEffect(() => {
    if (!enabled) return undefined;
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'), limit(MAX_ROWS));
    return onSnapshot(
      q,
      (snap) =>
        setState({
          status: 'ready',
          rows: snap.docs.map((d) => {
            const data = d.data({ serverTimestamps: 'estimate' });
            return {
              id: d.id,
              form: data.form,
              fields: data.fields ?? {},
              page: data.page ?? '',
              status: data.status ?? 'new',
              createdAt: data.createdAt?.toDate?.() ?? null,
            };
          }),
        }),
      (err) =>
        setState({
          status: err.code === 'permission-denied' ? 'denied' : 'error',
          rows: [],
        })
    );
  }, [enabled]);

  return state;
}

/** The enquiries inbox. What the viewer may do depends on `role` (see lib/roles.js). */
export default function Enquiries({ role }) {
  const { status, rows } = useEnquiries(true);
  const [formFilter, setFormFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);
  const [actionError, setActionError] = useState('');

  const counts = useMemo(
    () => ({
      all: rows.length,
      new: rows.filter((e) => e.status === 'new').length,
      contact: rows.filter((e) => e.form === 'contact').length,
      demo: rows.filter((e) => e.form === 'demo').length,
    }),
    [rows]
  );

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter(
      (e) =>
        (formFilter === 'all' || e.form === formFilter) &&
        (statusFilter === 'all' || e.status === statusFilter) &&
        (!term || Object.values(e.fields).some((v) => String(v).toLowerCase().includes(term)))
    );
  }, [rows, formFilter, statusFilter, search]);

  const run = async (fn) => {
    setActionError('');
    try {
      await fn();
    } catch {
      setActionError('That change couldn’t be saved. Please try again.');
    }
  };

  const toggleHandled = (e) =>
    run(() =>
      updateDoc(doc(db, 'enquiries', e.id), { status: e.status === 'handled' ? 'new' : 'handled' })
    );

  const remove = (e) => {
    const who = e.fields.name || e.fields.email || 'this enquiry';
    if (!window.confirm(`Delete the enquiry from ${who}? This can’t be undone.`)) return;
    run(() => deleteDoc(doc(db, 'enquiries', e.id)));
  };

  return (
    <>
      <div className="adm-heading">
        <h1>Enquiries</h1>
        <p className="adm-sub">
          Submissions from the Contact and Demo forms, newest first. Updates live.
        </p>
      </div>

      {status === 'denied' && (
        <div className="adm-panel adm-empty" role="alert">
          <h2>No access</h2>
          <p>Your role doesn’t include viewing enquiries. Ask an admin to check your access.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="adm-panel adm-empty" role="alert">
          <h2>Couldn’t load enquiries</h2>
          <p>Check your connection and refresh the page.</p>
        </div>
      )}
      {status === 'loading' && <div className="adm-panel adm-empty">Loading enquiries…</div>}

      {status === 'ready' && (
        <>
          <section className="adm-stats" aria-label="Summary">
            <Stat label="Total" value={counts.all} />
            <Stat label="New" value={counts.new} accent />
            <Stat label="Contact" value={counts.contact} />
            <Stat label="Demo requests" value={counts.demo} />
          </section>

          <div className="adm-toolbar">
            <div className="adm-tabs" role="tablist" aria-label="Form">
              {[
                ['all', 'All', counts.all],
                ['contact', 'Contact', counts.contact],
                ['demo', 'Demo', counts.demo],
              ].map(([key, label, n]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={formFilter === key}
                  className={formFilter === key ? 'active' : ''}
                  onClick={() => setFormFilter(key)}
                >
                  {label} <span>{n}</span>
                </button>
              ))}
            </div>
            <select
              className="adm-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Status"
            >
              <option value="all">Any status</option>
              <option value="new">New</option>
              <option value="handled">Handled</option>
            </select>
            <label className="adm-search">
              <Search aria-hidden="true" />
              <input
                type="search"
                placeholder="Search name, email, message…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search enquiries"
              />
            </label>
            {can(role, 'export') && (
              <button
                type="button"
                className="adm-btn adm-btn-ghost"
                onClick={() => downloadCsv(visible)}
                disabled={!visible.length}
              >
                <Download aria-hidden="true" /> Export CSV
              </button>
            )}
          </div>

          {actionError && (
            <p role="alert" className="adm-error">
              {actionError}
            </p>
          )}

          {visible.length === 0 ? (
            <div className="adm-panel adm-empty">
              <Inbox aria-hidden="true" />
              <h2>{rows.length ? 'No matches' : 'No enquiries yet'}</h2>
              <p>
                {rows.length
                  ? 'Nothing matches these filters. Try clearing the search.'
                  : 'Submissions from the website forms will appear here as they arrive.'}
              </p>
            </div>
          ) : (
            <ul className="adm-list">
              {visible.map((e) => (
                <EnquiryRow
                  key={e.id}
                  e={e}
                  open={openId === e.id}
                  onToggle={() => setOpenId(openId === e.id ? null : e.id)}
                  onHandled={can(role, 'handle') ? () => toggleHandled(e) : null}
                  onDelete={can(role, 'delete') ? () => remove(e) : null}
                />
              ))}
            </ul>
          )}
          {rows.length === MAX_ROWS && (
            <p className="adm-sub adm-footnote">Showing the latest {MAX_ROWS} enquiries.</p>
          )}
        </>
      )}
    </>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className={`adm-stat${accent ? ' accent' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EnquiryRow({ e, open, onToggle, onHandled, onDelete }) {
  const handled = e.status === 'handled';
  const panelId = `enq-${e.id}`;
  return (
    <li className={`adm-row${handled ? ' handled' : ''}${open ? ' open' : ''}`}>
      <button
        type="button"
        className="adm-row-main"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span
          className={`adm-dot${handled ? '' : ' new'}`}
          aria-label={handled ? 'Handled' : 'New'}
        />
        <span className="adm-row-who">
          <strong>{e.fields.name || '(no name)'}</strong>
          <span>{e.fields.email}</span>
        </span>
        <span className={`adm-badge ${e.form}`}>{FORMS[e.form] ?? e.form}</span>
        <span className="adm-row-preview">{preview(e)}</span>
        <time className="adm-row-date" dateTime={e.createdAt?.toISOString()}>
          {formatDate(e.createdAt)}
        </time>
        <ChevronDown className="adm-chev" aria-hidden="true" />
      </button>

      {open && (
        <div className="adm-row-detail" id={panelId}>
          <dl>
            {Object.keys(FIELD_LABELS)
              .filter((k) => e.fields[k])
              .map((k) => (
                <div key={k} className={k === 'message' ? 'wide' : ''}>
                  <dt>{FIELD_LABELS[k]}</dt>
                  <dd>{e.fields[k]}</dd>
                </div>
              ))}
            <div>
              <dt>Received</dt>
              <dd>{formatDate(e.createdAt)}</dd>
            </div>
            <div>
              <dt>Sent from</dt>
              <dd>{e.page || '—'}</dd>
            </div>
          </dl>
          <div className="adm-row-actions">
            {e.fields.email && (
              <a className="adm-btn adm-btn-primary" href={`mailto:${e.fields.email}`}>
                <Mail aria-hidden="true" /> Reply by email
              </a>
            )}
            {e.fields.whatsapp && (
              <a
                className="adm-btn adm-btn-ghost"
                href={`https://wa.me/${e.fields.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" /> WhatsApp
              </a>
            )}
            {onHandled && (
              <button type="button" className="adm-btn adm-btn-ghost" onClick={onHandled}>
                {handled ? <RotateCcw aria-hidden="true" /> : <Check aria-hidden="true" />}
                {handled ? 'Mark as new' : 'Mark handled'}
              </button>
            )}
            {onDelete && (
              <button type="button" className="adm-btn adm-btn-danger" onClick={onDelete}>
                <Trash2 aria-hidden="true" /> Delete
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
