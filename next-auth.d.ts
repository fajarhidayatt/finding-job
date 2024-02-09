import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: any;
      role: any;
    };
  }

  interface User extends DefaultUser {
    role: string;
  }
}
