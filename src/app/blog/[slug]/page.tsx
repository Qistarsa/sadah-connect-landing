import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies, draftMode } from 'next/headers';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { Clock, Eye } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { ArticleBody } from '@/components/blog/article-body';
import { ArticleShell } from '@/components/blog/article-shell';
import { AuthorCard, toAuthorCardModel } from '@/components/blog/author-card';
import { BlogCta } from '@/components/blog/blog-cta';
import { Breadcrumbs, type Crumb } from '@/components/blog/breadcrumbs';
import { DraftBanner } from '@/components/blog/draft-banner';
import { FaqAccordion } from '@/components/blog/faq-accordion';
import { JsonLd, articleJsonLd } from '@/components/blog/json-ld';
import { PostCard } from '@/components/blog/post-card';
import { ShareRow } from '@/components/blog/share-row';
import { Toc } from '@/components/blog/toc';
import { ViewBeacon } from '@/components/blog/view-beacon';
import { formatArticleDate, formatNumber, toDateAttribute } from '@/lib/format';
import {
  getAuthor,
  getBlogSettings,
  getPost,
  getPostPreview,
  getPosts,
  getRelated,
  resolveRedirect,
  PREVIEW_TOKEN_COOKIE,
  type PostDetail,
} from '@/lib/blog';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Only the 50 most recent articles are built ahead of time; the rest render on
 * first request and then stay cached. Build time therefore stays flat as the
 * archive grows.
 */
export async function generateStaticParams() {
  const list = await getPosts({ perPage: 50 });
  return list.posts.map((post) => ({ slug: post.slug }));
}

/**
 * `cookies()` is read ONLY inside the draft branch. During prerender Draft
 * Mode is off, so the dynamic API is never touched and the page stays
 * statically generated for real readers — the whole point of D12.
 */
async function loadPost(
  slug: string,
): Promise<{ post: PostDetail | null; isDraft: boolean }> {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const token = (await cookies()).get(PREVIEW_TOKEN_COOKIE)?.value;
    if (token) {
      // Uncached, any status, and the backend re-verifies the 15-minute token
      // on every call — so a stale draft cookie degrades to a plain 404.
      return { post: await getPostPreview(token), isDraft: true };
    }
  }
  return { post: await getPost(slug), isDraft: false };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post, isDraft } = await loadPost(decodeURIComponent(slug));
  if (!post) return {};

  const settings = await getBlogSettings();
  const title = post.seoTitle ?? `${post.title} — ${settings.organizationName}`;
  const description = post.seoDescription ?? post.excerpt;
  const image = post.ogImageUrl ?? post.coverUrl ?? settings.defaultOgImageUrl;

  return {
    title,
    description,
    alternates: {
      canonical: post.canonicalUrl ?? `/blog/${post.slug}`,
      types: { 'application/rss+xml': '/blog/rss.xml' },
    },
    // A preview must never be indexed, whatever the post's own setting says.
    robots: isDraft
      ? { index: false, follow: false }
      : post.noindex
        ? { index: false, follow: true }
        : undefined,
    openGraph: {
      type: 'article',
      locale: 'ar_SA',
      siteName: settings.organizationName,
      url: `/blog/${post.slug}`,
      title,
      description,
      ...(image
        ? {
            images: [
              { url: image, width: 1200, height: 630, alt: post.coverAlt },
            ],
          }
        : {}),
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.contentUpdatedAt ?? post.publishedAt ?? undefined,
      authors: post.author ? [post.author.name] : undefined,
      section: post.category?.name,
      tags: post.tags.map((tag) => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(settings.twitterHandle ? { site: settings.twitterHandle } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const { post, isDraft } = await loadPost(slug);

  if (!post) {
    // Slug changed? Follow the 301 the CMS wrote. Only the 404 path pays for
    // this lookup, so hot pages cost nothing.
    const target = await resolveRedirect(`/blog/${slug}`);
    if (target) {
      if (target.permanent) permanentRedirect(target.toPath);
      redirect(target.toPath);
    }
    notFound();
  }

  const [settings, related, authorProfile] = await Promise.all([
    getBlogSettings(),
    isDraft ? Promise.resolve([]) : getRelated(post.slug, 3),
    post.author ? getAuthor(post.author.slug) : Promise.resolve(null),
  ]);

  const crumbs: Crumb[] = [
    { href: '/', label: 'الرئيسية' },
    { href: '/blog', label: 'المدونة' },
    ...(post.category
      ? [
          {
            href: `/blog/category/${post.category.slug}`,
            label: post.category.name,
          },
        ]
      : []),
    { label: post.title },
  ];

  return (
    <ArticleShell>
      {!isDraft && (
        <JsonLd data={articleJsonLd(post, settings, crumbs, authorProfile)} />
      )}
      {!isDraft && <ViewBeacon slug={post.slug} />}
      {isDraft && <DraftBanner />}

      <article>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary-50/60 to-white pb-10 pt-8 md:pb-12 md:pt-12">
          <Container size="md">
            <Breadcrumbs items={crumbs} />

            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="mt-5 inline-block rounded-full bg-primary-100 px-3.5 py-1.5 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-200"
              >
                {post.category.name}
              </Link>
            )}

            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-4xl lg:text-[2.6rem]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                {post.excerpt}
              </p>
            )}

            <div className="tnum mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-subtle">
              {post.author && (
                <span className="font-semibold text-foreground">
                  {post.author.name}
                </span>
              )}
              {post.publishedAt && (
                <time dateTime={toDateAttribute(post.publishedAt)}>
                  {formatArticleDate(post.publishedAt)}
                </time>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden />
                {formatNumber(post.readingMinutes)} دقائق قراءة
              </span>
              {settings.showViewCounts && post.viewCount > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Eye className="size-3.5" aria-hidden />
                  {formatNumber(post.viewCount)}
                </span>
              )}
            </div>
          </Container>
        </section>

        {/* Cover — the LCP element. Nothing above it may be lazy. */}
        {post.coverUrl && (
          <Container size="md">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
              <Image
                src={post.coverUrl}
                alt={post.coverAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </Container>
        )}

        {/* Body + TOC */}
        <div className="py-12 md:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
              <div className="order-2 lg:order-1">
                <ArticleBody html={post.contentHtml} />

                <FaqAccordion items={post.faq} />

                <AuthorCard author={toAuthorCardModel(authorProfile)} />

                {post.tags.length > 0 && (
                  <div className="mx-auto mt-10 flex max-w-[68ch] flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-navy">الوسوم:</span>
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/blog/tag/${tag.slug}`}
                        className="rounded-full border border-gray-200 px-3 py-1 text-sm text-foreground-muted transition-colors hover:border-primary-300 hover:text-primary-700"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}

                <ShareRow slug={post.slug} title={post.title} />

                <BlogCta />
              </div>

              <aside className="order-1 lg:order-2">
                <Toc headings={post.headings} />
              </aside>
            </div>
          </Container>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-surface py-12 md:py-16">
          <Container>
            <h2 className="mb-6 text-xl font-extrabold text-navy md:text-2xl">
              مقالات ذات صلة
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </ArticleShell>
  );
}
