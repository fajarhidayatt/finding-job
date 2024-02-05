import { z } from 'zod';
import { JOB_TYPES } from '@/constants';

const formJobSchema = z.object({
  role: z
    .string({ required_error: 'Role is required' })
    .min(3, { message: 'Role must be at least 3 characters' }),
  jobType: z.enum(JOB_TYPES, {
    required_error: 'You need to select a job type',
  }),
  salaryFrom: z.string({ required_error: 'Salary From is required' }),
  salaryTo: z.string({ required_error: 'Salary To is required' }),
  categoryId: z.string({ required_error: 'You need to select a category' }),
  requiredSkills: z
    .string()
    .array()
    .nonempty({ message: 'Required Skills must be at least 1 skill' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, { message: 'Description must be at least 10 characters' }),
  responsibility: z
    .string({ required_error: 'Responsibility is required' })
    .min(10, {
      message: 'Responsibility must be at least 10 characters',
    }),
  whoYouAre: z
    .string({ required_error: 'Who You Are is required' })
    .min(10, { message: 'Who You Are must be at least 10 characters' }),
  niceToHave: z
    .string({ required_error: 'Nice-To-Haves is required' })
    .min(10, { message: 'Nice-To-Haves must be at least 10 characters' }),
  benefits: z
    .object({
      name: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: 'Benefits must be at least 1 benefit' }),
});

export default formJobSchema;
