import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { TCompany } from '@/types';
import { getImageSrc } from '@/lib/utils';
import { Building, Flame, MapPin, UsersRound } from 'lucide-react';
import InfoItem from './InfoItem';

interface InfoCompanyProps extends Partial<TCompany> {
  jobTotal: number;
}

const InfoCompany = ({
  logo,
  dateFounded,
  employee,
  industry,
  jobTotal,
  location,
  name,
  website,
}: InfoCompanyProps) => {
  return (
    <div className="w-full sm:w-10/12 mx-auto mt-10">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 md:w-36 md:h-36">
          <Image
            src={getImageSrc(logo, name!!)}
            alt="compnay profile"
            width={150}
            height={150}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-semibold">{name}</h1>
            <Badge
              variant="outline"
              className="border-primary rounded-none text-primary py-1.5 px-2.5"
            >
              {jobTotal} Jobs
            </Badge>
          </div>
          <a
            href={website}
            target="_blank"
            className="font-semibold text-primary block mt-2"
          >
            {website}
          </a>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
        <InfoItem title="Founded" description={format(dateFounded!!, 'PP')}>
          <Flame className="w-6 h-6 text-primary" />
        </InfoItem>
        <InfoItem title="Employees" description={employee!!}>
          <UsersRound className="w-6 h-6 text-primary" />
        </InfoItem>
        <InfoItem title="Location" description={location!!}>
          <MapPin className="w-6 h-6 text-primary" />
        </InfoItem>
        <InfoItem title="Industry" description={industry!!}>
          <Building className="w-6 h-6 text-primary" />
        </InfoItem>
      </div>
    </div>
  );
};

export default InfoCompany;
