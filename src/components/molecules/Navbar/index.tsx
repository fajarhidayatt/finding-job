'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { AlignJustify } from 'lucide-react';
import { ProfileAccount } from '@/components/atoms';

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <nav className="max-w-screen-xl w-full mx-auto container py-3 bg-white">
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
        <div
          className={cn(
            'w-full max-h-0 md:max-h-screen flex flex-col md:flex-row md:items-center gap-3 overflow-hidden transition-max-height duration-500 md:ml-10',
            toggle && 'max-h-screen'
          )}
        >
          <ul className="w-full flex flex-col md:flex-row gap-3 mt-5 md:mt-0">
            <li>
              <Link
                href="/jobs"
                className="font-medium text-muted-foreground hover:text-primary"
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/companies"
                className="font-medium text-muted-foreground hover:text-primary"
              >
                Browse Company
              </Link>
            </li>
          </ul>
          {session ? (
            <ProfileAccount account={session.user} />
          ) : (
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
