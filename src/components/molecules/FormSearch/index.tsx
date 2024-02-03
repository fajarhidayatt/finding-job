import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

interface FormSearchProps {}

const FormSearch = () => {
  return (
    <div>
      <form className="w-full md:w-max p-4 bg-background shadow-md flex flex-col md:flex-row gap-4 relative z-10">
        <div className="w-full flex items-center gap-3">
          <Search className="w-6 h-6" />
          <Input
            name="job"
            className="lg:w-72 py-6 border-none"
            placeholder="Job Title or keyword"
          />
        </div>
        <div className="w-full flex gap-3 items-center">
          <MapPin className="w-6 h-6" />
          <Select name="location">
            <SelectTrigger className="lg:w-72 py-6 border-none outline-none text-gray-500">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indonesia">Indonesia</SelectItem>
              <SelectItem value="malaysia">Malaysia</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="py-6 px-8" type="submit">
          Search my job
        </Button>
      </form>
      <div className="text-muted-foreground text-left mt-3">
        Popular : UI Designer, Front End, Android, Mobile Dev
      </div>
    </div>
  );
};

export default FormSearch;
