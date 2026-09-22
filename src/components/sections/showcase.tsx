'use client';

import { Fragment } from 'react';
import {
  Inbox,
  Megaphone,
  Handshake,
  MessageSquare,
  Clock,
  Check,
  CheckCheck,
  CircleCheck,
  Eye,
  ExternalLink,
  FileText,
  Headset,
  Receipt,
  Star,
  Store,
} from 'lucide-react';
import { FeatureBlock } from './feature-block';
import { cn } from '@/lib/utils/cn';

/* ----------------------------------------------------------------- mocks -- */

function MockShell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[36px] bg-gradient-to-tr from-primary-200/40 to-secondary-200/30 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-[0_30px_90px_-40px_rgba(33,11,101,0.4)]">
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-4 py-2.5">
          <span className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <i className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <i className="h-2.5 w-2.5 rounded-full bg-green-300" />
          </span>
          <span className="mx-auto text-[11px] text-foreground-subtle">
            {label}
          </span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

// WhatsApp glyph — blue for Cloud API, green for Web, matching the real app's
// per-channel tinting on conversation rows.
function WhatsappIcon({
  size = 12,
  variant = 'web',
  className,
}: {
  size?: number;
  variant?: 'web' | 'cloud';
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        variant === 'cloud' ? 'text-blue-500' : 'text-[#25D366]',
        className,
      )}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.528 5.857L0 24l6.335-1.528A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.558 9.558 0 01-4.9-1.349l-.352-.209-3.643.879.893-3.557-.23-.365A9.558 9.558 0 012.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z" />
    </svg>
  );
}

function InboxMock() {
  // Each row mirrors a real conversation list item: gradient-initial avatar,
  // blue unread badge, channel glyph + preview, and the assigned agent shown
  // as the app's blue assignee chip (the feature this card sells).
  const rows = [
    {
      a: 'ن',
      n: 'نورة',
      m: 'الجاكيت متوفر بمقاس M؟',
      grad: 'from-violet-400 to-violet-600',
      cloud: true,
      unread: 2,
      who: 'سارة',
      whoGrad: 'from-blue-400 to-blue-600',
      selected: true,
    },
    {
      a: 'م',
      n: 'محمد',
      m: 'تم استلام الطلب، شكرا',
      grad: 'from-blue-400 to-blue-600',
      unread: 0,
      who: 'خالد',
      whoGrad: 'from-emerald-400 to-emerald-600',
    },
    {
      a: 'ر',
      n: 'ريم',
      m: 'ودي أعرف الأسعار',
      grad: 'from-emerald-400 to-emerald-600',
      unread: 1,
      who: 'سارة',
      whoGrad: 'from-blue-400 to-blue-600',
    },
  ];
  return (
    <MockShell label="الصندوق الموحد">
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
        <div className="divide-y divide-slate-100">
          {rows.map((r, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5',
                r.selected && 'bg-blue-50',
              )}
            >
              <div className="relative shrink-0">
                <span
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white',
                    r.grad,
                  )}
                >
                  {r.a}
                </span>
                {r.unread > 0 && (
                  <span className="tnum absolute -top-1 -left-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-500 px-1 text-[9px] font-bold text-white">
                    {r.unread}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      'truncate text-[13px] text-slate-900',
                      r.unread > 0 ? 'font-semibold' : 'font-medium',
                    )}
                  >
                    {r.n}
                  </p>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 ring-1 ring-blue-100">
                    <span
                      className={cn(
                        'grid h-3.5 w-3.5 place-items-center rounded-full bg-gradient-to-br text-[7px] font-bold text-white',
                        r.whoGrad,
                      )}
                    >
                      {r.who[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600">
                      {r.who}
                    </span>
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <WhatsappIcon
                    size={12}
                    variant={r.cloud ? 'cloud' : 'web'}
                    className="shrink-0"
                  />
                  <p
                    className={cn(
                      'truncate text-[12px]',
                      r.unread > 0
                        ? 'font-medium text-slate-600'
                        : 'text-slate-400',
                    )}
                  >
                    {r.m}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function CampaignMock() {
  // Mirrors the real campaign-detail send breakdown (تم الإرسال / تم التوصيل /
  // تمت القراءة) with the app's per-status accent tones.
  const stats = [
    {
      icon: Check,
      label: 'تم الإرسال',
      value: '843',
      tone: 'bg-slate-100 text-slate-600',
    },
    {
      icon: CheckCheck,
      label: 'تم التوصيل',
      value: '712',
      tone: 'bg-sky-50 text-sky-600',
    },
    {
      icon: Eye,
      label: 'تمت القراءة',
      value: '504',
      tone: 'bg-blue-50 text-blue-600',
    },
  ];
  return (
    <MockShell label="حملة جديدة">
      {/* Approved WhatsApp template preview — white bubble on a tinted canvas,
          exactly how the real template-preview renders it. */}
      <div className="rounded-2xl bg-emerald-50/50 p-3">
        <div className="max-w-[92%] overflow-hidden rounded-2xl rounded-tr-sm bg-white shadow-sm">
          <div className="px-3.5 pt-2.5 pb-1.5">
            <p className="text-[13px] font-semibold leading-snug text-slate-900">
              🎉 عرض خاص يا{' '}
              <span className="rounded bg-violet-100 px-1 text-violet-700">
                نورة
              </span>
              !
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
              خصم 20% على جميع المنتجات حتى نهاية الأسبوع. تسوق الآن من متجرنا.
            </p>
            <div className="tnum mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
              12:30
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 px-3 py-2 text-[12px] font-medium text-blue-600">
            <ExternalLink size={13} strokeWidth={2} /> تسوق الآن
          </div>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          قالب واتساب معتمد · اسم العميل يضاف تلقائيا
        </p>
      </div>

      {/* Send progress */}
      <div className="mt-3 rounded-xl border border-slate-100 p-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[12px] font-medium text-slate-600">
            <MessageSquare size={14} className="text-blue-500" /> تقدم الإرسال
          </span>
          <span className="tnum text-[11px] text-slate-400">843 من 1,240</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[68%] rounded-full bg-blue-500" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />{' '}
            جار الإرسال…
          </span>
          <span className="tnum text-[11px] text-slate-400">
            المستلمون 1,240
          </span>
        </div>
      </div>

      {/* Delivery breakdown */}
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-slate-100 bg-slate-50/60 px-2 py-2 text-center"
          >
            <span
              className={cn(
                'mx-auto grid h-6 w-6 place-items-center rounded-md',
                s.tone,
              )}
            >
              <s.icon size={13} strokeWidth={2} />
            </span>
            <p className="tnum mt-1 text-sm font-bold leading-none text-slate-900">
              {s.value}
            </p>
            <p className="mt-1 text-[10px] text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function DealsMock() {
  const cols = [
    { t: 'جديد', items: [['نورة', '180']], dot: 'bg-secondary-400' },
    {
      t: 'تفاوض',
      items: [
        ['ريم', '420'],
        ['سارة', '260'],
      ],
      dot: 'bg-yellow-400',
    },
    { t: 'مكتملة', items: [['محمد', '350']], dot: 'bg-green-500' },
  ];
  return (
    <MockShell label="لوحة الصفقات">
      <div className="grid grid-cols-3 gap-2.5">
        {cols.map((c) => (
          <div key={c.t} className="rounded-xl bg-gray-50/70 p-2">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-navy">
              <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
              {c.t}
            </p>
            <div className="space-y-2">
              {c.items.map(([n, amt], j) => (
                <div
                  key={j}
                  className="rounded-lg border border-gray-100 bg-white p-2 shadow-sm"
                >
                  <p className="text-[11px] font-bold text-navy">{n}</p>
                  <p className="tnum mt-0.5 text-[11px] text-primary-600">
                    {amt} ر.س
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2.5">
        <span className="inline-flex items-center gap-2 text-[12px] text-foreground-muted">
          <Clock size={14} className="text-green-600" /> مبيعات الشهر
        </span>
        <span className="tnum text-sm font-extrabold text-navy">+38%</span>
      </div>
    </MockShell>
  );
}

function InvoiceMock() {
  const lines = [
    { n: 'جاكيت أسود', q: 1, p: '180.00' },
    { n: 'وشاح صوف', q: 2, p: '120.00' },
  ];
  // Mirrors the real order status flow; index 2 (مدفوع) is the current step.
  const steps = ['مسودة', 'بانتظار الدفع', 'مدفوع', 'مكتمل'];
  const current = 2;
  return (
    <MockShell label="طلب #1042">
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <Fragment key={s}>
            <span
              className={cn(
                'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                i < current && 'bg-slate-100 text-slate-500',
                i === current &&
                  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
                i > current && 'text-slate-300 ring-1 ring-slate-100',
              )}
            >
              {i <= current && <Check size={10} strokeWidth={3} />}
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="h-px min-w-1 flex-1 bg-slate-200" />
            )}
          </Fragment>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-slate-100 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-violet-400 to-violet-600 text-white">
              <Store size={17} />
            </span>
            <div>
              <p className="text-[13px] font-bold text-slate-900">
                متجر الأناقة
              </p>
              <p className="text-[11px] text-slate-400">
                فاتورة{' '}
                <span dir="ltr" className="tnum">
                  INV-0042
                </span>{' '}
                · العميلة نورة
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            مدفوع
          </span>
        </div>
        <div className="mt-3 divide-y divide-slate-100 text-[12px]">
          {lines.map((l) => (
            <div key={l.n} className="flex items-center justify-between py-1.5">
              <span className="text-slate-700">
                {l.n}{' '}
                <bdi dir="ltr" className="tnum text-slate-400">
                  ×{l.q}
                </bdi>
              </span>
              <span className="tnum text-slate-600">{l.p}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-end justify-between border-t border-dashed border-slate-200 pt-2">
          <span className="text-[12px] font-semibold text-slate-600">
            الإجمالي{' '}
            <span className="text-[10px] font-normal text-slate-400">
              شامل الضريبة
            </span>
          </span>
          <span className="tnum text-[15px] font-extrabold text-navy">
            300.00 ر.س
          </span>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-3 rounded-xl bg-emerald-50/60 p-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-red-500 shadow-sm">
          <FileText size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p
            dir="ltr"
            className="tnum truncate text-end text-[12px] font-semibold text-slate-800"
          >
            INV-0042.pdf
          </p>
          <p className="text-[10px] text-slate-500">
            أرسلت الفاتورة إلى نورة عبر واتساب
          </p>
        </div>
        <CheckCheck size={15} className="shrink-0 text-blue-500" />
      </div>
    </MockShell>
  );
}

function RatingsMock() {
  const dist = [
    { s: 5, p: 78 },
    { s: 4, p: 14 },
    { s: 3, p: 5 },
    { s: 2, p: 2 },
    { s: 1, p: 1 },
  ];
  const agents = [
    { n: 'سارة', r: '4.9', grad: 'from-blue-400 to-blue-600' },
    { n: 'خالد', r: '4.7', grad: 'from-emerald-400 to-emerald-600' },
  ];
  return (
    <MockShell label="تقييم الخدمة">
      {/* Ticket-close divider + the rating request, as the thread shows it. */}
      <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 font-medium text-slate-500 ring-1 ring-slate-100">
            <CircleCheck size={11} className="text-emerald-500" /> أغلقت سارة
            التذكرة
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="ms-auto mt-2.5 w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-blue-50 px-3 py-2 text-[12px] leading-relaxed text-slate-700">
          شكرا لتواصلك معنا 🌷 كيف تقيم الخدمة التي حصلت عليها؟
        </div>
        <div className="me-auto mt-2 w-fit rounded-2xl rounded-tr-sm bg-white px-3 py-1.5 text-[12px] text-slate-800 shadow-sm ring-1 ring-slate-100">
          ⭐⭐⭐⭐⭐ ممتاز
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 rounded-xl border border-slate-100 p-3">
        <div className="shrink-0 text-center">
          <p className="tnum text-3xl font-extrabold leading-none text-navy">
            4.8
          </p>
          <div className="mt-1.5 flex justify-center gap-0.5 text-amber-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="tnum mt-1 text-[10px] text-slate-400">312 تقييم</p>
        </div>
        <div className="flex-1 space-y-1">
          {dist.map((d) => (
            <div key={d.s} className="flex items-center gap-2 text-[10px]">
              <span className="tnum w-2 text-slate-500">{d.s}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${d.p}%` }}
                />
              </div>
              <span className="tnum w-7 text-slate-400">{d.p}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {agents.map((a) => (
          <div
            key={a.n}
            className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-2"
          >
            <span
              className={cn(
                'grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white',
                a.grad,
              )}
            >
              {a.n[0]}
            </span>
            <span className="flex-1 text-[12px] font-semibold text-slate-700">
              {a.n}
            </span>
            <span className="tnum inline-flex items-center gap-0.5 text-[12px] font-bold text-slate-900">
              <Star
                size={11}
                className="text-amber-400"
                fill="currentColor"
                strokeWidth={0}
              />
              {a.r}
            </span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

/* -------------------------------------------------------------- section -- */

export function Showcase() {
  return (
    <section id="features">
      <FeatureBlock
        eyebrow="صندوق وارد موحد"
        eyebrowIcon={Inbox}
        title={<>كل محادثات فريقك في شاشة واحدة</>}
        description="اجمع أرقام واتساب لمتجرك في صندوق واحد، ووزع المحادثات على فريقك، وحدد لكل موظف الأرقام التي يصل إليها."
        bullets={[
          'توزيع المحادثات على الموظفين',
          'صلاحيات لكل دور ولكل رقم',
          'ردود سريعة ووسوم للتنظيم',
        ]}
        mock={<InboxMock />}
      />
      <FeatureBlock
        reverse
        eyebrow="الحملات والبث"
        eyebrowIcon={Megaphone}
        title={<>أرسل حملات واتساب لآلاف العملاء</>}
        description="أرسل حملاتك عبر قوالب واتساب المعتمدة أو من واتساب ويب بدون قوالب، وخاطب كل عميل باسمه، وتابع حالة الإرسال لحظيا."
        bullets={[
          'قوالب معتمدة بمتغيرات مثل اسم العميل',
          'حملات واتساب ويب بفواصل زمنية بين الرسائل',
          'بث للمجموعات ونشر في قنوات واتساب',
          'متابعة حالة كل رسالة',
        ]}
        mock={<CampaignMock />}
      />
      <FeatureBlock
        eyebrow="الصفقات والتقارير"
        eyebrowIcon={Handshake}
        title={<>تابع صفقاتك من المحادثة حتى الإغلاق</>}
        description="حول المحادثات إلى صفقات بمراحل تحددها بنفسك، وراقب الأداء والمبيعات بأرقام واضحة."
        bullets={[
          'مراحل صفقات مخصصة',
          'تقارير لحظية للأداء',
          'متابعة مبيعات الفريق',
        ]}
        mock={<DealsMock />}
      />
      <FeatureBlock
        reverse
        eyebrow="الطلبات والفواتير"
        eyebrowIcon={Receipt}
        title={<>من المحادثة إلى الفاتورة، في مكان واحد</>}
        description="أنشئ الطلب من داخل المحادثة، وأرسل عرض السعر لعميلك، وسجل الدفعة، ثم أرسل الفاتورة على واتساب بضغطة — حتى من تطبيق الجوال."
        bullets={[
          'عروض أسعار وفواتير PDF بشعار متجرك',
          'تسجيل الدفعات ومتابعة حالة كل طلب',
          'إرسال الفاتورة على واتساب مباشرة',
          'الموظف الذكي يجهز لك مسودة الطلب',
        ]}
        mock={<InvoiceMock />}
      />
      <FeatureBlock
        eyebrow="خدمة العملاء"
        eyebrowIcon={Headset}
        title={<>حول كل محادثة إلى تذكرة، واعرف رأي عملائك</>}
        description="افتح المحادثة كتذكرة وأغلقها عند حل الطلب، فيصل عميلك طلب تقييم من 1 إلى 5 نجوم — ويحسب التقييم للموظف الذي خدمه."
        bullets={[
          'فتح وإغلاق المحادثات كتذاكر',
          'تقييم بالنجوم بعد كل إغلاق',
          'تقرير تقييمات لكل موظف',
          'إغلاق تلقائي وتنبيه عند تأخر الرد',
        ]}
        mock={<RatingsMock />}
      />
    </section>
  );
}
