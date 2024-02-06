'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import TabApplicants from './_idPartials/TabApplicants';
import TabJobDetail from './_idPartials/TabJobDetail';
import { useRouter } from 'next/navigation';

const CompanyJobDetail = () => {
  const router = useRouter();

  return (
    <div className="py-5">
      <div className="flex items-center gap-3" onClick={() => router.back()}>
        <ArrowLeft />
        <div>
          <h1 className="text-xl font-semibold">Job Listings</h1>
          <p>Techonology . Full-Time</p>
        </div>
      </div>
      <div className="max-w-screen-xl w-full mt-5">
        <Tabs defaultValue="applicants">
          <TabsList className="mb-8">
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="jobDetail">Job Detail</TabsTrigger>
          </TabsList>
          <TabsContent value="applicants">
            <TabApplicants />
          </TabsContent>
          <TabsContent value="jobDetail">
            <TabJobDetail />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default CompanyJobDetail;
