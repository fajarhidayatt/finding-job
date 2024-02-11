'use client';

import { TJob } from '@/types';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  TopSection,
  FormFilter,
  FormSearch,
  JobCard,
} from '@/components/molecules';

const JobsPage = () => {
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const getDataJobs = useCallback(async () => {
    const res = await fetch('/api/jobs');
    const data = await res.json();

    setJobs(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getDataJobs();
  }, [getDataJobs]);

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <TopSection
        title={['Find your', 'dream job']}
        description="Find your next career at companies like HubSpot, Nike, and Dropbox"
      >
        <FormSearch />
      </TopSection>
      <section className="container flex items-start justify-center gap-10 py-12 sm:py-16">
        <FormFilter
          title="Categories"
          listFilter={[1, 2, 3, 4, 5, 6, 7, 8]}
          showFilter={showFilter}
          handleShowFilter={() => setShowFilter(false)}
        />
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold">All Jobs</h3>
              <p className="text-muted-foreground">
                Showing {jobs.length} Result
              </p>
            </div>
            <div className="block lg:hidden">
              <Button onClick={() => setShowFilter(true)}>
                <Filter />
                <span className="ml-2">Filter</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {loading && 'Loading...'}
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
        </div>
      </section>
    </main>
  );
};

export default JobsPage;
