import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
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
        const { email, password } = credentials!;

        const account = await prisma.account.findUnique({
          where: {
            email,
          },
          include: {
            jobseeker: true,
            company: true,
          },
        });

        if (!account) {
          throw new Error('Email not registered!');
        }

        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
          throw new Error('Wrong password!');
        }

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
} satisfies NextAuthOptions;
