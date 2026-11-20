import { NextRequest, NextResponse } from 'next/server'
import { isValidSignature } from '@/lib/paystack'
import { REFERENCE_PATTERN, confirmRegistration } from '@/lib/registration'

// Paystack calls this for every event on the account. It backs up the confirm
// route, e.g. for a registrant who closed the tab before the modal could call it.
// Set in Paystack > Settings > API Keys & Webhooks as
// https://www.edenononye.com/api/paystack/webhook (the www host, which doesn't redirect).
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    if (!isValidSignature(rawBody, request.headers.get('x-paystack-signature'))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    const reference = event.data?.reference
    if (event.event === 'charge.success' && typeof reference === 'string' && REFERENCE_PATTERN.test(reference)) {
      await confirmRegistration(reference)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    // Anything but a 200 makes Paystack retry later. Emails already sent for the
    // payment aren't sent twice (see confirmRegistration).
    console.error('POST /api/paystack/webhook error:', err)
    return NextResponse.json({ error: 'Failed to handle the webhook' }, { status: 500 })
  }
}
