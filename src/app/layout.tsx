import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { SITE_URL, BUSINESS_NAME } from './site';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

const TITLE = 'AI Automation & AI Voice Agent Courses (n8n, Retell AI) | Ahmed Memon';
const DESCRIPTION =
  'Learn n8n AI automation and AI voice agents with recorded courses, lifetime access and personal guidance from Ahmed Memon. 100+ students taught. Get both courses for Rs. 10,000.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${BUSINESS_NAME}` },
  description: DESCRIPTION,
  keywords: [
    'n8n course', 'AI automation course', 'AI voice agent course', 'Retell AI course',
    'AI calling agent', 'n8n automation Pakistan', 'learn AI automation', 'AI automation services',
    'website development', 'Ahmed Memon',
  ],
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#071329',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
