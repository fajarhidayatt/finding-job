import '@/styles/globals.css';

import { Metadata } from 'next';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Find your dream job easier',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.className}>{children}</body>
    </html>
  );
}
