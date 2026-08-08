import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'

export const metadata = {
  title: 'Boys / Sonspiration | Chineze Ononye',
  description: 'Equipping the wholesome boy child — Chineze Ononye\'s Sonspiration movement champions the emotional, spiritual, and social development of boys.',
}

const taglines = [
  {
    quote: 'Equipping the Wholesome Boy Child.',
    context: 'The Sonspiration tagline',
  },
  {
    quote: 'A boy well-raised is a nation well-built.',
    context: 'On the power of intentional parenting',
  },
  {
    quote: 'Boys don\'t need less — they need better.',
    context: 'On the unique needs of boys',
  },
  {
    quote: 'Wholesome men don\'t happen by accident. They are intentionally raised.',
    context: 'On the Sonspiration mission',
  },
]

const focusAreas = [
  {
    icon: '❤',
    title: 'Emotional Intelligence',
    desc: 'Teaching boys to name, process, and channel their emotions — moving beyond the damaging myth that boys shouldn\'t feel.',
  },
  {
    icon: '✦',
    title: 'Identity & Purpose',
    desc: 'Grounding boys in a strong sense of self before the world tries to define them — knowing who they are and why they matter.',
  },
  {
    icon: '◆',
    title: 'Spiritual Grounding',
    desc: 'Building an inner anchor rooted in faith, values, and integrity that holds them steady through life\'s pressures.',
  },
  {
    icon: '▲',
    title: 'Healthy Relationships',
    desc: 'Modelling respect, empathy, and honour — so boys grow into men who love well in every relationship.',
  },
  {
    icon: '★',
    title: 'Resilience & Grit',
    desc: 'Equipping boys with the mental toughness to face failure, overcome adversity, and rise with character intact.',
  },
  {
    icon: '◇',
    title: 'Leadership & Service',
    desc: 'Cultivating the understanding that true leadership is not dominance but service — for the good of others.',
  },
]

const pastEvents = [
  {
    title: 'A 5-Part Series on Self Identity with the Boys',
    year: '',
    type: 'Workshop Series',
    desc: 'A deep-dive five-session journey guiding boys through the foundations of who they are — exploring identity, self-worth, and purpose from the inside out.',
  },
  {
    title: 'Sons Worshipping The Father 1.0',
    year: '',
    type: 'Worship Experience',
    desc: 'A pure, powerful worship experience designed exclusively for preteen and teenage boys — creating a sacred space for them to encounter God and discover who they are in Him.',
  },
  {
    title: 'Celebration of The International Day of The Boy Child',
    year: '2022',
    type: 'Special Celebration',
    desc: 'A landmark event honouring the boy child — championing his worth, celebrating his potential, and affirming the investment he deserves from family and community.',
  },
  {
    title: 'Celebration of The International Day of The Boy Child — Milestone Academy',
    year: '2023',
    type: 'School Event',
    desc: 'A vibrant in-school celebration at Milestone Academy marking the International Day of the Boy Child, featuring talks, activities, and affirmations for the boys.',
  },
  {
    title: 'Celebration of The International Day of The Boy Child — DeRegnant School',
    year: '2023',
    type: 'School Event',
    desc: 'Bringing the Sonspiration message to DeRegnant School — a special celebration spotlighting the value of every boy and the vision of wholesome manhood.',
  },
  {
    title: 'Sons Worshipping The Father 2.0 & Purpose-Day Party',
    year: '2024',
    type: 'Worship & Celebration',
    desc: 'The second instalment of the worship experience — bigger, deeper, and paired with a Purpose-Day party to celebrate boys stepping into their God-given identity and calling.',
  },
  {
    title: '3-Day Boys Bootcamp — The Edge & Edges',
    year: '',
    type: 'Bootcamp',
    desc: 'An immersive three-day bootcamp pushing boys to their edge — building resilience, sharpening character, and equipping them with the tools to thrive in every dimension of life.',
  },
]

const stats = [
  { value: '7+', label: 'Events Hosted' },
  { value: '500+', label: 'Boys Reached' },
  { value: '2', label: 'Schools Visited' },
  { value: '2', label: 'Worship Experiences' },
]

export default function BoysPage() {
  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* HERO */}
      <section className="relative pt-32 pb-24 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Sonspiration</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Raising the{' '}
              <span className="gold-text">Wholesome</span>{' '}
              Boy Child
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-4 max-w-2xl">
              Boys are not broken. They are not a problem to manage. They are a generation to be equipped, championed, and loved intentionally.
            </p>
            <p className="text-white/60 text-xl leading-relaxed mb-10 max-w-2xl">
              Sonspiration is Chineze&apos;s movement dedicated to doing exactly that — equipping the wholesome boy child from the inside out.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Join Sonspiration
              </Link>
              <a
                href="#events"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
              >
                See Past Events
              </a>
            </div>
          </div>
        </div>

        {/* Floating tagline card */}
        <div className="relative max-w-7xl mx-auto px-6 mt-16">
          <div className="max-w-2xl bg-white/5 border border-gold-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <p className="font-playfair text-gold-300 text-xl italic leading-relaxed">
              &ldquo;Equipping the Wholesome Boy Child.&rdquo;
            </p>
            <p className="text-white/40 text-sm mt-3">— The Sonspiration Mission</p>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-12 bg-gold-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-playfair text-4xl font-bold text-charcoal">{stat.value}</div>
                <div className="text-charcoal/70 text-sm mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE BOY CHILD */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-4">
                <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">The Why</span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
                Why the Boy Child <span className="text-gold-600">Matters</span>
              </h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed">
                <p>
                  In a world that often struggles to know what to do with boys — boys are growing up without adequate emotional language, identity anchors, or safe spaces to wrestle with who they are becoming.
                </p>
                <p>
                  The result? Young men who feel lost, disconnected, or forced to perform a version of masculinity that costs them everything on the inside.
                </p>
                <p>
                  Chineze believes that a boy who is seen, heard, and intentionally equipped becomes a man who can lead, love, and serve with wholeness. Sonspiration exists to create that environment — for the boys, for the families raising them, and for the communities that will one day be shaped by them.
                </p>
                <p>
                  This isn&apos;t about making boys soft or hard. It&apos;s about making them <span className="text-gold-600 font-semibold">whole</span>.
                </p>
              </div>
            </div>

            <div className="animate-on-scroll-right">
              <div className="space-y-4">
                {[
                  { label: 'Boys who feel understood', sub: 'are less likely to act out and more likely to thrive socially and academically.' },
                  { label: 'Emotionally intelligent boys', sub: 'grow into men who build healthier families, workplaces, and communities.' },
                  { label: 'A boy with a strong identity', sub: 'is resistant to peer pressure and anchored through life\'s storms.' },
                  { label: 'Intentional investment now', sub: 'shapes the kind of men our daughters, sons, and society will inherit.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl gold-border hover:shadow-md transition-all duration-300"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{item.label}</p>
                      <p className="text-charcoal/55 text-sm mt-0.5 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.06),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-4">
              <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">What We Focus On</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
              Building Boys From the{' '}
              <span className="gold-text">Inside Out</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Sonspiration addresses the six pillars that produce wholesome, grounded, purposeful young men.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((area, i) => (
              <div
                key={area.title}
                className="animate-on-scroll group border border-gold-500/20 rounded-2xl p-7 hover:bg-white/5 hover:border-gold-400/40 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-gold-400 text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 font-playfair">
                  {area.icon}
                </div>
                <div className="w-8 h-0.5 bg-gold-gradient rounded-full mb-4" />
                <h3 className="font-playfair text-lg font-bold text-white mb-3">{area.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAGLINES */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-4">
              <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">Words That Lead</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal">
              The <span className="text-gold-600">Sonspiration</span> Voice
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taglines.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-cream rounded-3xl p-8 gold-border group hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-1 bg-gold-gradient rounded-full mb-6 group-hover:w-16 transition-all duration-500" />
                <blockquote className="font-playfair text-2xl font-bold text-charcoal leading-snug mb-4">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="text-charcoal/50 text-sm">{item.context}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      </section>

      {/* PAST EVENTS */}
      <section id="events" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-4">
              <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">Track Record</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal">
              Past <span className="text-gold-600">Events</span>
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-xl mx-auto">
              From worship experiences and school celebrations to bootcamps and identity series — here is what Sonspiration has looked like on the ground.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl overflow-hidden gold-border card-hover group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="h-2 bg-gold-gradient" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-gold-50 text-gold-700 text-xs font-medium rounded-full border border-gold-200">
                      {event.type}
                    </span>
                    {event.year && (
                      <span className="text-gold-500 font-bold text-sm shrink-0">{event.year}</span>
                    )}
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-charcoal mb-3 leading-snug group-hover:text-gold-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.12),transparent_65%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Get Involved</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Join the Movement
          </h2>
          <p className="text-white/60 text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
            Whether you&apos;re a parent, educator, mentor, or someone who cares about the next generation of men — there&apos;s a place for you in Sonspiration.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join the group calls. Share the message. Champion a boy in your life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact?subject=Sonspiration+%2F+Boy+Child"
              className="px-10 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              Join Sonspiration
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border border-white/20 text-white font-semibold rounded-full hover:border-gold-400 hover:text-gold-400 transition-all duration-300 text-lg"
            >
              Meet Chineze
            </Link>
          </div>
        </div>
      </section>

    </PublicLayout>
  )
}
