import { timingSafeEqual } from 'crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

// `crypto.timingSafeEqual` doesn't exist on the edge runtime.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** A length mismatch is itself a mismatch — compare only equal-length buffers. */
function safeEqual(sent: string, expected: string): boolean {
  const a = Buffer.from(sent);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * On-demand ISR webhook. The backend calls this the instant an editor hits
 * «نشر», and the article is live within seconds — no redeploy, no rebuild.
 *
 * If Vercel Deployment Protection is on, the backend must also send
 * `x-vercel-protection-bypass`; that header gets the request TO this route,
 * the shared secret below is what authenticates it.
 */
export async function POST(request: NextRequest) {
  const sent = request.headers.get('x-cms-secret') ?? '';
  const expected = process.env.CMS_REVALIDATE_SECRET ?? '';

  if (!expected || !safeEqual(sent, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { paths?: unknown; tags?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const paths = Array.isArray(body.paths)
    ? body.paths.filter((p): p is string => typeof p === 'string')
    : [];
  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t): t is string => typeof t === 'string')
    : [];

  // Capped so a malformed (or malicious) payload can't turn one request into
  // thousands of cache invalidations.
  if (paths.length + tags.length > 200) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  // `{ expire: 0 }` rather than the 'max' stale-while-revalidate profile: an
  // editor who just hit «نشر» expects the article live now, not one request
  // later. The blocking re-fetch on the next hit is the price, and at blog
  // traffic it is a single request.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({
    ok: true,
    revalidated: { paths: paths.length, tags: tags.length },
  });
}
