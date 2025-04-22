// import { AppProvider } from '@kigo-top/components';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'TOP', // Update the title here
  description: 'TOP', // Update the description here
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sdkUrl = process.env.NEXT_PUBLIC_SDK_URL;
  return (
    <html lang="en">
      <head>
        <Script src={sdkUrl} />
      </head>
      <body>
        <Suspense>
          {/* <AppProvider>{children}</AppProvider> */}
          {children}
        </Suspense>
      </body>
    </html>
  );
}
