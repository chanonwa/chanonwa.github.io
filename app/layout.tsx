import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { profile } from '@/data/resume';
import './globals.css';

export const metadata: Metadata = {
  title: `${profile.name} — Resume`,
  description: profile.intro,
};

// Light is the default. Only a saved "dark" choice changes it, applied before first paint so the page does not flash.
// The key is "theme-choice" (not "theme") so choices saved before light became the default do not carry over.
const themeScript = `try{if(localStorage.getItem('theme-choice')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

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
