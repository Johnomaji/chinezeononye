import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'

export const metadata = {
  title: 'Book | Chineze Eden',
  description: 'A new book from Chineze Eden — coming soon.',
}

export default function BookPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-charcoal flex items-center justify-center relative overflow-hidden px-6">

        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,162,39,0.15),rgba(255,255,255,0))]" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gold-600/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative text-center max-w-2xl mx-auto">

          {/* Book icon */}
          <div className="w-24 h-24 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Coming Soon</span>
          </div>

          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Something <span className="gold-text">Powerful</span><br />Is Being Written
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Chineze is working on something that will equip, inspire, and transform. Stay close — this page will come alive soon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Notified
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 border border-white/20 text-white/70 font-medium rounded-full hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <div className="w-2 h-2 rounded-full bg-gold-400" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>

          <p className="mt-6 text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Chineze Eden. All rights reserved.
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
