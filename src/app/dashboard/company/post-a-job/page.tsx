'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { TCategory } from '@/types';
import { JOB_TYPES } from '@/constants';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { formJobSchema } from '@/lib/validations';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  InputBenefit,
  InputCKEditor,
  InputDate,
  InputRadio,
  InputSelect,
  InputSkill,
  InputText,
  InputWrapper,
} from '@/components/atoms';

const PostJobPage = () => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formJobSchema>>({
    resolver: zodResolver(formJobSchema),
  });

  const dataCategories = useCallback(async () => {
    const res = await fetch('http://localhost:3000/api/v1/jobs/categories');
    const data = await res.json();

    setCategories(data.data);
  }, []);

  useEffect(() => {
    setEditorLoaded(true);
    dataCategories();
  }, [dataCategories]);

  const onSubmit = async (val: z.infer<typeof formJobSchema>) => {
    try {
      const companyId = session?.user.id;

      const data = {
        role: val.role,
        description: val.description,
        dueDate: val.dueDate,
        jobType: val.jobType,
        salaryFrom: val.salaryFrom,
        salaryTo: val.salaryTo,
        requiredSkills: val.requiredSkills,
        benefits: val.benefits,
        categoryId: val.categoryId,
        totalNeeds: Number(val.totalNeeds),
        companyId,
      };

      const res = await fetch(`/api/v1/company/${companyId}/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Something wrong, please try again!');
      }

      toast({
        title: 'Success',
        description: 'Success post a job, redirecting...',
      });

      router.back();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something wrong, please try again!',
      });
    }
  };

  return (
    <div className="py-5">
      <h1 className="text-xl font-semibold">Post A Job</h1>
      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* ROLE */}
            <InputWrapper
              title="Role"
              description="Role must be describe one position"
            >
              <InputText
                control={form.control}
                name="role"
                type="text"
                placeholder="e.g. Frontend Developer"
              />
            </InputWrapper>

            {/* NEEDS */}
            <InputWrapper
              title="Total Needs"
              description="How many candidates do you need"
            >
              <InputText
                control={form.control}
                name="totalNeeds"
                type="number"
                placeholder="e.g. 100"
              />
            </InputWrapper>

            {/* JOB TYPE */}
            <InputWrapper
              title="Type of Employment"
              description="You can select type of employment"
            >
              <InputRadio control={form.control} name="jobType">
                {JOB_TYPES.map((item: string, index: number) => (
                  <FormItem
                    key={index}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={item} />
                    </FormControl>
                    <FormLabel className="font-normal">{item}</FormLabel>
                  </FormItem>
                ))}
              </InputRadio>
            </InputWrapper>

            {/* SALARY */}
            <InputWrapper
              title="Salary"
              description="Please specify the estimated salary range for the role."
            >
              <div className="flex items-center justify-between gap-5">
                <InputText
                  control={form.control}
                  name="salaryFrom"
                  type="text"
                  placeholder="Rp. 5.000.000"
                />
                <span>To</span>
                <InputText
                  control={form.control}
                  name="salaryTo"
                  type="text"
                  placeholder="Rp. 8.500.000"
                />
              </div>
            </InputWrapper>

            {/* CATEGORY */}
            <InputWrapper
              title="Category"
              description="You can select job category"
            >
              <InputSelect
                control={form.control}
                name="categoryId"
                placeholder={
                  categories.length > 0 ? 'Select job category' : 'Loading...'
                }
              >
                {categories.length > 0 &&
                  categories.map((category: TCategory) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </InputSelect>
            </InputWrapper>

            {/* REQUIRED SKILLS */}
            <InputWrapper
              title="Required Skills"
              description="Add required skills for the job"
            >
              <InputSkill form={form} name="requiredSkills" label="Add Skill" />
            </InputWrapper>

            {/* DESCRIPTION */}
            <InputWrapper
              title="Description"
              description="Describe about this role in your company, candidates qualifications, nice to have skills, and other"
            >
              <InputCKEditor
                form={form}
                name="description"
                editorLoaded={editorLoaded}
              />
            </InputWrapper>

            {/* BENEFITS */}
            <InputWrapper
              title="Perks and Benefits"
              description="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
            >
              <InputBenefit form={form} name="benefits" />
            </InputWrapper>

            {/* DUE DATE */}
            <InputWrapper
              title="Due Date"
              description="The due date for this role is open"
            >
              <InputDate control={form.control} name="dueDate" />
            </InputWrapper>

            {/* BUTTON POST */}
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Loading...' : 'Post'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default PostJobPage;
