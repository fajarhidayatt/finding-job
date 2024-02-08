'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputSelect, InputText } from '@/components/atoms';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { ROLE_OPTIONS } from '@/constants';
import { formSignupSchema } from '@/lib/validations';
import { parsingOptionsValue } from '@/lib/parser';

const FormSignup = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
  });

  const onSubmit = async (val: z.infer<typeof formSignupSchema>) => {
    try {
      const post = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val),
      });

      const res = await post.json();

      if (res.status !== 'success') {
        throw new Error(res.message);
      }

      toast({
        title: 'Create account success',
        description: res.message,
      });

      setTimeout(() => {
        router.push('/signin');
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Signup failed',
          description: error.message,
        });
      }
    }
  };

  const roleOptions = parsingOptionsValue(ROLE_OPTIONS);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Come join with us</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <InputText
              control={form.control}
              name="username"
              type="text"
              label="Username"
              placeholder="jhon"
            />
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
            <InputText
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="******"
            />
            <InputSelect
              control={form.control}
              name="role"
              options={roleOptions}
              label="Who You Are"
              placeholder="Select your role type"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Loading...' : 'Create an account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-gray-500 text-sm mt-6 mx-auto">
          Already have an account?{' '}
          <Link href="/signin" className="text-primary font-medium">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormSignup;
