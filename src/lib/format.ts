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
