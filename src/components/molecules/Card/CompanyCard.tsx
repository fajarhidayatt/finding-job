import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { TCompany } from '@/types';
import { getImageSrc } from '@/lib/utils';

interface CompanyCard {
  company: TCompany & {
    _count?: {
      jobs?: number;
    };
  };
}

const CompanyCard = ({ company }: CompanyCard) => {
  return (
    <Link href={`/companies/${company.id}`}>
      <div className="border p-6">
        <div className="flex items-start justify-between">
          <Image
            src={getImageSrc(company.logo, company.name)}
            alt="Company logo"
            width={66}
            height={66}
            className="object-cover rounded-full"
          />
          <Badge className="rounded-sm">{company._count?.jobs} Jobs</Badge>
        </div>
        <div className="my-4">
          <div className="text-lg font-semibold mb-2">{company.name}</div>
          <div
            className="text-sm text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: company.overview,
            }}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="py-1 px-2 rounded-none">
            {company.industry}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
