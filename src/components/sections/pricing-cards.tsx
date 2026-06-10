'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Check, Trophy, Gem, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { ease } from '@/lib/motion';
import type { Period, PlanCard, PlanIcon } from '@/lib/plans';

const ICONS: Record<PlanIcon, React.ReactNode> = {
  trophy: <Trophy size={18} />,
  gem: <Gem size={18} />,
  sparkles: <Sparkles size={18} />,
};

// Card gradients keyed by position so the look matches the original design
// regardless of how many plans the catalog returns.
const GRADIENTS = [
  'linear-gradient(16deg, #FFFFFF 66%, rgba(98,203,255,0.18) 101%)',
  'linear-gradient(18deg, #FFFFFF 60%, rgba(142,107,255,0.22) 100%)',
  'linear-gradient(17deg, #FFFFFF 60%, rgba(92,60,255,0.20) 96%)',
];

// Keep the grid balanced however many plans are published (static class
// strings so Tailwind keeps them). Caps at 3 columns; 4+ wraps to a new row.
const GRID_COLS: Record<number, string> = {
  1: 'md:grid-cols-1 md:max-w-sm',
  2: 'md:grid-cols-2 md:max-w-3xl',
  3: 'md:grid-cols-3',
};

export function PricingCards({
  plans,
  yearlyDiscount,
}: {
  plans: PlanCard[];
  yearlyDiscount: number;
}) {
  const hasYearly = yearlyDiscount > 0;
  const [period, setPeriod] = React.useState<Period>(hasYearly ? 'yearly' : 'monthly');

  return (
    <>
      {/* Period toggle — only when at least one plan offers a yearly discount */}
      {hasYearly && (
        <div className="mb-12 flex justify-center">
          <div
            className="flex w-max gap-1 rounded-full p-1.5"
            style={{
              background: 'linear-gradient(84deg, #FFF 2%, #EDE7FF 84%)',
              boxShadow: '0 1px 1px rgba(44,64,94,0.05)',
            }}
          >
            <button
              onClick={() => setPeriod('monthly')}
              className={cn(
                'rounded-full px-5 py-2 text-sm transition-colors',
                period === 'monthly'
                  ? 'border border-gray-200 bg-white text-navy'
                  : 'text-foreground-subtle',
              )}
            >
              شهري
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={cn(
                'flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors',
                period === 'yearly'
                  ? 'border border-gray-200 bg-white text-navy'
                  : 'text-foreground-subtle',
              )}
            >
              سنوي
              <span className="rounded-full border border-primary-200 bg-primary-50 px-2 py-0.5 text-[11px] font-bold text-primary-600">
                وفّر {yearlyDiscount}%
              </span>
            </button>
          </div>
        </div>
      )}

      <div
        className={cn(
          'mx-auto grid grid-cols-1 gap-7',
          GRID_COLS[Math.min(plans.length, 3)] ?? GRID_COLS[3],
        )}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            style={{ background: GRADIENTS[i % GRADIENTS.length] }}
            className={cn(
              'relative flex flex-col rounded-[28px] border border-white/60 p-8 shadow-lg',
              plan.featured && 'ring-2 ring-primary-500 lg:scale-[1.04]',
            )}
          >
            {plan.featured && plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-l from-primary-600 to-indigo px-3 py-1 text-[11px] font-bold text-white">
                {plan.badge}
              </span>
            )}

            <div className="flex items-center gap-2 text-navy">
              {ICONS[plan.icon]}
              <span className="text-lg font-bold">{plan.name}</span>
            </div>
            <p className="mt-1 text-[13px] text-foreground-muted">{plan.tagline}</p>

            <div className="mt-5 flex items-end gap-1.5">
              {plan.price[period] === 'custom' ? (
                <span className="text-3xl font-extrabold text-navy">مخصّص</span>
              ) : (
                <>
                  <span className="tnum text-4xl font-extrabold text-navy">
                    {plan.price[period]}
                  </span>
                  {(plan.price[period] as number) > 0 && (
                    <>
                      <span className="mb-1 text-sm text-foreground-muted">ر.س</span>
                      <span className="mb-1 text-[13px] text-foreground-subtle">/ شهرياً</span>
                    </>
                  )}
                </>
              )}
            </div>

            <Button
              href={plan.href}
              variant={plan.featured ? 'primary' : 'outline'}
              size="sm"
              className="mt-6 w-full"
            >
              {plan.cta}
            </Button>

            <div className="my-6 h-px bg-gradient-to-l from-transparent via-gray-200 to-transparent" />

            <ul className="space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-100">
                    <Check className="h-3 w-3 text-primary-600" />
                  </span>
                  <span className="text-sm text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  );
}
