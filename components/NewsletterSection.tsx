'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Welcome to the community! Check your email.')
        setEmail('')
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // return (
  //   <section className="py-20 bg-charcoal relative overflow-hidden">
      
  //     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,162,39,0.08)_0%,_transparent_70%)]" />
  //     <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
  //     <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full translate-x-1/2 translate-y-1/2" />

  //     <div className="relative max-w-3xl mx-auto px-6 text-center">
  //       <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
  //         <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
  //         <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Weekly Wisdom</span>
  //       </div>
  //       <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
  //         Join the <span className="gold-text">Inner Circle</span>
  //       </h2>
  //       <p className="text-white/60 text-lg mb-10 leading-relaxed">
  //         Get weekly insights on teaching, mentorship, and living with purpose — delivered straight to your inbox. No fluff, just gold.
  //       </p>
  //       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           placeholder="Your email address"
  //           required
  //           className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-400 transition-colors text-sm"
  //         />
  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="px-7 py-3.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
  //         >
  //           {loading ? 'Joining...' : 'Join Free'}
  //         </button>
  //       </form>
  //       <p className="text-white/30 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
  //     </div>
  //   </section>
  // )
}
