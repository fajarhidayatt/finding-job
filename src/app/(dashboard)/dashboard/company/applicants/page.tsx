import { MoreVertical } from 'lucide-react';
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

const APPLICANTS_COLUMNS: string[] = [
  'Name',
  'Role',
  'Date Applied',
  'Status',
] as const;

const AllApplicants = () => {
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
            {[1, 2, 3].map((item: number) => (
              <TableRow key={item}>
                <TableCell>{'Jhon Smith'}</TableCell>
                <TableCell>{'Front-end'}</TableCell>
                <TableCell>{'18 Feb, 2023'}</TableCell>
                <TableCell>
                  <Badge variant="outline">{'Status'}</Badge>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllApplicants;
