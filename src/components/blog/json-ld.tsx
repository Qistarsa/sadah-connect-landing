import * as React from 'react';
import type { BlogSettings, Category, PostDetail, PostAuthor } from '@/lib/blog';
import type { Crumb } from './breadcrumbs';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://connect.sadah.io';

/**
 * Structured data. Google reads this before it reads anything a human wrote,
 * so every emitter here is validated against the Rich Results Test rather
 * than eyeballed.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output cannot contain a raw `</script>`, but a title
      // could contain the literal characters — escaping `<` closes that door.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

function organization(settings: BlogSettings) {
  return {
    '@type': 'Organization',
    name: settings.organizationName,
    url: SITE_URL,
    ...(settings.organizationLogoUrl
      ? { logo: { '@type': 'ImageObject', url: settings.organizationLogoUrl } }
      : {}),
  };
}

/**
 * A team byline is an Organization, not a Person — claiming a Person for
 * "فريق سادة كونكت" would be a false signal. The moment a real author row
 * carries public links, this flips to Person automatically: a data change,
 * not a code change.
 */
function authorNode(
  post: PostDetail,
  profile: PostAuthor | null,
  settings: BlogSettings,
) {
  const links = profile?.links ?? null;
  if (profile && links && links.length > 0) {
    return {
      '@type': 'Person',
      name: profile.name,
      ...(profile.title ? { jobTitle: profile.title } : {}),
      ...(profile.bio ? { description: profile.bio } : {}),
      url: `${SITE_URL}/blog`,
      sameAs: links,
    };
  }
  return {
    '@type': 'Organization',
    name: post.author?.name ?? settings.organizationName,
    url: SITE_URL,
  };
}

export function articleJsonLd(
  post: PostDetail,
  settings: BlogSettings,
  crumbs: Crumb[],
  profile: PostAuthor | null,
): object[] {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.ogImageUrl ?? post.coverUrl ?? settings.defaultOgImageUrl;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    // Google truncates headline past ~110 characters.
    headline: post.title.slice(0, 110),
    description: post.seoDescription ?? post.excerpt,
    ...(image
      ? { image: [{ '@type': 'ImageObject', url: image, width: 1200, height: 630 }] }
      : {}),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.contentUpdatedAt ?? post.publishedAt ?? undefined,
    author: authorNode(post, profile, settings),
    publisher: organization(settings),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'ar-SA',
    ...(post.category ? { articleSection: post.category.name } : {}),
    ...(post.tags.length
      ? { keywords: post.tags.map((tag) => tag.name).join(', ') }
      : {}),
    wordCount: post.contentText ? post.contentText.split(/\s+/).length : undefined,
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
    })),
  };

  const nodes: object[] = [blogPosting, breadcrumbs];

  if (post.faq.length > 0) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return nodes;
}

export function blogIndexJsonLd(settings: BlogSettings): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: settings.titleAr,
      description: settings.descriptionAr,
      url: `${SITE_URL}/blog`,
      inLanguage: 'ar-SA',
      publisher: organization(settings),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: settings.organizationName,
      url: SITE_URL,
    },
  ];
}

export function collectionJsonLd(
  title: string,
  description: string | null,
  path: string,
  crumbs: Crumb[],
): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      ...(description ? { description } : {}),
      url: `${SITE_URL}${path}`,
      inLanguage: 'ar-SA',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
      })),
    },
  ];
}

export function categoryDescription(category: Category): string | null {
  return category.seoDescription ?? category.description;
}

export { SITE_URL };
