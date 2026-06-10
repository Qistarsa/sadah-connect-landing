/**
 * Pricing data for the landing page, sourced from the backend public catalog
 * (`GET /api/plans/public`). Fetched server-side in the Pricing section, so
 * there is no CORS hop and the HTML ships pre-rendered.
 *
 * The wire rows mirror the vendor storefront (see backend `STOREFRONT_SELECT`).
 * We map them into the small view-model the cards render, and fall back to a
 * hardcoded catalog if the backend is unreachable so marketing never breaks.
 */
import { API_BASE, SITE } from './site';

export type Period = 'monthly' | 'yearly';
export type PlanIcon = 'trophy' | 'gem' | 'sparkles';

export interface PlanCard {
  key: string;
  name: string;
  tagline: string;
  /** Per-month price for each billing period; 'custom' → contact-sales tier. */
  price: Record<Period, number | 'custom'>;
  cta: string;
  href: string;
  featured: boolean;
  badge: string | null;
  icon: PlanIcon;
  features: string[];
}

export interface PricingData {
  plans: PlanCard[];
  /** Yearly discount % shown on the toggle. 0 → hide the toggle entirely. */
  yearlyDiscount: number;
}

// ─── Wire shape (subset of the backend payload we actually use) ──────────────

interface WireFeature {
  label: string;
  included: boolean;
}

interface WirePlan {
  key: string;
  kind: 'free' | 'paid';
  nameAr: string;
  taglineAr: string | null;
  features: WireFeature[] | null;
  featuredBadge: string | null;
  priceMonthly: string | null;
  yearlyDiscountPercent: number | null;
}

interface Envelope {
  data?: { rows?: WirePlan[] };
}

// ─── Mapping ─────────────────────────────────────────────────────────────────

function mapPlan(p: WirePlan): PlanCard {
  const monthly = p.priceMonthly != null ? Number(p.priceMonthly) : null;
  // A paid plan with no price is the enterprise "contact us" tier.
  const isCustom = p.kind === 'paid' && monthly == null;
  const isFree = p.kind === 'free' || monthly === 0;

  let price: Record<Period, number | 'custom'>;
  if (isCustom) {
    price = { monthly: 'custom', yearly: 'custom' };
  } else {
    const m = monthly ?? 0;
    const yearly =
      m > 0 && p.yearlyDiscountPercent && p.yearlyDiscountPercent > 0
        ? Math.round(m * (1 - p.yearlyDiscountPercent / 100))
        : m;
    price = { monthly: m, yearly };
  }

  return {
    key: p.key,
    name: p.nameAr,
    tagline: p.taglineAr ?? '',
    price,
    cta: isCustom ? 'تواصل معنا' : isFree ? 'ابدأ الآن' : 'ابدأ مجاناً',
    href: isCustom ? SITE.whatsapp : SITE.signup,
    featured: Boolean(p.featuredBadge),
    badge: p.featuredBadge,
    icon: isCustom ? 'sparkles' : isFree ? 'trophy' : 'gem',
    features: (p.features ?? []).filter((f) => f.included).map((f) => f.label),
  };
}

// ─── Fallback (matches the previously-hardcoded marketing copy) ───────────────

const FALLBACK: PricingData = {
  yearlyDiscount: 20,
  plans: [
    {
      key: 'pro',
      name: 'احترافي',
      tagline: 'للمتاجر النامية',
      price: { monthly: 249, yearly: 199 },
      cta: 'ابدأ مجاناً',
      href: SITE.signup,
      featured: true,
      badge: 'الأكثر شيوعاً',
      icon: 'gem',
      features: [
        'كل مزايا المجاني',
        'الموظف الذكي (ردود تلقائية)',
        'الحملات وقوائم الإرسال',
        'كتالوج المنتجات',
        'تقارير متقدمة',
        'صلاحيات الأدوار',
      ],
    },
    {
      key: 'business',
      name: 'أعمال',
      tagline: 'للفرق الكبيرة',
      price: { monthly: 'custom', yearly: 'custom' },
      cta: 'تواصل معنا',
      href: SITE.whatsapp,
      featured: false,
      badge: null,
      icon: 'sparkles',
      features: ['كل مزايا الاحترافي', 'أعضاء وصلاحيات غير محدودة', 'وصول API', 'دعم مخصّص'],
    },
  ],
};

/**
 * Server-side fetch of the public catalog. Revalidates every 5 minutes so
 * admin edits propagate without a redeploy. Any failure (backend down, bad
 * payload, empty catalog) returns the fallback so the section always renders.
 */
export async function fetchPricing(): Promise<PricingData> {
  try {
    const res = await fetch(`${API_BASE}/api/plans/public`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as Envelope;
    // Hide the free tier on the marketing page — it stays an in-app option only.
    const rows = (json.data?.rows ?? []).filter((r) => r.kind !== 'free');
    if (rows.length === 0) return FALLBACK;
    return {
      plans: rows.map(mapPlan),
      yearlyDiscount: rows.reduce(
        (max, r) => Math.max(max, r.yearlyDiscountPercent ?? 0),
        0,
      ),
    };
  } catch {
    return FALLBACK;
  }
}
