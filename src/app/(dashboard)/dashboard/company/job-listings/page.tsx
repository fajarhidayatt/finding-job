import { MoreVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const JOB_LISTING_COLUMNS: string[] = [
  'Roles',
  'Status',
  'Date Posted',
  'Due Date',
  'Job Type',
  'Applicants',
  'Needs',
];

const JobListings = () => {
  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Job Listings</h1>
        <Button size="sm">
          <Plus className="mr-2" />
          Post a job
        </Button>
      </div>

      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((item: number) => (
              <TableRow key={item}>
                <TableCell>{'item.roles'}</TableCell>
                <TableCell>
                  {true ? (
                    <Badge>Live</Badge>
                  ) : (
                    <Badge variant="destructive">Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{'item.datePosted'}</TableCell>
                <TableCell>{'item.dueDate'}</TableCell>
                <TableCell>
                  <Badge variant="outline">{'item.jobType'}</Badge>
                </TableCell>
                <TableCell>{'item.applicants'}</TableCell>
                <TableCell>
                  {12} / {20}
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="outline">
                    <MoreVertical />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListings;
