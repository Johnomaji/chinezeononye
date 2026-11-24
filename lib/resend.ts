// Server-only: uses RESEND_API_KEY, so import this from API routes only.

// edenononye.com must be verified under Resend > Domains, or every send is rejected.
const FROM = 'Eden Chineze <info@edenononye.com>'

export type Email = {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
  // `content` is the file base64-encoded. Resend caps a whole email at 40MB.
  attachments?: { filename: string; content: string }[]
}

/**
 * Sends one email through Resend. A repeat send with the same `idempotencyKey`
 * within 24 hours is dropped by Resend, so callers can safely retry.
 */
export async function sendEmail(email: Email, idempotencyKey: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from: FROM,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      reply_to: email.replyTo,
      attachments: email.attachments,
    }),
    cache: 'no-store',
  })
  // 409: this key has already been used, so the email was (or is being) sent.
  if (res.ok || res.status === 409) return

  const body = await res.json().catch(() => null)
  throw new Error(`Resend rejected "${email.subject}" (${res.status}): ${body?.message ?? 'no message'}`)
}
