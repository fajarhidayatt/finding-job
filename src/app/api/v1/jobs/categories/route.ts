import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.jobCategory.findMany();

  if (!categories.length) {
    return NextResponse.json({
      status: 'error',
      message: 'Categories not found',
      data: {},
    });
  }

  return NextResponse.json({
    status: 'success',
    message: 'Success get list categories',
    data: categories,
  });
}
