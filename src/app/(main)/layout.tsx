import '@/styles/globals.css';

import { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import { Footer, Navbar } from '@/components/molecules';

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
    <html lang="en">
      <body className={epilogue.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
