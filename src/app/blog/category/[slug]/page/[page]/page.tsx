import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ArticleShell } from '@/components/blog/article-shell';
import { BlogCta } from '@/components/blog/blog-cta';
import { Breadcrumbs, type Crumb } from '@/components/blog/breadcrumbs';
import { Pagination } from '@/components/blog/pagination';
import { PostCard } from '@/components/blog/post-card';
import { formatNumber } from '@/lib/format';
import { getBlogSettings, getCategory, getPosts } from '@/lib/blog';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string; page: string }>;
}

function parsePage(raw: string): number | null {
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const page = Number(raw);
  // Page 1 already lives at the bare hub URL — two URLs, one page, is the
  // duplicate-content problem pagination is supposed to avoid.
  return page > 1 ? page : null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  if (!page) return {};

  const category = await getCategory(decodeURIComponent(slug));
  if (!category) return {};

  return {
    title: `${category.name} — صفحة ${formatNumber(page)}`,
    description: category.seoDescription ?? category.description ?? undefined,
    alternates: { canonical: `/blog/category/${category.slug}/page/${page}` },
  };
}

export default async function CategoryPaginatedPage({ params }: PageProps) {
  const { slug: rawSlug, page: rawPage } = await params;
  const page = parsePage(rawPage);
  if (!page) notFound();

  const slug = decodeURIComponent(rawSlug);
  const category = await getCategory(slug);
  if (!category) notFound();

  const settings = await getBlogSettings();
  const list = await getPosts({
    category: slug,
    page,
    perPage: settings.postsPerPage,
  });
  if (list.posts.length === 0 && page > list.totalPages) notFound();

  const crumbs: Crumb[] = [
    { href: '/', label: 'الرئيسية' },
    { href: '/blog', label: 'المدونة' },
    { href: `/blog/category/${category.slug}`, label: category.name },
    { label: `صفحة ${formatNumber(page)}` },
  ];

  return (
    <ArticleShell>
      <section className="bg-gradient-to-b from-primary-50/60 to-white py-12 md:py-14">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-2xl font-extrabold text-navy md:text-3xl">
            {category.name}
          </h1>
          <p className="tnum mt-2 text-foreground-muted">
            الصفحة {formatNumber(page)} من {formatNumber(list.totalPages)}
          </p>
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
            basePath={`/blog/category/${category.slug}`}
          />

          <BlogCta />
        </Container>
      </div>
    </ArticleShell>
  );
}
