import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ArticleShell } from '@/components/blog/article-shell';
import { BlogCta } from '@/components/blog/blog-cta';
import { Breadcrumbs, type Crumb } from '@/components/blog/breadcrumbs';
import { JsonLd, collectionJsonLd } from '@/components/blog/json-ld';
import { Pagination } from '@/components/blog/pagination';
import { PostCard } from '@/components/blog/post-card';
import { formatNumber } from '@/lib/format';
import { getBlogSettings, getPosts, getTag } from '@/lib/blog';

export const revalidate = 3600;
export const dynamicParams = true;

/**
 * A tag hub earns indexing at three published posts. Below that it is thin
 * content — `noindex, follow` keeps the links flowing without asking Google
 * to rank a page with two cards on it.
 */
const INDEXABLE_THRESHOLD = 3;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTag(decodeURIComponent(slug));
  if (!tag) return {};

  const thin = tag.postCount < INDEXABLE_THRESHOLD;
  return {
    title: `${tag.name} — مدونة سادة كونكت`,
    description: `كل المقالات الموسومة بـ «${tag.name}» في مدونة سادة كونكت.`,
    alternates: { canonical: `/blog/tag/${tag.slug}` },
    robots: thin ? { index: false, follow: true } : undefined,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const tag = await getTag(slug);
  if (!tag) notFound();

  const settings = await getBlogSettings();
  const list = await getPosts({
    tag: slug,
    page: 1,
    perPage: settings.postsPerPage,
  });

  const crumbs: Crumb[] = [
    { href: '/', label: 'الرئيسية' },
    { href: '/blog', label: 'المدونة' },
    { label: tag.name },
  ];

  return (
    <ArticleShell>
      {tag.postCount >= INDEXABLE_THRESHOLD && (
        <JsonLd
          data={collectionJsonLd(
            tag.name,
            null,
            `/blog/tag/${tag.slug}`,
            crumbs,
          )}
        />
      )}

      <section className="bg-gradient-to-b from-primary-50/60 to-white py-12 md:py-14">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-2xl font-extrabold text-navy md:text-3xl">
            #{tag.name}
          </h1>
          <p className="tnum mt-2 text-foreground-muted">
            {formatNumber(tag.postCount)} مقال
          </p>
        </Container>
      </section>

      <div className="py-12 md:py-16">
        <Container>
          {list.posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
              <p className="text-lg font-bold text-navy">
                لا توجد مقالات بهذا الوسم بعد
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.posts.map((post, index) => (
                <PostCard key={post.slug} post={post} priority={index === 0} />
              ))}
            </div>
          )}

          <Pagination
            page={list.page}
            totalPages={list.totalPages}
            basePath={`/blog/tag/${tag.slug}`}
          />

          <BlogCta />
        </Container>
      </div>
    </ArticleShell>
  );
}
