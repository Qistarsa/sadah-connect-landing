import type { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/lib/blog';

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://connect.sadah.io';

/**
 * Dynamic sitemap. The indexability rules live in the backend (`noindex`
 * posts excluded, tag hubs below 3 posts excluded) so "which URLs may Google
 * see" is decided once, next to the data that decides it.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();

  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/support`, changeFrequency: 'monthly', priority: 0.4 },
    ...entries.map((entry) => ({
      url: `${SITE_URL}${entry.path}`,
      lastModified: entry.updatedAt ? new Date(entry.updatedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: entry.priority,
    })),
  ];
}
