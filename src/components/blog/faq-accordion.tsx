import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import type { PostFaqItem } from '@/lib/blog';

/**
 * Native `<details>` — zero JavaScript, keyboard-operable and screen-reader
 * correct for free. The matching `FAQPage` JSON-LD is emitted by the page.
 */
export function FaqAccordion({ items }: { items: PostFaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto mt-14 max-w-[68ch]">
      <h2 className="mb-5 text-xl font-extrabold text-navy md:text-2xl">
        الأسئلة الشائعة
      </h2>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {items.map((item, index) => (
          <details key={index} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-navy">
              {item.q}
              <ChevronDown
                className="size-4 shrink-0 text-primary-500 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-foreground-muted">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
