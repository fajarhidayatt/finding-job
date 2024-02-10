export type TBucket = 'images' | 'resumes';

export type TBenefit = {
  name: string;
  description: string;
};

export type TCategory = {
  id: string;
  name: string;
};

export type TLink = {
  id?: string;
  name: string;
  link: string;
  jobseekerId?: string;
  companyId?: string;
};

export type TJob = {
  id?: string;
  role: string;
  description: string;
  datePosted: Date;
  dueDate: Date;
  jobType: string;
  totalApplicants: number;
  totalNeeds: number;
  salaryFrom: string;
  salaryTo: string;
  requiredSkills: string[];
  benefits: TBenefit[];
  status: string;
  companyId: string;
  company?: TCompany;
  categoryId: string;
  category: TCategory;
  applicants: [];
};

export type TCompany = {
  id?: string;
  name: string;
  logo: string;
  overview: string;
  industry: string;
  website: string;
  location: string;
  employee: string;
  dateFounded: Date;
  accountId?: string;
  account?: [];
  socialMedia?: TLink[];
  jobs?: [];
};
