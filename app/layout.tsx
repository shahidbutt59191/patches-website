import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apex Patches | Custom Patch Manufacturer & Direct Factory Studio',
  description: 'Factory-direct custom embroidered, 3D PVC rubber, laser-debossed leather, and varsity chenille patches. Free 6-hour digital proof, low 10-piece minimum, and fast worldwide turnaround.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
