import { NextRequest, NextResponse } from 'next/server'
import { getSettings, updateSettings } from '@/lib/data'
import { verifyToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // The middleware calls this on every page view to check for maintenance mode,
    // so it takes the cached copy (at most a minute old) rather than reading
    // storage each time. The admin panel gets the latest.
    const token = request.cookies.get('admin_token')?.value
    const isAdmin = Boolean(token && (await verifyToken(token)))
    const settings = await getSettings({ cached: !isAdmin })
    return NextResponse.json(settings)
  } catch (err) {
    console.error('GET /api/settings error:', err)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const body = await request.json()
    const updated = await updateSettings(body)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('PUT /api/settings error:', err)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
