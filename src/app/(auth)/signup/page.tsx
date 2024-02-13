import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { logoDark } from '@/images';
import FormSignup from './_signupPartials/FormSignup';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUp = () => {
  return (
    <main className="max-w-96 w-full mx-auto my-5 md:my-10">
      <Link href="/">
        <Image
          src={logoDark}
          alt="logo"
          width={175}
          height={39}
          priority
          className="block mx-auto"
        />
      </Link>
      <div className="mt-5">
        <FormSignup />
      </div>
    </main>
  );
};

export default SignUp;
