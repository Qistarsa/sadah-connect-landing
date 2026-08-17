import * as React from 'react';
import Image from 'next/image';
import type { PostAuthor } from '@/lib/blog';

/**
 * The byline card under the article.
 *
 * Rendered UNLINKED: v1 has a single generic team byline, so an author page
 * would be a duplicate of `/blog`. It becomes a link the moment real named
 * authors exist — which is why the markup keeps the shape.
 */
export function AuthorCard({
  author,
}: {
  author: { name: string; title?: string | null; bio?: string | null; avatarUrl?: string | null } | null;
}) {
  if (!author) return null;

  return (
    <aside className="mx-auto mt-14 flex max-w-[68ch] items-start gap-4 rounded-2xl border border-gray-200 bg-primary-50/50 p-5">
      <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-primary-100">
        {author.avatarUrl ? (
          <Image
            src={author.avatarUrl}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-lg font-extrabold text-primary-700">
            {author.name.slice(0, 1)}
          </span>
        )}
      </span>

      <div className="min-w-0">
        <p className="font-extrabold text-navy">{author.name}</p>
        {author.title && (
          <p className="text-sm text-foreground-muted">{author.title}</p>
        )}
        {author.bio && (
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            {author.bio}
          </p>
        )}
      </div>
    </aside>
  );
}

export function toAuthorCardModel(profile: PostAuthor | null) {
  return profile
    ? {
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
      }
    : null;
}
