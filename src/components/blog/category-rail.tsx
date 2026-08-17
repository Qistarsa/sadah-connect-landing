import * as React from 'react';
import Link from 'next/link';
import { formatNumber } from '@/lib/format';
import type { Category } from '@/lib/blog';
import { cn } from '@/lib/utils/cn';

/**
 * Permanent internal links to every hub, from the highest-traffic page of the
 * blog. Cheap, and exactly the kind of link structure a crawler rewards.
 */
export function CategoryRail({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  if (categories.length === 0) return null;

  return (
    <nav aria-label="تصنيفات المدونة" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={cn(
          'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
          !activeSlug
            ? 'border-primary-600 bg-primary-600 text-white'
            : 'border-gray-200 bg-white text-navy hover:border-primary-300 hover:text-primary-700',
        )}
      >
        كل المقالات
      </Link>

      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={cn(
            'tnum rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
            activeSlug === category.slug
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'border-gray-200 bg-white text-navy hover:border-primary-300 hover:text-primary-700',
          )}
        >
          {category.name}
          <span className="ms-1.5 opacity-60">
            {formatNumber(category.postCount)}
          </span>
        </Link>
      ))}
    </nav>
  );
}
