import * as React from 'react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/site';

/**
 * The conversion goal of every article. Reuses the `final-cta` visual
 * language so a reader arriving from search meets the same offer as one who
 * scrolled the home page.
 */
export function BlogCta() {
  return (
    <section className="mx-auto mt-14 max-w-[68ch] overflow-hidden rounded-3xl bg-navy px-6 py-10 text-center text-white md:px-10">
      <h2 className="text-2xl font-extrabold leading-snug md:text-3xl">
        جرب سادة كونكت مجانا
      </h2>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/75">
        اجمع محادثات واتساب ومبيعاتك في نظام واحد — بدون بطاقة ائتمان.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href={SITE.signup} variant="purple" size="lg">
          ابدأ مجانا
        </Button>
        <Button
          href={SITE.whatsapp}
          variant="whatsapp"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          تحدث معنا
        </Button>
      </div>
    </section>
  );
}
