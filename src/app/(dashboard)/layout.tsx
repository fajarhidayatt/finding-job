import '@/styles/globals.css';

import { Metadata } from 'next';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'Dashboard | %s',
    default: 'Dashboard',
  },
};

export default function RootDashboardLayout({
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
