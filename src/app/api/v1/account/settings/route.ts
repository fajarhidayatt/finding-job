import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const data = await request.json();

  // find account by id
  const account = await prisma.account.findFirst({
    where: {
      id: data.accountId,
    },
  });

  if (!account) {
    return NextResponse.json({
      status: 'Error',
      message: 'Account not found',
      data: null,
    });
  }

  /// user changes email
  if (account.email !== data.email) {
    /// find out if the email has been used
    const isEmailExist = await prisma.account.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isEmailExist) {
      return NextResponse.json({
        status: 'Error',
        message: 'Email already exist!',
        data: null,
      });
    }
  }

  /// if user changes the password
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 8);

    await prisma.account.update({
      where: {
        id: data.accountId,
      },
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });
  } else {
    await prisma.account.update({
      where: {
        id: data.accountId,
      },
      data: {
        username: data.username,
        email: data.email,
      },
    });
  }

  return NextResponse.json({
    status: 'Success',
    message: 'Success update profile account',
    data: null,
  });
}
