import { BenefitCard } from '@/components/molecules';
import { Separator } from '@/components/ui/separator';
import InfoItem from './InfoItem';
import InfoGroup from './InfoGroup';

const TabJobDetail = () => {
  const lorem = 'lorem ipsum dolor sit amet';

  return (
    <div className="grid grid-cols-12 gap-5 lg:gap-10">
      <div className="space-y-10 col-span-full lg:col-span-7 xl:col-span-8">
        <InfoItem title="Description" description={lorem} />
        <InfoItem title="Responsibilities" description={lorem} />
        <InfoItem title="Who You Are" description={lorem} />
        <InfoItem title="Nice To Haves" description={lorem} />
      </div>

      <div className="mt-5 col-span-full lg:col-span-5 xl:col-span-4">
        <div className="space-y-3">
          <InfoItem
            title="Apply Before"
            description="12 Jan, 2023"
            type="aside"
          />
          <InfoItem
            title="Job Posted On"
            description="12 Jan, 2023"
            type="aside"
          />
          <InfoItem title="Job Type" description="Full-Time" type="aside" />
          <InfoItem title="Salary" description="$500-$100 USD" type="aside" />
        </div>
        <Separator className="my-5" />
        <InfoGroup
          title="Category"
          items={['Programmer', 'Front-end', 'Web Dev']}
        />
        <Separator className="my-5" />
        <InfoGroup
          title="Required Skills"
          items={['HTML', 'CSS', 'Javascript']}
        />
      </div>

      <div className="col-span-full">
        <Separator />
        <div className="mb-7 mt-5">
          <div className="text-2xl font-semibold">Perks & Benefits</div>
          <div className="text-gray-500 mt-1">
            This job comes with several perks and benefits
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3].map((item: number) => (
            <BenefitCard
              key={item}
              name="Push Career"
              description="lorem ipsum dolor sit amet"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabJobDetail;
