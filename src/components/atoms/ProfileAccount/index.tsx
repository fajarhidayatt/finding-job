import Image from 'next/image';
import { User } from 'next-auth';
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
        <div className="flex items-center gap-2">
          <span>{account.name}</span>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={`https://ui-avatars.com/api/?name=${account.name}`}
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
        ) : account.role === 'Company' ? (
          <CompanyMenu />
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default ProfileAccount;
