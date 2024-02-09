import { EnumValues } from 'zod';

export const GUEST_PAGES = /^\/sign*/;
export const JOBSEEKER_PAGES = /^\/profile*/;
export const COMPANY_PAGES = /^\/dashboard\/company*/;
export const ADMIN_PAGES = /^\/dashboard\/admin*/;

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

export const EMPLOYEE_OPTIONS: string[] = [
  '1-50',
  '51-150',
  '151-250',
  '251-500',
  '501-1000',
  '1000-above',
] as const;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

export const ROLE_OPTIONS: EnumValues = ['JOBSEEKER', 'COMPANY'];
