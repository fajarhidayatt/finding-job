import Image from 'next/image';
import FormSignin from './_signinPartials/FormSignin';

const SignIn = () => {
  return (
    <main className="w-screen h-screen grid md:grid-cols-2 overflow-hidden">
      <section className="hidden md:block">
        <Image
          src="/images/bg-auth.png"
          alt="background"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </section>
      <section className="w-full h-screen flex items-center justify-center">
        <FormSignin />
      </section>
    </main>
  );
};

export default SignIn;
