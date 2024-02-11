'use client';

import Image from 'next/image';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { InputText } from '@/components/atoms';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { formApplySchema } from '@/lib/validations';
import { supabaseUploadFile } from '@/lib/supabase';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import FormUploadFile from './FormUploadFile';

interface FormApplyProps {
  jobId: string;
  role: string;
  location: string;
  jobType: string;
  logo: string;
}

const FormApply = ({
  jobId,
  role,
  logo,
  location,
  jobType,
}: FormApplyProps) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formApplySchema>>({
    resolver: zodResolver(formApplySchema),
  });

  const onSubmit = async (val: z.infer<typeof formApplySchema>) => {
    try {
      const { filename } = await supabaseUploadFile(val.resume, 'resumes');

      const data = {
        resume: filename,
        coverLetter: val.coverLetter ?? '',
        jobseekerId: session?.user.id,
        jobId: jobId,
      };

      const post = await fetch('/api/v1/jobseeker/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const res = await post.json();

      if (res.status !== 'Success') {
        throw new Error(res.message);
      }

      toast({
        title: 'Success',
        description: res.message,
      });
      setOpen(!open);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Apply</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm w-full max-h-screen overflow-y-scroll">
        <div className="flex items-center gap-4">
          <Image
            src={logo}
            alt="company profile"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h5 className="text-lg font-semibold">{role}</h5>
            <p className="text-gray-500">
              {location} . {jobType}
            </p>
          </div>
        </div>
        <Separator className="my-2.5" />
        <div>
          <h6 className="text-lg font-semibold">Submit your application</h6>
          <p className="text-sm text-gray-500 mt-2">
            The following is required and will only be shared with Nomad
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              <InputText
                control={form.control}
                name="fullname"
                type="text"
                label="Full Name"
                placeholder="Jhon Smith"
              />
              <InputText
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="jhon@example.com"
              />
              <div className="col-span-full">
                <InputText
                  control={form.control}
                  name="phoneNumber"
                  type="number"
                  label="Phone Number"
                  placeholder="08123456789"
                />
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <h2 className="font-semibold mb-3">LINKS</h2>
              <div className="grid grid-cols-2 gap-6">
                <InputText
                  control={form.control}
                  name="linkedIn"
                  type="text"
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/jhon-smith"
                />
                <InputText
                  control={form.control}
                  name="portofolio"
                  type="text"
                  label="Portofolio URL"
                  placeholder="https://jhonsmith.com"
                />
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add a cover letter or anything else you want to share"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="my-6">
              <FormUploadFile form={form} name="resume" />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Loading...' : 'Apply'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormApply;
