// A deployment's own files are read-only on Vercel, so anything the admin panel
// saves there (content in data/, images in uploads/) goes to the project's private
// Blob store instead: the same store that holds certificates. Locally, the files
// on disk are used.

export const savesToBlob = () => process.env.VERCEL === '1'

export const blobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)

export function assertBlobConfigured() {
  if (!blobConfigured()) {
    throw new Error('Saving needs a Vercel Blob store connected to the project (Storage > Blob).')
  }
}
