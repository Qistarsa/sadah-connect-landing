/**
 * Blog data for the marketing site, sourced from the backend's public CMS
 * (`GET /api/cms/*`). Every fetch is server-side, so there is no CORS hop and
 * the HTML ships pre-rendered and crawlable.
 *
 * Mirrors the discipline of `plans.ts`: typed wire shapes → view models →
 * graceful degradation. A backend blip must never blank the marketing site,
 * so list fetches fall back to an empty page and detail fetches to `null`.
 */
import { API_BASE } from './site';

// ─── View models ────────────────────────────────────────────────────────────

export interface TaxonomyRef {
  slug: string;
  name: string;
  color?: string | null;
}

export interface PostAuthor {
  slug: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatarUrl: string | null;
  links: string[] | null;
}

export interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  coverAlt: string;
  readingMinutes: number;
  viewCount: number;
  publishedAt: string | null;
  featured: boolean;
  category: TaxonomyRef | null;
  author: { slug: string; name: string; avatarUrl: string | null } | null;
  tags: TaxonomyRef[];
}

export interface PostHeading {
  id: string;
  text: string;
  level: number;
}

export interface PostFaqItem {
  q: string;
  a: string;
}

export interface PostDetail extends PostCard {
  contentHtml: string;
  contentText: string;
  headings: PostHeading[];
  faq: PostFaqItem[];
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  noindex: boolean;
  ogImageUrl: string | null;
  contentUpdatedAt: string | null;
  authorProfile: PostAuthor | null;
}

export interface PostListPage {
  posts: PostCard[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface Category extends TaxonomyRef {
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  postCount: number;
}

export interface Tag extends TaxonomyRef {
  postCount: number;
}

export interface SitemapEntry {
  path: string;
  updatedAt: string;
  priority: number;
}

export interface BlogSettings {
  titleAr: string;
  descriptionAr: string;
  postsPerPage: number;
  defaultOgImageUrl: string | null;
  organizationName: string;
  organizationLogoUrl: string | null;
  twitterHandle: string | null;
  showViewCounts: boolean;
  relatedPostsCount: number;
}

export interface FeedPayload {
  title: string;
  description: string;
  items: {
    slug: string;
    title: string;
    excerpt: string | null;
    contentHtml: string | null;
    publishedAt: string | null;
    category: string | null;
    author: string | null;
  }[];
}

// ─── Cache tags (mirrored by the backend's RevalidateService) ───────────────

export const TAGS = {
  index: 'blog:index',
  sitemap: 'blog:sitemap',
  post: (slug: string) => `blog:post:${slug}`,
  category: (slug: string) => `blog:category:${slug}`,
  tag: (slug: string) => `blog:tag:${slug}`,
} as const;

/** Time-based safety net: even with no webhook, staleness is bounded at 1h. */
const REVALIDATE_SECONDS = 3600;

/**
 * Where the CMS preview token lives while Draft Mode is on. httpOnly, and
 * deliberately not a query parameter: a token in the URL leaks through the
 * Referer header and survives a copy-paste of the address bar.
 */
export const PREVIEW_TOKEN_COOKIE = 'cms-preview-token';

// ─── Wire shapes ────────────────────────────────────────────────────────────

interface WireTaxonomy {
  slug: string;
  name: string;
  color?: string | null;
  avatarUrl?: string | null;
}

interface WirePostCard {
  slug: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  coverAlt: string | null;
  ogImageUrl: string | null;
  featured: boolean;
  noindex: boolean;
  readingMinutes: number;
  viewCount: number;
  publishedAt: string | null;
  contentUpdatedAt: string | null;
  category: WireTaxonomy | null;
  author: WireTaxonomy | null;
  tags: WireTaxonomy[];
}

interface WirePostDetail extends WirePostCard {
  contentHtml: string | null;
  contentText: string | null;
  headings: PostHeading[] | null;
  faq: PostFaqItem[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
}

interface Envelope<T> {
  data?: T;
}

// ─── Fetch helper ───────────────────────────────────────────────────────────

async function cms<T>(
  path: string,
  init: { tags?: string[]; noStore?: boolean } = {},
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api/cms${path}`, {
      ...(init.noStore
        ? { cache: 'no-store' as const }
        : {
            next: {
              revalidate: REVALIDATE_SECONDS,
              tags: init.tags ?? [TAGS.index],
            },
          }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as Envelope<T> | T;
    return (body as Envelope<T>)?.data !== undefined
      ? ((body as Envelope<T>).data as T)
      : (body as T);
  } catch {
    // Deliberately silent: the caller decides what an outage looks like.
    return null;
  }
}

// ─── Mappers ────────────────────────────────────────────────────────────────

function mapCard(post: WirePostCard): PostCard {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    coverUrl: post.coverUrl,
    coverAlt: post.coverAlt ?? '',
    readingMinutes: post.readingMinutes,
    viewCount: post.viewCount,
    publishedAt: post.publishedAt,
    featured: post.featured,
    category: post.category
      ? {
          slug: post.category.slug,
          name: post.category.name,
          color: post.category.color ?? null,
        }
      : null,
    author: post.author
      ? {
          slug: post.author.slug,
          name: post.author.name,
          avatarUrl: post.author.avatarUrl ?? null,
        }
      : null,
    tags: (post.tags ?? []).map((tag) => ({ slug: tag.slug, name: tag.name })),
  };
}

function mapDetail(post: WirePostDetail): PostDetail {
  return {
    ...mapCard(post),
    contentHtml: post.contentHtml ?? '',
    contentText: post.contentText ?? '',
    headings: post.headings ?? [],
    faq: post.faq ?? [],
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    canonicalUrl: post.canonicalUrl,
    noindex: post.noindex,
    ogImageUrl: post.ogImageUrl,
    contentUpdatedAt: post.contentUpdatedAt,
    authorProfile: null,
  };
}

// ─── Reads ──────────────────────────────────────────────────────────────────

const EMPTY_PAGE: PostListPage = {
  posts: [],
  page: 1,
  perPage: 12,
  total: 0,
  totalPages: 1,
};

export async function getPosts(params: {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  author?: string;
  q?: string;
  featured?: boolean;
} = {}): Promise<PostListPage> {
  const search = new URLSearchParams();
  if (params.page) search.set('page', String(params.page));
  if (params.perPage) search.set('perPage', String(params.perPage));
  if (params.category) search.set('category', params.category);
  if (params.tag) search.set('tag', params.tag);
  if (params.author) search.set('author', params.author);
  if (params.q) search.set('q', params.q);
  if (params.featured) search.set('featured', 'true');

  const tags: string[] = [TAGS.index];
  if (params.category) tags.push(TAGS.category(params.category));
  if (params.tag) tags.push(TAGS.tag(params.tag));

  const data = await cms<{
    rows: WirePostCard[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  }>(`/posts?${search.toString()}`, { tags });

  // An outage renders an empty state, never a 500 — the rest of the page
  // (nav, footer, CTA) is still worth serving.
  if (!data) return EMPTY_PAGE;

  return {
    posts: data.rows.map(mapCard),
    page: data.page,
    perPage: data.perPage,
    total: data.total,
    totalPages: data.totalPages,
  };
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const data = await cms<WirePostDetail>(
    `/posts/${encodeURIComponent(slug)}`,
    { tags: [TAGS.post(slug), TAGS.index] },
  );
  return data ? mapDetail(data) : null;
}

/**
 * Draft Mode only. Uncached and short-lived: the backend verifies the token's
 * audience and 15-minute expiry on every call, so a stale preview cookie
 * degrades to a normal 404 rather than an open door.
 */
export async function getPostPreview(token: string): Promise<PostDetail | null> {
  const data = await cms<WirePostDetail>(
    `/preview/${encodeURIComponent(token)}`,
    { noStore: true },
  );
  return data ? mapDetail(data) : null;
}

export async function getRelated(
  slug: string,
  limit = 3,
): Promise<PostCard[]> {
  const data = await cms<WirePostCard[]>(
    `/posts/${encodeURIComponent(slug)}/related?limit=${limit}`,
    { tags: [TAGS.post(slug), TAGS.index] },
  );
  return (data ?? []).map(mapCard);
}

export async function getCategories(): Promise<Category[]> {
  const data = await cms<
    (WireTaxonomy & {
      description: string | null;
      seoTitle: string | null;
      seoDescription: string | null;
      postCount: number;
    })[]
  >('/categories', { tags: [TAGS.index] });

  return (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    color: row.color ?? null,
    description: row.description,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    postCount: row.postCount,
  }));
}

export async function getCategory(slug: string): Promise<Category | null> {
  const data = await cms<
    WireTaxonomy & {
      description: string | null;
      seoTitle: string | null;
      seoDescription: string | null;
      postCount: number;
    }
  >(`/categories/${encodeURIComponent(slug)}`, {
    tags: [TAGS.category(slug), TAGS.index],
  });
  if (!data) return null;
  return {
    slug: data.slug,
    name: data.name,
    color: data.color ?? null,
    description: data.description,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    postCount: data.postCount,
  };
}

export async function getTag(slug: string): Promise<Tag | null> {
  const data = await cms<WireTaxonomy & { postCount: number }>(
    `/tags/${encodeURIComponent(slug)}`,
    { tags: [TAGS.tag(slug), TAGS.index] },
  );
  return data
    ? { slug: data.slug, name: data.name, postCount: data.postCount }
    : null;
}

export async function getAuthor(slug: string): Promise<PostAuthor | null> {
  const data = await cms<{
    slug: string;
    name: string;
    title: string | null;
    bio: string | null;
    avatarUrl: string | null;
    links: string[] | null;
  }>(`/authors/${encodeURIComponent(slug)}`, { tags: [TAGS.index] });
  return data ?? null;
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  return (await cms<SitemapEntry[]>('/sitemap', { tags: [TAGS.sitemap] })) ?? [];
}

export async function getFeed(): Promise<FeedPayload | null> {
  return cms<FeedPayload>('/feed', { tags: [TAGS.index] });
}

const DEFAULT_SETTINGS: BlogSettings = {
  titleAr: 'مدونة سادة كونكت',
  descriptionAr: 'مقالات عملية عن بيع أكثر عبر واتساب.',
  postsPerPage: 12,
  defaultOgImageUrl: null,
  organizationName: 'سادة كونكت',
  organizationLogoUrl: null,
  twitterHandle: null,
  showViewCounts: true,
  relatedPostsCount: 3,
};

export async function getBlogSettings(): Promise<BlogSettings> {
  const data = await cms<Partial<BlogSettings>>('/settings', {
    tags: [TAGS.index],
  });
  return { ...DEFAULT_SETTINGS, ...(data ?? {}) };
}

/**
 * Checked only on the 404 path, so hot pages pay nothing for the redirect
 * table. Uncached — a redirect that was just created must work immediately.
 */
export async function resolveRedirect(
  path: string,
): Promise<{ toPath: string; permanent: boolean } | null> {
  return cms<{ toPath: string; permanent: boolean } | null>(
    `/redirects/resolve?path=${encodeURIComponent(path)}`,
    { noStore: true },
  );
}
