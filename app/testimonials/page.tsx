import Image from 'next/image'
import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import NewsletterSection from '@/components/NewsletterSection'
import { getTestimonials } from '@/lib/data'

export const metadata = {
  title: 'Testimonials | Chineze Ononye',
  description: 'Read what clients, students, and event organizers say about working with Chineze Ononye.',
}

export const revalidate = 60

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold-500' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const all = getTestimonials()
  const featured = all.filter(t => t.featured)
  const others = all.filter(t => !t.featured)

  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,162,39,0.1),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Real Stories</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
            Stories of <span className="gold-text">Change</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Don't take my word for it. Here's what the people who've worked with me have to say about their experience.
          </p>
          <div className="flex items-center justify-center gap-8 mt-12">
            {[
              { value: `${all.length}+`, label: 'Testimonials' },
              { value: '5.0', label: 'Average Rating' },
              { value: '100%', label: 'Would Recommend' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-playfair text-3xl font-bold text-gold-400">{stat.value}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TESTIMONIALS */}
      {featured.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-playfair text-3xl font-bold text-charcoal mb-10 animate-on-scroll">
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featured.map((t, i) => (
                <div
                  key={t.id}
                  className={`animate-on-scroll ${i === 0 ? 'lg:col-span-2' : ''}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`bg-charcoal rounded-2xl p-8 h-full relative overflow-hidden ${i === 0 ? 'border-l-4 border-gold-400' : 'border border-gold-500/20'}`}>
                    <div className="absolute top-4 right-4 text-gold-400/20">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <StarRating rating={t.rating} />
                    <p className={`text-white/80 leading-relaxed italic mt-4 mb-6 ${i === 0 ? 'text-lg' : 'text-sm'}`}>
                      "{t.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-400">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-white/50 text-sm">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL TESTIMONIALS */}
      {others.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-playfair text-3xl font-bold text-charcoal mb-10 animate-on-scroll">
              More Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((t, i) => (
                <div
                  key={t.id}
                  className="animate-on-scroll bg-cream rounded-2xl p-8 gold-border card-hover"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <StarRating rating={t.rating} />
                  <p className="text-charcoal/70 text-sm leading-relaxed italic mt-4 mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-300">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                      <p className="text-charcoal/50 text-xs">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="font-playfair text-4xl font-bold text-charcoal mb-4">
            Ready to Write <span className="text-gold-600">Your Own Story</span>?
          </h2>
          <p className="text-charcoal/60 mb-8">
            Join hundreds of people who have experienced transformation through working with Chineze.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            Book a Session Today
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </PublicLayout>
  )
}
