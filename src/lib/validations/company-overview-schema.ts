import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES } from '@/constants';

const formCompanyOverviewSchema = z.object({
  logo: z
    .any({ required_error: 'Company logo is required' })
    .refine((files) => files?.[0]?.size <= 5000000, `Max image size is 500Kb.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  name: z.string({ required_error: 'Name is required' }),
  website: z.string({ required_error: 'Website is required' }),
  location: z.string({ required_error: 'Location is required' }),
  employee: z.string({ required_error: 'Employee is required' }),
  industry: z.string({ required_error: 'Industry is required' }),
  dateFounded: z.date({ required_error: 'dateFounded is required' }),
  about: z.string({ required_error: 'About is required' }),
});

export default formCompanyOverviewSchema;
