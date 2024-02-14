import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { JobCard } from '@/components/molecules';
import { Separator } from '@/components/ui/separator';
import { getImageSrc } from '@/lib/utils';
import { Building, Flame, MapPin, UsersRound } from 'lucide-react';
import InfoItem from './_idPartials/InfoItem';

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
          <div className="w-full sm:w-10/12 mx-auto mt-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-36 md:h-36">
                <Image
                  src={getImageSrc(company?.logo, company?.name!!)}
                  alt="compnay profile"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl sm:text-4xl font-semibold">
                    {company?.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className="border-primary rounded-none text-primary py-1.5 px-2.5"
                  >
                    {company?._count.jobs} Jobs
                  </Badge>
                </div>
                <a
                  href={company?.website!!}
                  target="_blank"
                  className="font-semibold text-primary block mt-2"
                >
                  {company?.website}
                </a>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
              <InfoItem
                title="Founded"
                description={format(company?.dateFounded!!, 'PP')}
              >
                <Flame className="w-6 h-6 text-primary" />
              </InfoItem>
              <InfoItem title="Employees" description={company?.employee!!}>
                <UsersRound className="w-6 h-6 text-primary" />
              </InfoItem>
              <InfoItem title="Location" description={company?.location!!}>
                <MapPin className="w-6 h-6 text-primary" />
              </InfoItem>
              <InfoItem title="Industry" description={company?.industry!!}>
                <Building className="w-6 h-6 text-primary" />
              </InfoItem>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-16 grid grid-cols-12 gap-5 md:gap-10">
        <div className="col-span-full">
          <h3 className="text-2xl font-semibold mb-3">Company Profile</h3>
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: company?.overview!!,
            }}
          ></div>
        </div>
        <div className="col-span-full">
          <Separator className="my-5 md:mt-0" />
          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Jobs in {company?.name}</h3>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
              {company?.jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  role={job.role}
                  jobType={job.jobType}
                  jobCategory={job.category?.name!!}
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
