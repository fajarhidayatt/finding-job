import { z } from 'zod';

const formCompanySettingSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export default formCompanySettingSchema;
