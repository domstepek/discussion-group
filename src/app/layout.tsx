import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Discussion Group',
  description: 'App to handle civil debates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} antialiased h-screen overflow-hidden`}
        style={{
          fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif',
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
