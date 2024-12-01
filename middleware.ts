// middleware.js
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/profile'],
};

export function middleware(req) {
  // Redirect to /login if the user is not authenticated
  // const isAuthenticated = req.cookies.get('authToken');
  // console.log('isAuthenticated', isAuthenticated);
  // if (!isAuthenticated) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return NextResponse.next(); // Continue to the requested route
}
