import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  type?: 'primary' | 'secondary';
}

const JobCard = ({ type = 'primary' }: JobCardProps) => {
  return (
    <Link href="/">
      <div className="p-6 border rounded-md">
        <div className={`flex gap-3 ${type === 'primary' && 'flex-col'}`}>
          <div className="flex justify-between items-start">
            <Image
              src="/dummies/dummy-company-1.png"
              alt="dummy"
              width={48}
              height={48}
            />
            {type === 'primary' ? (
              <span className="px-4 py-1 text-xs text-primary font-semibold border border-primary rounded">
                Full-Time
              </span>
            ) : null}
          </div>
          <div>
            <div className="text-lg font-semibold">Fullstack Developer</div>
            <div className="text-muted-foreground">Technology . Jakarta</div>
            {type === 'primary' ? (
              <div
                className="text-muted-foreground line-clamp-2 text-ellipsis mt-3"
                dangerouslySetInnerHTML={{
                  __html:
                    'lorem ipsum dolor sit amet. construct javascript programming language numero uno.',
                }}
              ></div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {[1, 2, 3, 4, 5].map((item: number) => (
            <Badge
              key={item}
              variant="outline"
              className="text-primary bg-primary/5 border-primary rounded"
            >
              CSS
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
