import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
    });

    if (!companies) {
      throw new Error('No data');
    }

    return NextResponse.json({
      status: 'success',
      message: 'Success get list of jobs',
      data: companies,
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
