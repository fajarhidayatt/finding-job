import { Breadcrumb, BreadcrumbItem } from '@/components/atoms';
import { BenefitCard } from '@/components/molecules';
import { Separator } from '@/components/ui/separator';
import InfoGroup from './_IdPartials/InfoGroup';
import InfoItem from './_IdPartials/InfoItem';
import InfoJob from './_IdPartials/InfoJob';

const DetailJob = () => {
  const lorem =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero ratione quibusdam iure suscipit totam consectetur odio facere, adipisci perspiciatis aut.';

  return (
    <main>
      <section className="bg-slate-100 py-10">
        <div className="max-w-screen-xl w-full mx-auto container">
          <Breadcrumb>
            <BreadcrumbItem url="/">Home</BreadcrumbItem>
            <BreadcrumbItem url="/browse-companies">Companies</BreadcrumbItem>
            <BreadcrumbItem url={`/company/${1}`}>Twitter</BreadcrumbItem>
            <BreadcrumbItem url="/" isLast>
              Front-end
            </BreadcrumbItem>
          </Breadcrumb>
          <InfoJob />
        </div>
      </section>

      <section className="max-w-screen-xl w-full mx-auto container">
        <div className="py-16 grid grid-cols-12 gap-5 md:gap-10">
          <div className="space-y-10 col-span-full md:col-span-7 lg:col-span-8 xl:col-span-9">
            <InfoItem title="Description" description={lorem} />
            <InfoItem title="Responsibilities" description={lorem} />
            <InfoItem title="Who You Are" description={lorem} />
            <InfoItem title="Nice To Haves" description={lorem} />
          </div>

          <div className="mt-5 col-span-full md:col-span-5 lg:col-span-4 xl:col-span-3">
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
              <InfoItem
                title="Salary"
                description="$500-$100 USD"
                type="aside"
              />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[1, 2, 3].map((item: number) => (
                <BenefitCard
                  key={item}
                  title="Push Career"
                  description="lorem ipsum dolor sit amet"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailJob;
