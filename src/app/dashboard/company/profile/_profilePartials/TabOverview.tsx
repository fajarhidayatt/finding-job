'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { TCompany } from '@/types';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabaseUploadFile } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { parsingOptionsValue } from '@/lib/parser';
import { formCompanyOverviewSchema } from '@/lib/validations';
import {
  InputCKEditor,
  InputDate,
  InputSelect,
  InputText,
  InputWrapper,
  UploadImage,
} from '@/components/atoms';
import {
  EMPLOYEE_OPTIONS,
  INDUSTRY_OPTIONS,
  LOCATION_OPTIONS,
} from '@/constants';

interface TabOverviewProps {
  company: TCompany;
}

const TabOverview = ({ company }: TabOverviewProps) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formCompanyOverviewSchema>>({
    resolver: zodResolver(formCompanyOverviewSchema),
    defaultValues: {
      name: company?.name ?? '',
      overview: company?.overview ?? '',
      industry: company?.industry ?? '',
      website: company?.website ?? '',
      location: company?.location ?? '',
      employee: company?.employee ?? '',
      dateFounded: company?.dateFounded,
    },
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const onSubmit = async (val: z.infer<typeof formCompanyOverviewSchema>) => {
    try {
      /// if user update logo
      if (typeof val.logo === 'object') {
        const { filename } = await supabaseUploadFile(val.logo, 'images');
        val.logo = filename;
      } else {
        val.logo = company?.logo;
      }

      const res = await fetch(`/api/v1/company/${company?.id}/overview`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(val),
      });

      if (!res.ok) {
        throw new Error('Something wrong, please try again!');
      }

      toast({
        title: 'Success',
        description: 'Update profile company success',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        {/* COMPANY LOGO */}
        <InputWrapper
          title="Company Logo"
          description="This image will be shown publicly as company logo."
        >
          <UploadImage form={form} name="logo" defaultValue={company?.logo} />
        </InputWrapper>

        <InputWrapper
          title="Company Details"
          description="Introduce your company core info quickly to users by fill up company details"
        >
          <div className="space-y-5">
            {/* COMPANY NAME */}
            <InputText
              control={form.control}
              name="name"
              type="text"
              label="Company Name"
              placeholder="facebook"
            />

            {/* WEBSITE */}
            <InputText
              control={form.control}
              name="website"
              type="text"
              label="Website"
              placeholder="https://company.com"
            />

            {/* LOCATION */}
            <InputSelect
              control={form.control}
              name="location"
              options={LOCATION_OPTIONS}
              label="Location"
              placeholder="Select your location"
            />

            <div className="grid grid-cols-2 gap-4">
              {/* EMPLOYEE TOTAL */}
              <InputSelect
                control={form.control}
                name="employee"
                options={parsingOptionsValue(EMPLOYEE_OPTIONS)}
                label="Employee"
                placeholder="Select range your employee"
              />

              {/* INDUSTRY */}
              <InputSelect
                control={form.control}
                name="industry"
                options={INDUSTRY_OPTIONS}
                label="Industry"
                placeholder="Select your industry"
              />
            </div>

            {/* DATE FOUNDED */}
            <InputDate
              control={form.control}
              name="dateFounded"
              label="Date Founded"
            />
          </div>
        </InputWrapper>

        {/* ABOUT */}
        <InputWrapper
          title="About Company"
          description="Brief description for your company. URLs are hyperlinked."
        >
          <InputCKEditor
            form={form}
            name="overview"
            editorLoaded={editorLoaded}
          />
        </InputWrapper>

        {/* BUTTON */}
        <div className="flex justify-end">
          <Button size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Loading...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TabOverview;
