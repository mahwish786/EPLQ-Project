import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // 1. Define paths
  const isPublicPath = path === '/login' || path === '/signup' || path === '/admin-login' || path === '/admin-signup';
  const isUserPath = path.startsWith('/user');
  const isAdminPath = path.startsWith('/admin') && !path.includes('login') && !path.includes('signup');

  // 2. Get tokens from cookies
  const userToken = request.cookies.get('user_token')?.value || '';
  const adminToken = request.cookies.get('admin_token')?.value || '';

  // === REDIRECT LOGIC ===

  // A. If user is logged in but tries to visit Login/Signup -> Push to Dashboard
  if (isPublicPath && userToken && !path.includes('admin')) {
    return NextResponse.redirect(new URL('/user/dashboard', request.nextUrl));
  }
  
  // B. If Admin is logged in but tries to visit Admin Login -> Push to Admin Dashboard
  if (isPublicPath && adminToken && path.includes('admin')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
  }

  // C. If Guest tries to visit User Dashboard -> Kick to Login
  if (isUserPath && !userToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // D. If Guest tries to visit Admin Dashboard -> Kick to Admin Login
  if (isAdminPath && !adminToken) {
    return NextResponse.redirect(new URL('/admin-login', request.nextUrl));
  }
}

// 3. Configure which paths trigger this middleware
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/admin-login',
    '/admin-signup',
    '/user/:path*',
    '/admin/:path*'
  ]
};