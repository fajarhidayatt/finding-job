import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ClipboardList, Settings, User } from 'lucide-react';

const JobseekerMenu = () => {
  return (
    <ul>
      <li>
        <Link
          href="/profile"
          className="flex items-center gap-2 py-2.5 text-sm font-medium"
        >
          <User className="w-5 h-5" />
          Profile
        </Link>
      </li>
      <li>
        <Link
          href="/profile/applicants"
          className="flex items-center gap-2 py-2.5 text-sm font-medium"
        >
          <ClipboardList className="w-5 h-5" />
          Applicants
        </Link>
      </li>
      <li>
        <Link
          href="/profile/settings"
          className="flex items-center gap-2 py-2.5 text-sm font-medium"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </li>
      <li>
        <Separator />
      </li>
      <li>
        <Button
          variant="ghost"
          className="w-full mt-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-500"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </li>
    </ul>
  );
};

export default JobseekerMenu;
