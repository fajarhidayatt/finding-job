import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const aboutLinks = [
  'Companies',
  'Pricing',
  'Terms',
  'Advice',
  'Privacy Policy',
];
const resourceLinks = ['Help Docs', 'Guide', 'Updates', 'Contact Us'];
const socialMediaImg = [
  '/images/soc-facebook.png',
  '/images/soc-instagram.png',
  '/images/soc-twitter.png',
  '/images/soc-linkedIn.png',
  '/images/soc-dribbble.png',
];

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <div className="container pt-10 pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          {/* logo */}
          <section className="order-1 lg:col-span-2">
            <div className="w-40">
              <Image
                src="/images/logo-light.png"
                alt="logo"
                width={160}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-muted mt-5 md:max-w-96 lg:max-w-80 w-full">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </section>

          {/* about */}
          <section className="order-3 lg:order-2 text-center sm:text-left">
            <h5 className="text-lg text-primary-foreground font-semibold mb-5">
              About
            </h5>
            <ul className="space-y-4">
              {aboutLinks.map((item: string, i: number) => (
                <li key={i}>
                  <Link className="block text-muted" href="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* resource */}
          <section className="order-4 lg:order-3 text-center sm:text-left">
            <h5 className="text-lg text-primary-foreground font-semibold mb-5">
              Resources
            </h5>
            <ul className="space-y-4">
              {resourceLinks.map((item: string, i: number) => (
                <li key={i}>
                  <Link className="block text-muted" href="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* subscription */}
          <section className="order-2 lg:order-4 lg:col-span-2">
            <h5 className="text-lg text-primary-foreground font-semibold mb-5">
              Get job notifications
            </h5>
            <p className="text-muted">
              The latest job news, articles, sent to your inbox weekly
            </p>
            <form className="flex items-center gap-3 mt-5">
              <Input placeholder="Email Address" className="py-5" />
              <Button className="py-5" type="submit">
                Subscribe
              </Button>
            </form>
          </section>
        </div>

        <Separator className="mt-10 mb-5 bg-neutral-300" />

        {/* copyright */}
        <div className="flex items-center justify-between">
          <div className="text-neutral-300">
            2024 @ FindingJob. All rights reserved.
          </div>
          <ul className="flex gap-3">
            {socialMediaImg.map((item: string, i: number) => (
              <li key={i}>
                <a href="https://www.google.com/" target="_blank">
                  <Image src={item} alt={item} width={32} height={32} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
