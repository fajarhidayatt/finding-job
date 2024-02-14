import prisma from '@/lib/prisma';
import { TCategory } from '@/types';
import { CategoryCard } from '@/components/molecules';
import SectionLayout from './SectionLayout';

const CategorySection = async () => {
  const categories: TCategory[] = await prisma.jobCategory.findMany({
    take: 8,
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });

  return (
    <SectionLayout title={['Explore by', 'category']} url="/categories">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
        {categories.map((category: TCategory) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            total={category._count?.jobs!!}
          />
        ))}
      </div>
    </SectionLayout>
  );
};

export default CategorySection;
