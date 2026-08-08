import { NextRequest, NextResponse } from 'next/server'
import { getBlog, getBlogs, updateBlog, deleteBlog } from '@/lib/data'
import { verifyToken } from '@/lib/auth'

interface Params {
  params: { id: string }
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const ensureUniqueSlug = (base: string, existing: ReturnType<typeof getBlogs>, currentId: string) => {
  const cleanedBase = base || 'post'
  let slug = cleanedBase
  let counter = 2
  while (existing.some(b => b.slug === slug && b.id !== currentId)) {
    slug = `${cleanedBase}-${counter}`
    counter += 1
  }
  return slug
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const post = getBlog(params.id)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (err) {
    console.error('GET /api/blog/[id] error:', err)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const current = getBlog(params.id)
    if (!current) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const body = await request.json()
    const allBlogs = getBlogs()
    let nextSlug = current.slug
    if (typeof body.slug === 'string' || typeof body.title === 'string') {
      const base = slugify(body.slug || body.title || current.title)
      nextSlug = ensureUniqueSlug(base, allBlogs, params.id)
    }
    const updated = updateBlog(params.id, { ...body, slug: nextSlug })
    if (!updated) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch (err) {
    console.error('PUT /api/blog/[id] error:', err)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const deleted = deleteBlog(params.id)
    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Post deleted' })
  } catch (err) {
    console.error('DELETE /api/blog/[id] error:', err)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
