import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { profile } from '@/data/resume';
import './globals.css';

export const metadata: Metadata = {
  title: `${profile.name} — Resume`,
  description: profile.intro,
};

// The theme follows the visitor's system setting unless they have picked one with the toggle (saved as "theme-choice").
// It is applied before first paint so the page does not flash.
const themeScript = `(function(){var c=null;try{c=localStorage.getItem('theme-choice')}catch(e){}if(c==='dark'||(c!=='light'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.setAttribute('data-theme','dark')})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
