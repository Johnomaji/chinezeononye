import Link from 'next/link'
import { getBlogs, getTestimonials, getMessages, getSettings } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const blogs = getBlogs()
  const testimonials = getTestimonials()
  const messages = getMessages()
  const settings = getSettings()

  const publishedBlogs = blogs.filter(b => b.published).length
  const unreadMessages = messages.filter(m => !m.read).length
  const featuredTestimonials = testimonials.filter(t => t.featured).length

  const stats = [
    {
      label: 'Total Blog Posts',
      value: blogs.length,
      sub: `${publishedBlogs} published`,
      href: '/admin/blog',
      color: 'from-gold-500 to-gold-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Testimonials',
      value: testimonials.length,
      sub: `${featuredTestimonials} featured`,
      href: '/admin/testimonials',
      color: 'from-gold-400 to-gold-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      label: 'Messages',
      value: messages.length,
      sub: `${unreadMessages} unread`,
      href: '/admin/messages',
      color: 'from-gold-600 to-gold-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Site Status',
      value: settings.maintenanceMode ? 'Maintenance' : 'Live',
      sub: settings.maintenanceMode ? 'Site is hidden' : 'Site is public',
      href: '/admin/settings',
      color: settings.maintenanceMode ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-playfair text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 mt-1 text-sm">Welcome back. Here's an overview of your site.</p>
      </div>

      {/* Maintenance Warning */}
      {settings.maintenanceMode && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-red-400 font-semibold text-sm">Maintenance Mode Active</p>
            <p className="text-white/40 text-xs">Your site is currently hidden from visitors.</p>
          </div>
          <Link href="/admin/settings" className="ml-auto px-4 py-1.5 bg-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/30 transition-colors">
            Manage
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="block bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-200 group"
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
              {stat.icon}
            </div>
            <p className="text-white/50 text-xs mb-1">{stat.label}</p>
            <p className="font-playfair text-2xl font-bold text-white group-hover:text-gold-400 transition-colors">
              {stat.value}
            </p>
            <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6">
          <h2 className="font-playfair text-lg font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Write New Blog Post', href: '/admin/blog/new', desc: 'Create and publish a new article' },
              { label: 'Blog Categories & Tags', href: '/admin/blog/meta', desc: 'Manage blog categories and tags' },
              { label: 'Add Testimonial', href: '/admin/testimonials', desc: 'Add a new client testimonial' },
              { label: 'Review Messages', href: '/admin/messages', desc: 'Read and manage contact inquiries' },
              { label: 'Toggle Maintenance', href: '/admin/settings', desc: 'Enable or disable maintenance mode' },
            ].map(action => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-gold-500/10 transition-colors group"
              >
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-gold-400 transition-colors">{action.label}</p>
                  <p className="text-white/30 text-xs mt-0.5">{action.desc}</p>
                </div>
                <svg className="w-4 h-4 text-white/30 group-hover:text-gold-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-playfair text-lg font-bold text-white">Recent Messages</h2>
            <Link href="/admin/messages" className="text-gold-400 text-sm hover:text-gold-300 transition-colors">
              View all â†’
            </Link>
          </div>
          {messages.length === 0 ? (
            <div className="text-center py-8 text-white/30 text-sm">
              No messages yet
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map(msg => (
                <div key={msg.id} className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-sm font-medium">{msg.name}</p>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-gold-400" />
                    )}
                  </div>
                  <p className="text-white/40 text-xs">{msg.subject || 'No subject'}</p>
                  <p className="text-white/30 text-xs mt-1 line-clamp-1">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-lg font-bold text-white">Recent Blog Posts</h2>
          <Link href="/admin/blog" className="text-gold-400 text-sm hover:text-gold-300 transition-colors">
            View all →
          </Link>
        </div>
        {blogs.length === 0 ? (
          <div className="text-center py-8 text-white/30 text-sm">No blog posts yet</div>
        ) : (
          <div className="space-y-3">
            {blogs.slice(0, 5).map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-medium truncate">{post.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-white/30 text-xs">{post.category}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="ml-4 px-3 py-1.5 text-xs text-gold-400 border border-gold-500/30 rounded-lg hover:bg-gold-500/10 transition-colors shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
