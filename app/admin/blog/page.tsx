'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { BlogPost } from '@/lib/types'

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setPosts(data)
    } catch {
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  useEffect(() => {
    setPage(1)
  }, [query, statusFilter])

  const handleTogglePublish = async (post: BlogPost) => {
    setToggling(post.id)
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        toast.success(post.published ? 'Post unpublished' : 'Post published!')
        fetchPosts()
      } else {
        toast.error('Failed to update post')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setToggling(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        toast.success('Post deleted')
        fetchPosts()
      } else {
        toast.error('Failed to delete post')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setDeleting(null)
    }
  }

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = posts.filter(post => {
    if (statusFilter === 'published' && !post.published) return false
    if (statusFilter === 'draft' && post.published) return false
    if (!normalizedQuery) return true
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      post.tags?.join(' ') || '',
    ].join(' ').toLowerCase()
    return haystack.includes(normalizedQuery)
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  useEffect(() => {
    setPage(p => Math.min(p, totalPages))
  }, [totalPages])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/40 text-sm mt-1">
            {filtered.length} shown - {posts.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/blog/meta"
            className="px-4 py-2.5 text-xs text-white/70 border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
          >
            Manage Categories & Tags
          </Link>
          <Link
            href="/admin/blog/new"
            className="px-5 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300"
          >
            + New Post
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, excerpt, category, or tag..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/30"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#1A1A1A] rounded-2xl h-20 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40 mb-4">No blog posts yet</p>
          <Link href="/admin/blog/new" className="px-5 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-xl">
            Create Your First Post
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">No posts match your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paged.map(post => (
            <div
              key={post.id}
              className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-5 flex items-start gap-4 hover:border-gold-500/30 transition-all duration-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-white font-medium truncate">{post.title}</h3>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-white/40 text-xs">{post.category}</span>
                  <span className="text-white/30 text-xs">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-white/30 text-xs">{post.readTime} min read</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleTogglePublish(post)}
                  disabled={toggling === post.id}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    post.published
                      ? 'bg-white/10 text-white/60 hover:bg-white/20'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  } disabled:opacity-50`}
                >
                  {toggling === post.id ? '...' : post.published ? 'Unpublish' : 'Publish'}
                </button>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="px-3 py-1.5 text-xs text-gold-400 border border-gold-500/30 rounded-lg hover:bg-gold-500/10 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deleting === post.id}
                  className="px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {deleting === post.id ? '...' : 'Delete'}
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
