'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormUploadFile } from '..';

const formSchema = z.object({
  fullname: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
  linkedIn: z.string().min(2).max(50),
  portofolio: z.string().min(2).max(50),
  coverLetter: z.string().min(2).max(50),
  resume: z.any(),
});

const FormApply = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Apply</Button>
      </DialogTrigger>
      {/* "lg:max-w-screen-lg overflow-y-scroll max-h-screen"k */}
      <DialogContent className="max-w-screen-sm w-full max-h-screen overflow-y-scroll">
        <div className="flex items-center gap-4">
          <Image
            src="/dummies/dummy-company-2.png"
            alt="company profile"
            width={60}
            height={60}
          />
          <div>
            <h5 className="text-lg font-semibold">FullStack Dev</h5>
            <p className="text-gray-500">Jakarta . Full-Time</p>
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
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="font-semibold mb-3">LINKS</h2>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Link to your linked URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portofolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portofolio URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Link to your portfolio URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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

            <div className="my-6">
              <FormUploadFile form={form} />
            </div>

            <Button type="submit" className="w-full">
              Apply
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormApply;
