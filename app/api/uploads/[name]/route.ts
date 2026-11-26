import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import { BlobNotFoundError, del, head } from '@vercel/blob'
import { verifyToken } from '@/lib/auth'
import { MEDIA_PREFIX } from '@/lib/media'
import { savesToBlob } from '@/lib/storage'

export const runtime = 'nodejs'

const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  const payload = await verifyToken(token)
  if (!payload) return { ok: false, response: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  return { ok: true }
}

function isSafeName(name: string) {
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) return false
  const ext = path.extname(name).toLowerCase()
  return ALLOWED_EXT.has(ext)
}

export async function DELETE(request: NextRequest, { params }: { params: { name: string } }) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  const { name } = params
  if (!name || !isSafeName(name)) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 })
  }

  try {
    if (savesToBlob()) {
      // Only uploads in the Blob store can go: images in public/uploads ship with
      // the site's code, which is read-only on Vercel.
      try {
        await head(MEDIA_PREFIX + name)
      } catch (err) {
        if (err instanceof BlobNotFoundError) {
          return NextResponse.json(
            { error: 'This image is part of the site’s code, so it can only be removed there.' },
            { status: 400 }
          )
        }
        throw err
      }
      await del(MEDIA_PREFIX + name)
      return NextResponse.json({ success: true })
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.resolve(uploadsDir, name)
    if (!filePath.startsWith(path.resolve(uploadsDir))) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 })
    }

    await fs.unlink(filePath)
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    console.error('DELETE /api/uploads/[name] error:', err)
    return NextResponse.json({ error: 'Failed to delete upload' }, { status: 500 })
  }
}
