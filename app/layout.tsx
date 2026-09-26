import type { Metadata } from 'next';
import './globals.css';
import { LanguageThemeProvider } from '@/lib/language-theme-context';

export const metadata: Metadata = {
  title: 'سكاي فيلا | Skyvilla - العقارات الفاخرة والإنشاءات الهندسية',
  description: 'نشكّل أسلوب الحياة العصري من خلال التميز والريادة في البناء. شركة رائدة في التطوير العقاري والإنشاءات الهندسية الفاخرة.',
  keywords: 'عقارات, بناء, مقاولات, فلل فاخرة, تصميم معماري, إدارة مشاريع, سكاي فيلا, real estate, construction, modern architecture, skyvilla',
  authors: [{ name: 'Skyvilla Construction' }],
  openGraph: {
    title: 'Skyvilla - Luxury Real Estate & Construction | سكاي فيلا للإنشاءات الفاخرة',
    description: 'Shaping modern living through construction excellence. نشكّل أسلوب الحياة العصري من خلال التميز في البناء.',
    url: 'https://demo.awaikenthemes.com/skyvilla/home-version-3/',
    siteName: 'Skyvilla',
    images: [
      {
        url: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/hero-bg-image-metal.jpg',
        width: 1200,
        height: 630,
        alt: 'Skyvilla Construction Excellence',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skyvilla - Luxury Real Estate & Construction | سكاي فيلا',
    description: 'Shaping modern living through construction excellence. نشكّل أسلوب الحياة العصري من خلال التميز في البناء.',
    images: ['https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/hero-bg-image-metal.jpg'],
  },
  icons: {
    icon: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#DCFF09] selection:text-[#040618]" suppressHydrationWarning>
        <LanguageThemeProvider>
          {children}
        </LanguageThemeProvider>
      </body>
    </html>
  );
}
