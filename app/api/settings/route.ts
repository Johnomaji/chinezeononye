import { NextRequest, NextResponse } from 'next/server'
import { getSettings, updateSettings } from '@/lib/data'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const settings = getSettings()
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
    const updated = updateSettings(body)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('PUT /api/settings error:', err)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
