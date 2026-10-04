import type { Metadata } from 'next';
import './globals.css';
import { LanguageThemeProvider } from '@/lib/language-theme-context';
import { AuthProvider } from '@/lib/auth-context';
import { SiteContentProvider } from '@/lib/site-content-context';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import SeoJsonLd from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: 'مجموعة هارد | المقاولات العامة والتطوير الإنشائي والعقاري - HARD Group',
  description:
    'مجموعة هارد للمقاولات العامة والتطوير الإنشائي والوساطة العقارية المرخصة (فال 1200028472). مقاولات عامة فئة أولى، تنفيذ أبراج ومجمعات سكنية وتجارية وفق كود البناء السعودي (SBC)، وهندسة تشغيل المرافق وعقود AMC.',
  keywords:
    'مقاولات عامة, تطوير إنشائي, كود البناء السعودي, SBC, وساطة عقارية, رخصة فال 1200028472, تسويق عقاري, تكييف مركزي, عقود صيانة AMC, مجموعة هارد, هارد للمقاولات, الخُبر, الرياض, HARD Group, HARD Construction, HARD Real Estate',
  authors: [{ name: 'HARD Group - مجموعة هارد' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'مجموعة هارد | المقاولات العامة والتطوير الإنشائي والعقاري',
    description:
      'مقاولات عامة فئة أولى لتنفيذ الأبراج والمجمعات الذكية وفق كود البناء السعودي (SBC)، مع منظومة متكاملة للتطوير العقاري، الوساطة المعتمدة (فال 1200028472)، وتشغيل المرافق.',
    url: 'https://ai-realestate-phi-ecru.vercel.app/',
    siteName: 'مجموعة هارد - HARD Group',
    images: [
      {
        url: '/images/hardgp/por1-big.jpg',
        width: 1200,
        height: 630,
        alt: 'مجموعة هارد للمقاولات العامة والتطوير الإنشائي والعقاري',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مجموعة هارد | المقاولات العامة والتطوير الإنشائي والعقاري',
    description:
      'مقاولات عامة فئة أولى لتنفيذ الأبراج والمجمعات الذكية وفق كود البناء السعودي (SBC)، مع منظومة متكاملة للتطوير العقاري وتشغيل المرافق.',
    images: ['/images/hardgp/por1-big.jpg'],
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
            <SiteContentProvider>
              <AnalyticsTracker />
              <SeoJsonLd />
              <SmoothScrollProvider>
                {children}
              </SmoothScrollProvider>
            </SiteContentProvider>
          </AuthProvider>
        </LanguageThemeProvider>
      </body>
    </html>
  );
}
