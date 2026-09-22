'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Bell,
  MessageCircle,
  Zap,
  CheckCheck,
  SendHorizontal,
  Receipt,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SITE } from '@/lib/site';
import { ease, defaultViewport } from '@/lib/motion';

const PERKS: Array<{ icon: typeof Bell; text: string }> = [
  { icon: MessageCircle, text: 'رد على عملائك من أي مكان' },
  { icon: Bell, text: 'إشعارات فورية بكل رسالة جديدة' },
  { icon: Receipt, text: 'أرسل فاتورة لعميلك من داخل المحادثة' },
  { icon: Zap, text: 'متجرك في جيبك — طوال الوقت' },
];

/** Official-style "Download on the App Store" badge (dark pill). */
function AppStoreBadge() {
  return (
    <a
      href={SITE.appStore}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="حمل التطبيق من App Store"
      className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-navy shadow-lg ring-1 ring-white/60 transition-transform hover:scale-[1.03]"
    >
      <svg
        viewBox="0 0 384 512"
        className="h-7 w-7 shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="text-start leading-tight">
        <span className="block text-[10px] font-medium opacity-70">
          حمّل التطبيق على
        </span>
        <span className="block text-lg font-bold">App Store</span>
      </span>
    </a>
  );
}

/** Official-style "Get it on Google Play" badge (dark pill). */
function PlayStoreBadge() {
  return (
    <a
      href={SITE.playStore}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="حمل التطبيق من Google Play"
      className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-navy shadow-lg ring-1 ring-white/60 transition-transform hover:scale-[1.03]"
    >
      <svg
        viewBox="0 0 512 512"
        className="h-7 w-7 shrink-0"
        aria-hidden="true"
      >
        <path
          fill="#00d2ff"
          d="M47.6 43.2C42.9 47.7 40 54.7 40 63.7v384.6c0 9 2.9 16 7.6 20.5l1.3 1.2 215.3-215.3v-5.1L48.9 42z"
        />
        <path
          fill="#ffbc00"
          d="M336 328.7l-71.8-71.9v-5.1l71.9-71.9 1.6.9 85.1 48.4c24.3 13.8 24.3 36.4 0 50.3l-85.1 48.4z"
        />
        <path
          fill="#ff3a44"
          d="M337.6 327.8L264.2 254.4 47.6 471c8 8.5 21.2 9.5 36.1 1.1l253.9-144.3"
        />
        <path
          fill="#00e676"
          d="M337.6 181L83.7 37.6c-14.9-8.5-28.1-7.4-36.1 1.1l216.6 216.6z"
        />
      </svg>
      <span className="text-start leading-tight">
        <span className="block text-[10px] font-medium opacity-70">
          حمّل التطبيق من
        </span>
        <span className="block text-lg font-bold">Google Play</span>
      </span>
    </a>
  );
}

/** iOS-style status-bar signal / wifi / battery glyphs. */
function StatusBar() {
  return (
    <div className="relative z-10 flex h-11 shrink-0 items-center justify-between px-5 text-navy">
      <span className="tnum text-[13px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg
          viewBox="0 0 18 12"
          className="h-3 w-4 fill-current"
          aria-hidden="true"
        >
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
        </svg>
        {/* wifi */}
        <svg
          viewBox="0 0 16 12"
          className="h-3 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M8 11.2 5.9 8.6a3.3 3.3 0 0 1 4.2 0L8 11.2Zm-4-4.9L2.4 4.4a8.6 8.6 0 0 1 11.2 0L12 6.3a6.1 6.1 0 0 0-8 0Z" />
        </svg>
        {/* battery */}
        <svg
          viewBox="0 0 26 12"
          className="h-3 w-6 fill-current"
          aria-hidden="true"
        >
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.4"
          />
          <rect x="2" y="2" width="18" height="8" rx="1.5" />
          <rect
            x="24"
            y="4"
            width="1.5"
            height="4"
            rx="0.75"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

/** Phone mockup — an in-app chat screen with a floating push notification. */
function PhoneMock() {
  return (
    <div className="relative mx-auto w-[290px]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -inset-10 [background:radial-gradient(50%_50%_at_50%_35%,rgba(255,255,255,0.28),transparent)]" />

      <motion.div
        initial={{ rotate: -4 }}
        whileInView={{ rotate: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.9, ease }}
        className="relative rounded-[46px] bg-gradient-to-b from-[#1a0b4d] to-navy p-[10px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/10"
      >
        {/* side buttons */}
        <div className="absolute -left-[3px] top-28 h-14 w-[3px] rounded-l bg-white/15" />
        <div className="absolute -left-[3px] top-44 h-10 w-[3px] rounded-l bg-white/15" />
        <div className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-white/15" />

        <div className="relative flex aspect-[9/17.3] flex-col overflow-hidden rounded-[38px] bg-gradient-to-b from-primary-50 via-white to-white">
          {/* dynamic island — narrower + centered so it clears the status icons */}
          <div className="absolute left-1/2 top-2.5 z-20 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />

          <StatusBar />

          {/* app header */}
          <div className="mt-2 flex shrink-0 items-center gap-2.5 border-b border-primary-100/70 px-4 pb-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-violet-600 text-[13px] font-bold text-white">
              ن
            </span>
            <div className="flex-1 leading-tight">
              <p className="text-[13px] font-bold text-navy">نورة</p>
              <p className="flex items-center gap-1 text-[10px] text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> متصلة
                الآن
              </p>
            </div>
            <MessageCircle size={17} className="text-primary-500" />
          </div>

          {/* conversation — grows to fill the phone height */}
          <div className="flex flex-1 flex-col justify-end space-y-2.5 overflow-hidden px-3.5 pb-4 pt-4">
            <p className="mx-auto w-fit rounded-full bg-primary-100/70 px-2.5 py-0.5 text-[9px] font-medium text-primary-700">
              اليوم
            </p>
            <div className="me-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white px-3 py-2 text-[11.5px] leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-100">
              السلام عليكم 👋 عندكم الجاكيت الأسود بمقاس M؟
            </div>
            <div className="ms-auto max-w-[82%] rounded-2xl rounded-tl-sm bg-gradient-to-br from-primary-500 to-primary-700 px-3 py-2 text-[11.5px] leading-relaxed text-white shadow-sm">
              أهلا وسهلا! نعم متوفر بمقاس M بسعر 180 ريال 🖤
            </div>
            <div className="ms-auto flex items-center gap-1 pe-1 text-[9px] text-foreground-subtle">
              <CheckCheck size={12} className="text-primary-400" /> تم الإرسال
            </div>
          </div>

          {/* composer — anchored to the bottom of the screen */}
          <div className="flex shrink-0 items-center gap-2 border-t border-primary-100/70 bg-white/95 px-3 pb-6 pt-3 backdrop-blur">
            <div className="flex-1 rounded-full bg-primary-50 px-3.5 py-2 text-[11px] text-foreground-subtle">
              اكتب رسالة…
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white">
              <SendHorizontal size={15} />
            </span>
          </div>

          {/* home indicator */}
          <div className="absolute bottom-1.5 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-navy/25" />
        </div>

        {/* floating push notification — frosted-glass iOS banner */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="absolute inset-x-5 top-[64px] z-30 flex items-center gap-2.5 rounded-[20px] bg-white/55 p-2.5 shadow-[0_18px_45px_-14px_rgba(33,11,101,0.55)] ring-1 ring-white/70 backdrop-blur-xl"
        >
          {/* real app icon on a white tile, like a system notification */}
          <span className="grid h-[38px] w-[38px] shrink-0 place-items-center overflow-hidden rounded-[9px] bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/app-icon.png"
              alt="سادة كونكت"
              width={38}
              height={38}
              className="h-full w-full object-cover"
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[12px] font-semibold text-black/85">
                سادة كونكت
              </p>
              <span className="tnum shrink-0 text-[10px] font-medium text-black/40">
                now
              </span>
            </div>
            <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-black/70">
              رسالة جديدة من نورة: «عندكم الجاكيت الأسود بمقاس M؟»
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function MobileApp() {
  return (
    <section id="app" className="scroll-mt-28 py-16 md:py-20">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-navy via-[#3a1c8f] to-primary-700 px-6 py-14 text-white shadow-[0_40px_120px_-40px_rgba(33,11,101,0.7)] md:px-14 md:py-16"
        >
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_55%_at_80%_10%,rgba(255,255,255,0.12),transparent)]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* copy */}
            <div className="text-center lg:text-start">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-bold text-white ring-1 ring-white/20">
                التطبيق المرافق
              </span>
              <h2 className="text-balance text-3xl font-extrabold leading-tight md:text-4xl">
                محادثاتك ومبيعاتك،
                <br />
                <span className="underline decoration-white/40 decoration-4 underline-offset-8">
                  معك أينما ذهبت
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/85 lg:mx-0 md:text-lg">
                حمّل تطبيق سادة كونكت على جوالك، وتابع رسائل عملائك وردودك من أي
                مكان — بإشعارات فورية لا تفوّتك أي فرصة.
              </p>

              <ul className="mx-auto mt-7 max-w-md space-y-3 lg:mx-0">
                {PERKS.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 text-start"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
                      <p.icon size={17} />
                    </span>
                    <span className="text-[15px] font-medium text-white/90">
                      {p.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <AppStoreBadge />
                <PlayStoreBadge />
              </div>
            </div>

            {/* phone */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={defaultViewport}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              <PhoneMock />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
