import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

import {
  ADMIN_PAGES,
  COMPANY_PAGES,
  GUEST_PAGES,
  JOBSEEKER_PAGES,
} from './constants';

export const middleware = async (request: NextRequest) => {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get('cookie') ?? undefined,
    },
  };

  const session = await getSession({ req: requestForNextAuth });
  const { pathname } = request.nextUrl;

  if (session === null && !GUEST_PAGES.test(pathname)) {
    /// not authenticated and accessing not auth page
    return NextResponse.redirect(new URL('/signin', request.url));
  } else if (session !== null && GUEST_PAGES.test(pathname)) {
    /// authenticated and access the auth page
    return NextResponse.redirect(new URL('/', request.url));
  } else if (
    session?.user.role !== 'JOBSEEKER' &&
    JOBSEEKER_PAGES.test(pathname)
  ) {
    /// not the jobseeker role and access the jobseeker page
    return NextResponse.redirect(new URL('/', request.url));
  } else if (session?.user.role !== 'COMPANY' && COMPANY_PAGES.test(pathname)) {
    /// not the company role and access the company page
    return NextResponse.redirect(new URL('/', request.url));
  } else if (session?.user.role !== 'ADMIN' && ADMIN_PAGES.test(pathname)) {
    /// not the admin role and access the admin page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return null;
};

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/profile/:path*',
    '/dashboard/company/:path*',
    '/dashboard/admin/:path*',
  ],
};
