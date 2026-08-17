import * as React from 'react';
import { Eye } from 'lucide-react';

/**
 * Shown only while Next.js Draft Mode is on. Its job is to make it impossible
 * to mistake a preview for the live article — and to give a one-click way out.
 */
export function DraftBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex flex-wrap items-center justify-center gap-3 bg-navy px-4 py-2.5 text-sm text-white">
      <span className="inline-flex items-center gap-2 font-semibold">
        <Eye className="size-4" aria-hidden />
        أنت تشاهد معاينة — هذه النسخة غير منشورة.
      </span>
      <a
        href="/api/draft/disable"
        className="rounded-lg bg-white/15 px-3 py-1 font-semibold transition-colors hover:bg-white/25"
      >
        إنهاء المعاينة
      </a>
    </div>
  );
}
