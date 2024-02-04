import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const CompanyCard = () => {
  return (
    <Link href="/">
      <div className="border p-6">
        <div className="flex items-start justify-between">
          <Image
            src="/dummies/dummy-company-2.png"
            alt="company profile"
            width={66}
            height={66}
            objectFit="cover"
          />
          <Badge className="rounded-sm">1 Jobs</Badge>
        </div>
        <div className="my-4">
          <div className="text-lg font-semibold mb-2">Tokopedia</div>
          <div
            className="text-sm text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{
              __html:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur perferendis inventore dolores, porro fuga esse.',
            }}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="py-1 px-2 rounded-none">
            Technology
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
