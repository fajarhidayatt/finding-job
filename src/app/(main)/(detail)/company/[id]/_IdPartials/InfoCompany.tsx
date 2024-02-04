import { Badge } from '@/components/ui/badge';
import { Building, Flame, MapPin, UsersRound } from 'lucide-react';
import Image from 'next/image';
import InfoItem from './InfoItem';

const InfoCompany = () => {
  return (
    <div className="w-full sm:w-10/12 mx-auto mt-10">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 md:w-36 md:h-36">
          <Image
            src="/dummies/dummy-company-1.png"
            alt="compnay profile"
            width={150}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-semibold">Twitter</h1>
            <Badge
              variant="outline"
              className="border-primary rounded-none text-primary py-1.5 px-2.5"
            >
              10 Jobs
            </Badge>
          </div>
          <a
            href="https://google.com"
            target="_blank"
            className="font-semibold text-primary block mt-2"
          >
            www.google.com
          </a>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
        <InfoItem title="Founded" description="12 Jan, 2020">
          <Flame className="w-6 h-6 text-primary" />
        </InfoItem>
        <InfoItem title="Employees" description="10-15">
          <UsersRound className="w-6 h-6 text-primary" />
        </InfoItem>
        <InfoItem title="Location" description="Jakarta">
          <MapPin className="w-6 h-6 text-primary" />
        </InfoItem>
        <InfoItem title="Industry" description="Technology">
          <Building className="w-6 h-6 text-primary" />
        </InfoItem>
      </div>
    </div>
  );
};

export default InfoCompany;
