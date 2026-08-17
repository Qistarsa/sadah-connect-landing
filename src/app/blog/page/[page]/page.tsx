import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ArticleShell } from '@/components/blog/article-shell';
import { BlogCta } from '@/components/blog/blog-cta';
import { CategoryRail } from '@/components/blog/category-rail';
import { Pagination } from '@/components/blog/pagination';
import { PostCard } from '@/components/blog/post-card';
import { formatNumber } from '@/lib/format';
import { getBlogSettings, getCategories, getPosts } from '@/lib/blog';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ page: string }>;
}

function parsePage(raw: string): number | null {
  // Only bare positive integers. `?page=01` or `page/abc` are 404s, not
  // alternative URLs for the same content.
  if (!/^[1-9]\d*$/.test(raw)) return null;
  return Number(raw);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page: raw } = await params;
  const page = parsePage(raw);
  if (!page) return {};

  const settings = await getBlogSettings();
  return {
    title: `${settings.titleAr} — صفحة ${formatNumber(page)}`,
    description: settings.descriptionAr,
    // Self-canonical, never pointing back at page 1: canonicalising deep
    // pages to the index hides every article beyond the first screen.
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page: raw } = await params;
  const page = parsePage(raw);
  if (!page) notFound();
  // `/blog/page/1` is permanently redirected to `/blog` in next.config.ts.
  if (page === 1) notFound();

  const settings = await getBlogSettings();
  const [list, categories] = await Promise.all([
    getPosts({ page, perPage: settings.postsPerPage }),
    getCategories(),
  ]);

  if (list.posts.length === 0 && page > list.totalPages) notFound();

  return (
    <ArticleShell>
      <section className="bg-gradient-to-b from-primary-50/60 to-white py-12 md:py-16">
        <Container>
          <h1 className="text-2xl font-extrabold text-navy md:text-3xl">
            {settings.titleAr}
          </h1>
          <p className="tnum mt-2 text-foreground-muted">
            الصفحة {formatNumber(page)} من {formatNumber(list.totalPages)}
          </p>
          <div className="mt-6">
            <CategoryRail categories={categories} />
          </div>
        </Container>
      </section>

      <div className="py-12 md:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.posts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>

          <Pagination
            page={list.page}
            totalPages={list.totalPages}
            basePath="/blog"
          />

          <BlogCta />
        </Container>
      </div>
    </ArticleShell>
  );
}
