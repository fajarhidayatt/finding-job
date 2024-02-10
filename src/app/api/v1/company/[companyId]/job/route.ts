import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  const res = await prisma.job.create({ data });

  if (!res) {
    return NextResponse.json({
      status: 'Error',
      message: 'Something wrong',
      data: {},
    });
  }

  return NextResponse.json({
    status: 'success',
    message: 'Success post a job',
    data: res,
  });
}
