import { getFeed } from '@/lib/blog';

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://connect.sadah.io';

/** XML-escape a text node or attribute value. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * `<content:encoded>` carries the sanitised article HTML verbatim. CDATA is
 * safe because the sanitiser's allowlist has no path to emit `]]>` — but the
 * guard below closes that door anyway rather than relying on it.
 */
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, ']]&gt;')}]]>`;
}

export async function GET() {
  const feed = await getFeed();

  const items = (feed?.items ?? [])
    .map((item) => {
      const url = `${SITE_URL}/blog/${item.slug}`;
      return [
        '    <item>',
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        item.publishedAt
          ? `      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>`
          : '',
        item.category
          ? `      <category>${escapeXml(item.category)}</category>`
          : '',
        item.excerpt
          ? `      <description>${escapeXml(item.excerpt)}</description>`
          : '',
        item.contentHtml
          ? `      <content:encoded>${cdata(item.contentHtml)}</content:encoded>`
          : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feed?.title ?? 'مدونة سادة كونكت')}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(feed?.description ?? '')}</description>
    <language>ar-SA</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=600, s-maxage=3600',
    },
  });
}
