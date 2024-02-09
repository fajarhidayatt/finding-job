import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  const link = await prisma.socialMedia.create({
    data,
  });

  return NextResponse.json({
    status: 'success',
    message: 'Success add social link',
    data: link,
  });
}
