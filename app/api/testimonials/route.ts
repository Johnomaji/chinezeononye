import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getTestimonials, createTestimonial } from '@/lib/data'
import { verifyToken } from '@/lib/auth'
import { Testimonial } from '@/lib/types'

// Without this, Next serves the list as it was at build time and the admin panel
// never sees its own changes.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const testimonials = await getTestimonials()
    return NextResponse.json(testimonials)
  } catch (err) {
    console.error('GET /api/testimonials error:', err)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const body = await request.json()
    const { name, role, company, content, image, rating, featured } = body

    if (!name || !content) {
      return NextResponse.json({ error: 'Name and content are required' }, { status: 400 })
    }

    const newTestimonial: Testimonial = {
      id: uuidv4(),
      name,
      role: role || '',
      company: company || '',
      content,
      image: image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      rating: Number(rating) || 5,
      featured: Boolean(featured),
      createdAt: new Date().toISOString(),
    }

    const created = await createTestimonial(newTestimonial)
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('POST /api/testimonials error:', err)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
