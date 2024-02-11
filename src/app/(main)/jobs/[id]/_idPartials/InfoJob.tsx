import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { FormApply } from '@/components/molecules';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

interface InfoJobProps {
  jobId: string;
  role: string;
  location: string;
  jobType: string;
  logo: string;
}

const InfoJob = async ({
  jobId,
  role,
  location,
  jobType,
  logo,
}: InfoJobProps) => {
  const session = await getServerSession(authOptions);
  const isApply = await prisma.applicant.count({
    where: {
      jobseekerId: session?.user.id,
      AND: {
        jobId,
      },
    },
  });

  return (
    <div className="w-full sm:w-11/12 mx-auto mt-10 p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20">
          <Image
            src={logo}
            alt="company profile"
            width={88}
            height={88}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-semibold">{role}</div>
          <div className="text-muted-foreground">
            {location} . {jobType}
          </div>
        </div>
      </div>
      {session && session.user.role === 'JOBSEEKER' && isApply === 1 ? (
        <Button disabled>Applied</Button>
      ) : session && session.user.role === 'JOBSEEKER' ? (
        <FormApply
          jobId={jobId}
          role={role}
          location={location}
          jobType={jobType}
          logo={logo}
        />
      ) : !session ? (
        <Link href="/signin">
          <Button variant="outline">Sign In First</Button>
        </Link>
      ) : null}
    </div>
  );
};

export default InfoJob;
