import { NextRequest, NextResponse } from 'next/server'
import { getBlogMeta, updateBlogMeta } from '@/lib/data'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const meta = getBlogMeta()
    return NextResponse.json(meta)
  } catch (err) {
    console.error('GET /api/blog/meta error:', err)
    return NextResponse.json({ error: 'Failed to fetch blog meta' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const body = await request.json()
    const updated = updateBlogMeta({
      categories: Array.isArray(body.categories) ? body.categories : [],
      tags: Array.isArray(body.tags) ? body.tags : [],
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('PUT /api/blog/meta error:', err)
    return NextResponse.json({ error: 'Failed to update blog meta' }, { status: 500 })
  }
}
