'use client';

import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { InputCKEditor, InputWrapper, UploadImage } from '@/components/atoms';

import { formCompanyOverviewSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon } from 'lucide-react';

import { EMPLOYEE_OPTIONS } from '@/constants';
import { format } from 'date-fns';

const TabOverview = () => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formCompanyOverviewSchema>>({
    resolver: zodResolver(formCompanyOverviewSchema),
  });

  useEffect(() => {
    // load CKEditor
    setEditorLoaded(true);
  }, []);

  const onSubmit = async (val: z.infer<typeof formCompanyOverviewSchema>) => {
    console.log(val);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        {/* COMPANY LOGO */}
        <InputWrapper
          title="Company Logo"
          description="This image will be shown publicly as company logo."
        >
          <UploadImage form={form} name="logo" />
        </InputWrapper>

        {/* DETAIL */}
        <InputWrapper
          title="Company Details"
          description="Introduce your company core info quickly to users by fill up company details"
        >
          <div className="space-y-5">
            {/* COMPANY NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* WEBSITE */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LOCATION */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((item: number) => (
                        <SelectItem key={item} value={'Jakarta' + item}>
                          {'Jakarta' + item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* EMPLOYEE TOTAL */}
              <FormField
                control={form.control}
                name="employee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EMPLOYEE_OPTIONS.map(
                          (option: string, index: number) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* INDUSTRY */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((item: number) => (
                          <SelectItem key={item} value={'Technology' + item}>
                            {'Technology' + item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DATE FOUNDED */}
            <FormField
              control={form.control}
              name="dateFounded"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Founded</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={'outline'}>
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </InputWrapper>

        {/* ABOUT */}
        <InputWrapper
          title="About Company"
          description="Brief description for your company. URLs are hyperlinked."
        >
          <InputCKEditor form={form} name="about" editorLoaded={editorLoaded} />
        </InputWrapper>

        {/* BUTTON */}
        <div className="flex justify-end">
          <Button size="lg">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default TabOverview;
