import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from '@/components/providers';
import SmoothScroll from '@/components/smooth-scroll';
import { WhatsAppFloatingButton } from '@/components/ui/whatsapp-button';

const montserratArabic = localFont({
  variable: '--font-montserrat-arabic',
  display: 'swap',
  src: [
    { path: '../assets/fonts/Montserrat-Arabic-Light.otf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/Montserrat-Arabic-Regular.otf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Montserrat-Arabic-Medium.otf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/Montserrat-Arabic-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../assets/fonts/Montserrat-Arabic-Bold.otf', weight: '700', style: 'normal' },
    { path: '../assets/fonts/Montserrat-Arabic-ExtraBold.otf', weight: '800', style: 'normal' },
    { path: '../assets/fonts/Montserrat-Arabic-Black.otf', weight: '900', style: 'normal' },
  ],
});

import Script from 'next/script';
import { SITE_URL } from '@/lib/site';

/** Search Console ownership. Leave unset until the property is created. */
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
/** GA4. Unset on Preview so only production reports. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
  title: 'سادة كونكت — من المحادثة إلى الصفقة',
  description:
    'منصة سادة كونكت تجمع محادثات واتساب ومبيعاتك في نظام واحد، مع موظف ذكي يرد تلقائيا، حملات، صفقات، طلبات وفواتير، وتقييم خدمة العملاء. ابدأ مجانا.',
  keywords: [
    'سادة كونكت',
    'واتساب للأعمال',
    'واتساب API',
    'CRM',
    'ذكاء اصطناعي',
    'مبيعات واتساب',
    'حملات واتساب',
    'فواتير',
    'خدمة العملاء',
  ],
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'سادة كونكت',
    title: 'سادة كونكت — من المحادثة إلى الصفقة',
    description:
      'اجمع واتساب ومبيعاتك في نظام واحد، ودع الموظف الذكي يرد ويوزع المحادثات على فريقك.',
  },
  twitter: { card: 'summary_large_image', title: 'سادة كونكت', description: 'واتساب + مبيعات + ذكاء اصطناعي.' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={montserratArabic.variable}>
      <body className="min-h-screen overflow-x-clip bg-background text-foreground antialiased">
        <SmoothScroll />
        <Providers>{children}</Providers>
        <WhatsAppFloatingButton />

        {/* GA4 — gated on the env var so preview and dev deployments send
            nothing. Link the property to Search Console: that is what turns
            "1,200 sessions" into "1,200 sessions from these 40 queries". */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
