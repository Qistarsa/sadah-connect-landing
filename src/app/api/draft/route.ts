import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { PREVIEW_TOKEN_COOKIE, getPostPreview } from '@/lib/blog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Enters Next.js Draft Mode from a CMS preview token.
 *
 * This app does NOT hold the signing key — it hands the token to the backend,
 * which verifies the audience and the 15-minute expiry and returns the post at
 * any status. Draft Mode then makes the article route render dynamically per
 * request, so a preview can never poison the ISR cache.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  if (!token) {
    return new Response('رابط المعاينة غير صالح.', { status: 401 });
  }

  const post = await getPostPreview(token);
  if (!post) {
    return new Response('رابط المعاينة غير صالح أو منتهي الصلاحية.', {
      status: 401,
    });
  }

  const draft = await draftMode();
  draft.enable();

  // The token travels in an httpOnly cookie rather than a query string: a URL
  // parameter leaks through the Referer header and survives an accidental
  // copy-paste of the address bar.
  const store = await cookies();
  store.set(PREVIEW_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 15 * 60, // matches the token's own expiry
  });

  // Redirect to the slug the BACKEND returned, never to a caller-supplied
  // value — that is the open-redirect footgun in every CMS preview tutorial.
  redirect(`/blog/${encodeURIComponent(post.slug)}`);
}
