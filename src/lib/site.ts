/** External links + nav config. Replace the app URLs with the real domains. */
export const SITE = {
  appUrl: 'https://portal.sadah.io/',
  login: 'https://portal.sadah.io/login',
  signup: 'https://portal.sadah.io/onboarding',
  whatsapp: 'https://wa.me/966535899303',
  // Companion mobile app — replace with the real store URLs once published.
  appStore: 'https://apps.apple.com/app/sadah-connect/id6784274557',
  playStore: 'https://play.google.com/store/apps/details?id=com.sadah.connect',
  // Contact + legal — replace placeholders with the real company values.
  company: 'سادة كونكت',
  supportEmail: 'support@sadah.io',
  privacyEmail: 'info@sadah.io',
} as const;

/**
 * Backend base URL for the public catalog fetch. Read server-side only
 * (the pricing section is a server component), so this needn't be a
 * `NEXT_PUBLIC_*` var — but we mirror the client app's name for one
 * convention across the monorepo. Defaults to the dev backend on :3000.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

/**
 * Public origin of this site. Used for canonicals, JSON-LD and sitemap URLs,
 * so a trailing-slash or `www` mismatch here silently breaks canonicalisation.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://connect.sadah.io';

/**
 * `#hash` entries only resolve on `/`; the nav prefixes them with `/` when the
 * reader is on a sub-page. `/blog` is a real route and needs no prefixing.
 */
export const NAV_LINKS = [
  { href: '#features', label: 'المميزات' },
  { href: '#how', label: 'كيف يعمل' },
  { href: '#pricing', label: 'الأسعار' },
  { href: '/blog', label: 'المدونة' },
] as const;
