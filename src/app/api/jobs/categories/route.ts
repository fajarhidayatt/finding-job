import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prisma.jobCategory.findMany();

    return NextResponse.json({
      status: 'success',
      message: 'Success get list of categories',
      data: categories,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 'error',
        message: error.message,
        data: null,
      });
    }
  }
}
