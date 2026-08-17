'use client';

import * as React from 'react';

const SESSION_KEY = 'sadah:blog:session';

/**
 * Fires one aggregate view per article, per session.
 *
 * What it sends: the referrer HOST only — never the full referrer URL, which
 * can carry query strings with personal data. No cookies, no identifiers, no
 * IP stored. That keeps this outside consent scope entirely.
 *
 * It is a POST from client JS on purpose: most crawlers don't execute it,
 * which is half of why the counter stays honest. The backend adds a per-IP
 * 60-second dedupe for the other half.
 */
export function ViewBeacon({ slug }: { slug: string }) {
  React.useEffect(() => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

    let isNewSession = false;
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, '1');
        isNewSession = true;
      }
    } catch {
      // Private mode / storage disabled — count it as a plain view.
    }

    let referrerHost = '';
    try {
      referrerHost = document.referrer ? new URL(document.referrer).host : '';
    } catch {
      referrerHost = '';
    }

    void fetch(
      `${apiBase}/api/cms/posts/${encodeURIComponent(slug)}/view`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ referrerHost, isNewSession }),
        keepalive: true,
      },
      // A failed beacon must never surface to the reader.
    ).catch(() => undefined);
  }, [slug]);

  return null;
}
