import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FormApply } from '@/components/molecules';

const InfoJob = () => {
  return (
    <div className="w-full sm:w-11/12 mx-auto mt-10 p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20">
          <Image
            src="/dummies/dummy-company-2.png"
            alt="company profile"
            width={88}
            height={88}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-semibold">Front-end</div>
          <div className="text-muted-foreground">Jakarta . Full-Time</div>
        </div>
      </div>
      {/* <Button variant="outline">Sign In First</Button> */}
      <FormApply />
    </div>
  );
};

export default InfoJob;
