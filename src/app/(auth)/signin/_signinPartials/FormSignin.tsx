'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { InputText } from '@/components/atoms';

import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSigninSchema } from '@/lib/validations';

const FormSignin = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSigninSchema>>({
    resolver: zodResolver(formSigninSchema),
  });

  const onSubmit = async (val: z.infer<typeof formSigninSchema>) => {
    const signin = await signIn('credentials', {
      ...val,
      redirect: false,
    });

    if (signin?.error) {
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: 'Email or Password is wrong',
      });

      return;
    }

    toast({
      title: 'Sign In Success',
      description: 'Welcome back!',
    });

    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <div className="max-w-80 w-full">
      <Link href="/">
        <Image src="/images/logo-dark.png" alt="logo" width={175} height={36} />
      </Link>
      <div className="mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <InputText
              control={form.control}
              name="email"
              type="email"
              label="Email"
              placeholder="jhon@example.com"
            />
            <InputText
              control={form.control}
              name="password"
              type="password"
              label="Password"
              placeholder="******"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Loading...' : 'Sign In'}
            </Button>
          </form>
        </Form>
        <div className="text-gray-500 text-sm mt-6">
          Don`t have an account?{' '}
          <Link href="/signup" className="text-primary font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormSignin;
