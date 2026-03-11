import Image from 'next/image'
import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import NewsletterSection from '@/components/NewsletterSection'

export const metadata = {
  title: 'About Chineze Ononye | Teacher, Mentor & Motivational Speaker',
  description: 'Learn about Chineze Ononye — her story, values, and mission to transform lives through education, mentorship, and inspiring talks.',
}

const timeline = [
  {
    year: '2012',
    title: 'Began Teaching Career',
    desc: 'Started as a secondary school teacher, immediately discovering a passion for unlocking student potential.',
  },
  {
    year: '2015',
    title: 'Launched Mentorship Program',
    desc: 'Founded a youth mentorship initiative that grew to serve over 100 young professionals in its first year.',
  },
  {
    year: '2017',
    title: 'First Keynote Address',
    desc: 'Delivered her first major keynote at a national education conference, receiving a standing ovation.',
  },
  {
    year: '2019',
    title: 'Published "Rise in Purpose"',
    desc: 'Released her first book — a guide to purposeful living that became a bestseller in its category.',
  },
  {
    year: '2021',
    title: 'International Speaking',
    desc: 'Expanded her reach to international audiences, speaking in the UK, US, and across West Africa.',
  },
  {
    year: '2024',
    title: 'Today & Beyond',
    desc: 'Continuing to impact thousands through speaking, mentorship, and education with greater reach than ever.',
  },
]

const values = [
  {
    title: 'Authenticity',
    desc: 'Every conversation, every talk, every lesson is grounded in genuine truth — no performance, only presence.',
    icon: '✦',
  },
  {
    title: 'Excellence',
    desc: 'A commitment to showing up fully prepared, continuously learning, and delivering the highest quality in all things.',
    icon: '◆',
  },
  {
    title: 'Empowerment',
    desc: 'The goal is never dependency but capability — helping people discover and own their inherent power.',
    icon: '▲',
  },
  {
    title: 'Compassion',
    desc: 'Seeing every person as worthy of investment, patience, and the belief that they can exceed their own expectations.',
    icon: '♦',
  },
]

export default function AboutPage() {
  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.1),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
              <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">My Story</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              About <span className="gold-text">Chineze</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed">
              Teacher. Mentor. Speaker. But above all — a woman who believes that every human being carries within them the seed of something extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll-left">
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                  alt="Chineze Ononye"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold-gradient rounded-2xl p-6 shadow-2xl">
                <p className="font-playfair text-charcoal text-2xl font-bold">500+</p>
                <p className="text-charcoal/70 text-sm">Lives Transformed</p>
              </div>
              <div className="absolute -top-6 -left-6 bg-charcoal rounded-2xl p-4 shadow-2xl border border-gold-500/20">
                <p className="text-gold-400 font-semibold text-sm">12+ Years</p>
                <p className="text-white/60 text-xs">of Impact</p>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll-right">
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6 leading-tight">
              From the Classroom to the World Stage
            </h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                Chineze Ononye's journey began in a modest classroom in Nigeria, where she quickly discovered something that would define her entire career: the moment a student's eyes light up with understanding is one of the most profound experiences a human being can have.
              </p>
              <p>
                That discovery didn't just make her a better teacher — it ignited a mission. A mission to create more of those moments. Not just in classrooms, but in boardrooms, conference halls, community centers, and one-on-one conversations that change the trajectory of a life.
              </p>
              <p>
                Over 12 years, Chineze has worn many hats — classroom teacher, curriculum developer, youth mentor, corporate trainer, and keynote speaker. But through it all, one thread has remained constant: an unwavering belief in the extraordinary potential that resides in every ordinary person.
              </p>
              <p>
                Her approach is rooted in authenticity, driven by compassion, and focused always on empowerment. She doesn't just motivate people — she equips them with the mindsets, tools, and courage to sustain their own transformation.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Work With Chineze
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.05),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-4">
              <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">What I Stand For</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
              Core <span className="gold-text">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="animate-on-scroll bg-white/5 border border-gold-500/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-gold-400 text-2xl mb-4 font-playfair">{value.icon}</div>
                <h3 className="font-playfair text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-4">
              <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">The Journey</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal">
              Milestones
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-300 md:-translate-x-0.5" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`animate-on-scroll relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-16 md:pl-0`}>
                    <div className="bg-white rounded-2xl p-6 gold-border shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-gold-500 font-bold text-sm">{item.year}</span>
                      <h3 className="font-playfair text-lg font-bold text-charcoal mt-1 mb-2">{item.title}</h3>
                      <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gold-400 border-4 border-cream shadow-lg shadow-gold-400/30" />
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-playfair text-4xl font-bold text-charcoal">
              By the <span className="text-gold-600">Numbers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Lives Transformed' },
              { value: '50+', label: 'Speaking Events' },
              { value: '12+', label: 'Years Teaching' },
              { value: '1', label: 'Published Book' },
              { value: '10+', label: 'Countries Reached' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '3', label: 'Award Nominations' },
              { value: '∞', label: 'Passion for Impact' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="animate-on-scroll bg-cream rounded-2xl p-6 text-center gold-border"
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <div className="font-playfair text-4xl font-bold text-gold-500 mb-2">{stat.value}</div>
                <div className="text-charcoal/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="font-playfair text-4xl font-bold text-charcoal">
              In Action
            </h2>
            <p className="text-charcoal/60 mt-3">Moments from the journey</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
              'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
              'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
              'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
              'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80',
              'https://images.unsplash.com/photo-1559223607-180220b63035?w=600&q=80',
            ].map((src, i) => (
              <div
                key={i}
                className="animate-on-scroll relative aspect-square rounded-2xl overflow-hidden group"
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <Image
                  src={src}
                  alt={`Chineze in action ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </PublicLayout>
  )
}
