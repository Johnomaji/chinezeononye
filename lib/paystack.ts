import { createHmac, timingSafeEqual } from 'crypto'

// Server-only: uses the Paystack SECRET key, so import this from API routes only.

export type PaystackCustomField = { display_name: string; variable_name: string; value: string }

export type PaystackMetadata = { event_id?: string; custom_fields?: PaystackCustomField[] }

export type PaystackTransaction = {
  status: string // 'success', 'failed', 'abandoned', ...
  reference: string
  amount: number // kobo
  currency: string
  paid_at: string | null
  customer: { email: string; first_name: string | null; last_name: string | null; phone: string | null }
  // Comes back as a JSON string if it was sent as one.
  metadata: PaystackMetadata | string | null
}

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) throw new Error('PAYSTACK_SECRET_KEY is not set')
  return key
}

/** Paystack's own record of a transaction. Throws if Paystack doesn't know the reference. */
export async function verifyTransaction(reference: string): Promise<PaystackTransaction> {
  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
    cache: 'no-store',
  })
  const body = await res.json().catch(() => null)
  if (!res.ok || !body?.status) {
    throw new Error(`Paystack could not verify ${reference} (${res.status}): ${body?.message ?? 'no message'}`)
  }
  return body.data
}

/** True if a webhook body was signed with our secret key, i.e. really came from Paystack. */
export function isValidSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false
  const expected = Buffer.from(createHmac('sha512', secretKey()).update(rawBody).digest('hex'))
  const received = Buffer.from(signature)
  return expected.length === received.length && timingSafeEqual(expected, received)
}

export function parseMetadata(metadata: PaystackTransaction['metadata']): PaystackMetadata {
  if (!metadata) return {}
  if (typeof metadata !== 'string') return metadata
  try {
    return JSON.parse(metadata)
  } catch {
    return {}
  }
}
