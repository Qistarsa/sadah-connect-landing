import { Section, SectionHeader } from '@/components/ui/section';
import { fetchPricing } from '@/lib/plans';
import { PricingCards } from './pricing-cards';

/**
 * Server component — fetches the live catalog from the backend
 * (`/api/plans/public`) and hands it to the interactive cards. Falls back to a
 * baked-in catalog inside `fetchPricing` if the backend is unreachable.
 */
export async function Pricing() {
  const { plans, yearlyDiscount } = await fetchPricing();

  return (
    <Section id="pricing" background="gradient">
      <SectionHeader
        eyebrow="الأسعار"
        title={
          <>
            خططٌ تنمو <span className="gradient-text">مع متجرك</span>
          </>
        }
        description="ابدأ مجاناً، وارْقَ حين تحتاج. بلا عقود ولا رسوم خفية."
      />

      <PricingCards plans={plans} yearlyDiscount={yearlyDiscount} />
    </Section>
  );
}
