import type { Metadata } from 'next';
import { MessageCircle, Mail, Clock, ChevronDown } from 'lucide-react';
import { LegalShell } from '@/components/legal/legal-shell';
import { H2, Lead } from '@/components/legal/prose';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'الدعم والمساعدة — سادة كونكت',
  description:
    'مركز مساعدة سادة كونكت: تواصل معنا عبر واتساب أو البريد الإلكتروني، وإجابات لأكثر الأسئلة شيوعًا حول التطبيق.',
  alternates: { canonical: '/support' },
};

const CHANNELS = [
  {
    icon: MessageCircle,
    title: 'واتساب',
    body: 'أسرع وسيلة للرد على استفساراتك.',
    cta: 'راسلنا على واتساب',
    href: SITE.whatsapp,
    external: true,
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    body: SITE.supportEmail,
    cta: 'أرسل رسالة',
    href: `mailto:${SITE.supportEmail}`,
    external: false,
  },
  {
    icon: Clock,
    title: 'ساعات العمل',
    body: 'الأحد – الخميس، 9 صباحًا – 6 مساءً (بتوقيت السعودية).',
    cta: null,
    href: null,
    external: false,
  },
] as const;

const FAQ = [
  {
    q: 'كيف أسجّل الدخول إلى التطبيق؟',
    a: 'تسجيل الدخول يتم عبر رقم جوالك: أدخل الرقم، ثم أدخل رمز التحقق (OTP) المرسل إليك عبر رسالة نصية. لا حاجة لكلمة مرور.',
  },
  {
    q: 'لم يصلني رمز التحقق (OTP)؟',
    a: 'تأكد من صحة رقم الجوال ومن اتصالك بالإنترنت، ثم انتظر دقيقة وأعد طلب الرمز. إذا استمرت المشكلة تواصل معنا عبر واتساب أو البريد الإلكتروني.',
  },
  {
    q: 'لا تصلني الإشعارات بالرسائل الجديدة؟',
    a: 'تأكد من تفعيل الإشعارات لتطبيق سادة كونكت من إعدادات جهازك، ومن اتصالك بالإنترنت، ومن تسجيل الدخول من جهاز فعلي. فتح التطبيق يمسح الإشعارات السابقة تلقائيًا.',
  },
  {
    q: 'كيف أرسل رسالة صوتية أو صورة أو موقعي؟',
    a: 'من داخل شاشة المحادثة استخدم أزرار الإرفاق لاختيار صورة أو مقطع، أو اضغط مطولًا لتسجيل رسالة صوتية، أو شارك موقعك الحالي. سيطلب التطبيق الإذن المناسب في أول مرة فقط.',
  },
  {
    q: 'كيف أربط حساب واتساب الخاص بنشاطي؟',
    a: 'يتم ربط حساب واتساب وإعداد المنصة من لوحة التحكم على الويب. تطبيق الجوال هو رفيق للرد على المحادثات ومتابعتها بعد الإعداد.',
  },
  {
    q: 'كيف أحذف حسابي وبياناتي؟',
    a: 'يمكنك طلب الحذف من إعدادات الحساب داخل التطبيق أو بمراسلتنا. لمزيد من التفاصيل راجع قسم «حذف الحساب والبيانات» في سياسة الخصوصية.',
  },
  {
    q: 'ما متطلبات تشغيل التطبيق؟',
    a: 'يعمل التطبيق على iOS 15 فأحدث، وAndroid 8 فأحدث، مع اتصال فعّال بالإنترنت وحساب سادة كونكت نشط.',
  },
] as const;

export default function SupportPage() {
  return (
    <LegalShell
      title="الدعم والمساعدة"
      subtitle="نحن هنا لمساعدتك. اختر وسيلة التواصل المناسبة، أو اطّلع على إجابات أكثر الأسئلة شيوعًا."
    >
      <Lead>تواصل معنا</Lead>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-100 text-primary-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-navy">{c.title}</h3>
              <p className="tnum mt-1.5 text-sm leading-relaxed text-foreground-muted">{c.body}</p>
              {c.cta && c.href && (
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="mt-4 inline-flex font-bold text-primary-600 transition-colors hover:text-primary-700"
                >
                  {c.cta} ←
                </a>
              )}
            </div>
          );
        })}
      </div>

      <H2>الأسئلة الشائعة</H2>
      <div className="mt-6 space-y-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-shadow open:shadow-card"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <ChevronDown className="h-5 w-5 shrink-0 text-primary-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-relaxed text-foreground-muted">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-12 leading-relaxed text-foreground-muted">
        لم تجد إجابتك؟ تواصل معنا عبر{' '}
        <a
          className="font-semibold text-primary-600 underline"
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          واتساب
        </a>{' '}
        أو على البريد{' '}
        <a className="font-semibold text-primary-600 underline" href={`mailto:${SITE.supportEmail}`}>
          {SITE.supportEmail}
        </a>
        . وللاطلاع على ممارسات الخصوصية راجع{' '}
        <a className="font-semibold text-primary-600 underline" href="/privacy">
          سياسة الخصوصية
        </a>
        .
      </p>
    </LegalShell>
  );
}
