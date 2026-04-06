import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    const userCookie = request.cookies.get("user")?.value
    const pathname = request.nextUrl.pathname

    if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/siswa"))) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (!token) {
        return NextResponse.next()
    }

    if (!userCookie) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const user = JSON.parse(userCookie)

    const isAdmin = user.email === "admin@sekolah.sch.id"
    const isSiswa = !isAdmin

    if (isAdmin && pathname.startsWith("/siswa")) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    if (isSiswa && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/siswa/dashboard", request.url))
    }

    if (pathname === "/login" || pathname === "/register") {
        if (isAdmin) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
        }
        return NextResponse.redirect(new URL("/siswa/dashboard", request.url))
    }

    return NextResponse.next()
}
