import { NextRequest, NextResponse } from 'next/server'
import { REFERENCE_PATTERN, confirmRegistration } from '@/lib/registration'

// Called by the registration modal as soon as Paystack reports a payment. The
// reference is the only thing taken from the browser: the payment is checked
// with Paystack, and the emails are built from Paystack's record of it.
export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)) {
      return NextResponse.json({ error: 'A valid payment reference is required' }, { status: 400 })
    }

    const confirmed = await confirmRegistration(reference)
    if (!confirmed) {
      return NextResponse.json({ error: 'No paid registration found for this reference' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('POST /api/register/confirm error:', err)
    return NextResponse.json({ error: 'Failed to confirm the registration' }, { status: 500 })
  }
}
