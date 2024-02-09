import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth/next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const account = await prisma.account.findFirst({
          where: {
            email: credentials?.email,
          },
          include: {
            jobseeker: true,
            company: true,
          },
        });

        if (account) {
          const isMatch = await bcrypt.compare(
            credentials?.password!!,
            account.password
          );

          if (isMatch) {
            if (account.jobseeker !== null) {
              return {
                id: account.jobseeker.id,
                accountId: account.id,
                email: account.email,
                name: account.username,
                role: account.role,
                image: account.jobseeker.photo,
              };
            } else if (account.company !== null) {
              return {
                id: account.company.id,
                accountId: account.id,
                email: account.email,
                name: account.username,
                role: account.role,
                image: account.company.logo,
              };
            }

            return {
              id: account.id,
              accountId: account.id,
              email: account.email,
              name: account.username,
              role: account.role,
              image: null,
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
    signOut: '/',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accountId = user.accountId;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accountId = token.accountId;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
