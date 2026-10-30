import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ApexPatches | Custom Physical Patches Studio',
  description: 'Commercial Tajima embroidery, 3D soft PVC rubber, laser leatherette, and vintage chenille patches. Instant bulk discounts & free digital proof in 6 hours.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
