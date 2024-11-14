import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Customs Broker Dashboard',
  description: 'A modern dashboard for customs brokers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} transition-theme duration-250 ease-theme`}>
          <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-theme duration-250 ease-theme">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
} 