'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Building,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <aside
      className={`max-w-60 w-full px-5 py-7 border-r border-r-neutral-300 fixed inset-y-0 md:left-0 ${
        toggle ? 'left-0' : '-left-60'
      } z-10 duration-300 bg-white`}
    >
      <Button
        size="icon"
        className="fixed top-4 right-5 md:hidden"
        onClick={() => setToggle(!toggle)}
      >
        <Menu />
      </Button>
      <h3 className="text-2xl font-medium">Dashboard</h3>
      <ul className="mt-5 space-y-3">
        <li className="p-3 text-sm rounded-md hover:bg-primary/10 hover:text-primary">
          <Link href="/dashboard/company" className="flex items-center gap-5">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </li>
        <li className="p-3 text-sm rounded-md hover:bg-primary/10 hover:text-primary">
          <Link
            href="/dashboard/company/job-listings"
            className="flex items-center gap-5"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Job Listings</span>
          </Link>
        </li>
        <li className="p-3 text-sm rounded-md hover:bg-primary/10 hover:text-primary">
          <Link href="/" className="flex items-center gap-5">
            <Users className="w-5 h-5" />
            <span>All Applicants</span>
          </Link>
        </li>
        <li className="p-3 text-sm rounded-md hover:bg-primary/10 hover:text-primary">
          <Link href="/" className="flex items-center gap-5">
            <Building className="w-5 h-5" />
            <span>Company Profile</span>
          </Link>
        </li>
        <li className="p-3 text-sm rounded-md hover:bg-primary/10 hover:text-primary">
          <Link href="/" className="flex items-center gap-5">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </li>
        <li className="p-3 text-sm rounded-md bg-red-500/10 hover:bg-red-500/25 text-red-700">
          <Link href="/" className="flex items-center gap-5">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
