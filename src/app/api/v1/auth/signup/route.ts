import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const data = await request.json();

  const existingAccount = await prisma.account.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingAccount) {
    return NextResponse.json({
      status: 'error',
      message: 'Email is already use!',
      data: null,
    });
  }

  const hashedPassword = await bcrypt.hash(data.password, 8);

  const newAccount = await prisma.account.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  return NextResponse.json({
    status: 'success',
    message: 'Create account successfully',
    data: newAccount,
  });
}
