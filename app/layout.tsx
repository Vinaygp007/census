'use client';

import { useEffect } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { initClarity } from '@/lib/clarity';
import Navbar from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Microsoft Clarity
    // Replace with your actual Clarity Project ID
    initClarity('your-project-id-here');
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <title>Phase Census - What Phase Are You In?</title>
        <meta name="description" content="Join millions of Indians discovering their emotional state through India's First Phase Census" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16 md:pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
