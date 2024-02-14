'use client';

import { TJob } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getCategoriesAPI, getJobsAPI } from '@/fetcher/job';
import {
  TopSection,
  FormFilter,
  FormSearch,
  JobCard,
} from '@/components/molecules';

const JobsPage = () => {
  const searchParams = useSearchParams().toString() || 'role=&location=';

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAPI,
  });

  const jobs = useQuery({
    queryKey: ['jobs', searchParams],
    queryFn: () => getJobsAPI(searchParams),
  });

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <TopSection
        title={['Find your', 'dream job']}
        description="Find your next career at companies like HubSpot, Nike, and Dropbox"
      >
        <FormSearch
          pathname="/jobs"
          inputName="role"
          inputPlaceholder="Job title or role name"
          optionName="location"
          optionPlaceholder="Search by location"
          formDescription="Popular: UI Designer, Frontend, Data Scientist, Programmer"
        />
      </TopSection>
      <section className="container flex items-start justify-center gap-10 py-12 sm:py-16 relative">
        <FormFilter
          title="Category"
          fitlerName="category"
          isLoading={categories?.isLoading}
          filterList={categories?.isLoading ? [] : categories?.data?.data}
        />
        <div className="w-full">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold">All Jobs</h3>
            <p className="text-muted-foreground">
              Showing {jobs?.isLoading ? 0 : jobs?.data?.data?.length} Result
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {jobs?.isLoading
              ? 'Loading...'
              : jobs?.data?.data?.map((job: TJob) => (
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
        </div>
      </section>
    </main>
  );
};

export default JobsPage;
