'use client';

import { TCompany } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getCompaniesAPI, getIndustriesAPI } from '@/fetcher/company';
import {
  CompanyCard,
  FormFilter,
  FormSearch,
  TopSection,
} from '@/components/molecules';

const CompaniesPage = () => {
  const searchParams = useSearchParams().toString() || 'name=&location=';

  const industries = useQuery({
    queryKey: ['industries'],
    queryFn: getIndustriesAPI,
  });

  const companies = useQuery({
    queryKey: ['companies', searchParams],
    queryFn: () => getCompaniesAPI(searchParams),
  });

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <TopSection
        title={['Find your', 'dream company']}
        description="Find the dream company you dream work for"
      >
        <FormSearch
          pathname="/companies"
          inputName="name"
          inputPlaceholder="Company name"
          optionName="location"
          optionPlaceholder="Search by location"
          formDescription="Popular: Tokopedia, Gojek, eFishery, Blibli"
        />
      </TopSection>
      <section className="container flex items-start justify-center gap-10 py-12 sm:py-16">
        <FormFilter
          title="Industry"
          fitlerName="industry"
          isLoading={industries.isLoading}
          filterList={industries.isLoading ? [] : industries.data.data}
        />
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold">
                All Companies
              </h3>
              <p className="text-muted-foreground">
                Showing {companies.isLoading ? 0 : companies.data.data.length}{' '}
                Result
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {companies.isLoading
              ? 'Loading...'
              : companies.data.data.map((company: TCompany) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompaniesPage;
