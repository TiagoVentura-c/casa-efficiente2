import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export default function middleware(request: NextRequest){
    const token = request.cookies.get('access_token')?.value

    const signInUrl = new URL('/auth/login', request.url)
    const dashboardUrl = new URL('/plans', request.url)

    if (request.nextUrl.pathname.startsWith('/images') || request.nextUrl.pathname.startsWith('/_next')) {
        // Ignora o middleware e continua com a próxima rota ou middleware
        return NextResponse.next()
    }

    if(!token){
        if(request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/validate-otp' || request.nextUrl.pathname === '' ){
            return NextResponse.next()
        }

        return NextResponse.rewrite(signInUrl)
    }

    if(request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/validate-otp' ){
        return NextResponse.redirect(dashboardUrl)
    }

}

export const config = {
    matcher: [ '/', '/auth/:path*', '/:path*']
}