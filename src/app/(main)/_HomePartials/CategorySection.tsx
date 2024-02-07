import SectionLayout from './SectionLayout';
import { CategoryCard } from '@/components/molecules';

const CategorySection = () => {
  return (
    <SectionLayout title={['Explore by', 'category']} url="/">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
          <CategoryCard key={item} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default CategorySection;
