import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface FormFilterPorps {
  title: string;
  listFilter: string[];
  showFilter: boolean;
  handleShowFilter: () => void;
}

const FormFilter = ({
  title,
  listFilter,
  showFilter,
  handleShowFilter,
}: FormFilterPorps) => {
  return (
    <aside
      className={cn(
        'w-full lg:w-3/12 pt-10 lg:pt-0 bg-white fixed inset-0 z-50 lg:static justify-center hidden lg:block',
        showFilter && 'flex'
      )}
    >
      <div className="max-w-xs w-full">
        <div className="flex item-center justify-between">
          <h5 className="font-semibold">{title}</h5>
          <Button
            size="icon"
            className="w-7 h-7 lg:hidden"
            onClick={handleShowFilter}
          >
            <X />
          </Button>
        </div>
        <div className="mt-5 space-y-4 mb-5">
          {listFilter.map((item: string, index: number) => (
            <div key={index} className="flex gap-3 text-sm">
              <Checkbox id={index.toString()} className="rounded-none" />
              <label htmlFor={index.toString()}>{item}</label>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex flex-col gap-3 mt-5">
          <Button>Apply Filter</Button>
          <Button variant="outline">Reset Filter</Button>
        </div>
      </div>
    </aside>
  );
};

export default FormFilter;
