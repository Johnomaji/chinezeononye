import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getBlogs, createBlog } from '@/lib/data'
import { verifyToken } from '@/lib/auth'
import { BlogPost } from '@/lib/types'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const ensureUniqueSlug = (base: string, existing: BlogPost[]) => {
  const cleanedBase = base || 'post'
  let slug = cleanedBase
  let counter = 2
  while (existing.some(b => b.slug === slug)) {
    slug = `${cleanedBase}-${counter}`
    counter += 1
  }
  return slug
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const blogs = getBlogs()
    return NextResponse.json(blogs)
  } catch (err) {
    console.error('GET /api/blog error:', err)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const body = await request.json()
    const { title, slug, excerpt, content, coverImage, category, tags, published, readTime } = body

    if (!title || !content || !excerpt) {
      return NextResponse.json({ error: 'Title, excerpt, and content are required' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const allBlogs = getBlogs()
    const baseSlug = slugify(slug || title)
    const uniqueSlug = ensureUniqueSlug(baseSlug, allBlogs)
    const newPost: BlogPost = {
      id: uuidv4(),
      title,
      slug: uniqueSlug,
      excerpt,
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
      category: category || 'General',
      tags: Array.isArray(tags) ? tags : [],
      published: Boolean(published),
      createdAt: now,
      updatedAt: now,
      readTime: Number(readTime) || 5,
    }

    const created = createBlog(newPost)
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('POST /api/blog error:', err)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
