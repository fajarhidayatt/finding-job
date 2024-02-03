import '@/styles/globals.css';

import { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import Image from 'next/image';

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
        <main className="w-screen h-screen grid md:grid-cols-2 overflow-hidden">
          <section className="hidden md:block">
            <Image
              src="/images/bg-auth.png"
              alt="background"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </section>
          <section className="w-full h-screen flex items-center justify-center">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
