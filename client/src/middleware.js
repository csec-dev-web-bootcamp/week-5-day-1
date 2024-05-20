import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const roleRoutes = ['/admin', '/manager']

const protectedRoutes = [...roleRoutes, '/profile']

const authRoutes = ['/auth']


export async function middleware(request) {
  const pathname = request.nextUrl.pathname
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const authUser = accessToken ? jwtDecode(accessToken) : null;

  const isAuthPath = authRoutes.find((route) =>
    pathname.startsWith(route),
  );

  const isRolePath = roleRoutes.find((route) =>
    pathname.startsWith(route),
  );

  const isProtectedPath = protectedRoutes.find((route) =>
    pathname.startsWith(route),
  );

  if (authUser?.userId && authUser.role) {
    const userRolePath = `/${authUser.role.toLowerCase()}`

    if (isRolePath && !pathname.startsWith(userRolePath)) {
      const currentPath = pathname.replace(RegExp(roleRoutes.join("|")), userRolePath)
      if (roleRoutes.includes(userRolePath)) {
        return NextResponse.redirect(
          new URL(currentPath, request.url),
        );
      }
      return NextResponse.redirect(
        new URL('/', request.url),
      );
    }

    if (isAuthPath) {
      if (roleRoutes.includes(userRolePath)) {
        return NextResponse.redirect(
          new URL(userRolePath, request.url),
        );
      }
      return NextResponse.redirect(
        new URL('/', request.url),
      );
    }


  } else if (isProtectedPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|~offline|static|sw.js|.*\\..*|_next|favicon.ico|robots.txt).*)',
  ],
};
