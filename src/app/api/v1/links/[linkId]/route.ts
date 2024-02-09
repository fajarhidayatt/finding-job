import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type TLinkParams = {
  params: {
    linkId: string;
  };
};

export async function DELETE(request: Request, { params }: TLinkParams) {
  const { linkId } = params;

  await prisma.socialMedia.delete({
    where: {
      id: linkId,
    },
  });

  return NextResponse.json({
    status: 'success',
    message: 'Success delete links',
    data: {},
  });
}
