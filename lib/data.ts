import fs from 'fs'
import path from 'path'
import { get, put } from '@vercel/blob'
import { assertBlobConfigured, blobConfigured, savesToBlob } from './storage'
import { BlogPost, Testimonial, SiteSettings, ContactMessage, BlogMeta } from './types'

const dataDir = path.join(process.cwd(), 'data')

// On Vercel, saved content lives in the Blob store as data/<file>. Until a file has
// been saved there once, the copy in /data is read instead, so the content shipped
// with the site is the starting point.
const BLOB_PREFIX = 'data/'

function readFile<T>(filename: string, empty: T): T {
  const filePath = path.join(dataDir, filename)
  if (!fs.existsSync(filePath)) return empty
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
}

// Reads go straight to storage unless `cached` is set: a stale copy read before a
// save would be written back over newer changes. Cached copies are at most a
// minute old (see cacheControlMaxAge below).
async function readJSON<T>(filename: string, empty: T, { cached = false } = {}): Promise<T> {
  if (savesToBlob() && blobConfigured()) {
    const result = await get(BLOB_PREFIX + filename, { access: 'private', useCache: cached })
    if (result?.statusCode === 200) return JSON.parse(await new Response(result.stream).text()) as T
  }
  return readFile(filename, empty)
}

async function writeJSON<T>(filename: string, data: T): Promise<void> {
  const json = JSON.stringify(data, null, 2)
  if (savesToBlob()) {
    assertBlobConfigured()
    await put(BLOB_PREFIX + filename, json, {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    })
    return
  }
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  fs.writeFileSync(path.join(dataDir, filename), json)
}

// Blog
export const getBlogs = () => readJSON<BlogPost[]>('blogs.json', [])
export const getBlog = async (id: string): Promise<BlogPost | undefined> => (await getBlogs()).find(b => b.id === id)
export const getBlogBySlug = async (slug: string): Promise<BlogPost | undefined> =>
  (await getBlogs()).find(b => b.slug === slug)
export const saveBlogs = (blogs: BlogPost[]) => writeJSON('blogs.json', blogs)

export const getBlogMeta = async (): Promise<BlogMeta> => {
  const defaults: BlogMeta = {
    categories: ['Mentorship', 'Education', 'Public Speaking', 'Leadership', 'Personal Development', 'Motivation'],
    tags: [],
  }
  const stored = await readJSON<Partial<BlogMeta>>('blog-meta.json', {})
  return {
    categories: stored.categories && stored.categories.length ? stored.categories : defaults.categories,
    tags: stored.tags || defaults.tags,
  }
}

export const updateBlogMeta = async (updates: BlogMeta): Promise<BlogMeta> => {
  const cleaned: BlogMeta = {
    categories: updates.categories.map(c => c.trim()).filter(Boolean),
    tags: updates.tags.map(t => t.trim()).filter(Boolean),
  }
  await writeJSON('blog-meta.json', cleaned)
  return cleaned
}

export const createBlog = async (blog: BlogPost): Promise<BlogPost> => {
  const blogs = await getBlogs()
  blogs.unshift(blog)
  await saveBlogs(blogs)
  return blog
}

export const updateBlog = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  const blogs = await getBlogs()
  const idx = blogs.findIndex(b => b.id === id)
  if (idx === -1) return null
  blogs[idx] = { ...blogs[idx], ...updates, updatedAt: new Date().toISOString() }
  await saveBlogs(blogs)
  return blogs[idx]
}

export const deleteBlog = async (id: string): Promise<boolean> => {
  const blogs = await getBlogs()
  const filtered = blogs.filter(b => b.id !== id)
  if (filtered.length === blogs.length) return false
  await saveBlogs(filtered)
  return true
}

// Testimonials
export const getTestimonials = () => readJSON<Testimonial[]>('testimonials.json', [])
export const saveTestimonials = (t: Testimonial[]) => writeJSON('testimonials.json', t)

export const createTestimonial = async (t: Testimonial): Promise<Testimonial> => {
  const testimonials = await getTestimonials()
  testimonials.unshift(t)
  await saveTestimonials(testimonials)
  return t
}

export const updateTestimonial = async (id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> => {
  const testimonials = await getTestimonials()
  const idx = testimonials.findIndex(t => t.id === id)
  if (idx === -1) return null
  testimonials[idx] = { ...testimonials[idx], ...updates }
  await saveTestimonials(testimonials)
  return testimonials[idx]
}

export const deleteTestimonial = async (id: string): Promise<boolean> => {
  const testimonials = await getTestimonials()
  const filtered = testimonials.filter(t => t.id !== id)
  if (filtered.length === testimonials.length) return false
  await saveTestimonials(filtered)
  return true
}

// Settings
export const getSettings = async (options?: { cached?: boolean }): Promise<SiteSettings> => {
  const defaults: SiteSettings = {
    maintenanceMode: false,
    maintenanceMessage: 'We are currently undergoing scheduled maintenance. We will be back shortly.',
    maintenanceEstimate: 'Back in a few hours',
    siteTitle: 'Eden Chineze',
    siteDescription: 'Equipper · Writer · Speaker · Champion of the Boy',
  }
  const stored = await readJSON<Partial<SiteSettings>>('settings.json', {}, options)
  return { ...defaults, ...stored }
}

export const updateSettings = async (updates: Partial<SiteSettings>): Promise<SiteSettings> => {
  const current = await getSettings()
  const updated = { ...current, ...updates }
  await writeJSON('settings.json', updated)
  return updated
}

// Contact Messages
export const getMessages = () => readJSON<ContactMessage[]>('messages.json', [])
export const saveMessage = async (msg: ContactMessage): Promise<ContactMessage> => {
  const messages = await getMessages()
  messages.unshift(msg)
  await writeJSON('messages.json', messages)
  return msg
}
export const updateMessage = async (id: string, updates: Partial<ContactMessage>): Promise<ContactMessage | null> => {
  const messages = await getMessages()
  const idx = messages.findIndex(m => m.id === id)
  if (idx === -1) return null
  messages[idx] = { ...messages[idx], ...updates }
  await writeJSON('messages.json', messages)
  return messages[idx]
}
export const markMessageRead = async (id: string): Promise<boolean> => {
  const messages = await getMessages()
  const idx = messages.findIndex(m => m.id === id)
  if (idx === -1) return false
  messages[idx].read = true
  await writeJSON('messages.json', messages)
  return true
}
export const deleteMessage = async (id: string): Promise<boolean> => {
  const messages = await getMessages()
  const filtered = messages.filter(m => m.id !== id)
  if (filtered.length === messages.length) return false
  await writeJSON('messages.json', filtered)
  return true
}
