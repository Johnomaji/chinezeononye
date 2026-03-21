'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { BlogMeta } from '@/lib/types'

export default function AdminBlogMetaPage() {
  const router = useRouter()
  const [meta, setMeta] = useState<BlogMeta | null>(null)
  const [savedMeta, setSavedMeta] = useState<BlogMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [newTag, setNewTag] = useState('')

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
      setSavedMeta(data)
    } catch {
      toast.error('Failed to load blog settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMeta() }, [])

  const handleAddCategory = () => {
    if (!meta) return
    const value = newCategory.trim()
    if (!value) return
    if (meta.categories.includes(value)) {
      toast.error('Category already exists')
      return
    }
    setMeta({ ...meta, categories: [...meta.categories, value] })
    setNewCategory('')
  }

  const handleAddTag = () => {
    if (!meta) return
    const value = newTag.trim()
    if (!value) return
    if (meta.tags.includes(value)) {
      toast.error('Tag already exists')
      return
    }
    setMeta({ ...meta, tags: [...meta.tags, value] })
    setNewTag('')
  }

  const handleRemoveCategory = (value: string) => {
    if (!meta) return
    setMeta({ ...meta, categories: meta.categories.filter(c => c !== value) })
  }

  const handleRemoveTag = (value: string) => {
    if (!meta) return
    setMeta({ ...meta, tags: meta.tags.filter(t => t !== value) })
  }

  const handleSave = async () => {
    if (!meta) return
    setSaving(true)
    try {
      const res = await fetch('/api/blog/meta', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meta),
      })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        toast.success('Blog settings saved!')
        setSavedMeta(meta)
      } else {
        toast.error('Failed to save')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-white/5 rounded-xl animate-pulse w-48" />
        <div className="h-64 bg-[#1A1A1A] rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!meta) return null
  const hasChanges = JSON.stringify(meta) !== JSON.stringify(savedMeta)

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-white">Blog Categories & Tags</h1>
        <p className="text-white/40 text-sm mt-1">Manage the options available when creating posts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6">
          <h2 className="text-white font-medium mb-4">Categories</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="Add category"
              className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/20"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {meta.categories.map(c => (
              <span key={c} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 text-white/80 text-xs rounded-full border border-gold-500/20">
                {c}
                <button onClick={() => handleRemoveCategory(c)} className="text-white/40 hover:text-white">
                  âœ•
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6">
          <h2 className="text-white font-medium mb-4">Tags</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              placeholder="Add tag"
              className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/20"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map(t => (
              <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 text-white/80 text-xs rounded-full border border-gold-500/20">
                {t}
                <button onClick={() => handleRemoveTag(t)} className="text-white/40 hover:text-white">
                  âœ•
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-3 bg-gold-gradient text-charcoal font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 disabled:opacity-70"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={() => { if (savedMeta) setMeta(savedMeta) }}
          disabled={!hasChanges}
          className="px-5 py-3 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          Revert Changes
        </button>
      </div>
    </div>
  )
}
