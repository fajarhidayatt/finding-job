'use client';

import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { logoDark } from '@/images';
import { useRouter } from 'next/navigation';
import { InputText } from '@/components/atoms';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSigninSchema } from '@/lib/validations';

const FormSignin = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSigninSchema>>({
    resolver: zodResolver(formSigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (val: z.infer<typeof formSigninSchema>) => {
    try {
      const signin = await signIn('credentials', {
        email: val.email,
        password: val.password,
        redirect: false,
      });

      if (!signin?.ok) {
        throw new Error(signin?.error as string);
      }

      toast({
        title: 'Sign In Success',
        description: 'Welcome back!',
      });

      router.refresh();

      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Sign In Failed',
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="max-w-80 w-full">
      <Link href="/">
        <Image src={logoDark} alt="logo" width={175} height={39} />
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
