'use client';

import Image from 'next/image';
import { User } from 'next-auth';
import { supabaseGetFile } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import CompanyMenu from './CompanyMenu';
import JobseekerMenu from './JobseekerMenu';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ProfileAccountProps {
  account: User;
}

const ProfileAccount = ({ account }: ProfileAccountProps) => {
  const [imageSrc, setImageSrc] = useState<string>(
    `https://ui-avatars.com/api/?name=${account.name}`
  );

  useEffect(() => {
    if (account.image) {
      const { url } = supabaseGetFile(account.image, 'images');
      setImageSrc(url);
    }
  }, [account.image]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2">
          <span>{account.name}</span>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={imageSrc}
              width={50}
              height={50}
              alt="profile picture"
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-56 p-2.5">
        {account.role === 'JOBSEEKER' ? (
          <JobseekerMenu />
        ) : account.role === 'COMPANY' ? (
          <CompanyMenu />
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default ProfileAccount;
