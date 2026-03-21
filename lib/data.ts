import fs from 'fs'
import path from 'path'
import { BlogPost, Testimonial, SiteSettings, ContactMessage, BlogMeta } from './types'

const dataDir = path.join(process.cwd(), 'data')

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  if (!fs.existsSync(filePath)) {
    return (filename.endsWith('settings.json') ? {} : []) as T
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

function writeJSON<T>(filename: string, data: T): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2))
}

// Blog
export const getBlogs = (): BlogPost[] => readJSON<BlogPost[]>('blogs.json')
export const getBlog = (id: string): BlogPost | undefined => getBlogs().find(b => b.id === id)
export const getBlogBySlug = (slug: string): BlogPost | undefined => getBlogs().find(b => b.slug === slug)
export const saveBlogs = (blogs: BlogPost[]) => writeJSON('blogs.json', blogs)

export const getBlogMeta = (): BlogMeta => {
  const defaults: BlogMeta = {
    categories: ['Mentorship', 'Education', 'Public Speaking', 'Leadership', 'Personal Development', 'Motivation'],
    tags: [],
  }
  const stored = readJSON<Partial<BlogMeta>>('blog-meta.json')
  return {
    categories: stored.categories && stored.categories.length ? stored.categories : defaults.categories,
    tags: stored.tags || defaults.tags,
  }
}

export const updateBlogMeta = (updates: BlogMeta): BlogMeta => {
  const cleaned: BlogMeta = {
    categories: updates.categories.map(c => c.trim()).filter(Boolean),
    tags: updates.tags.map(t => t.trim()).filter(Boolean),
  }
  writeJSON('blog-meta.json', cleaned)
  return cleaned
}

export const createBlog = (blog: BlogPost): BlogPost => {
  const blogs = getBlogs()
  blogs.unshift(blog)
  saveBlogs(blogs)
  return blog
}

export const updateBlog = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const blogs = getBlogs()
  const idx = blogs.findIndex(b => b.id === id)
  if (idx === -1) return null
  blogs[idx] = { ...blogs[idx], ...updates, updatedAt: new Date().toISOString() }
  saveBlogs(blogs)
  return blogs[idx]
}

export const deleteBlog = (id: string): boolean => {
  const blogs = getBlogs()
  const filtered = blogs.filter(b => b.id !== id)
  if (filtered.length === blogs.length) return false
  saveBlogs(filtered)
  return true
}

// Testimonials
export const getTestimonials = (): Testimonial[] => readJSON<Testimonial[]>('testimonials.json')
export const saveTestimonials = (t: Testimonial[]) => writeJSON('testimonials.json', t)

export const createTestimonial = (t: Testimonial): Testimonial => {
  const testimonials = getTestimonials()
  testimonials.unshift(t)
  saveTestimonials(testimonials)
  return t
}

export const updateTestimonial = (id: string, updates: Partial<Testimonial>): Testimonial | null => {
  const testimonials = getTestimonials()
  const idx = testimonials.findIndex(t => t.id === id)
  if (idx === -1) return null
  testimonials[idx] = { ...testimonials[idx], ...updates }
  saveTestimonials(testimonials)
  return testimonials[idx]
}

export const deleteTestimonial = (id: string): boolean => {
  const testimonials = getTestimonials()
  const filtered = testimonials.filter(t => t.id !== id)
  if (filtered.length === testimonials.length) return false
  saveTestimonials(filtered)
  return true
}

// Settings
export const getSettings = (): SiteSettings => {
  const defaults: SiteSettings = {
    maintenanceMode: false,
    maintenanceMessage: 'We are currently undergoing scheduled maintenance. We will be back shortly.',
    maintenanceEstimate: 'Back in a few hours',
    siteTitle: 'Chineze Ononye',
    siteDescription: 'Teacher | Mentor | Motivational Speaker',
  }
  const stored = readJSON<Partial<SiteSettings>>('settings.json')
  return { ...defaults, ...stored }
}

export const updateSettings = (updates: Partial<SiteSettings>): SiteSettings => {
  const current = getSettings()
  const updated = { ...current, ...updates }
  writeJSON('settings.json', updated)
  return updated
}

// Contact Messages
export const getMessages = (): ContactMessage[] => readJSON<ContactMessage[]>('messages.json')
export const saveMessage = (msg: ContactMessage): ContactMessage => {
  const messages = getMessages()
  messages.unshift(msg)
  writeJSON('messages.json', messages)
  return msg
}
export const updateMessage = (id: string, updates: Partial<ContactMessage>): ContactMessage | null => {
  const messages = getMessages()
  const idx = messages.findIndex(m => m.id === id)
  if (idx === -1) return null
  messages[idx] = { ...messages[idx], ...updates }
  writeJSON('messages.json', messages)
  return messages[idx]
}
export const markMessageRead = (id: string): boolean => {
  const messages = getMessages()
  const idx = messages.findIndex(m => m.id === id)
  if (idx === -1) return false
  messages[idx].read = true
  writeJSON('messages.json', messages)
  return true
}
export const deleteMessage = (id: string): boolean => {
  const messages = getMessages()
  const filtered = messages.filter(m => m.id !== id)
  if (filtered.length === messages.length) return false
  writeJSON('messages.json', filtered)
  return true
}
