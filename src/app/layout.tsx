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

const SITE_URL = 'https://connect.sadah.sa';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'سادة كونكت — من المحادثة إلى الصفقة',
  description:
    'منصة سادة كونكت تجمع محادثات واتساب ومبيعاتك في نظام واحد، مع موظفٍ ذكي يردّ تلقائياً، حملات، صفقات، وتقارير. ابدأ مجاناً.',
  keywords: ['سادة كونكت', 'واتساب للأعمال', 'CRM', 'ذكاء اصطناعي', 'مبيعات واتساب'],
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'سادة كونكت',
    title: 'سادة كونكت — من المحادثة إلى الصفقة',
    description:
      'اجمع واتساب ومبيعاتك في نظام واحد، ودع الموظف الذكي يردّ ويوزّع المحادثات على فريقك.',
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
      </body>
    </html>
  );
}
