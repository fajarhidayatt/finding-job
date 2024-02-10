export type TBenefit = {
  name: string;
  description: string;
};

export type TBucket = 'images' | 'resumes';

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
