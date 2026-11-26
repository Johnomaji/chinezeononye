import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/blob'
import { MEDIA_PREFIX, isMediaName } from '@/lib/media'
import { blobConfigured } from '@/lib/storage'

export const runtime = 'nodejs'

// Serves an image uploaded from the admin panel. The store is private, so images
// can't be linked to directly; this passes them through instead.
export async function GET(_request: NextRequest, { params }: { params: { name: string } }) {
  if (!isMediaName(params.name) || !blobConfigured()) {
    return new NextResponse('Not found', { status: 404 })
  }

  const result = await get(MEDIA_PREFIX + params.name, { access: 'private' })
  if (result?.statusCode !== 200) {
    return new NextResponse('Not found', { status: 404 })
  }

  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType,
      // Each upload gets a new, unique name, so a name's contents never change.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
