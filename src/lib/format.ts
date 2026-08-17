/**
 * Numbers ALWAYS render in Latin digits (0–9), never Arabic-Indic (٠–٩) —
 * even though the whole UI is Arabic. Route every user-facing number through
 * these helpers so the rule can never be broken by a stray locale default.
 */

const NF = new Intl.NumberFormat('en-US');

/** "1250" -> "1,250" (Latin digits, grouped). */
export function formatNumber(n: number): string {
  return NF.format(n);
}

/** Compact form for big counters: 1_200_000 -> "1.2M" (Latin). */
export function formatCompact(n: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

/** Defensive coercion: turn any Arabic-Indic digits back into Latin. */
const ARABIC_INDIC = '٠١٢٣٤٥٦٧٨٩';
export function toLatinDigits(input: string): string {
  return input.replace(/[٠-٩]/g, (d) => String(ARABIC_INDIC.indexOf(d)));
}

/**
 * Absolute dates render in ENGLISH — English month name plus Latin digits —
 * even inside Arabic copy: `17 August 2026`. Only relative phrases stay
 * Arabic, and even there the digits are Latin.
 */
const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatArticleDate(
  input: string | Date | null | undefined,
): string {
  if (!input) return '';
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return '';
  // UTC parts: an article published at 23:00 Riyadh must not read as the day
  // before for a reader in a western timezone.
  return `${date.getUTCDate()} ${EN_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** `2026-08-17` — the machine-readable half of a <time> element. */
export function toDateAttribute(
  input: string | Date | null | undefined,
): string | undefined {
  if (!input) return undefined;
  const date = input instanceof Date ? input : new Date(input);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
