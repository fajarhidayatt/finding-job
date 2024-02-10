import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  const { companyId } = params;

  const companyJobs = await prisma.job.findMany({
    where: {
      companyId,
    },
  });

  if (!companyJobs) {
    return NextResponse.json({
      status: 'Error',
      message: 'Company Jobs not found',
      data: {},
    });
  }

  return NextResponse.json({
    status: 'success',
    message: 'Success get company jobs',
    data: companyJobs,
  });
}

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
