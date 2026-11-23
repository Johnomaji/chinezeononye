import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { IssuedCertificate, certificateStorageConfigured, issuedCertificates } from '@/lib/certificates'
import { unstoppableYou } from '@/lib/events'
import { listRegistrations } from '@/lib/registration'

export const runtime = 'nodejs'

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  const payload = await verifyToken(token)
  if (!payload) return { ok: false, response: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  return { ok: true }
}

// Registrations aren't stored on the site: Paystack's record of each payment is
// the list. Issued certificates come from the certificate store.
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  try {
    const { runs, registrations } = await listRegistrations()

    let certificates: 'ok' | 'not-configured' | 'error' = 'not-configured'
    let issued = new Map<string, IssuedCertificate>()
    if (certificateStorageConfigured()) {
      try {
        issued = await issuedCertificates()
        certificates = 'ok'
      } catch (err) {
        // Still show who registered; the page warns that issued certificates are missing.
        console.error('GET /api/registrations: could not list certificates:', err)
        certificates = 'error'
      }
    }

    return NextResponse.json({
      currentRunId: unstoppableYou.id,
      runs,
      certificates,
      registrations: registrations.map(r => {
        const certificate = issued.get(r.reference)
        return { ...r, certificate: certificate ? { issuedAt: certificate.issuedAt } : null }
      }),
    })
  } catch (err) {
    console.error('GET /api/registrations error:', err)
    return NextResponse.json({ error: 'Failed to load registrations from Paystack' }, { status: 500 })
  }
}
