import { get, list, put } from '@vercel/blob'

// Server-only: reads and writes the private Vercel Blob store connected to the
// project. On Vercel the SDK signs in with the BLOB_STORE_ID and VERCEL_OIDC_TOKEN
// that connecting the store adds; locally it needs BLOB_READ_WRITE_TOKEN.
//
// Each issued certificate is kept at certificates/<payment reference>/<time>.<ext>.
// The copy is saved only after the email has gone, so it is also the record of
// who has been sent one.

const ROOT = 'certificates/'

// Vercel rejects function request bodies over 4.5MB; this leaves room for the form encoding.
export const MAX_CERTIFICATE_BYTES = 4 * 1024 * 1024

export type CertificateFile = { bytes: Buffer; ext: string; contentType: string }

export type IssuedCertificate = { pathname: string; issuedAt: string }

const TYPES = [
  { ext: 'pdf', contentType: 'application/pdf', magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  { ext: 'png', contentType: 'image/png', magic: [0x89, 0x50, 0x4e, 0x47] },
  { ext: 'jpg', contentType: 'image/jpeg', magic: [0xff, 0xd8, 0xff] },
]

/** The upload as a certificate, typed by its contents rather than its name, or null if it isn't a PDF, PNG or JPG. */
export function certificateFile(bytes: Buffer): CertificateFile | null {
  const type = TYPES.find(t => t.magic.every((byte, i) => bytes[i] === byte))
  return type ? { bytes, ext: type.ext, contentType: type.contentType } : null
}

export const certificateStorageConfigured = () =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)

/** The most recent certificate issued for each payment reference under `prefix`. */
async function latestUnder(prefix: string): Promise<Map<string, IssuedCertificate>> {
  const latest = new Map<string, IssuedCertificate>()
  let cursor: string | undefined
  do {
    const page = await list({ prefix, cursor })
    for (const blob of page.blobs) {
      const reference = blob.pathname.slice(ROOT.length).split('/')[0]
      const issuedAt = blob.uploadedAt.toISOString()
      const current = latest.get(reference)
      if (!current || current.issuedAt < issuedAt) latest.set(reference, { pathname: blob.pathname, issuedAt })
    }
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  return latest
}

/** The most recent certificate issued for each payment reference. */
export const issuedCertificates = () => latestUnder(ROOT)

export async function latestCertificate(reference: string): Promise<IssuedCertificate | null> {
  return (await latestUnder(`${ROOT}${reference}/`)).get(reference) ?? null
}

export async function saveCertificate(reference: string, file: CertificateFile): Promise<IssuedCertificate> {
  const issuedAt = new Date()
  const { pathname } = await put(`${ROOT}${reference}/${issuedAt.getTime()}.${file.ext}`, file.bytes, {
    access: 'private',
    contentType: file.contentType,
  })
  return { pathname, issuedAt: issuedAt.toISOString() }
}

/** A saved certificate's contents, or null if it is gone. */
export async function readCertificate(pathname: string) {
  const result = await get(pathname, { access: 'private' })
  return result?.statusCode === 200 ? result : null
}
