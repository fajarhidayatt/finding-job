'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { AlignJustify } from 'lucide-react';

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const linkContainer = clsx({
    'w-full md:max-h-screen flex flex-col md:flex-row md:items-center gap-3 overflow-hidden transition-max-height duration-500 md:ml-10':
      true,
    'max-h-screen': toggle,
    'max-h-0': !toggle,
  });

  return (
    <nav className="max-w-screen-xl w-full mx-auto container py-2 bg-white">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="w-48">
            <Image
              src="/images/logo-dark.png"
              alt="logo"
              width={160}
              height={36}
              className="w-full h-full object-contain"
            />
          </Link>
          <Button
            size="icon"
            className="md:hidden"
            onClick={() => setToggle(!toggle)}
          >
            <AlignJustify />
          </Button>
        </div>
        <div className={linkContainer}>
          <ul className="w-full flex flex-col md:flex-row gap-3 mt-5 md:mt-0">
            <li>
              <Link
                href="/find-jobs"
                className="font-medium text-muted-foreground hover:text-primary"
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/browse-companies"
                className="font-medium text-muted-foreground hover:text-primary"
              >
                Browse Company
              </Link>
            </li>
          </ul>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
            >
              Sign In
            </Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
