import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://connect.sadah.io';

export default function robots(): MetadataRoute.Robots {
  // Vercel serves preview deployments on *.vercel.app. A crawlable duplicate
  // of the whole site is a genuine ranking risk, so anything that isn't the
  // production deployment refuses every crawler outright.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
