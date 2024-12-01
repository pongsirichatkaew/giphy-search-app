import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/profile'],
};

// Middleware function with proper typing
export function middleware(req: NextRequest): NextResponse {
  // Uncomment the below lines if you want to add authentication logic
  // const isAuthenticated = req.cookies.get('authToken');
  // console.log('isAuthenticated', isAuthenticated);
  // if (!isAuthenticated) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return NextResponse.next(); // Continue to the requested route
}
