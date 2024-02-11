import prisma from '@/lib/prisma';
import { TJob } from '@/types';
import { JobCard } from '@/components/molecules';
import SectionLayout from './SectionLayout';

const LatestJobSection = async () => {
  const jobs = (await prisma.job.findMany({
    take: 6,
    include: {
      company: true,
      category: true,
    },
    orderBy: {
      datePosted: 'desc',
    },
  })) as TJob[];

  return (
    <SectionLayout title={['Latest', 'jobs']} url="/">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
        {jobs.map((job: TJob) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default LatestJobSection;
