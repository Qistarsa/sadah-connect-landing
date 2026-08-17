import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { ArticleShell } from '@/components/blog/article-shell';
import { BlogCta } from '@/components/blog/blog-cta';
import { CategoryRail } from '@/components/blog/category-rail';
import { JsonLd, blogIndexJsonLd } from '@/components/blog/json-ld';
import { Pagination } from '@/components/blog/pagination';
import { PostCard } from '@/components/blog/post-card';
import { getBlogSettings, getCategories, getPosts } from '@/lib/blog';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSettings();
  return {
    title: settings.titleAr,
    description: settings.descriptionAr,
    alternates: {
      canonical: '/blog',
      types: { 'application/rss+xml': '/blog/rss.xml' },
    },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      siteName: settings.organizationName,
      url: '/blog',
      title: settings.titleAr,
      description: settings.descriptionAr,
    },
  };
}

export default async function BlogIndexPage() {
  const settings = await getBlogSettings();
  const [featuredPage, page, categories] = await Promise.all([
    getPosts({ featured: true, perPage: 1 }),
    getPosts({ page: 1, perPage: settings.postsPerPage }),
    getCategories(),
  ]);

  const featured = featuredPage.posts[0] ?? null;
  // A featured post already has its own slot; showing it twice above the fold
  // wastes the most valuable real estate on the page.
  const posts = featured
    ? page.posts.filter((post) => post.slug !== featured.slug)
    : page.posts;

  return (
    <ArticleShell>
      <JsonLd data={blogIndexJsonLd(settings)} />

      <section className="bg-gradient-to-b from-primary-50/60 to-white py-14 md:py-20">
        <Container>
          <h1 className="text-3xl font-extrabold leading-tight text-navy md:text-4xl lg:text-[2.6rem]">
            {settings.titleAr}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {settings.descriptionAr}
          </p>
          <div className="mt-8">
            <CategoryRail categories={categories} />
          </div>
        </Container>
      </section>

      <div className="py-12 md:py-16">
        <Container>
          {featured && (
            <div className="mb-10">
              <p className="mb-4 text-sm font-bold text-primary-700">
                مقال مختار
              </p>
              <PostCard post={featured} featured priority />
            </div>
          )}

          {posts.length === 0 && !featured ? (
            <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
              <p className="text-lg font-bold text-navy">لا توجد مقالات حاليًا</p>
              <p className="mt-2 text-foreground-muted">
                نعمل على أول مقالاتنا — عد قريبًا.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  priority={!featured && index === 0}
                />
              ))}
            </div>
          )}

          <Pagination
            page={page.page}
            totalPages={page.totalPages}
            basePath="/blog"
          />

          <BlogCta />
        </Container>
      </div>
    </ArticleShell>
  );
}
