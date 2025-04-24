import { AppWrapper } from '@kigo-top/components';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'TOP', // Update the title here
  description: 'TOP', // Update the description here
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppWrapper>{children}</AppWrapper>;
}
