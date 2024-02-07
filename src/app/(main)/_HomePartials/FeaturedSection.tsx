import SectionLayout from './SectionLayout';
import { JobCard } from '@/components/molecules';

const FeaturedSection = () => {
  return (
    <SectionLayout title={['Featured', 'jobs']} url="/">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
        {[1, 2, 3, 4, 5, 6].map((item: number) => (
          <JobCard key={item} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default FeaturedSection;
