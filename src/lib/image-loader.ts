/**
 * Custom `next/image` loader.
 *
 * Vercel bills image *transformations* on every cache MISS/STALE. The backend
 * already generates `-w800.webp` / `-w1600.webp` derivatives with sharp at
 * upload time, so paying Vercel to redo that work is pure waste. We keep the
 * half of `next/image` that matters — lazy loading, `sizes`, and the CLS
 * guarantee from explicit dimensions — and point it at our own files.
 *
 * Trade-off, stated plainly: no automatic AVIF and no per-device width ladder.
 * In exchange, image delivery costs nothing beyond R2/VPS bandwidth.
 */
const MEDIA_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL ?? 'https://connect.sadah-cdn.link';

// Legacy `<api>/uploads/<file>` URLs and R2 `<media>/<file>` URLs share the derivative naming.
function isOurUpload(src: string): boolean {
  return src.includes('/uploads/') || src.startsWith(`${MEDIA_URL}/`);
}

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  // Local /public assets and anything already pointing at a derivative pass
  // straight through.
  if (!isOurUpload(src)) return src;
  if (/-(w800|w1600|og)\.(webp|jpe?g)$/i.test(src)) return src;

  const base = src.replace(/\.(jpe?g|png|webp)$/i, '');
  // Only rewrite when we actually stripped a known extension — a URL with a
  // query string or an unexpected suffix is safer served as-is.
  if (base === src) return src;

  return width <= 800 ? `${base}-w800.webp` : `${base}-w1600.webp`;
}
