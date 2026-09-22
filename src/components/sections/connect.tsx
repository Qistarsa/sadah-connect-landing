import {
  QrCode,
  BadgeCheck,
  Smartphone,
  ArrowRightLeft,
  type LucideIcon,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';

const WAYS: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: QrCode,
    title: 'واتساب ويب عبر QR',
    desc: 'امسح الرمز وابدأ خلال دقيقة، وأرسل حملاتك بدون قوالب.',
  },
  {
    icon: BadgeCheck,
    title: 'واتساب API الرسمي',
    desc: 'ربط رسمي عبر ميتا: قوالب معتمدة وحملات على نطاق واسع باستقرار أعلى.',
  },
  {
    icon: Smartphone,
    title: 'احتفظ بتطبيق واتساب للأعمال',
    desc: 'اربط رقمك بواتساب API وواصل استخدام التطبيق على جوالك — ما ترسله من الجوال يظهر في الصندوق أيضا.',
  },
  {
    icon: ArrowRightLeft,
    title: 'انقل رقمك من مزود آخر',
    desc: 'رقمك مربوط بمزود آخر؟ انقله إلينا مع الاحتفاظ باسمه المعروض وتقييم جودته وقوالبه.',
  },
];

export function Connect() {
  return (
    <Section id="connect">
      <SectionHeader
        eyebrow="ربط واتساب"
        title={
          <>
            اربط رقمك{' '}
            <span className="gradient-text">بالطريقة التي تناسبك</span>
          </>
        }
        description="من رمز QR إلى الربط الرسمي عبر ميتا — دون أن تتخلى عن تطبيقك أو رقمك."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {WAYS.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06}>
            <article className="h-full rounded-lg border border-slate-200/70 bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                <w.icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy sm:text-lg">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {w.desc}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
