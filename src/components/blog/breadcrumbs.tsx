import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export interface Crumb {
  href?: string;
  label: string;
}

/**
 * RTL breadcrumb. The chevron points LEFT because in a right-to-left line the
 * next item sits to the left — the same "forward" meaning a right chevron
 * carries in English.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسار التنقل">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-foreground-subtle">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronLeft className="size-3 shrink-0 opacity-60" aria-hidden />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="line-clamp-1 text-foreground-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
