import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { TApplicant } from '@/types';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MoreVertical } from 'lucide-react';
import { getServerSession } from 'next-auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const APPLICANTS_COLUMNS: string[] = [
  'Name',
  'Role',
  'Date Applied',
  'Status',
] as const;

const AllApplicants = async () => {
  const session = await getServerSession(authOptions);
  const applicants = (await prisma.applicant.findMany({
    where: {
      job: {
        companyId: session?.user.id,
      },
    },
  })) as TApplicant[];

  return (
    <div className="my-5">
      <h1 className="text-xl font-semibold">All Applicants</h1>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              {APPLICANTS_COLUMNS.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.length > 0 ? (
              applicants.map((applicant: TApplicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>{applicant.jobseeker?.fullName}</TableCell>
                  <TableCell>{applicant.job?.role}</TableCell>
                  <TableCell>{format(applicant.applyDate, 'PP')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{applicant.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      <MoreVertical />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={5}>No one has applied yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllApplicants;
