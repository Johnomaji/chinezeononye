import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import {
  MAX_CERTIFICATE_BYTES,
  certificateFile,
  certificateStorageConfigured,
  latestCertificate,
  readCertificate,
} from '@/lib/certificates'
import { REFERENCE_PATTERN, issueCertificate } from '@/lib/registration'

export const runtime = 'nodejs'

const NOT_CONFIGURED =
  'Certificate storage is not set up. Connect a private Vercel Blob store to the project, then redeploy.'

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  const payload = await verifyToken(token)
  if (!payload) return { ok: false, response: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  return { ok: true }
}

// Emails the uploaded certificate to the registrant who made the payment with
// this reference. Their name and email come from Paystack, not from the form.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response
  if (!certificateStorageConfigured()) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 })

  try {
    const formData = await request.formData()
    const reference = formData.get('reference')
    const file = formData.get('file')
    if (typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)) {
      return NextResponse.json({ error: 'A valid payment reference is required' }, { status: 400 })
    }
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    if (file.size > MAX_CERTIFICATE_BYTES) {
      return NextResponse.json({ error: 'File too large (max 4MB)' }, { status: 400 })
    }
    const certificate = certificateFile(Buffer.from(await file.arrayBuffer()))
    if (!certificate) {
      return NextResponse.json({ error: 'The certificate must be a PDF, PNG or JPG file' }, { status: 400 })
    }

    const issued = await issueCertificate(reference, certificate)
    if (!issued) {
      return NextResponse.json({ error: 'No paid registration found for this reference' }, { status: 400 })
    }
    return NextResponse.json({ email: issued.email, issuedAt: issued.issuedAt }, { status: 201 })
  } catch (err) {
    console.error('POST /api/registrations/certificate error:', err)
    return NextResponse.json({ error: 'Failed to issue the certificate' }, { status: 500 })
  }
}

// The certificate most recently issued for ?reference=, to check what was sent.
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response
  if (!certificateStorageConfigured()) return NextResponse.json({ error: NOT_CONFIGURED }, { status: 503 })

  const reference = request.nextUrl.searchParams.get('reference') ?? ''
  if (!REFERENCE_PATTERN.test(reference)) {
    return NextResponse.json({ error: 'A valid payment reference is required' }, { status: 400 })
  }

  try {
    const issued = await latestCertificate(reference)
    const certificate = issued && (await readCertificate(issued.pathname))
    if (!certificate) {
      return NextResponse.json({ error: 'No certificate has been issued for this reference' }, { status: 404 })
    }
    return new NextResponse(certificate.stream, {
      headers: {
        'Content-Type': certificate.blob.contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('GET /api/registrations/certificate error:', err)
    return NextResponse.json({ error: 'Failed to load the certificate' }, { status: 500 })
  }
}
