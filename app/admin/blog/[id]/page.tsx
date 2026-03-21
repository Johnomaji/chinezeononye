'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { marked } from 'marked'
import Link from 'next/link'
import { BlogPost, BlogMeta } from '@/lib/types'
import ImageUploadField from '@/components/admin/ImageUploadField'

const defaultCategories = ['Mentorship', 'Education', 'Public Speaking', 'Leadership', 'Personal Development', 'Motivation']
const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: '',
  tags: '',
  published: false,
  readTime: 5,
}

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [meta, setMeta] = useState<BlogMeta | null>(null)
  const [initialForm, setInitialForm] = useState<typeof emptyForm | null>(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`)
        if (res.status === 401) {
          toast.error('Session expired. Please sign in again.')
          router.push('/admin/login')
          return
        }
        if (!res.ok) {
          toast.error('Post not found')
          router.push('/admin/blog')
          return
        }
        const post: BlogPost = await res.json()
        const nextForm = {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          category: post.category,
          tags: post.tags.join(', '),
          published: post.published,
          readTime: post.readTime,
        }
        setForm(nextForm)
        setInitialForm(nextForm)
      } catch {
        toast.error('Failed to load post')
      } finally {
        setFetching(false)
      }
    }
    fetchPost()
  }, [id, router])

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch('/api/blog/meta')
        if (res.status === 401) {
          toast.error('Session expired. Please sign in again.')
          router.push('/admin/login')
          return
        }
        const data = await res.json()
        setMeta(data)
      } catch {
        toast.error('Failed to load blog settings')
      }
    }
    fetchMeta()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.content || !form.excerpt) {
      toast.error('Title, excerpt, and content are required.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
          readTime: Number(form.readTime),
        }),
      })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      if (res.ok) {
        toast.success('Post updated!')
        router.push('/admin/blog')
      } else {
        toast.error(data.error || 'Failed to update post')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const previewHtml = marked(form.content || '') as string
  const categories = meta?.categories?.length ? meta.categories : defaultCategories
  const tagSuggestions = meta?.tags || []

  const addTag = (tag: string) => {
    const current = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    if (current.includes(tag)) return
    setForm(prev => ({ ...prev, tags: [...current, tag].join(', ') }))
  }


  if (fetching) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-white/5 rounded-xl animate-pulse w-48" />
        <div className="h-64 bg-[#1A1A1A] rounded-2xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="text-white/40 hover:text-white text-sm flex items-center gap-1 mb-2 transition-colors"
          >
            ← Back
          </button>
          <h1 className="font-playfair text-3xl font-bold text-white">Edit Blog Post</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Title <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-gold-400 transition-colors font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Excerpt <span className="text-gold-400">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl overflow-hidden">
              <div className="flex border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'write' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-white/40 hover:text-white/70'}`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'preview' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-white/40 hover:text-white/70'}`}
                >
                  Preview
                </button>
                <div className="ml-auto flex items-center px-4 text-white/20 text-xs">
                  Markdown supported
                </div>
              </div>

              {activeTab === 'write' ? (
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={20}
                  className="w-full p-6 bg-transparent text-white/80 placeholder:text-white/20 focus:outline-none resize-none font-mono text-sm leading-relaxed"
                />
              ) : (
                <div
                  className="p-6 prose prose-invert prose-headings:font-playfair prose-headings:text-white prose-p:text-white/70 prose-strong:text-white max-w-none min-h-[400px]"
                  dangerouslySetInnerHTML={{ __html: previewHtml || '<p class="text-white/30">Nothing to preview yet...</p>' }}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-5">
              <h3 className="text-white font-medium mb-4">Publish Settings</h3>
              <label className="flex items-center gap-3 cursor-pointer mb-5">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-gold-400' : 'bg-white/20'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.published ? 'left-5' : 'left-1'}`} />
                  </div>
                </div>
                <span className="text-white/70 text-sm">{form.published ? 'Published' : 'Draft'}</span>
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => { if (initialForm) setForm(initialForm) }}
                className="w-full mt-2 py-2.5 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                Revert Changes
              </button>
            </div>

            <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-white font-medium">Post Details</h3>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs text-white/50">Category</label>
                  <Link href="/admin/blog/meta" className="text-gold-400 text-[11px] hover:text-gold-300">
                    Manage
                  </Link>
                </div>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs text-white/50">Tags (comma separated)</label>
                  <Link href="/admin/blog/meta" className="text-gold-400 text-[11px] hover:text-gold-300">
                    Manage
                  </Link>
                </div>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
                {tagSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tagSuggestions.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="px-2.5 py-1 text-xs bg-white/5 text-white/60 rounded-full border border-gold-500/10 hover:border-gold-500/30"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Read Time (minutes)</label>
                <input
                  type="number"
                  name="readTime"
                  value={form.readTime}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-5">
              <ImageUploadField
                label="Cover Image"
                value={form.coverImage}
                onChange={(url) => setForm(prev => ({ ...prev, coverImage: url }))}
                aspect={16 / 9}
                helper="This image appears on the blog listing and post header."
                onUnauthorized={() => router.push('/admin/login')}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
