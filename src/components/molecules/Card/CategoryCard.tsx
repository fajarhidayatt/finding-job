import Link from 'next/link';
import { LayoutGrid, MoveRight } from 'lucide-react';

const CategoryCard = () => {
  return (
    <Link href="/">
      <div className="border rounded-md p-4 md:p-6 group hover:border-primary hover:bg-primary hover:text-white transition-colors">
        <LayoutGrid className="w-12 h-12 text-primary group-hover:text-white" />
        <div className="mt-7">
          <div className="text-xl md:text-2xl font-semibold">Front-end</div>
          <div className="text-sm sm:text-base text-muted-foreground flex items-center gap-1 mt-1 group-hover:text-white">
            <span>100 jobs available</span>
            <MoveRight className="hover:text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;