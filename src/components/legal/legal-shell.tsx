import * as React from 'react';
import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Footer } from '@/components/sections/footer';
import { SITE } from '@/lib/site';

/** Shared page chrome for sub-pages (privacy, support, …).
 * Uses a self-contained header with absolute links so the home-page anchor
 * nav can't break here, then reuses the marketing Footer. */
export function LegalShell({
  title,
  subtitle,
  updated,
  children,
}: {
  title: string;
  subtitle?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-lg">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="سادة كونكت">
              <BrandMark />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 sm:inline"
              >
                العودة للرئيسية
              </Link>
              <Button
                href={SITE.signup}
                variant="outline"
                size="sm"
                className="rounded-lg border-primary-400 px-5"
              >
                ابدأ مجانا
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <section className="bg-gradient-to-b from-primary-50/60 to-white py-16 md:py-20">
          <Container size="md">
            <h1 className="text-3xl font-extrabold leading-tight text-navy md:text-4xl lg:text-[2.6rem]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                {subtitle}
              </p>
            )}
            {updated && (
              <p className="tnum mt-5 text-sm text-foreground-subtle">آخر تحديث: {updated}</p>
            )}
          </Container>
        </section>

        <div className="py-14 md:py-20">
          <Container size="md">{children}</Container>
        </div>
      </main>

      <Footer />
    </>
  );
}
