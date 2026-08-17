import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  /** e.g. `/blog` or `/blog/category/أدلة-واتساب`. Page 1 is the bare path. */
  basePath: string;
}

/**
 * Real `<a href>` links, not buttons — deep pages must be crawlable, which is
 * the whole reason `/blog/page/2` exists as a URL at all.
 *
 * In RTL, "previous" points right and "next" points left.
 */
export function Pagination({ page, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (target: number) =>
    target === 1 ? basePath : `${basePath}/page/${target}`;

  // Windowed: first, last, and a couple either side of the current page.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1,
  );

  return (
    <nav
      aria-label="تصفّح الصفحات"
      className="tnum mt-12 flex items-center justify-center gap-1"
    >
      {page > 1 && (
        <Link
          href={hrefFor(page - 1)}
          rel="prev"
          aria-label="الصفحة السابقة"
          className="rounded-lg border border-gray-200 p-2 text-navy transition-colors hover:bg-gray-50"
        >
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      )}

      {pages.map((n, index) => (
        <React.Fragment key={n}>
          {index > 0 && n - pages[index - 1] > 1 && (
            <span className="px-1 text-foreground-subtle">…</span>
          )}
          <Link
            href={hrefFor(n)}
            aria-current={n === page ? 'page' : undefined}
            className={cn(
              'min-w-9 rounded-lg border px-3 py-2 text-center text-sm font-semibold transition-colors',
              n === page
                ? 'border-primary-600 bg-primary-600 text-white'
                : 'border-gray-200 text-navy hover:bg-gray-50',
            )}
          >
            {formatNumber(n)}
          </Link>
        </React.Fragment>
      ))}

      {page < totalPages && (
        <Link
          href={hrefFor(page + 1)}
          rel="next"
          aria-label="الصفحة التالية"
          className="rounded-lg border border-gray-200 p-2 text-navy transition-colors hover:bg-gray-50"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Link>
      )}
    </nav>
  );
}
