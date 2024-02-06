'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  TopSection,
  CompanyCard,
  FormFilter,
  FormSearch,
} from '@/components/molecules';
import { Filter } from 'lucide-react';

const CompaniesPage = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <main>
      <TopSection
        title={['Find your', 'dream company']}
        description="Find the dream company you dream work for"
      >
        <FormSearch />
      </TopSection>
      <section className="max-w-screen w-full mx-auto container flex items-start justify-center gap-10 py-16">
        <FormFilter
          title="Categories"
          listFilter={[1, 2, 3, 4, 5, 6, 7, 8]}
          showFilter={showFilter}
          handleShowFilter={() => setShowFilter(false)}
        />
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-semibold">All Companies</h3>
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
              <CompanyCard key={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompaniesPage;
