'use client';

import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TCompany } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import {
  TopSection,
  CompanyCard,
  FormFilter,
  FormSearch,
} from '@/components/molecules';

const CompaniesPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<TCompany[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const getDataIndustries = useCallback(async () => {
    const res = await fetch('/api/companies/industries');
    const data = await res.json();

    const parse = data.data.map(
      (item: { id: string; name: string }) => item.name
    );

    setIndustries(parse);
  }, []);

  const getDataCompanies = useCallback(async () => {
    const res = await fetch('/api/companies');
    const data = await res.json();

    setCompanies(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getDataCompanies();
    getDataIndustries();
  }, [getDataCompanies, getDataIndustries]);

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <TopSection
        title={['Find your', 'dream company']}
        description="Find the dream company you dream work for"
      >
        <FormSearch />
      </TopSection>
      <section className="container flex items-start justify-center gap-10 py-12 sm:py-16">
        <FormFilter
          title="Categories"
          listFilter={industries}
          showFilter={showFilter}
          handleShowFilter={() => setShowFilter(false)}
        />
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold">
                All Companies
              </h3>
              <p className="text-muted-foreground">
                Showing {companies.length} Result
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
            {companies.map((company: TCompany) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompaniesPage;
