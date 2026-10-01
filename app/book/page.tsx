import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Book | Chineze Eden',
  description: 'A new book from Chineze Eden — coming soon.',
  path: '/book',
})

const themes = [
  {
    title: 'Structured Personal Growth',
    desc: 'Growth is not a mood or a motivational high. It is a structure you build and then stand on — and it is the thread running through everything Chineze teaches.',
  },
  {
    title: 'The Unstoppable You',
    desc: 'The conviction that the unstoppable person is simply the growing one. Identity first, then vision, then the deliberate steps that close the distance between them.',
  },
  {
    title: 'Equipping The Wholesome Boy',
    desc: 'Wholesome men do not just happen — they are grown boys, intentionally equipped. The work of raising whole, grounded, purposeful young men.',
  },
]

export default function BookPage() {
  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#0A0A0A] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
        >
          <span
            className="font-playfair font-bold text-white leading-none"
            style={{ fontSize: 'clamp(7rem, 28vw, 24rem)', opacity: 0.03, letterSpacing: '-0.04em' }}
          >
            BOOK
          </span>
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute top-1/4 right-0 w-64 h-px bg-gradient-to-l from-gold-500/30 to-transparent" />
        <div className="absolute top-2/3 right-0 w-40 h-px bg-gradient-to-l from-gold-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-12 animate-on-scroll">
              <div className="w-16 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium">The Book</span>
            </div>

            <div className="animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">In the Writing</span>
              </div>

              <h1
                className="font-playfair font-bold text-white leading-[0.9] mb-10"
                style={{ fontSize: 'clamp(2.75rem, 8vw, 7rem)' }}
              >
                Something<br />
                <em className="not-italic text-gold-400">Powerful</em><br />
                Is Being Written
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:items-end animate-on-scroll">
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Chineze is working on something that will equip, inspire, and transform. Stay close —
                this page will come alive soon.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10 animate-on-scroll">
              <Link
                href="/contact?subject=Notify+Me+About+The+Book"
                className="px-8 py-3.5 bg-gold-gradient text-charcoal text-sm font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Notify Me When It Lands
              </Link>
              <a
                href="#themes"
                className="px-8 py-3.5 border border-white/15 text-white text-sm font-medium rounded-full hover:border-gold-500/60 hover:text-gold-400 transition-all duration-300"
              >
                What She Writes From ↓
              </a>
            </div>
          </div>

          {/* Book-spine placeholder */}
          <div className="lg:col-span-5 hidden lg:flex justify-center animate-on-scroll-right">
            <div className="relative" style={{ perspective: '1200px' }}>
              <div
                className="relative w-64 aspect-[2/3] rounded-r-xl rounded-l-sm overflow-hidden border border-white/10 bg-[#111111]"
                style={{ transform: 'rotateY(-14deg)', boxShadow: '30px 30px 60px rgba(0,0,0,0.6)' }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gold-gradient opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,162,39,0.18),transparent_65%)]" />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(201,162,39,0.10)_50%,transparent_100%)] bg-[length:200%_100%] animate-shimmer"
                />
                <div className="relative h-full flex flex-col justify-between p-8 pl-10">
                  <span className="text-gold-400/70 text-[10px] tracking-[0.35em] uppercase">Chineze Eden</span>
                  <div className="space-y-3">
                    <div className="h-2.5 w-4/5 rounded-full bg-white/15 animate-pulse" />
                    <div className="h-2.5 w-3/5 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-2.5 w-2/5 rounded-full bg-white/[0.07] animate-pulse" />
                  </div>
                  <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Title to be revealed</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border-2 border-gold-400/20" />
            </div>
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

      {/* ─── THEMES ─── */}
      <section id="themes" className="py-28 bg-cream relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-playfair font-bold text-charcoal leading-none"
          style={{ fontSize: '18vw', opacity: 0.03 }}
        >
          WRITE
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 animate-on-scroll">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">The Ground It Grows From</span>
              </div>
              <h2 className="font-playfair text-4xl md:text-6xl font-bold text-charcoal leading-tight">
                What she<br />
                <span className="text-gold-600">writes from.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-6 flex items-end">
              <p className="text-charcoal/55 text-lg leading-relaxed max-w-lg">
                The book is still being written, so there is nothing to promise yet. But the ground it
                grows from is not a secret — these are the convictions behind every room Chineze has
                stood in.
              </p>
            </div>
          </div>

          <div>
            {themes.map((theme, i) => (
              <div
                key={theme.title}
                className="animate-on-scroll border-t border-charcoal/10 py-10 grid grid-cols-12 gap-6 items-start group hover:bg-charcoal/[0.03] transition-colors duration-300 -mx-6 px-6"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-playfair text-3xl md:text-4xl font-bold text-charcoal/15 group-hover:text-gold-500/40 transition-colors duration-300 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal group-hover:text-gold-700 transition-colors duration-300 mb-3 leading-snug">
                    {theme.title}
                  </h3>
                  <p className="text-charcoal/55 leading-relaxed max-w-3xl">{theme.desc}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-charcoal/10" />
          </div>
        </div>
      </section>

      {/* ─── NOTIFY CTA ─── */}
      <section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-gradient" />

        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Be First to Know</span>
              </div>
              <h2
                className="font-playfair font-bold text-white leading-tight mb-8"
                style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
              >
                Get the<br />
                <span className="text-gold-400">first</span> copy.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Leave your details and you will hear the moment there is a title, a cover, and a date.
                No noise in between.
              </p>
            </div>

            <div className="animate-on-scroll-right space-y-5">
              {[
                { label: 'Release announcement', desc: 'The title, the cover, and the day it becomes available.' },
                { label: 'Early reader access', desc: 'A first look at selected chapters before anyone else.' },
                { label: 'Launch invitations', desc: 'Readings, conversations, and the launch itself.' },
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
                  href="/contact?subject=Notify+Me+About+The+Book"
                  className="px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Get Notified
                </Link>
                <Link
                  href="/blog"
                  className="px-8 py-4 border border-white/15 text-white font-medium rounded-full hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
                >
                  Read the Blog Meanwhile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
