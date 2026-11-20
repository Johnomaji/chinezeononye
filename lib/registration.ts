import { formatNaira, unstoppableYou, unstoppableYouDetails } from './events'
import { PaystackTransaction, parseMetadata, verifyTransaction } from './paystack'
import { Email, sendEmail } from './resend'

// Server-only: imports the Paystack and Resend clients.

const SITE_INBOX = 'info@edenononye.com'

// Paystack only allows letters, digits, '-', '.' and '=' in a reference.
export const REFERENCE_PATTERN = /^[A-Za-z0-9.=-]{1,100}$/

type Registrant = { name: string; firstName: string; email: string; phone: string }
type Row = [label: string, value: string]

/** Why a transaction is not a paid registration for this run of the course, or null if it is. */
function rejection(tx: PaystackTransaction): string | null {
  if (tx.status !== 'success') return `status is ${tx.status}`
  if (parseMetadata(tx.metadata).event_id !== unstoppableYou.id) return 'not a payment for this course'
  if (tx.currency !== 'NGN') return `currency is ${tx.currency}`
  // The amount is set in the browser, so a tampered checkout could charge less.
  // Not an exact match: passing Paystack's fees on to the customer adds to it.
  if (tx.amount < unstoppableYou.feeNaira * 100) return `amount is only ${tx.amount} kobo`
  return null
}

/**
 * Checks a payment with Paystack and, if it is a paid registration for The
 * Unstoppable You, emails the registrant a confirmation and the site inbox the
 * details. The confirm route and the Paystack webhook both call this for the
 * same payment; Resend's idempotency keys drop the second set of emails.
 *
 * Returns false if the payment is not a registration. Throws if Paystack or
 * Resend fails, so the caller can report the error and be retried.
 */
export async function confirmRegistration(reference: string): Promise<boolean> {
  const tx = await verifyTransaction(reference)
  const problem = rejection(tx)
  if (problem) {
    console.warn(`Registration: ignoring ${reference}, ${problem}`)
    return false
  }

  const registrant = registrantOf(tx)
  const results = await Promise.allSettled([
    sendEmail(registrantEmail(registrant, tx), `${unstoppableYou.id}/${tx.reference}/registrant`),
    sendEmail(inboxEmail(registrant, tx), `${unstoppableYou.id}/${tx.reference}/inbox`),
  ])
  const failure = results.find((r): r is PromiseRejectedResult => r.status === 'rejected')
  if (failure) throw failure.reason
  return true
}

// Everything here comes from Paystack's record, not from the browser that
// called the confirm route. The custom fields were set by the checkout.
function registrantOf(tx: PaystackTransaction): Registrant {
  const fields = parseMetadata(tx.metadata).custom_fields
  const field = (name: string) => {
    const value = Array.isArray(fields) ? fields.find(f => f.variable_name === name)?.value : undefined
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''
  }
  const name =
    field('full_name') || [tx.customer.first_name, tx.customer.last_name].filter(Boolean).join(' ').trim()
  return {
    name: name || tx.customer.email,
    firstName: name.split(' ')[0] || 'there',
    email: tx.customer.email,
    phone: field('phone') || tx.customer.phone || '',
  }
}

function registrantEmail(r: Registrant, tx: PaystackTransaction): Email {
  const details: Row[] = [
    ...unstoppableYouDetails.map((d): Row => [d.label, d.value]),
    ['Paid', formatNaira(tx.amount / 100)],
    ['Reference', tx.reference],
  ]
  const intro = `Thank you for registering for ${unstoppableYou.title}. Your payment has been received and your seat is reserved.`
  const next = 'The joining link and session details will be sent to this email address before the course begins.'
  const questions = 'If you have any questions, just reply to this email.'

  return {
    to: r.email,
    replyTo: SITE_INBOX,
    subject: `You're registered for ${unstoppableYou.title}`,
    text: [`Hi ${r.firstName},`, intro, rowsText(details), next, questions, 'Chineze Eden'].join('\n\n'),
    html: layout(
      'Registration confirmed',
      "You're registered!",
      paragraph(`Hi ${r.firstName},`) +
        paragraph(intro) +
        rowsHtml(details) +
        paragraph(next) +
        paragraph(questions) +
        paragraph('Chineze Eden')
    ),
  }
}

function inboxEmail(r: Registrant, tx: PaystackTransaction): Email {
  const details: Row[] = [
    ['Name', r.name],
    ['Email', r.email],
    ['Phone', r.phone || 'Not given'],
    ['Paid', formatNaira(tx.amount / 100)],
    ['Paid at', paidAt(tx)],
    ['Reference', tx.reference],
  ]
  const intro = `${r.name} has registered and paid for ${unstoppableYou.title} (${unstoppableYou.dates}).`

  return {
    to: SITE_INBOX,
    replyTo: r.email,
    subject: `New registration: ${unstoppableYou.title} (${r.name})`,
    text: [intro, rowsText(details)].join('\n\n'),
    html: layout('New registration', unstoppableYou.title, paragraph(intro) + rowsHtml(details)),
  }
}

function paidAt(tx: PaystackTransaction) {
  if (!tx.paid_at) return 'Unknown'
  const when = new Date(tx.paid_at).toLocaleString('en-GB', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  return `${when} WAT`
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const rowsText = (rows: Row[]) => rows.map(([label, value]) => `${label}: ${value}`).join('\n')

const paragraph = (text: string) => `<p style="margin:0 0 16px">${escapeHtml(text)}</p>`

function rowsHtml(rows: Row[]) {
  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;white-space:nowrap;color:#9A7C1A;font-size:11px;letter-spacing:1px;text-transform:uppercase">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td></tr>`
    )
    .join('')
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;border-collapse:collapse;font-size:14px">${cells}</table>`
}

// Table-based with inline styles: most email clients ignore <style> blocks and flexbox.
function layout(eyebrow: string, heading: string, bodyHtml: string) {
  return `<!doctype html>
<html>
<body style="margin:0;padding:24px 12px;background:#FEFCF7">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid #FAEDB3;border-radius:16px;border-collapse:separate">
<tr><td style="background:#1A1A1A;padding:28px 32px;border-radius:15px 15px 0 0">
<p style="margin:0 0 8px;color:#E8C547;font:11px Arial,Helvetica,sans-serif;letter-spacing:3px;text-transform:uppercase">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;color:#FFFFFF;font:bold 24px Georgia,'Times New Roman',serif">${escapeHtml(heading)}</h1>
</td></tr>
<tr><td style="padding:28px 32px 12px;color:#1A1A1A;font:15px/1.6 Arial,Helvetica,sans-serif">${bodyHtml}</td></tr>
</table>
</td></tr></table>
</body>
</html>`
}
