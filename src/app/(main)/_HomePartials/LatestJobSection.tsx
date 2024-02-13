import prisma from '@/lib/prisma';
import { TJob } from '@/types';
import { JobCard } from '@/components/molecules';
import SectionLayout from './SectionLayout';

const LatestJobSection = async () => {
  const jobs = (await prisma.job.findMany({
    take: 12,
    include: {
      company: true,
      category: true,
    },
    orderBy: {
      datePosted: 'desc',
    },
    where: {
      dueDate: {
        gt: new Date(),
      },
    },
  })) as TJob[];

  return (
    <SectionLayout title={['Latest', 'jobs']} url="/jobs">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
        {jobs.map((job: TJob) => (
          <JobCard
            key={job.id}
            id={job.id}
            role={job.role}
            jobType={job.jobType}
            jobCategory={job.category?.name!!}
            description={job.description}
            requiredSkills={job.requiredSkills}
            companyName={job.company?.name!!}
            companyLogo={job.company?.logo!!}
            companyLocation={job.company?.location!!}
          />
        ))}
      </div>
    </SectionLayout>
  );
};

export default LatestJobSection;
