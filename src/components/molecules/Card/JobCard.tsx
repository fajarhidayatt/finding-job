import Link from 'next/link';
import Image from 'next/image';
import { TJob } from '@/types';
import { Badge } from '@/components/ui/badge';
import { supabaseGetFile } from '@/lib/supabase';

interface JobCardProps {
  job: TJob;
  type?: 'primary' | 'secondary';
}

const JobCard = ({ job, type = 'primary' }: JobCardProps) => {
  const { url } = supabaseGetFile(job.company?.logo!!, 'images');

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="p-6 border rounded-md">
        <div className={`flex gap-3 ${type === 'primary' && 'flex-col'}`}>
          <div className="flex justify-between items-start">
            <Image
              src={url}
              alt="dummy"
              width={48}
              height={48}
              className="rounded-full"
            />
            {type === 'primary' ? (
              <span className="px-4 py-1 text-xs text-primary font-semibold border border-primary rounded">
                {job.jobType}
              </span>
            ) : null}
          </div>
          <div>
            <div className="text-lg font-semibold">{job.role}</div>
            <div className="text-muted-foreground">
              {job.category?.name} . {job.company?.location}
            </div>
            {type === 'primary' ? (
              <div
                className="text-muted-foreground line-clamp-2 text-ellipsis mt-3"
                dangerouslySetInnerHTML={{
                  __html: job.description,
                }}
              ></div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {job.requiredSkills.map((skill: string, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className="text-primary bg-primary/5 border-primary rounded"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
