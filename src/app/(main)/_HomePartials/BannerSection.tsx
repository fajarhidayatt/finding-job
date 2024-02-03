import { Button } from '@/components/ui/button';
import Image from 'next/image';

const BannerSection = () => {
  return (
    <section className="md:mt-10 mb-10 px-10 pt-10 sm:px-16 sm:pt-16 bg-primary text-primary-foreground flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-5">
      <div className="text-center lg:text-left">
        <div className="text-5xl font-semibold">
          Start posting <br /> jobs today
        </div>
        <div className="mt-3 mb-6">Start posting job for free</div>
        <Button
          size="lg"
          variant="secondary"
          className="text-primary hover:text-white hover:bg-transparent border hover:border-white"
        >
          Sign Up Now
        </Button>
      </div>
      <div>
        <Image
          src="/images/img-dashboard.png"
          alt="dashboard image"
          width={500}
          height={300}
        />
      </div>
    </section>
  );
};

export default BannerSection;
