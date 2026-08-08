import { NextRequest, NextResponse } from 'next/server'
import { signToken, verifyAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const valid = await verifyAdmin(username, password)
    if (!valid) {
      const isDev = process.env.NODE_ENV !== 'production'
      if (isDev && url.searchParams.get('debug') === '1') {
        const envUser = (process.env.ADMIN_USERNAME || '').trim()
        const envPass = (process.env.ADMIN_PASSWORD || '').trim()
        const inputUser = String(username || '').trim()
        const inputPass = String(password || '').trim()
        return NextResponse.json({
          error: 'Invalid credentials',
          debug: {
            envUserPresent: Boolean(envUser),
            envPassPresent: Boolean(envPass),
            envUserLen: envUser.length,
            envPassLen: envPass.length,
            inputUserLen: inputUser.length,
            inputPassLen: inputPass.length,
            usernameMatch: inputUser === envUser,
          },
        }, { status: 401 })
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await signToken({ username, role: 'admin' })

    const response = NextResponse.json({ success: true, message: 'Logged in successfully' })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
