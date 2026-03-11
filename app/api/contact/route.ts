import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { saveMessage } from '@/lib/data'
import { ContactMessage } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 })
    }

    const newMessage: ContactMessage = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    }

    saveMessage(newMessage)

    return NextResponse.json({
      success: true,
      message: 'Message received! Chineze will be in touch soon.',
    }, { status: 201 })
  } catch (err) {
    console.error('POST /api/contact error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { verifyToken } = await import('@/lib/auth')
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const { getMessages } = await import('@/lib/data')
    const messages = getMessages()
    return NextResponse.json(messages)
  } catch (err) {
    console.error('GET /api/contact error:', err)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
