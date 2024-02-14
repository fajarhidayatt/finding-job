import Link from 'next/link';
import Image from 'next/image';
import { TJob } from '@/types';
import { Badge } from '@/components/ui/badge';
import { getImageSrc } from '@/lib/utils';

interface JobCardProps
  extends Pick<
    TJob,
    'id' | 'role' | 'jobType' | 'description' | 'requiredSkills'
  > {
  jobCategory: string;
  companyLogo: string;
  companyName: string;
  companyLocation: string;
  variant?: 'primary' | 'secondary';
}

const JobCard = ({
  id,
  role,
  jobType,
  jobCategory,
  description,
  requiredSkills,
  companyLogo,
  companyName,
  companyLocation,
  variant = 'primary',
}: JobCardProps) => {
  return (
    <Link href={`/jobs/${id}`}>
      <div className="p-6 border rounded-md">
        <div className={`flex gap-3 ${variant === 'primary' && 'flex-col'}`}>
          <div className="flex justify-between items-start">
            <Image
              src={getImageSrc(companyLogo, companyName)}
              alt="Company logo"
              width={48}
              height={48}
              className="object-cover rounded-full"
            />
            {variant === 'primary' ? (
              <span className="px-4 py-1 text-xs text-primary font-semibold border border-primary rounded">
                {jobType}
              </span>
            ) : null}
          </div>
          <div>
            <div className="text-lg font-semibold">{role}</div>
            <div className="text-muted-foreground">
              {companyName} . {companyLocation}
            </div>
            {variant === 'primary' ? (
              <div
                className="text-muted-foreground line-clamp-2 text-ellipsis mt-3"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {requiredSkills?.slice(0, 3).map((skill: string, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className="text-primary bg-primary/5 border-primary rounded"
            >
              {skill}
            </Badge>
          ))}
          {requiredSkills?.length > 3 && (
            <span className="text-sm text-primary font-medium">
              {requiredSkills?.length - 3}+
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
