import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPages = ['/login', '/register'];
const protectedRoutes = ['/profile-dashboard', '/my-courses/saved', '/my-courses/recent-viewed'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value; // Adjust if your session uses another name

  const isLoggedIn = Boolean(token);
  const isAuthPage = authPages.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Not logged in, trying to access protected route → redirect to /login
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // Logged in, trying to access login/register → remove session and redirect to homepage
  if (isLoggedIn && isAuthPage) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('token'); // delete token
    return response;
  }

  // Allow other requests
  return NextResponse.next();
}
