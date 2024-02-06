import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import JobseekerForm from './_signupPartials/JobseekerForm';
import CompanyForm from './_signupPartials/CompanyForm';

const SignUp = () => {
  return (
    <div className="max-w-96 w-full mx-10">
      <Link href="/">
        <Image src="/images/logo-dark.png" alt="logo" width={175} height={36} />
      </Link>
      <div className="mt-10">
        <Tabs defaultValue="jobseeker">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>
          <TabsContent value="jobseeker">
            <JobseekerForm />
          </TabsContent>
          <TabsContent value="company">
            <CompanyForm />
          </TabsContent>
        </Tabs>
        <div className="text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/signin" className="text-primary font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
