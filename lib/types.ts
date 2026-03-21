export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
  readTime: number
}

export interface BlogMeta {
  categories: string[]
  tags: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image: string
  rating: number
  featured: boolean
  createdAt: string
}

export interface SiteSettings {
  maintenanceMode: boolean
  maintenanceMessage: string
  maintenanceEstimate: string
  siteTitle: string
  siteDescription: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}
