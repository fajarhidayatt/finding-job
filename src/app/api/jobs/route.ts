import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        category: true,
      },
      orderBy: {
        datePosted: 'desc',
      },
      where: {
        dueDate: {
          gt: new Date(),
        },
      },
    });

    if (!jobs) {
      throw new Error('No data');
    }

    return NextResponse.json({
      status: 'success',
      message: 'Success get list of jobs',
      data: jobs,
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
