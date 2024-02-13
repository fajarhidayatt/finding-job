'use client';

import Image from 'next/image';
import { User } from 'next-auth';
import { getImageSrc } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import CompanyMenu from './CompanyMenu';
import JobseekerMenu from './JobseekerMenu';

interface ProfileAccountProps {
  account: User;
}

const ProfileAccount = ({ account }: ProfileAccountProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center md:flex-row-reverse gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={getImageSrc(account.image, account.name!!)}
              width={45}
              height={45}
              alt="Profile picture"
              className="w-full h-full object-cover"
            />
          </div>
          <span>{account.name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-56 p-2.5" align="start">
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
