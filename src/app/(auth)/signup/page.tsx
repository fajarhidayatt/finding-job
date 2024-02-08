import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FormSignup from './_signupPartials/FormSignup';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUp = () => {
  return (
    <main className="max-w-96 w-full mx-auto my-5 md:my-10">
      <Link href="/">
        <Image
          src="/images/logo-dark.png"
          alt="logo app"
          width={175}
          height={36}
          priority
          className="w-auto h-auto block mx-auto"
        />
      </Link>
      <div className="mt-5">
        <FormSignup />
      </div>
    </main>
  );
};

export default SignUp;
