/** External links + nav config. Replace the app URLs with the real domains. */
export const SITE = {
  appUrl: 'https://portal.sadah.io/',
  login: 'https://portal.sadah.io/login',
  signup: 'https://portal.sadah.io/onboarding',
  whatsapp: 'https://wa.me/966500000000',
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

export const NAV_LINKS = [
  { href: '#features', label: 'المميزات' },
  { href: '#how', label: 'كيف يعمل' },
  { href: '#pricing', label: 'الأسعار' },
] as const;
