'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/section';
import { cn } from '@/lib/utils/cn';

const FAQS = [
  {
    q: 'هل النظام مخصص لقطاع معين؟',
    a: 'لا، سادة كونكت مناسب لأي متجر أو نشاط يبيع ويتواصل مع عملائه عبر واتساب — تجارة إلكترونية، خدمات، أو تجزئة.',
  },
  {
    q: 'ما الفرق بين واتساب ويب وواتساب API؟',
    a: 'واتساب ويب يربط رقمك عبر مسح رمز QR ويناسب البداية السريعة. أما واتساب الأعمال (API) فهو ربط رسمي عبر منصة ميتا يتيح الحملات والقوالب المعتمدة والاستقرار على نطاق أوسع.',
  },
  {
    q: 'كيف أربط رقم واتساب بالنظام؟',
    a: 'من إعدادات الربط: امسح رمز QR لواتساب ويب، أو اربط حساب واتساب الأعمال (Cloud API) خلال دقائق. ويمكنك ربط أكثر من رقم.',
  },
  {
    q: 'هل الموظف الذكي يرد تلقائيا؟ وهل أتحكم به؟',
    a: 'نعم، يرد تلقائيا بأسلوب متجرك ضمن ساعات العمل التي تحددها، ويحول المحادثة لفريقك عند الحاجة. أنت تتحكم بشخصيته وحدوده بالكامل.',
  },
  {
    q: 'هل أستطيع توزيع الصلاحيات بين الموظفين؟',
    a: 'نعم، عبر نظام أدوار وصلاحيات دقيق تحدد فيه ما يصل إليه كل موظف، مع توزيع المحادثات على الفريق.',
  },
  {
    q: 'هل أنقل بياناتي من وإلى النظام؟',
    a: 'نعم، يمكنك استيراد وتصدير العملاء والمنتجات بسهولة، والوصول إلى بياناتك عبر التقارير وواجهة API في الباقات المتقدمة.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white transition-shadow',
        open ? 'border-primary-200 shadow-md' : 'border-gray-100',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
      >
        <span className="font-bold text-navy">{q}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-primary-500 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 leading-relaxed text-foreground-muted">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <Section id="faq" size="md">
      <SectionHeader
        eyebrow="الأسئلة الشائعة"
        title={
          <>
            أسئلة قد <span className="gradient-text">تخطر لك</span>
          </>
        }
      />
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <FaqItem key={i} {...f} />
        ))}
      </div>
    </Section>
  );
}
