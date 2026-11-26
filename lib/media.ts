// Images uploaded from the admin panel on Vercel are kept in the private Blob store
// as uploads/<name> and served publicly by app/media/[name]/route.ts.

export const MEDIA_PREFIX = 'uploads/'

export const mediaUrl = (name: string) => `/media/${name}`

/** Upload names are generated server-side; anything else is refused. */
export const isMediaName = (name: string) => /^[a-zA-Z0-9._-]+\.(jpe?g|png|webp|gif)$/i.test(name)
