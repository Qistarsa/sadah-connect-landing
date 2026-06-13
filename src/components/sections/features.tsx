import Image from 'next/image';
import { Section, SectionHeader } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils/cn';

type Feature = {
  title: string;
  bullets: string[];
  /** Illustration under /public — omit for a text-only tile. See FEATURE-ILLUSTRATIONS.md. */
  img?: string;
  /** 'below' = big art under the text (tall tiles); 'side' = art beside the bullets (wide tiles). */
  imgPos?: 'below' | 'side';
};

// Three masonry columns — narrow / wide / narrow — stacked independently so the
// tiles keep their natural heights (the reference bento look).
const LEFT: Feature[] = [
  {
    title: 'المنتجات والكتالوج',
    bullets: [
      'نظم منتجاتك وأسعارها في كتالوج أنيق.',
      'شاركها داخل المحادثة بضغطة واحدة.',
    ],
    img: '/features/catalog.png',
    imgPos: 'below',
  },
  {
    title: 'ردود سريعة جاهزة',
    img: '/features/quick-replies.png',
    imgPos: 'below',
    bullets: [
      'ردود ووسائط جاهزة بضغطة واحدة.',
      'وفر وقت فريقك في الأسئلة المتكررة.',
    ],
  },
];

const CENTER: Feature[] = [
  {
    title: 'إدارة العملاء (CRM)',
    bullets: [
      'إدارة العملاء والطلبات والصفقات.',
      'سجل لكل عميل ومحفوظات محادثاته.',
      'وسوم وملاحظات لتنظيم عملائك.',
    ],
    img: '/features/crm.png',
    imgPos: 'side',
  },
  {
    title: 'تقارير ولوحات',
    bullets: [
      'تابع المحادثات والصفقات والفريق لحظيا.',
      'لوحات وأرقام واضحة لاتخاذ القرار.',
    ],
    img: '/features/reports.png',
    imgPos: 'side',
  },
  {
    title: 'المهام والتذكيرات',
    img: '/features/tasks.png',
    imgPos: 'side',
    bullets: ['مهام وتذكيرات لكل صفقة.', 'لا تفوت أي متابعة مع عملائك.'],
  },
];

const RIGHT: Feature[] = [
  {
    title: 'أرقام واتساب متعددة',
    bullets: [
      'اربط أكثر من رقم في صندوق واحد.',
      'QR لواتساب ويب أو واتساب API الرسمي.',
      'وزع المحادثات على فريقك تلقائيا.',
    ],
    img: '/features/whatsapp-numbers.png',
    imgPos: 'below',
  },
  {
    title: 'فهم الرسائل الصوتية',
    bullets: [
      'الذكاء يحول الصوت إلى نص.',
      'يفهم رسائل عملائك ويجيب عنها بدقة.',
    ],
    img: '/features/voice-ai.png',
    imgPos: 'below',
  },
  {
    title: 'صلاحيات وأدوار',
    bullets: [
      'أدوار وصلاحيات دقيقة لكل موظف.',
      'تحكم بما يصل إليه كل عضو في الفريق.',
    ],
    img: '/features/roles.png',
    imgPos: 'below',
  },
];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((b) => (
        <li
          key={b}
          className="flex items-start gap-2 text-sm leading-relaxed text-foreground-muted"
        >
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function Illustration({
  feature,
  className,
}: {
  feature: Feature;
  className?: string;
}) {
  if (!feature.img) return null;
  return (
    <div className={cn('relative', className)}>
      {/* Soft gradient glow behind the art — no hard frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_58%,rgba(139,92,246,0.16),rgba(59,130,246,0.07)_55%,transparent_72%)]"
      />
      <Image
        src={feature.img}
        alt={feature.title}
        fill
        sizes="(max-width: 1024px) 90vw, 30vw"
        className="object-contain"
      />
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200/70 bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <h3 className="text-base font-bold text-navy sm:text-lg">
        {feature.title}:
      </h3>
      {feature.imgPos === 'side' ? (
        <div className="mt-3 flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <div className="min-w-0 flex-1">
            <Bullets items={feature.bullets} />
          </div>
          <Illustration
            feature={feature}
            className="aspect-square w-full shrink-0 sm:w-[44%]"
          />
        </div>
      ) : (
        <>
          <Bullets items={feature.bullets} />
          {feature.img && (
            // Grows to fill the column's shared height so all columns
            // bottom-align; the art stays 4:3 and centers in the slack.
            <div className="mt-5 flex flex-1 items-center">
              <Illustration feature={feature} className="aspect-[4/3] w-full" />
            </div>
          )}
        </>
      )}
    </article>
  );
}

export function Features() {
  return (
    <Section background="gradient" id="features-grid">
      <SectionHeader
        eyebrow="كل ما تحتاجه"
        title={
          <>
            منصة واحدة بدل <span className="gradient-text">عشر أدوات</span>
          </>
        }
        description="من أول رسالة إلى إتمام البيع — محادثاتك وعملائك وصفقاتك في مكان واحد."
      />
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-col gap-2 lg:grow-[27] lg:basis-0">
          {LEFT.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="lg:flex-1">
              <FeatureCard feature={f} />
            </Reveal>
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-2 lg:grow-[44] lg:basis-0">
          {CENTER.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="lg:flex-1">
              <FeatureCard feature={f} />
            </Reveal>
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-2 lg:grow-[27] lg:basis-0">
          {RIGHT.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="lg:flex-1">
              <FeatureCard feature={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
