import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ArticleShell } from '@/components/blog/article-shell';
import { BlogCta } from '@/components/blog/blog-cta';
import { Breadcrumbs, type Crumb } from '@/components/blog/breadcrumbs';
import { CategoryRail } from '@/components/blog/category-rail';
import { JsonLd, collectionJsonLd } from '@/components/blog/json-ld';
import { Pagination } from '@/components/blog/pagination';
import { PostCard } from '@/components/blog/post-card';
import {
  getBlogSettings,
  getCategories,
  getCategory,
  getPosts,
} from '@/lib/blog';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(decodeURIComponent(slug));
  if (!category) return {};

  return {
    title: category.seoTitle ?? `${category.name} — مدونة سادة كونكت`,
    description: category.seoDescription ?? category.description ?? undefined,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      url: `/blog/category/${category.slug}`,
      title: category.seoTitle ?? category.name,
      description: category.seoDescription ?? category.description ?? undefined,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const category = await getCategory(slug);
  if (!category) notFound();

  const settings = await getBlogSettings();
  const [list, categories] = await Promise.all([
    getPosts({ category: slug, page: 1, perPage: settings.postsPerPage }),
    getCategories(),
  ]);

  const crumbs: Crumb[] = [
    { href: '/', label: 'الرئيسية' },
    { href: '/blog', label: 'المدونة' },
    { label: category.name },
  ];

  return (
    <ArticleShell>
      <JsonLd
        data={collectionJsonLd(
          category.name,
          category.description,
          `/blog/category/${category.slug}`,
          crumbs,
        )}
      />

      <section className="bg-gradient-to-b from-primary-50/60 to-white py-12 md:py-16">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-4xl">
            {category.name}
          </h1>
          {/* Real intro copy, not a bare grid — this paragraph is most of what
              makes a hub page worth indexing. */}
          {category.description && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
              {category.description}
            </p>
          )}
          <div className="mt-8">
            <CategoryRail categories={categories} activeSlug={category.slug} />
          </div>
        </Container>
      </section>

      <div className="py-12 md:py-16">
        <Container>
          {list.posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
              <p className="text-lg font-bold text-navy">
                لا توجد مقالات في هذا التصنيف بعد
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
            basePath={`/blog/category/${category.slug}`}
          />

          <BlogCta />
        </Container>
      </div>
    </ArticleShell>
  );
}
