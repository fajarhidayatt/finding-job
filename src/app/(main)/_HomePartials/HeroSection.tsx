import Image from 'next/image';
import { FormSearch } from '@/components/molecules';

const HeroSection = () => {
  return (
    <section className="container flex items-center justify-between relative overflow-hidden">
      <div className="absolute w-4/5 aspect-square top-0 right-0 -z-10">
        <Image src="/images/pattern-hero.png" alt="hero pattern" fill />
      </div>
      <div className="lg:w-1/2 py-10 mx-auto text-center lg:text-left">
        <div className="max-w-lg w-full mx-auto lg:mx-0">
          <h1 className="text-5xl md:text-7xl font-semibold relative">
            Discover <br /> more than <br />
            <span className="text-primary mt-3">5000+ Jobs</span>
          </h1>
          <div className="mb-5">
            <Image
              src="/images/pattern-ink.png"
              alt="pattern"
              width={455}
              height={32}
              className="max-w-md w-full block mx-auto lg:mx-0 object-contain"
            />
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
        </div>
        <FormSearch />
      </div>
      <div className="p-10 hidden lg:block">
        <Image
          src="/images/hero.png"
          alt="hero image"
          width={450}
          height={600}
          objectFit="contain"
          className="rounded-s-3xl rounded-br-3xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;
