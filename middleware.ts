import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production-32ch'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin route protection (except login page)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    try {
      await jwtVerify(token, SECRET)
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin_token')
      return response
    }
  }

  // Maintenance mode check for public routes
  if (
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/maintenance') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/favicon')
  ) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2000)
      const settingsRes = await fetch(new URL('/api/settings', request.url), {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (settingsRes.ok) {
        const settings = await settingsRes.json()
        if (settings.maintenanceMode) {
          return NextResponse.redirect(new URL('/maintenance', request.url))
        }
      }
    } catch {
      // If settings fetch fails, allow normal access
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
