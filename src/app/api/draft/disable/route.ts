import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { PREVIEW_TOKEN_COOKIE } from '@/lib/blog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Exits Draft Mode and returns the reader to the public blog index. */
export async function GET() {
  const draft = await draftMode();
  draft.disable();

  // Clear the token too — leaving it behind would let a later `enable()` from
  // a stale link resurrect a preview the editor thought they had closed.
  const store = await cookies();
  store.delete(PREVIEW_TOKEN_COOKIE);

  redirect('/blog');
}
