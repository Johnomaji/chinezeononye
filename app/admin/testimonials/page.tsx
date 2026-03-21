'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Testimonial } from '@/lib/types'
import ImageUploadField from '@/components/admin/ImageUploadField'

const emptyForm = {
  name: '',
  role: '',
  company: '',
  content: '',
  image: '',
  rating: 5,
  featured: false,
}

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [editSnapshot, setEditSnapshot] = useState<typeof emptyForm | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials')
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setTestimonials(data)
    } catch {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTestimonials() }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id)
    const nextForm = {
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      image: t.image,
      rating: t.rating,
      featured: t.featured,
    }
    setForm(nextForm)
    setEditSnapshot(nextForm)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.content) {
      toast.error('Name and testimonial content are required.')
      return
    }
    setSaving(true)
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        toast.success(editingId ? 'Testimonial updated!' : 'Testimonial added!')
        setShowForm(false)
        setEditingId(null)
        setForm(emptyForm)
        setEditSnapshot(null)
        fetchTestimonials()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to save')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleFeatured = async (t: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !t.featured }),
      })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        toast.success(t.featured ? 'Removed from featured' : 'Added to featured!')
        fetchTestimonials()
      }
    } catch {
      toast.error('Failed to update')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        toast.success('Testimonial deleted')
        fetchTestimonials()
      }
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white">Testimonials</h1>
          <p className="text-white/40 text-sm mt-1">{testimonials.length} total</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setForm(emptyForm)
          }}
          className="px-5 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#1A1A1A] border border-gold-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-medium">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm) }}
              className="text-white/40 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Name <span className="text-gold-400">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Role</label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="CEO, Teacher, etc."
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Company</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Rating (1–5)</label>
                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  min={1}
                  max={5}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
            </div>
            <ImageUploadField
              label="Photo"
              value={form.image}
              onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
              aspect={1}
              helper="Square images look best for testimonials."
              onUnauthorized={() => router.push('/admin/login')}
            />
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Testimonial <span className="text-gold-400">*</span></label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={4}
                placeholder="What did they say about working with Chineze?"
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none placeholder:text-white/20"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${form.featured ? 'bg-gold-400' : 'bg-white/20'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? 'left-5' : 'left-1'}`} />
                </div>
              </div>
              <span className="text-white/70 text-sm">Featured (show on homepage)</span>
            </label>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-xl disabled:opacity-70"
              >
                {saving ? 'Saving...' : (editingId ? 'Save Changes' : 'Add Testimonial')}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { if (editSnapshot) setForm(editSnapshot) }}
                  className="px-6 py-2.5 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-colors"
                >
                  Revert
                </button>
              )}
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); setEditSnapshot(null) }}
                className="px-6 py-2.5 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-[#1A1A1A] rounded-2xl h-24 animate-pulse" />)}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">No testimonials yet. Add your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map(t => (
            <div key={t.id} className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-5 flex items-start gap-4 hover:border-gold-500/30 transition-all duration-200">
              {t.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-500/30 shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-white font-medium">{t.name}</p>
                  {t.featured && (
                    <span className="text-xs px-2 py-0.5 bg-gold-500/20 text-gold-400 rounded-full">Featured</span>
                  )}
                </div>
                <p className="text-white/40 text-xs mb-2">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                <p className="text-white/60 text-sm line-clamp-2">"{t.content}"</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleFeatured(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    t.featured
                      ? 'bg-gold-500/20 text-gold-400 hover:bg-gold-500/30'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {t.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button
                  onClick={() => handleEdit(t)}
                  className="px-3 py-1.5 text-xs text-gold-400 border border-gold-500/30 rounded-lg hover:bg-gold-500/10 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  disabled={deleting === t.id}
                  className="px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {deleting === t.id ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
