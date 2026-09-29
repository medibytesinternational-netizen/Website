/**
 * Single source of truth for contact details and outbound links.
 *
 * Everything the site publishes about how to reach MediBytes lives here so
 * there is exactly one place to update when a detail changes. Anything that is
 * not yet available is left null and the UI hides it rather than shipping a
 * placeholder that looks real (a fake phone number is worse than no number).
 */

export const CONTACT_EMAIL = 'medibytes@medibytesinternational.com';
export const CAREERS_EMAIL = CONTACT_EMAIL;

/** Set to e.g. '+91 44 1234 5678' once a real line exists; null hides the card. */
export const CONTACT_PHONE = null;

/** Digits-only form for tel:/wa.me links, derived from CONTACT_PHONE. */
export const CONTACT_PHONE_HREF = CONTACT_PHONE
  ? `tel:${CONTACT_PHONE.replace(/[^\d+]/g, '')}`
  : null;

/** Set to a scheduling URL (Cal.com, Calendly…) to link a real booking page. */
export const BOOKING_URL = null;

export const OFFICE_ADDRESS = {
  name: 'Medibytes',
  lines: ['No 3/8 Annaji Nagar, 2nd Cross Street West', 'KK Nagar, Chennai 600078'],
};

export const SITE_URL = 'https://medibytesinternational.com';
