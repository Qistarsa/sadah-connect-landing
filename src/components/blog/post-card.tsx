import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { formatArticleDate, formatNumber, toDateAttribute } from '@/lib/format';
import type { PostCard as PostCardModel } from '@/lib/blog';
import { cn } from '@/lib/utils/cn';

interface PostCardProps {
  post: PostCardModel;
  /** The first card on /blog is the LCP element — it must not lazy-load. */
  priority?: boolean;
  featured?: boolean;
}

export function PostCard({ post, priority = false, featured = false }: PostCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-shadow hover:shadow-card',
        featured && 'md:flex-row',
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'relative block overflow-hidden bg-primary-50',
          featured ? 'aspect-[16/10] md:aspect-auto md:w-1/2' : 'aspect-[16/10]',
        )}
        tabIndex={-1}
        aria-hidden={!post.coverUrl}
      >
        {post.coverUrl && (
          <Image
            src={post.coverUrl}
            alt={post.coverAlt}
            fill
            priority={priority}
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 560px'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="mb-2 self-start rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-200"
          >
            {post.category.name}
          </Link>
        )}

        <h3
          className={cn(
            'font-extrabold leading-snug text-navy',
            featured ? 'text-xl md:text-2xl' : 'text-lg',
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-primary-700"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
            {post.excerpt}
          </p>
        )}

        <div className="tnum mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-foreground-subtle">
          {post.publishedAt && (
            <time dateTime={toDateAttribute(post.publishedAt)}>
              {formatArticleDate(post.publishedAt)}
            </time>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" aria-hidden />
            {formatNumber(post.readingMinutes)} دقائق قراءة
          </span>
        </div>
      </div>
    </article>
  );
}
