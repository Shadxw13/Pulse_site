import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { introBootScript } from '@/components/layout/IntroCurtain';
import { site } from '@/content/site';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Pulse · Base FiveM ESX Legacy pour serveurs RP', template: '%s · Pulse' },
  description:
    'Pulse, base FiveM ESX Legacy + ox_inventory à environ 0,30 ms côté serveur : systèmes RP complets, espace client et tablette de gestion en jeu.',
  applicationName: 'Pulse',
  icons: { icon: '/favicon.svg' },
  openGraph: { type: 'website', locale: 'fr_FR', siteName: 'Pulse', url: '/' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#F5F4F1',
  colorScheme: 'light',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: introBootScript }}
        />
      </head>
      <body>
        <MotionProvider nonce={nonce}>
          <SmoothScroll />
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
