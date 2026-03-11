import { NextRequest, NextResponse } from 'next/server'
import { updateTestimonial, deleteTestimonial } from '@/lib/data'
import { verifyToken } from '@/lib/auth'

interface Params {
  params: { id: string }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const body = await request.json()
    const updated = updateTestimonial(params.id, body)
    if (!updated) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch (err) {
    console.error('PUT /api/testimonials/[id] error:', err)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const deleted = deleteTestimonial(params.id)
    if (!deleted) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Testimonial deleted' })
  } catch (err) {
    console.error('DELETE /api/testimonials/[id] error:', err)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
