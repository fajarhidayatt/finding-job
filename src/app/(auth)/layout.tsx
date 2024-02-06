import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: {
    template: 'Finding Job | %s',
    default: 'Finding Job',
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
