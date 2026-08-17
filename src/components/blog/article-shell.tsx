import * as React from 'react';
import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SITE } from '@/lib/site';

/**
 * Page chrome for every blog surface — a clone of `LegalShell`'s header so
 * nav and footer stay identical across sub-pages.
 *
 * Self-contained absolute links on purpose: the home page's nav is a set of
 * `#hash` anchors that only resolve on `/`.
 */
export function ArticleShell({ children }: { children: React.ReactNode }) {
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
                href="/blog"
                className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 sm:inline"
              >
                المدونة
              </Link>
              <Link
                href="/"
                className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 sm:inline"
              >
                الرئيسية
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

      <main>{children}</main>

      <Footer />
    </>
  );
}
