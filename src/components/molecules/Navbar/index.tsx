'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { logoDark } from '@/images';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AlignJustify } from 'lucide-react';
import { activeMenu, cn } from '@/lib/utils';
import { ProfileAccount } from '@/components/atoms';

const Navbar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <nav className="max-w-screen-xl w-full mx-auto container py-3 bg-white">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="w-48">
            <Image src={logoDark} alt="logo" width={192} height={43} />
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
          <ul className="w-full flex flex-col md:flex-row gap-3 md:gap-5 mt-5 md:mt-0">
            <li>
              <Link
                href="/"
                className={cn(
                  'font-medium text-muted-foreground hover:text-primary',
                  activeMenu(pathname, /^\/$/)
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/jobs"
                className={cn(
                  'font-medium text-muted-foreground hover:text-primary',
                  activeMenu(pathname, /^\/jobs\/*/)
                )}
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/companies"
                className={cn(
                  'font-medium text-muted-foreground hover:text-primary',
                  activeMenu(pathname, /^\/companies\/*/)
                )}
              >
                Companies
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
