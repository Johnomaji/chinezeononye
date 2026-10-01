import Image from 'next/image'
import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import { getTestimonials } from '@/lib/data'
import type { Testimonial } from '@/lib/types'

export const metadata = {
  title: 'Testimonials | Chineze Eden',
  description: 'Read what clients, students, and event organizers say about working with Chineze Eden.',
}

export const revalidate = 60

/* ─── Skeleton shown while the real testimonials are being gathered ─── */

function Shimmer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(201,162,39,0.12)_50%,transparent_100%)] bg-[length:200%_100%] animate-shimmer"
    />
  )
}

function SkeletonQuote({ lines = 4, wide = false }: { lines?: number; wide?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-charcoal/10 bg-white p-8 ${
        wide ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="animate-pulse">
        <div className="flex gap-1.5 mb-7">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-sm bg-charcoal/10" />
          ))}
        </div>

        <div className="space-y-3.5">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className="h-3 rounded-full bg-charcoal/10"
              style={{ width: i === lines - 1 ? '58%' : i % 3 === 1 ? '92%' : '100%' }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 mt-9 pt-6 border-t border-charcoal/10">
          <div className="w-12 h-12 rounded-full bg-charcoal/10 shrink-0" />
          <div className="space-y-2.5">
            <div className="h-3 w-32 rounded-full bg-charcoal/10" />
            <div className="h-2.5 w-24 rounded-full bg-charcoal/[0.06]" />
          </div>
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

function PendingState() {
  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-playfair font-bold text-charcoal leading-none"
        style={{ fontSize: '18vw', opacity: 0.03 }}
      >
        SOON
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 animate-on-scroll">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">In Gathering</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-charcoal leading-tight">
              The words are<br />
              <span className="text-gold-600">on their way.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-6 flex items-end">
            <p className="text-charcoal/55 text-lg leading-relaxed max-w-lg">
              Rather than fill this page with placeholders, we are collecting the real words of the
              people Chineze has worked with — the schools, the boys, the organisations, and the
              rooms she has stood in. They will land here shortly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-hidden>
          <SkeletonQuote lines={6} wide />
          <SkeletonQuote lines={4} />
          <SkeletonQuote lines={4} />
          <SkeletonQuote lines={5} />
          <SkeletonQuote lines={3} />
        </div>

        <div className="flex items-center gap-4 mt-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-charcoal/10" />
          <p className="text-charcoal/35 text-xs tracking-[0.3em] uppercase shrink-0">
            Real stories, coming soon
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-charcoal/10" />
        </div>
      </div>
    </section>
  )
}

/* ─── Real testimonials ─── */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold-500' : 'opacity-20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ t, size }: { t: Testimonial; size: number }) {
  const initials = t.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')

  return (
    <div
      className="relative rounded-full overflow-hidden border border-gold-500/40 shrink-0 bg-gold-500/10 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {t.image ? (
        <Image src={t.image} alt={t.name} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        <span className="font-playfair font-bold text-gold-500" style={{ fontSize: size * 0.36 }}>
          {initials}
        </span>
      )}
    </div>
  )
}

function FeaturedQuote({ t, index }: { t: Testimonial; index: number }) {
  return (
    <div className="animate-on-scroll border-t border-white/10 group hover:bg-white/[0.02] transition-colors duration-500">
      <div className="py-14 md:py-16 grid grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="col-span-2 md:col-span-1">
          <span className="font-playfair text-4xl md:text-5xl font-bold text-gold-500/25 group-hover:text-gold-500/50 transition-colors duration-300 leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="col-span-10 md:col-span-8">
          <Stars rating={t.rating} />
          <blockquote
            className="font-playfair text-white/85 group-hover:text-white leading-snug mt-6 transition-colors duration-300"
            style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2rem)' }}
          >
            &ldquo;{t.content}&rdquo;
          </blockquote>
        </div>

        <div className="col-span-12 md:col-span-3 flex md:flex-col gap-4 md:gap-3 items-center md:items-end md:text-right">
          <Avatar t={t} size={56} />
          <div>
            <p className="font-semibold text-white text-sm">{t.name}</p>
            <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
              {t.role}
              {t.company ? `, ${t.company}` : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <div className="animate-on-scroll h-full bg-white border border-charcoal/10 rounded-2xl p-8 flex flex-col hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300">
      <Stars rating={t.rating} />
      <p className="text-charcoal/70 leading-relaxed mt-5 mb-8 flex-1">&ldquo;{t.content}&rdquo;</p>
      <div className="flex items-center gap-4 pt-6 border-t border-charcoal/10">
        <Avatar t={t} size={44} />
        <div>
          <p className="font-semibold text-charcoal text-sm">{t.name}</p>
          <p className="text-charcoal/45 text-xs mt-0.5">
            {t.role}
            {t.company ? `, ${t.company}` : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsPage() {
  const all = getTestimonials()
  const featured = all.filter((t) => t.featured)
  const others = all.filter((t) => !t.featured)
  const hasAny = all.length > 0

  const avgRating = hasAny
    ? (all.reduce((sum, t) => sum + (t.rating || 0), 0) / all.length).toFixed(1)
    : ''

  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex flex-col justify-center bg-[#0A0A0A] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
        >
          <span
            className="font-playfair font-bold text-white leading-none"
            style={{ fontSize: 'clamp(7rem, 26vw, 22rem)', opacity: 0.03, letterSpacing: '-0.04em' }}
          >
            VOICES
          </span>
        </div>

        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute top-1/3 left-0 w-56 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
        <div className="absolute top-2/3 left-0 w-36 h-px bg-gradient-to-r from-gold-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
          <div className="flex items-center gap-4 mb-12 animate-on-scroll">
            <div className="w-16 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium">Testimonials</span>
          </div>

          <div className="animate-on-scroll">
            <h1
              className="font-playfair font-bold text-white leading-[0.9] mb-10"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
            >
              Stories<br />
              of <em className="not-italic text-gold-400">Change</em>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:items-end animate-on-scroll">
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              The measure of the work is not what is said about it — it is what changed in the
              people who lived it.
            </p>
            {hasAny && (
              <div className="flex gap-10 lg:ml-auto shrink-0">
                {[
                  { value: String(all.length), label: 'Voices' },
                  { value: avgRating, label: 'Average Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-playfair text-4xl font-bold text-gold-400">{stat.value}</div>
                    <div className="text-white/40 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 bg-gradient-to-b from-gold-400/60 to-transparent" />
        </div>
      </section>

      {/* ─── BANNER ─── */}
      <section className="relative py-14 bg-gold-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-1 h-14 bg-charcoal/30 rounded-full shrink-0 hidden md:block" />
          <p className="font-playfair text-2xl md:text-4xl font-bold text-charcoal text-center md:text-left leading-snug">
            &ldquo;The UNSTOPPABLE You is the GROWING You.&rdquo;
          </p>
          <div className="md:ml-auto shrink-0">
            <span className="text-charcoal/50 text-sm tracking-widest uppercase">Chineze Eden</span>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      {!hasAny && <PendingState />}

      {featured.length > 0 && (
        <section className="py-28 bg-[#0D0D0D] relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 font-playfair font-bold text-white leading-none"
            style={{ fontSize: '20vw', opacity: 0.025 }}
          >
            SAID
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-4 animate-on-scroll">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Featured</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight mb-14 animate-on-scroll">
              In their own<br />
              <span className="text-gold-400">words.</span>
            </h2>

            {featured.map((t, i) => (
              <FeaturedQuote key={t.id} t={t} index={i} />
            ))}
            <div className="border-t border-white/10" />
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-4 animate-on-scroll">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">More Voices</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-14 animate-on-scroll">
              And many more.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {others.map((t) => (
                <QuoteCard key={t.id} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-gradient" />
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Your Turn</span>
              </div>
              <h2
                className="font-playfair font-bold text-white leading-tight mb-8"
                style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
              >
                Write your<br />
                <span className="text-gold-400">own</span> story.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Structured personal growth is not an accident. It is chosen, and then it is built —
                one deliberate step at a time.
              </p>
            </div>

            <div className="animate-on-scroll-right space-y-5">
              {[
                { label: 'Book a speaking engagement', desc: 'Keynotes, workshops, and masterclasses for your event or organisation.' },
                { label: 'Bring the work to your school', desc: 'Sessions and bootcamps that equip students and staff alike.' },
                { label: 'Start a conversation', desc: 'Tell Chineze what you are building and where you want to go.' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-5 p-6 border border-white/8 rounded-2xl hover:border-gold-500/30 hover:bg-white/[0.03] transition-all duration-300 group"
                >
                  <div className="w-6 h-6 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold-500/20 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1 group-hover:text-gold-300 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/speaking"
                  className="px-8 py-4 border border-white/15 text-white font-medium rounded-full hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
                >
                  Speaking Topics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
