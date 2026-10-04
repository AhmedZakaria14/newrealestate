import type { Metadata } from 'next';
import './globals.css';
import { LanguageThemeProvider } from '@/lib/language-theme-context';
import { AuthProvider } from '@/lib/auth-context';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import PageTransitionLoader from '@/components/PageTransitionLoader';

export const metadata: Metadata = {
  title: 'HARD Real Estate | Premier Marketing & Brokerage',
  description:
    'HARD Real Estate - Premier bilingual real estate marketing and brokerage platform in English and Arabic. Luxury properties, master projects, certified advisory, and marketing excellence.',
  keywords:
    'مقاولات عامة, تطوير إنشائي, كود البناء السعودي, SBC, وساطة عقارية, رخصة فال 1200028472, تسويق عقاري, تكييف مركزي, عقود صيانة AMC, مجموعة هارد, هارد للمقاولات, الخُبر, الرياض, HARD Group, HARD Construction, HARD Real Estate',
  authors: [{ name: 'HARD Group - مجموعة هارد' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HARD Real Estate | Premier Marketing & Brokerage',
    description:
      'HARD Real Estate - Premier bilingual real estate marketing and brokerage platform in English and Arabic. Luxury properties, master projects, certified advisory, and marketing excellence.',
    url: 'https://ai-realestate-phi-ecru.vercel.app/',
    siteName: 'مجموعة هارد - HARD Group',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'HARD Real Estate | Premier Marketing & Brokerage',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HARD Real Estate | Premier Marketing & Brokerage',
    description:
      'HARD Real Estate - Premier bilingual real estate marketing and brokerage platform in English and Arabic. Luxury properties, master projects, certified advisory, and marketing excellence.',
    images: ['https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        <LanguageThemeProvider>
          <AuthProvider>
            <SmoothScrollProvider>
              <PageTransitionLoader />
              {children}
            </SmoothScrollProvider>
          </AuthProvider>
        </LanguageThemeProvider>
      </body>
    </html>
  );
}
