import type { NextConfig } from 'next';

/**
 * Uploads origin — the NestJS backend on the VPS, which serves `/uploads`
 * behind nginx with 1-year immutable cache headers.
 */
const apiOrigin = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
const { protocol, hostname, port } = new URL(apiOrigin);

const nextConfig: NextConfig = {
  images: {
    // Custom loader → our own sharp-generated WebP variants. Vercel's
    // optimizer is never invoked, so no transformation is ever billed.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2_592_000, // 30 days
    // Trimmed from the default 8 — we only ship two derivative widths.
    deviceSizes: [640, 828, 1080, 1200, 1920],
    qualities: [75],
    remotePatterns: [
      {
        protocol: protocol.replace(':', '') as 'http' | 'https',
        hostname,
        ...(port ? { port } : {}),
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'connect-api.sadah.io',
        pathname: '/uploads/**',
      },
    ],
  },

  async redirects() {
    return [
      // /blog/page/1 is the index under another URL — one canonical home.
      { source: '/blog/page/1', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
