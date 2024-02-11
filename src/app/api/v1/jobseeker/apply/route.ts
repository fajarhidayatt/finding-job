import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { resume, coverLetter, jobseekerId, jobId } = await request.json();

  const isApply = await prisma.applicant.count({
    where: {
      jobseekerId,
      AND: {
        jobId,
      },
    },
  });

  if (isApply) {
    return NextResponse.json({
      status: 'Error',
      message: 'You have applied for this job',
      data: null,
    });
  }

  const res = await prisma.applicant.create({
    data: {
      resume,
      coverLetter,
      jobseekerId,
      jobId,
    },
  });

  if (!res) {
    return NextResponse.json({
      status: 'Error',
      message: 'Something went wrong, please try again later!',
      data: null,
    });
  }

  await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      totalApplicants: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({
    status: 'Success',
    message: 'Successfully submitted application',
    data: res,
  });
}
