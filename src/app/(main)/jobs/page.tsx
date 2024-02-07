'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  TopSection,
  FormFilter,
  FormSearch,
  JobCard,
} from '@/components/molecules';
import { Filter } from 'lucide-react';

const JobsPage = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

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

        {/* List */}
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold">All Jobs</h3>
              <p className="text-muted-foreground">Showing 10 Result</p>
            </div>
            <div className="block lg:hidden">
              <Button onClick={() => setShowFilter(true)}>
                <Filter />
                <span className="ml-2">Filter</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6].map((item: number) => (
              <JobCard key={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobsPage;