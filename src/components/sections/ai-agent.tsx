'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Mic,
  BrainCircuit,
  Bot,
  Users,
  CheckCheck,
  Sparkles,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SITE } from '@/lib/site';
import { ease, defaultViewport } from '@/lib/motion';
import { cn } from '@/lib/utils/cn';

const STEP_MS = [1900, 2300, 1500, 2700, 1900];

const BULLETS: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: BrainCircuit,
    title: 'يرد تلقائيا بأسلوب متجرك',
    desc: 'دربه على منتجاتك وسياساتك، فيرد على عملائك خلال ثوان.',
  },
  {
    icon: Mic,
    title: 'يفهم الرسائل الصوتية',
    desc: 'يحول المقاطع الصوتية إلى فهم نصي ليجيب عنها بدقة.',
  },
  {
    icon: Users,
    title: 'يسلم المحادثة لفريقك عند الحاجة',
    desc: 'عندما يكتشف أن العميل يريد التحدث مع موظف، يحول المحادثة مباشرة إلى فريقك.',
  },
];

function Waveform({ active }: { active: boolean }) {
  const bars = [6, 11, 8, 15, 9, 17, 7, 13, 9, 16, 8, 12, 6, 14, 9];
  return (
    <span className="flex h-5 items-center gap-[3px] text-blue-500">
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            'w-[3px] rounded-full bg-current',
            active && 'animate-pulse',
          )}
          style={{ height: h, animationDelay: `${i * 55}ms` }}
        />
      ))}
    </span>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-blue-400"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  );
}

function ChatPanel() {
  const reduce = useReducedMotion();
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (reduce) {
      setStep(4);
      return;
    }
    const t = setTimeout(() => setStep((s) => (s + 1) % 5), STEP_MS[step]);
    return () => clearTimeout(t);
  }, [step, reduce]);

  const showUnderstood = step >= 1;
  const showTyping = step === 2;
  const showReply = step >= 3;
  const showSent = step >= 4;

  const bubble = {
    initial: { opacity: 0, y: 10, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
    transition: { duration: 0.45, ease },
  };

  return (
    <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-2 shadow-[0_30px_90px_-40px_rgba(33,11,101,0.45)]">
      {/* Header — mirrors the real chat thread header */}
      <div className="flex items-center gap-3 rounded-[20px] bg-slate-50 px-4 py-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-violet-600 text-sm font-bold text-white">
          ن
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">نورة · عميلة</p>
          <p className="flex items-center gap-1.5 text-[11px] text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> متصلة
            الآن
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
          <Sparkles size={12} /> الموظف الذكي
        </span>
      </div>

      <div className="relative min-h-[348px] px-4 py-5">
        <div className="flex flex-col gap-3">
          {/* Inbound voice message + AI transcription */}
          <div className="me-auto max-w-[82%]">
            <div className="flex items-center gap-3 rounded-2xl rounded-tr-sm border border-slate-200/70 bg-white px-3.5 py-2.5 shadow-sm">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                <Mic size={16} />
              </span>
              <Waveform active={step === 0} />
              <span className="tnum text-[11px] text-slate-400">0:12</span>
            </div>
            <AnimatePresence>
              {showUnderstood && (
                <motion.div
                  {...bubble}
                  className="mt-1.5 rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-[12px] leading-relaxed text-slate-600 shadow-sm"
                >
                  <span className="me-1 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                    فهمها الموظف الذكي
                  </span>
                  «السلام عليكم، عندكم الجاكيت الأسود بمقاس M؟»
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Outbound AI reply */}
          <AnimatePresence mode="wait">
            {showTyping && (
              <motion.div key="typing" {...bubble} className="ms-auto">
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-sm bg-blue-50 px-4 py-3">
                  <Bot size={15} className="text-blue-600" />
                  <TypingDots />
                </div>
              </motion.div>
            )}
            {showReply && (
              <motion.div
                key="reply"
                {...bubble}
                className="ms-auto flex max-w-[90%] items-end justify-end gap-1.5"
              >
                <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-blue-500 to-violet-500 px-3.5 py-2.5 text-[13px] leading-relaxed text-white shadow-sm">
                  <span className="mb-1 inline-flex items-center gap-1 text-[10px] font-bold text-white/85">
                    <Bot size={11} /> رد تلقائي · الموظف الذكي
                  </span>
                  <p>
                    أهلا وسهلا 👋 نعم، الجاكيت الأسود متوفر بمقاس M بسعر 180
                    ريال، والتوصيل مجاني خلال يومين. أرسل لك رابط الطلب الآن؟
                  </p>
                  <div className="mt-1.5 flex h-4 items-center justify-end gap-1 text-[11px] text-white/85">
                    <AnimatePresence>
                      {showSent && (
                        <motion.span
                          {...bubble}
                          className="inline-flex items-center gap-1"
                        >
                          أرسل تلقائيا{' '}
                          <CheckCheck size={13} className="text-blue-200" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <span className="grid h-8 w-8 shrink-0 self-end place-items-center rounded-full bg-blue-100 text-blue-700">
                  <Bot size={16} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function AiAgent() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_50%_at_80%_20%,rgba(124,58,237,0.07),transparent),radial-gradient(45%_45%_at_15%_85%,rgba(99,102,241,0.07),transparent)]" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3.5 py-1.5 text-sm font-bold text-primary-700">
              الموظف الذكي
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-navy md:text-4xl">
              يرد على عملائك، <span className="gradient-text">تلقائيا</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              ذكاء يفهم محادثاتك — حتى الصوتية منها — ويرد بأسلوب متجرك،
              ويحولها لك عند الحاجة.
            </p>

            <div className="mt-8 space-y-4">
              {BULLETS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  className="flex items-start gap-3.5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary-600 shadow-sm ring-1 ring-primary-100">
                    <b.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy">{b.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-foreground-muted">
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href={SITE.signup}
              className="group mt-8 inline-flex items-center gap-1.5 font-bold text-primary-600"
            >
              فعل الموظف الذكي مجانا
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={defaultViewport}
            transition={{ duration: 0.8, ease }}
          >
            <ChatPanel />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
