import Image from 'next/image'
import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import NewsletterSection from '@/components/NewsletterSection'
import BlogCard from '@/components/BlogCard'
import TestimonialCard from '@/components/TestimonialCard'
import ScrollAnimator from '@/components/ScrollAnimator'
import { getBlogs, getTestimonials } from '@/lib/data'

export const revalidate = 60

export default function HomePage() {
  const blogs = getBlogs().filter(b => b.published).slice(0, 3)
  const testimonials = getTestimonials().filter(t => t.featured).slice(0, 3)

  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,162,39,0.12),rgba(255,255,255,0))]" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gold-600/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Teacher · Mentor · Speaker</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Unlocking
              <br />
              <span className="gold-text">Extraordinary</span>
              <br />
              Potential
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              I am Chineze Ononye — educator, mentor, and motivational speaker committed to helping individuals and organizations discover their purpose and rise to their highest potential.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Work With Me
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
              >
                My Story
              </Link>
            </div>

            <div className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/10">
              {[
                { value: '500+', label: 'Lives Impacted' },
                { value: '12+', label: 'Years Teaching' },
                { value: '50+', label: 'Speaking Events' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-playfair text-3xl font-bold text-gold-400">{stat.value}</div>
                  <div className="text-white/40 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent z-10 rounded-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Chineze Ononye"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating review card */}
            <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-5 shadow-2xl border border-gold-100 max-w-[200px]">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-3 h-3 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-charcoal/70 text-xs italic leading-relaxed">"Truly transformative experience"</p>
              <p className="text-charcoal text-xs font-semibold mt-2">— Adaeze O.</p>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border-2 border-gold-400/30" />
            <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-gold-500/20 blur-xl" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Scroll</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-gold-400/50 to-transparent" />
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📚',
                title: 'Teacher',
                desc: 'Transforming classrooms into launchpads for human potential through purpose-driven education and innovative pedagogy.',
              },
              {
                icon: '🌟',
                title: 'Mentor',
                desc: 'Walking alongside leaders, entrepreneurs, and educators as they navigate growth, challenges, and transitions.',
              },
              {
                icon: '🎤',
                title: 'Speaker',
                desc: 'Delivering compelling keynotes and workshops that ignite audiences and drive meaningful, lasting change.',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="animate-on-scroll bg-white rounded-2xl p-8 gold-border card-hover text-center"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll-left relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden max-w-lg">
              <Image
                src="https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=800&q=80"
                alt="Chineze speaking"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-charcoal rounded-2xl p-6 max-w-[220px] shadow-2xl">
              <p className="text-gold-400 font-playfair text-3xl font-bold">12+</p>
              <p className="text-white/60 text-sm mt-1">Years of transforming lives through education &amp; mentorship</p>
            </div>
          </div>

          <div className="animate-on-scroll-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-6">
              <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">About Chineze</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
              A Life Dedicated to <span className="text-gold-600">Elevating Others</span>
            </h2>
            <p className="text-charcoal/60 leading-relaxed mb-6">
              With over a decade of experience in education and personal development, Chineze Ononye has dedicated her life to the belief that every person carries within them an extraordinary capacity waiting to be unlocked.
            </p>
            <p className="text-charcoal/60 leading-relaxed mb-8">
              From classrooms to conference halls, her message is consistent: your story has power, your purpose has value, and your potential is limitless.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white font-semibold rounded-full hover:bg-gold-600 transition-colors duration-300"
            >
              Read My Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      {blogs.length > 0 && (
        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div className="animate-on-scroll">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-4">
                  <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">Latest Insights</span>
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal">
                  From the Blog
                </h2>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-gold-600 font-medium hover:text-gold-700 transition-colors">
                View all posts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((post, i) => (
                <div key={post.id} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
            <div className="text-center mt-10 md:hidden">
              <Link href="/blog" className="inline-flex items-center gap-2 text-gold-600 font-medium">
                View all posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.06)_0%,_transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-4">
                <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">What They Say</span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
                Stories of <span className="gold-text">Transformation</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={t.id} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gold-500/30 text-gold-400 font-semibold rounded-full hover:bg-gold-500/10 transition-colors duration-300"
              >
                Read More Stories →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <NewsletterSection />

      {/* CTA SECTION */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-charcoal mb-6">
            Ready to Transform<br />
            <span className="text-gold-600">Your World?</span>
          </h2>
          <p className="text-charcoal/60 text-lg mb-10 max-w-xl mx-auto">
            Whether you need a keynote speaker, a workshop facilitator, or a personal mentor — let&apos;s create something extraordinary together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-10 py-4 bg-charcoal text-white font-semibold rounded-full hover:bg-gold-600 transition-colors duration-300">
              Book Chineze
            </Link>
            <Link href="/speaking" className="px-10 py-4 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:border-gold-600 hover:text-gold-600 transition-colors duration-300">
              View Speaking Topics
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
