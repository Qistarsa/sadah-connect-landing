'use client';

import * as React from 'react';
import { Check, Link2 } from 'lucide-react';
import { SITE_URL } from './json-ld';

/**
 * WhatsApp first — it is the product, and it is how this audience actually
 * shares a link. The rest follow.
 */
export function ShareRow({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = React.useState(false);
  const url = `${SITE_URL}/blog/${slug}`;
  const text = encodeURIComponent(`${title}\n${url}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be denied; the other three buttons still work.
    }
  };

  return (
    <div className="mx-auto mt-12 flex max-w-[68ch] flex-wrap items-center gap-2">
      <span className="me-1 text-sm font-bold text-navy">شارك المقال:</span>

      <a
        href={`https://wa.me/?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-2 text-sm font-semibold text-white transition-[filter] hover:brightness-95"
      >
        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.81.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.69 8.22-8.23 8.22z" />
        </svg>
        واتساب
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gray-50"
      >
        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
          <path d="M18.9 2h3.3l-7.2 8.2L23.4 22h-6.6l-5.2-6.8L5.7 22H2.4l7.7-8.8L1.9 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20z" />
        </svg>
        X
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gray-50"
      >
        {/* lucide dropped its brand icons, so the mark is inlined. */}
        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
        لينكدإن
      </a>

      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gray-50"
      >
        {copied ? (
          <Check className="size-4 text-accent-green" aria-hidden />
        ) : (
          <Link2 className="size-4" aria-hidden />
        )}
        {copied ? 'تم النسخ' : 'نسخ الرابط'}
      </button>
    </div>
  );
}
