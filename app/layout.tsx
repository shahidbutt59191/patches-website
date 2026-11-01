import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BDigitizing | Custom Patches for Your Brand — Stitch Your Identity',
  description: 'High-quality embroidered, woven, iron-on, velcro, and custom leather patches with premium finishing. Free worldwide shipping & 10-14 days turnaround.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
