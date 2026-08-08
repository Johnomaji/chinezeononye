import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import crypto from 'crypto'
import { verifyToken } from '@/lib/auth'
import { promises as fs } from 'fs'

export const runtime = 'nodejs'

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

function getExtension(filename: string, type: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ALLOWED_EXT.has(ext)) return ext
  const fromType: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
  }
  return fromType[type] || ''
}

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  const payload = await verifyToken(token)
  if (!payload) return { ok: false, response: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  return { ok: true }
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await fs.access(uploadsDir)
    } catch {
      return NextResponse.json([])
    }

    const entries = await fs.readdir(uploadsDir, { withFileTypes: true })
    const files = await Promise.all(
      entries
        .filter(entry => entry.isFile() && ALLOWED_EXT.has(path.extname(entry.name).toLowerCase()))
        .map(async entry => {
          const filePath = path.join(uploadsDir, entry.name)
          const stat = await fs.stat(filePath)
          return {
            name: entry.name,
            url: `/uploads/${entry.name}`,
            size: stat.size,
            updatedAt: stat.mtime.toISOString(),
          }
        })
    )

    files.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    return NextResponse.json(files)
  } catch (err) {
    console.error('GET /api/uploads error:', err)
    return NextResponse.json({ error: 'Failed to list uploads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.ok) return auth.response

    const formData = await request.formData()
    const file = formData.get('file')
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    const ext = getExtension(file.name, file.type)
    if (!ext) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
    }

    const fileName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })
    const filePath = path.join(uploadsDir, fileName)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)

    return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 201 })
  } catch (err) {
    console.error('POST /api/uploads error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
