'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { TAccount } from '@/types';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText, InputWrapper } from '@/components/atoms';
import { formCompanySettingSchema } from '@/lib/validations';

interface FormSettingsProps {
  account: TAccount;
}

const FormSettings = ({ account }: FormSettingsProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formCompanySettingSchema>>({
    resolver: zodResolver(formCompanySettingSchema),
    defaultValues: {
      username: account.username ?? '',
      email: account.email ?? '',
    },
  });

  const onSubmit = async (val: z.infer<typeof formCompanySettingSchema>) => {
    try {
      const data = {
        accountId: account.id,
        username: val.username,
        email: val.email,
        password: val.password ?? '',
      };

      const post = await fetch('/api/v1/account/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const res = await post.json();

      if (res.status === 'error') {
        throw new Error(res.message);
      }

      toast({
        title: 'Success',
        description: 'Success update profile account',
      });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputWrapper
          title="Account Settings"
          description="You can update your account settings here"
        >
          <div className="space-y-5">
            <InputText
              control={form.control}
              name="username"
              type="text"
              label="Username"
              placeholder="jhon123"
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
          </div>
        </InputWrapper>
        <div className="flex justify-end">
          <Button size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Loading...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSettings;
