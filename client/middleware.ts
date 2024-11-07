import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

const publicRoutes = ['/login', '/signup', '/verify-otp'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);

    // Retrieve and decrypt the session cookie
    const cookie = cookies().get('token')?.value;

    // const session = await decrypt(cookie);

    // console.log(` ---------------------------------------------------------`);
    // console.log(`file: middleware.ts:15 ~ middleware ~ session:`, session);
    // console.log(` ---------------------------------------------------------`);

    // If the route is public and user is authenticated, redirect to home
    if (!cookie && path !== '/login') {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (
        cookie &&
        // session.otpVerified &&
        (path === '/verify-otp' || path === '/login')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    // if (session && !session.otpVerified && path !== "/verify-otp") {
    //     return NextResponse.redirect(new URL("/verify-otp", req.nextUrl));
    // }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
