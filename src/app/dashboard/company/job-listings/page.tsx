'use client';

import { TJob } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MoreVertical, Plus } from 'lucide-react';
import { JOB_LISTING_COLUMN } from '@/constants';
import { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const JobListings = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<TJob[]>([]);

  const dataCompanyJobs = useCallback(async () => {
    const companyId = session?.user.id;

    const res = await fetch(`/api/v1/company/${companyId}/job`);
    const data = await res.json();

    setJobs(data.data);
  }, [session?.user.id]);

  useEffect(() => {
    if (session?.user.id) {
      dataCompanyJobs();
    }
  }, [dataCompanyJobs, session?.user.id]);

  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Job Listings</h1>
        <Button
          type="button"
          size="sm"
          onClick={() => router.push('/dashboard/company/post-a-job')}
        >
          <Plus className="mr-2" />
          Post a job
        </Button>
      </div>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMN.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job: TJob) => (
                <TableRow key={job.id}>
                  <TableCell>{job.role}</TableCell>
                  <TableCell>
                    {new Date(job.dueDate).getTime() > Date.now() ? (
                      <Badge>Live</Badge>
                    ) : (
                      <Badge variant="destructive">Expired</Badge>
                    )}
                  </TableCell>
                  <TableCell>{format(job.datePosted, 'PP')}</TableCell>
                  <TableCell>{format(job.dueDate, 'PP')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.jobType}</Badge>
                  </TableCell>
                  <TableCell>{job.totalApplicants}</TableCell>
                  <TableCell>
                    {job.totalApplicants} / {job.totalNeeds}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/company/job-detail/${job.id}`)
                      }
                    >
                      <MoreVertical />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={8}>No job here</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListings;
