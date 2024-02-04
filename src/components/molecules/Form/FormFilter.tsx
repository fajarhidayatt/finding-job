import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface FormFilterPorps {
  title: string;
  listFilter: number[];
  showFilter: boolean;
  handleShowFilter: () => void;
}

const FormFilter = ({
  title,
  listFilter,
  showFilter,
  handleShowFilter,
}: FormFilterPorps) => {
  const containerClassName = clsx({
    'w-full lg:w-3/12 pt-10 lg:pt-0 bg-white fixed inset-0 z-50 lg:static justify-center lg:block':
      true,
    flex: showFilter,
    hidden: !showFilter,
  });

  return (
    <aside className={containerClassName}>
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
          {listFilter.map((item: number) => (
            <div key={item} className="items-top flex space-x-3">
              <Checkbox id={item.toString()} className="rounded-none" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={item.toString()}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Technology
                </label>
              </div>
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
