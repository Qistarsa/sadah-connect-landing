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
 * In exchange, image delivery costs nothing beyond VPS bandwidth. If that ever
 * becomes the bottleneck, front `/uploads` with a CDN rather than switching
 * this loader back.
 */
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  // Local /public assets and anything already pointing at a derivative pass
  // straight through.
  if (!src.includes('/uploads/')) return src;
  if (/-(w800|w1600|og)\.(webp|jpe?g)$/i.test(src)) return src;

  const base = src.replace(/\.(jpe?g|png|webp)$/i, '');
  // Only rewrite when we actually stripped a known extension — a URL with a
  // query string or an unexpected suffix is safer served as-is.
  if (base === src) return src;

  return width <= 800 ? `${base}-w800.webp` : `${base}-w1600.webp`;
}
