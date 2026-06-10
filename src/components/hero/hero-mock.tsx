import {
  Inbox,
  Megaphone,
  BarChart3,
  Settings,
  Search,
  Filter,
  MessageSquarePlus,
  Send,
  CheckCheck,
  Sparkles,
  Bot,
  Clock,
  ChevronDown,
  PanelRightOpen,
  Paperclip,
  Smile,
  Mic,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Mirrors the real Connect inbox: gradient initials avatar, WhatsApp channel
// marker, blue unread badge, relative timestamp. نورة is the open (selected)
// thread — on Cloud API, so her row + the chat header carry the blue marker.
const LIST = [
  {
    a: 'ن',
    n: 'نورة',
    m: 'الجاكيت الأسود متوفر بمقاس M؟',
    t: 'الآن',
    u: 2,
    grad: 'from-violet-400 to-violet-600',
    cloud: true,
    active: true,
  },
  {
    a: 'م',
    n: 'محمد',
    m: 'تم استلام الطلب، شكراً',
    t: 'قبل 12 دقيقة',
    u: 0,
    grad: 'from-blue-400 to-blue-600',
  },
  {
    a: 'ر',
    n: 'ريم',
    m: 'ودّي أعرف أسعار العطور',
    t: 'قبل 25 دقيقة',
    u: 1,
    grad: 'from-emerald-400 to-emerald-600',
  },
  {
    a: 'س',
    n: 'سارة',
    m: 'متى يوصل الطلب؟',
    t: 'قبل ساعة',
    u: 0,
    grad: 'from-amber-400 to-amber-600',
  },
];

// WhatsApp glyph — green for Web, blue for Cloud API, matching the real app's
// channel tinting (paired with the blue→violet outbound bubble).
function WhatsappIcon({
  size = 14,
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

/** Polished product window used in the hero — mirrors the real Connect inbox. */
export function HeroMock() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-tr from-blue-300/30 via-violet-300/20 to-blue-200/30 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_120px_-40px_rgba(33,11,101,0.4)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-3">
          <span className="flex gap-1.5">
            <i className="h-3 w-3 rounded-full bg-red-300" />
            <i className="h-3 w-3 rounded-full bg-yellow-300" />
            <i className="h-3 w-3 rounded-full bg-green-300" />
          </span>
          <span className="mx-auto inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">
            connect.sadah.io
          </span>
        </div>

        <div className="flex h-[440px]">
          {/* Far-right nav rail (RTL start) */}
          <div className="hidden w-14 shrink-0 flex-col items-center gap-3 border-e border-slate-100 bg-slate-50/60 py-4 sm:flex">
            {[Inbox, Megaphone, BarChart3, Settings].map((Ic, i) => (
              <span
                key={i}
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-xl',
                  i === 0
                    ? 'bg-blue-500 text-white shadow-[0_8px_18px_-8px_rgba(59,130,246,0.7)]'
                    : 'text-slate-400',
                )}
              >
                <Ic size={18} />
              </span>
            ))}
          </div>

          {/* Conversations list */}
          <div className="flex w-[40%] shrink-0 flex-col border-e border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-bold text-slate-900">المحادثات</h2>
              <div className="flex items-center gap-0.5 text-slate-400">
                <span className="grid h-7 w-7 place-items-center rounded-md">
                  <Filter size={15} strokeWidth={1.75} />
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-md">
                  <MessageSquarePlus size={15} strokeWidth={1.75} />
                </span>
              </div>
            </div>

            <div className="border-b border-slate-100 px-3 py-2">
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5">
                <Search
                  size={14}
                  strokeWidth={1.75}
                  className="text-slate-400"
                />
                <span className="text-xs text-slate-400">بحث…</span>
              </div>
            </div>

            <div className="flex border-b border-slate-100">
              {['الكل', 'المسندة لي', 'غير مقروء'].map((t, i) => (
                <span
                  key={t}
                  className={cn(
                    'flex-1 py-2 text-center text-[11px] font-medium',
                    i === 0
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-slate-400',
                  )}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              {LIST.map((c, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-start gap-3 px-4 py-3',
                    c.active && 'bg-blue-50',
                  )}
                >
                  <div className="relative mt-0.5 shrink-0">
                    <span
                      className={cn(
                        'grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white',
                        c.grad,
                      )}
                    >
                      {c.a}
                    </span>
                    {c.u > 0 && (
                      <span className="tnum absolute -top-1 -left-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white">
                        {c.u}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={cn(
                          'truncate text-[13px]',
                          c.u > 0
                            ? 'font-semibold text-slate-900'
                            : 'font-medium text-slate-900',
                        )}
                      >
                        {c.n}
                      </span>
                      <span className="tnum shrink-0 text-[10px] text-slate-400">
                        {c.t}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <WhatsappIcon
                        size={12}
                        variant={c.cloud ? 'cloud' : 'web'}
                        className="shrink-0"
                      />
                      <p
                        className={cn(
                          'truncate text-xs',
                          c.u > 0
                            ? 'font-medium text-slate-600'
                            : 'text-slate-400',
                        )}
                      >
                        {c.m}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat thread */}
          <div className="relative hidden flex-1 flex-col bg-white md:flex">
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-violet-600 text-xs font-bold text-white">
                ن
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-slate-900">نورة</p>
                <p
                  dir="ltr"
                  className="tnum text-start text-[11px] text-slate-400"
                >
                  +966 50 123 4567
                </p>
              </div>
              <div className="ms-auto flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-100">
                  <Sparkles size={11} /> الرد الآلي
                  <span className="relative ms-0.5 inline-block h-3 w-5 rounded-full bg-blue-500">
                    <span className="absolute end-0.5 top-0.5 h-2 w-2 rounded-full bg-white" />
                  </span>
                </span>
                <span className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-600 lg:inline-flex">
                  <WhatsappIcon size={13} variant="cloud" />
                  Cloud API
                  <ChevronDown size={12} className="text-slate-400" />
                </span>
                <span className="hidden h-7 w-7 place-items-center rounded-md text-blue-500 md:grid">
                  <PanelRightOpen size={15} strokeWidth={1.75} />
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden bg-blue-50/40 px-4 py-4">
              <div className="flex justify-center">
                <span className="rounded-md bg-white/85 px-2.5 py-1 text-[10px] font-medium text-slate-500 shadow-sm ring-1 ring-black/5">
                  اليوم
                </span>
              </div>

              {/* Inbound */}
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm border border-slate-200/70 bg-white px-3.5 py-2 text-[13px] leading-relaxed text-slate-900 shadow-sm">
                  السلام عليكم 👋
                  <div className="tnum mt-1 flex items-center justify-start gap-1 text-[10px] text-slate-400">
                    11:22 ص
                  </div>
                </div>
              </div>

              {/* Inbound */}
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm border border-slate-200/70 bg-white px-3.5 py-2 text-[13px] leading-relaxed text-slate-900 shadow-sm">
                  الجاكيت الأسود متوفر بمقاس M؟
                  <div className="tnum mt-1 flex items-center justify-start gap-1 text-[10px] text-slate-400">
                    11:23 ص
                  </div>
                </div>
              </div>

              {/* Outbound — AI auto-reply */}
              <div className="flex items-end justify-end gap-1.5">
                <div className="flex max-w-[82%] flex-col items-end">
                  <span className="mb-0.5 inline-flex w-fit items-center gap-1 self-end rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800">
                    AI
                  </span>
                  <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-blue-500 to-violet-500 px-3.5 py-2 text-[13px] leading-relaxed text-white shadow-sm">
                    وعليكم السلام 🌟 نعم متوفر بسعر 180 ريال والتوصيل مجاني داخل
                    الرياض. أُرسل لك رابط الطلب؟
                    <div className="tnum mt-1 flex items-center justify-end gap-1 text-[10px] text-white/70">
                      <CheckCheck
                        size={12}
                        strokeWidth={2.5}
                        className="text-blue-200"
                      />
                      11:24 ص
                    </div>
                  </div>
                </div>
                <span className="grid h-8 w-8 shrink-0 place-items-center self-end rounded-full bg-blue-100 text-blue-700">
                  <Bot size={16} />
                </span>
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-100 bg-white px-3 py-2.5">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="px-4 pt-2.5 pb-1 text-[13px] text-slate-400">
                  اكتب هنا…
                </div>
                <div className="flex items-center justify-between px-2.5 pb-2 pt-1">
                  <div className="flex items-center gap-0.5 text-slate-400">
                    <span className="grid h-7 w-7 place-items-center">
                      <Smile size={16} strokeWidth={1.75} />
                    </span>
                    <span className="grid h-7 w-7 place-items-center">
                      <Paperclip size={16} strokeWidth={1.75} />
                    </span>
                    <span className="grid h-7 w-7 place-items-center">
                      <Mic size={16} strokeWidth={1.75} />
                    </span>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-blue-500 text-white">
                    <Send size={15} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat cards */}
      {/* <div className="absolute -top-5 left-4 hidden animate-float sm:block">
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-green-100 text-green-600">
            <Clock size={15} />
          </span>
          <div>
            <p className="text-[10px] text-slate-500">زمن الرد</p>
            <p className="tnum text-sm font-extrabold text-navy">24 ثانية</p>
          </div>
        </div>
      </div> */}
      {/* <div
        className="absolute -bottom-5 right-4 hidden animate-float sm:block"
        style={{ animationDelay: '1.2s' }}
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-100 text-blue-600">
            <BarChart3 size={15} />
          </span>
          <div>
            <p className="text-[10px] text-slate-500">صفقات اليوم</p>
            <p className="tnum text-sm font-extrabold text-navy">38</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
