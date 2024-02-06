import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreVertical } from 'lucide-react';

const APPLICANT_COLUMNS: string[] = ['Name', 'Apply Date', 'Status'] as const;

const TabApplicants = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {APPLICANT_COLUMNS.map((item: string, index: number) => (
            <TableHead key={index}>{item}</TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((item: number) => (
          <TableRow key={item}>
            <TableCell>{'Jhon Smith'}</TableCell>
            <TableCell>{'Jan 12, 2023'}</TableCell>
            <TableCell>
              <Badge>proccess</Badge>
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
  );
};
export default TabApplicants;
