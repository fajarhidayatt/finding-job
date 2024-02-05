import { EnumValues } from 'zod';

export const JOB_TYPES: EnumValues = [
  'Full-Time',
  'Part-Time',
  'Remote',
  'Internship',
] as const;

export const JOB_CATEGORIES: string[] = [
  'Design',
  'Web Development',
  'Programmer',
  'AI',
  'Marketing',
];
