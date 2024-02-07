import SectionLayout from './SectionLayout';
import { JobCard } from '@/components/molecules';

const LatestJobSection = () => {
  return (
    <SectionLayout title={['Latest', 'jobs']} url="/">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
        {[1, 2, 3, 4, 5, 6].map((item: number) => (
          <JobCard key={item} type="secondary" />
        ))}
      </div>
    </SectionLayout>
  );
};

export default LatestJobSection;
