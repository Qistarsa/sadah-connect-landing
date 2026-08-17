'use client';

import * as React from 'react';
import type { PostHeading } from '@/lib/blog';
import { cn } from '@/lib/utils/cn';

/**
 * Table of contents with scroll-spy. Sticky on `lg+`, a collapsed `<details>`
 * on mobile so it costs no vertical space above the fold.
 *
 * Anchor clicks are handled manually because `lenis` smooth-scroll hijacks
 * native hash jumps; `scroll-mt-24` on the headings keeps the target clear of
 * the sticky header either way.
 */
export function Toc({ headings }: { headings: PostHeading[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(
    headings[0]?.id ?? null,
  );

  React.useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      // Top-weighted margin: a heading counts as "current" once it reaches the
      // upper third of the viewport, which is where the eye actually is.
      { rootMargin: '-96px 0px -66% 0px', threshold: 0 },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const jump = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Keep the URL shareable without letting the browser fight the animation.
    window.history.replaceState(null, '', `#${id}`);
  };

  const list = (
    <ul className="space-y-1.5 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.level === 3 ? 'ps-4' : undefined}>
          <a
            href={`#${heading.id}`}
            onClick={(event) => jump(event, heading.id)}
            className={cn(
              'block border-e-2 pe-3 leading-snug transition-colors',
              activeId === heading.id
                ? 'border-primary-500 font-semibold text-primary-700'
                : 'border-transparent text-foreground-muted hover:text-primary-600',
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <details className="mb-8 rounded-xl border border-gray-200 bg-white p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-bold text-navy">
          محتويات المقال
        </summary>
        <nav className="mt-3" aria-label="محتويات المقال">
          {list}
        </nav>
      </details>

      <nav
        aria-label="محتويات المقال"
        className="sticky top-24 hidden max-h-[70vh] overflow-y-auto lg:block"
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground-subtle">
          محتويات المقال
        </p>
        {list}
      </nav>
    </>
  );
}
