import { createHash } from 'crypto'
import { CertificateFile, IssuedCertificate, latestCertificate, saveCertificate } from './certificates'
import { formatNaira, unstoppableYou, unstoppableYouDetails } from './events'
import { PaystackTransaction, listSuccessfulTransactions, parseMetadata, verifyTransaction } from './paystack'
import { Email, sendEmail } from './resend'
import { SITE_URL } from './seo'

// Server-only: imports the Paystack, Resend and Vercel Blob clients.

const SITE_INBOX = 'info@edenononye.com'
const SITE_HOST = new URL(SITE_URL).host
// Email clients load images from the live site, so this must already be deployed.
const LOGO_URL = `${SITE_URL}/cropped-co-favicon.png`

// Paystack only allows letters, digits, '-', '.' and '=' in a reference.
export const REFERENCE_PATTERN = /^[A-Za-z0-9.=-]{1,100}$/

type Registrant = { name: string; firstName: string; email: string; phone: string }
type Row = [label: string, value: string]

export type Run = { id: string; label: string }

export type Registration = {
  reference: string
  runId: string
  name: string
  email: string
  phone: string
  paidNaira: number
  paidAt: string | null
}

/**
 * Why a transaction is not a paid registration for a run of the course, or null
 * if it is. Pass a run's id to also require the payment to be for that run.
 */
function rejection(tx: PaystackTransaction, runId?: string): string | null {
  const paidFor = parseMetadata(tx.metadata).event_id
  if (tx.status !== 'success') return `status is ${tx.status}`
  if (!paidFor || (runId && paidFor !== runId)) return 'not a payment for this course'
  if (tx.currency !== 'NGN') return `currency is ${tx.currency}`
  // The amount is set in the browser, so a tampered checkout could charge less.
  // Not an exact match: passing Paystack's fees on to the customer adds to it.
  // Only the current run's fee is known, so earlier runs aren't checked.
  if (paidFor === unstoppableYou.id && tx.amount < unstoppableYou.feeNaira * 100) {
    return `amount is only ${tx.amount} kobo`
  }
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
  const problem = rejection(tx, unstoppableYou.id)
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

/**
 * Every paid registration on the Paystack account, newest first, with the runs
 * they were for. The current run comes first, even before anyone has paid.
 * Earlier runs stay listed so their certificates can still be issued after
 * lib/events.ts moves on to the next run.
 */
export async function listRegistrations(): Promise<{ runs: Run[]; registrations: Registration[] }> {
  const runs = new Map([[unstoppableYou.id, `${unstoppableYou.title}, ${unstoppableYou.dates}`]])
  const registrations: Registration[] = []
  for (const tx of await listSuccessfulTransactions()) {
    const runId = parseMetadata(tx.metadata).event_id
    if (!runId || rejection(tx)) continue
    if (!runs.has(runId)) runs.set(runId, customField(tx, 'event') || runId)
    const r = registrantOf(tx)
    registrations.push({
      reference: tx.reference,
      runId,
      name: r.name,
      email: r.email,
      phone: r.phone,
      paidNaira: tx.amount / 100,
      paidAt: tx.paid_at,
    })
  }
  return { runs: Array.from(runs, ([id, label]) => ({ id, label })), registrations }
}

/**
 * Checks a payment with Paystack and, if it is a paid registration for any run
 * of the course, emails the registrant their certificate and saves a copy as
 * the record that it was issued. Issuing again sends the new file and keeps
 * both copies.
 *
 * Returns null if the payment is not a registration. Throws if Paystack, Resend
 * or the certificate store fails.
 */
export async function issueCertificate(
  reference: string,
  file: CertificateFile
): Promise<(IssuedCertificate & { email: string }) | null> {
  const tx = await verifyTransaction(reference)
  const problem = rejection(tx)
  if (problem) {
    console.warn(`Certificate: not issuing for ${reference}, ${problem}`)
    return null
  }

  const registrant = registrantOf(tx)
  // A retry of the same issue (same file, nothing saved since) reuses the key,
  // so if the email went but the copy failed to save, retrying doesn't send it
  // twice. Issuing again after a saved issue gets a new key and is sent.
  const previous = await latestCertificate(tx.reference)
  const fileHash = createHash('sha256').update(file.bytes).digest('hex').slice(0, 16)
  const key = `certificate/${tx.reference}/${fileHash}/after-${previous?.issuedAt ?? 'none'}`

  await sendEmail(certificateEmail(registrant, file), key)
  const saved = await saveCertificate(tx.reference, file)
  return { ...saved, email: registrant.email }
}

// Set by the checkout in the transaction's metadata.
function customField(tx: PaystackTransaction, name: string): string {
  const fields = parseMetadata(tx.metadata).custom_fields
  const value = Array.isArray(fields) ? fields.find(f => f.variable_name === name)?.value : undefined
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''
}

// Everything here comes from Paystack's record, not from the browser that
// called the confirm route.
function registrantOf(tx: PaystackTransaction): Registrant {
  const name =
    customField(tx, 'full_name') || [tx.customer.first_name, tx.customer.last_name].filter(Boolean).join(' ').trim()
  return {
    name: name || tx.customer.email,
    firstName: name.split(' ')[0] || 'there',
    email: tx.customer.email,
    phone: customField(tx, 'phone') || tx.customer.phone || '',
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
  const footnote = `You're receiving this email because you registered for ${unstoppableYou.title} at ${SITE_HOST}.`

  return {
    to: r.email,
    replyTo: SITE_INBOX,
    subject: `You're registered for ${unstoppableYou.title}`,
    text: [`Hi ${r.firstName},`, intro, rowsText(details), next, questions, 'Eden Chineze', footerText(footnote)].join(
      '\n\n'
    ),
    html: layout(
      'Registration confirmed',
      "You're registered!",
      paragraph(`Hi ${r.firstName},`) +
        paragraph(intro) +
        rowsHtml(details) +
        paragraph(next) +
        paragraph(questions) +
        paragraph('Eden Chineze'),
      footnote
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
  const footnote = `Sent automatically when a payment on ${SITE_HOST} is confirmed. Reply to this email to reach ${r.firstName}.`

  return {
    to: SITE_INBOX,
    replyTo: r.email,
    subject: `New registration: ${unstoppableYou.title} (${r.name})`,
    text: [intro, rowsText(details), footerText(footnote)].join('\n\n'),
    html: layout('New registration', unstoppableYou.title, paragraph(intro) + rowsHtml(details), footnote),
  }
}

function certificateEmail(r: Registrant, file: CertificateFile): Email {
  const intro = `Congratulations on completing ${unstoppableYou.title}! Your certificate is attached to this email.`
  const thanks = 'Thank you for being part of it.'
  const questions = 'If you have any questions, just reply to this email.'
  const footnote = `You're receiving this email because you took part in ${unstoppableYou.title}.`

  return {
    to: r.email,
    replyTo: SITE_INBOX,
    subject: `Your certificate for ${unstoppableYou.title}`,
    text: [`Hi ${r.firstName},`, intro, thanks, questions, 'Eden Chineze', footerText(footnote)].join('\n\n'),
    html: layout(
      'Certificate',
      'Congratulations!',
      paragraph(`Hi ${r.firstName},`) +
        paragraph(intro) +
        paragraph(thanks) +
        paragraph(questions) +
        paragraph('Eden Chineze'),
      footnote
    ),
    attachments: [
      { filename: `${unstoppableYou.title} certificate.${file.ext}`, content: file.bytes.toString('base64') },
    ],
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

const footerText = (footnote: string) => `--\n${SITE_HOST} · ${SITE_INBOX}\n${footnote}`

// Table-based with inline styles: most email clients ignore <style> blocks and flexbox.
// `footnote` goes under the site links and says why the reader got the email.
function layout(eyebrow: string, heading: string, bodyHtml: string, footnote: string) {
  const link = 'color:#7A5F10;text-decoration:none'
  return `<!doctype html>
<html>
<body style="margin:0;padding:24px 12px;background:#FEFCF7">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td align="center" style="padding:0 0 4px"><a href="${SITE_URL}"><img src="${LOGO_URL}" width="72" height="72" alt="Eden Chineze" style="display:block;border:0"></a></td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid #FAEDB3;border-radius:16px;border-collapse:separate">
<tr><td style="background:#1A1A1A;padding:28px 32px;border-radius:15px 15px 0 0">
<p style="margin:0 0 8px;color:#E8C547;font:11px Arial,Helvetica,sans-serif;letter-spacing:3px;text-transform:uppercase">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;color:#FFFFFF;font:bold 24px Georgia,'Times New Roman',serif">${escapeHtml(heading)}</h1>
</td></tr>
<tr><td style="padding:28px 32px 12px;color:#1A1A1A;font:15px/1.6 Arial,Helvetica,sans-serif">${bodyHtml}</td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td align="center" style="padding:24px 32px 8px;color:#6B6455;font:12px/1.6 Arial,Helvetica,sans-serif">
<strong style="color:#1A1A1A">Eden Chineze</strong><br>
<a href="${SITE_URL}" style="${link}">${escapeHtml(SITE_HOST)}</a> &middot; <a href="mailto:${SITE_INBOX}" style="${link}">${SITE_INBOX}</a><br><br>
${escapeHtml(footnote)}
</td></tr>
</table>
</td></tr></table>
</body>
</html>`
}
