'use client';

import { InputWrapper } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formCompanySocialShema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const TabSocialLinks = () => {
  const form = useForm<z.infer<typeof formCompanySocialShema>>({
    resolver: zodResolver(formCompanySocialShema),
  });

  function onSubmit(values: z.infer<typeof formCompanySocialShema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputWrapper
          title="Social Media"
          description="Add elsewhere links to your company profile."
        >
          <div className="space-y-5">
            {/* FACEBOOK */}
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* INSTAGRAM */}
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TWITTER */}
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LINKEDIN */}
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* YOUTUBE */}
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </InputWrapper>

        {/* BUTTON */}
        <div className="flex justify-end">
          <Button size="lg">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};
export default TabSocialLinks;
