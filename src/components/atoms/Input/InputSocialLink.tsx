'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { parsingOptionsValue } from '@/lib/parser';
import { formLinkSchema } from '@/lib/validations';
import { LINK_OPTIONS } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import InputSelect from './InputSelect';
import InputText from './InputText';

const InputSocialLink = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formLinkSchema>>({
    resolver: zodResolver(formLinkSchema),
  });

  const onSubmit = async (val: z.infer<typeof formLinkSchema>) => {
    try {
      let jobseekerId, companyId;

      if (session?.user.role === 'JOBSEEKER') {
        jobseekerId = session.user.id;
      } else if (session?.user.role === 'COMPANY') {
        companyId = session.user.id;
      }

      const data = {
        ...val,
        jobseekerId,
        companyId,
      };

      const res = await fetch(`/api/v1/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Something wrong, please try again!');
      }

      setOpen(!open);
      toast({
        title: 'Success',
        description: 'Success add social link',
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something wrong, please try again!',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-5 h-5 mr-2" />
          Add Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <InputSelect
              control={form.control}
              name="name"
              options={parsingOptionsValue(LINK_OPTIONS)}
              label="Name"
              placeholder="Select link name"
            />
            <InputText
              control={form.control}
              name="link"
              type="text"
              label="Url"
              placeholder="https://example.com"
            />
            <div className="flex justify-end">
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Loading...' : 'Add'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InputSocialLink;
