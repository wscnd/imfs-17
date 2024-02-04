'use server';
import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { getUserToken } from './server-actions/login.actions';

export async function middleware(request: NextRequest) {
  const user = await getUserToken();

  if (user.length === 0) {
    const { pathname } = new URL(request.url);
    return NextResponse.redirect(
      new URL(`/login?redirect_to=${pathname}`, request.url),
    );
  }
}
export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*'],
};
