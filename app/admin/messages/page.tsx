'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ContactMessage } from '@/lib/types'

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact')
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setMessages(data)
    } catch {
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  const toggleRead = async (msg: ContactMessage) => {
    setUpdatingId(msg.id)
    try {
      const res = await fetch(`/api/contact/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !msg.read }),
      })
      if (res.ok) {
        const updated = await res.json()
        setMessages(prev => prev.map(m => m.id === msg.id ? updated : m))
      } else {
        toast.error('Failed to update message')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id))
        toast.success('Message deleted')
      } else {
        toast.error('Failed to delete message')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setDeletingId(null)
    }
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white">Messages</h1>
          <p className="text-white/40 text-sm mt-1">{messages.length} total · {unread} unread</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#1A1A1A] rounded-2xl h-24 animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`bg-[#1A1A1A] border rounded-2xl p-5 flex gap-4 items-start transition-all duration-200 ${
                msg.read ? 'border-gold-500/10' : 'border-gold-500/40'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium truncate">{msg.name}</p>
                  {!msg.read && <span className="w-2 h-2 rounded-full bg-gold-400" />}
                </div>
                <p className="text-white/40 text-xs">{msg.email}</p>
                <p className="text-white/50 text-xs mt-1">
                  {msg.subject || 'No subject'} · {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="text-white/70 text-sm mt-3 whitespace-pre-line">{msg.message}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => toggleRead(msg)}
                  disabled={updatingId === msg.id}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    msg.read
                      ? 'bg-white/10 text-white/60 hover:bg-white/20'
                      : 'bg-gold-500/20 text-gold-400 hover:bg-gold-500/30'
                  } disabled:opacity-50`}
                >
                  {updatingId === msg.id ? '...' : msg.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={deletingId === msg.id}
                  className="px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {deletingId === msg.id ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
