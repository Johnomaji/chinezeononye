'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface UploadItem {
  name: string
  url: string
  size: number
  updatedAt: string
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export default function AdminMediaPage() {
  const router = useRouter()
  const [items, setItems] = useState<UploadItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 12

  const fetchUploads = async () => {
    try {
      const res = await fetch('/api/uploads')
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setItems(data)
    } catch {
      toast.error('Failed to load uploads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUploads() }, [])

  useEffect(() => {
    setPage(1)
  }, [query])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(item => item.name.toLowerCase().includes(q))
  }, [items, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  useEffect(() => {
    setPage(p => Math.min(p, totalPages))
  }, [totalPages])

  const handleDelete = async (name: string) => {
    if (!confirm('Delete this file? This cannot be undone.')) return
    setDeleting(name)
    try {
      const res = await fetch(`/api/uploads/${encodeURIComponent(name)}`, { method: 'DELETE' })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        setItems(prev => prev.filter(item => item.name !== name))
        toast.success('File deleted')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to delete file')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white">Media Library</h1>
          <p className="text-white/40 text-sm mt-1">
            {filtered.length} shown - {items.length} total
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by file name..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/30"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#1A1A1A] rounded-2xl h-40 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">No uploads yet</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">No uploads match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paged.map(item => (
            <div key={item.name} className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl overflow-hidden">
              <div className="relative w-full h-32 bg-black/20">
                <Image src={item.url} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-3 space-y-2">
                <p className="text-white text-xs truncate" title={item.name}>{item.name}</p>
                <div className="flex items-center justify-between text-white/40 text-[11px]">
                  <span>{formatBytes(item.size)}</span>
                  <span>{new Date(item.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <button
                  onClick={() => handleDelete(item.name)}
                  disabled={deleting === item.name}
                  className="w-full px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {deleting === item.name ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > pageSize && (
        <div className="flex items-center justify-between">
          <p className="text-white/40 text-xs">
            Page {safePage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 text-xs text-white/60 border border-white/20 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 text-xs text-white/60 border border-white/20 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
