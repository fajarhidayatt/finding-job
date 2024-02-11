import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { JobCard } from '@/components/molecules';
import { Separator } from '@/components/ui/separator';
import { getImageSrc } from '@/lib/utils';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import InfoCompany from './_idPartials/InfoCompany';

interface DetailCompanyPageProps {
  params: {
    id: string;
  };
}

const DetailCompanyPage = async ({ params }: DetailCompanyPageProps) => {
  const company = await prisma.company.findFirst({
    where: {
      id: params.id,
    },
    include: {
      jobs: {
        where: {
          dueDate: {
            gt: new Date(),
          },
        },
        include: {
          category: true,
        },
      },
      _count: {
        select: {
          jobs: true,
        },
      },
    },
  });

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <section className="bg-slate-100 py-10">
        <div className="container">
          <InfoCompany
            dateFounded={company?.dateFounded!!}
            employee={company?.employee!!}
            industry={company?.industry!!}
            jobTotal={company?._count.jobs!!}
            location={company?.location!!}
            name={company?.name!!}
            website={company?.website!!}
            logo={company?.logo!!}
          />
        </div>
      </section>
      <section className="container py-16 grid grid-cols-12 gap-5 md:gap-10">
        <div className="space-y-10 col-span-full md:col-span-7 lg:col-span-8 xl:col-span-9">
          <div>
            <h3 className="text-2xl font-semibold mb-3">Company Profile</h3>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: company?.overview!!,
              }}
            ></div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <div className="flex items-center flex-wrap gap-5">
              <div className="w-max p-2 flex items-center gap-3 border border-primary text-primary">
                <Facebook />
                <span className="text-sm font-semibold">{'facebook'}</span>
              </div>
              <div className="w-max p-2 flex items-center gap-3 border border-primary text-primary">
                <Twitter />
                <span className="text-sm font-semibold">{'twitter'}</span>
              </div>
              <div className="w-max p-2 flex items-center gap-3 border border-primary text-primary">
                <Linkedin />
                <span className="text-sm font-semibold">{'linkedin'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0 col-span-full md:col-span-5 lg:col-span-4 xl:col-span-3">
          <h3 className="text-2xl font-semibold">Tech Stack</h3>
          <p className="text-sm text-gray-500">
            Learn about the technology and tools that Pattern uses.
          </p>
          <div className="mt-5 flex items-center flex-wrap gap-4">
            {[1, 2, 3, 4, 5].map((item: number) => (
              <Badge key={item}>HTML</Badge>
            ))}
          </div>
        </div>
        <div className="col-span-full">
          <Separator className="my-5 md:mt-0" />
          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Jobs in Twitter</h3>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
              {company?.jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  role={job.role}
                  jobType={job.jobType}
                  jobCategory={job.category.name}
                  description={job.description}
                  requiredSkills={job.requiredSkills}
                  companyName={company.name}
                  companyLogo={company.logo!!}
                  companyLocation={company.location!!}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailCompanyPage;
