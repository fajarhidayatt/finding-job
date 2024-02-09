import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type TCompanyParams = {
  params: {
    companyId: string;
  };
};

export async function GET(request: Request, { params }: TCompanyParams) {
  const { companyId } = params;

  const company = await prisma.company.findFirst({
    where: {
      id: companyId,
    },
  });

  if (company) {
    return NextResponse.json({
      status: 'success',
      message: 'Success get data company',
      data: company,
    });
  }

  return NextResponse.json({
    status: 'error',
    message: 'Company not found',
    data: {},
  });
}

export async function PUT(request: Request, { params }: TCompanyParams) {
  const { companyId } = params;
  const data = await request.json();

  await prisma.company.update({
    where: {
      id: companyId,
    },
    data: data,
  });

  return NextResponse.json({
    status: 'success',
    message: 'Success update profile company',
    data: {},
  });
}
