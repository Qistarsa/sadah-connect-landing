'use client';

import { Container } from '@/components/ui/container';
import { CountUp } from '@/components/ui/count-up';

// Placeholder merchant names — swap for real customer logos.
const LOGOS = ['متجر النخبة', 'أناقة', 'بيت العطور', 'تك ستور', 'ركن الهدايا', 'مذاق', 'نورة', 'بوتيك لمى'];

export function Trust() {
  return (
    <section className="border-y border-gray-100 bg-white py-14">
      <Container>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="font-extrabold text-navy">
            <span className="gradient-text text-4xl md:text-5xl">
              <CountUp to={120} prefix="+" />
            </span>
          </p>
          <p className="text-foreground-muted">فريق ومتجر انضموا إلى سادة كونكت</p>
        </div>

        <div className="marquee-host mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-14">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className="whitespace-nowrap text-lg font-bold text-foreground-subtle/70">
                {l}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-foreground-subtle">
          شعارات توضيحية — تستبدل بشعارات عملائك
        </p>
      </Container>
    </section>
  );
}
