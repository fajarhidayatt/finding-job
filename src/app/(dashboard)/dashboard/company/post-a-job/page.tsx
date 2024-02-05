'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputWrapper from './_PostJobPartials/InputWrapper';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InputBenefit, InputCKEditor, InputSkill } from '@/components/atoms';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { formJobSchema } from '@/lib/validations';
import { JOB_CATEGORIES, JOB_TYPES } from '@/constants';

const PostJobPage = () => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formJobSchema>>({
    resolver: zodResolver(formJobSchema),
  });

  useEffect(() => {
    // to load CKEditor
    setEditorLoaded(true);
  }, []);

  function onSubmit(values: z.infer<typeof formJobSchema>) {
    console.log(values);
  }

  return (
    <div className="py-5">
      <h1 className="text-xl font-semibold">Post A Job</h1>
      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* ROLE */}
            <InputWrapper
              title="role"
              description="Role must be describe one position"
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} />
                    </FormControl>
                    <FormDescription>At least 80 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputWrapper>

            {/* JOB TYPE */}
            <InputWrapper
              title="Type of Employment"
              description="You can select multiple type of employment"
            >
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        {JOB_TYPES.map((item: string, index: number) => (
                          <FormItem
                            key={index}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={item} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputWrapper>

            {/* SALARY */}
            <InputWrapper
              title="Salary"
              description="Please specify the estimated salary range for the role."
            >
              <div className="flex items-center justify-between gap-5">
                <FormField
                  control={form.control}
                  name="salaryFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="$100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span>To</span>
                <FormField
                  control={form.control}
                  name="salaryTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="$500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </InputWrapper>

            {/* CATEGORY */}
            <InputWrapper
              title="Category"
              description="You can select job category"
            >
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Job Categories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_CATEGORIES.map((item: string, index: number) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputWrapper>

            {/* REQUIRED SKILLS */}
            <InputWrapper
              title="Required Skills"
              description="Add required skills for the job"
            >
              <InputSkill
                form={form}
                name="requiredSkills"
                label="Add Skills"
              />
            </InputWrapper>

            {/* DESCRIPTION */}
            <InputWrapper
              title="Description"
              description="Describe about this role in your company"
            >
              <InputCKEditor
                form={form}
                name="description"
                editorLoaded={editorLoaded}
              />
            </InputWrapper>

            {/* RESPONSIBILITY */}
            <InputWrapper
              title="Responsibility"
              description="Outline the core responsibilities of the role"
            >
              <InputCKEditor
                form={form}
                name="responsibility"
                editorLoaded={editorLoaded}
              />
            </InputWrapper>

            {/* WHO YOU ARE */}
            <InputWrapper
              title="Who You Are"
              description="Add your preferred candidates qualifications"
            >
              <InputCKEditor
                form={form}
                name="whoYouAre"
                editorLoaded={editorLoaded}
              />
            </InputWrapper>

            {/* NICE TO HAVE */}
            <InputWrapper
              title="Nice To Have"
              description="Add nice-to-have skills and qualifications for the role"
            >
              <InputCKEditor
                form={form}
                name="niceToHave"
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

            {/* BUTTON POST */}
            <div className="flex justify-end">
              <Button type="submit">Post</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default PostJobPage;
