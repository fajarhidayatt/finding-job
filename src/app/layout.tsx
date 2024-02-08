import '@/styles/globals.css';

import { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import NextAuthProvider from '@/providers/NextAuthProvider';

const epilogue = Epilogue({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'Finding Job | %s',
    default: 'Finding Job',
  },
  description: 'Find your dream job easier',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={epilogue.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </NextAuthProvider>
  );
}
