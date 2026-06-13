import { BrandMark } from '@/components/brand-mark';
import { Container } from '@/components/ui/container';
import { SITE } from '@/lib/site';

const COLS = [
  {
    h: 'المنتج',
    links: [
      { l: 'المميزات', h: '#features' },
      { l: 'الموظف الذكي', h: '#ai' },
      { l: 'الأسعار', h: '#pricing' },
      { l: 'تسجيل الدخول', h: SITE.login },
    ],
  },
  {
    h: 'الشركة',
    links: [
      { l: 'من نحن', h: '#' },
      { l: 'تواصل معنا', h: SITE.whatsapp },
      { l: 'الوظائف', h: '#' },
    ],
  },
  {
    h: 'قانوني',
    links: [
      { l: 'سياسة الخصوصية', h: '#' },
      { l: 'الشروط والأحكام', h: '#' },
      { l: 'حذف البيانات', h: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="footer-frame" />
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-xs leading-relaxed text-foreground-muted">
              من المحادثة إلى الصفقة — واتساب ومبيعاتك في نظام واحد ذكي.
            </p>
            <a href={SITE.signup} className="mt-4 inline-flex font-bold text-primary-600">
              ابدأ مجانا ←
            </a>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h4 className="font-bold text-navy">{c.h}</h4>
              <ul className="mt-3 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.l}>
                    <a href={l.h} className="text-sm text-foreground-muted transition-colors hover:text-primary-600">
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 py-6 sm:flex-row">
          <p className="tnum text-[12px] text-foreground-subtle">© 2026 سادة كونكت. جميع الحقوق محفوظة.</p>
          <p className="text-[12px] text-foreground-subtle">صنع بعناية في السعودية</p>
        </div>
      </Container>
    </footer>
  );
}
