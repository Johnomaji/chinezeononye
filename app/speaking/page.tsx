import Link from 'next/link'
import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'

export const metadata = {
  title: 'Speaking | Chineze Ononye',
  description: 'Book Chineze Ononye for keynotes, workshops, and panel discussions on education, leadership, mentorship, and personal development.',
}

const topics = [
  {
    title: 'Unlocking Extraordinary Potential',
    desc: 'A powerful exploration of how every person carries untapped greatness — and the practical steps to release it. Perfect for corporate teams, student bodies, and community organizations.',
    audience: 'All audiences',
    duration: '45–60 min',
    icon: '✦',
  },
  {
    title: 'Teaching with Purpose',
    desc: 'A masterclass for educators on the difference between instructing and transforming. Packed with frameworks, case studies, and actionable strategies for the modern classroom.',
    audience: 'Educators & Schools',
    duration: '60–90 min',
    icon: '◆',
  },
  {
    title: 'The Mentorship Multiplier',
    desc: 'How intentional mentorship creates exponential impact in organizations, communities, and families. Includes frameworks for both mentors and mentees.',
    audience: 'Organizations & Leaders',
    duration: '45–75 min',
    icon: '▲',
  },
  {
    title: 'Finding Your Authentic Voice',
    desc: 'A transformative talk on the power of speaking your truth — professionally and personally. Particularly impactful for women in leadership and young professionals.',
    audience: 'Professional Women, Youth',
    duration: '45–60 min',
    icon: '♦',
  },
  {
    title: 'Rising from Rejection',
    desc: 'A raw, honest exploration of how setbacks and failures become the foundation for extraordinary comebacks. Vulnerable, inspiring, and deeply practical.',
    audience: 'All audiences',
    duration: '30–60 min',
    icon: '★',
  },
  {
    title: 'Purpose-Driven Leadership',
    desc: 'For executives and managers who want to lead from a place of values and vision rather than just strategy. Integrates emotional intelligence, storytelling, and servant leadership principles.',
    audience: 'Executives & Managers',
    duration: '60–90 min',
    icon: '◇',
  },
]

const eventTypes = [
  { title: 'Keynote Address', desc: 'The perfect opening or closing for your conference, summit, or corporate event.' },
  { title: 'Workshop & Masterclass', desc: 'Hands-on, interactive sessions that leave participants with practical tools and renewed energy.' },
  { title: 'Panel Discussion', desc: 'Chineze brings depth, wit, and warmth to any panel conversation on education, leadership, or personal development.' },
  { title: 'Corporate Training', desc: 'Customized programs for teams and organizations focused on culture, communication, and purpose.' },
  { title: 'School & University', desc: 'Inspiring assemblies, graduation speeches, and faculty development sessions.' },
  { title: 'Virtual Events', desc: 'Fully engaging virtual presentations that connect deeply even across screens.' },
]

const pastEvents = [
  { event: 'TEDx Abuja', year: '2023', type: 'Keynote' },
  { event: 'National Teachers Conference', year: '2023', type: 'Keynote' },
  { event: 'Women in Leadership Summit', year: '2022', type: 'Keynote & Panel' },
  { event: 'University of Lagos Convocation', year: '2022', type: 'Guest Speaker' },
  { event: 'Pan-African Education Forum', year: '2021', type: 'Panel Discussion' },
  { event: 'Lagos Entrepreneurship Summit', year: '2021', type: 'Workshop' },
]

export default function SpeakingPage() {
  return (
    <PublicLayout>
      <ScrollAnimator />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
              <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Speaking</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Words That <span className="gold-text">Inspire</span> People
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Chineze brings to every stage she stands on, a rare, authentic combination of an educator's wisdom, a people's empathy, insightful experiences and a speaker's fire!
            </p>
            <p className="text-white/60 text-xl leading-relaxed mb-8">    
              The result? Audiences that don't just leave inspired - they leave transformed, alongside strategies, resources to birth even deeper levels of transformation!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Book Chineze to Speak
              </Link>
              <a
                href="#topics"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
              >
                View Topics
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
                alt="Chineze speaking"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            </div>
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-white font-playfair text-lg font-semibold">
                "She doesn't just deliver a speech — she changes the room."
              </p>
              <p className="text-white/60 text-sm mt-2">— Conference Organizer, TEDx Abuja</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPEAKING TOPICS */}
      <section id="topics" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-4">
              <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">Signature Topics</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal">
              What Chineze Speaks About
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-xl mx-auto">
              Each talk is customized to fit your event's theme, audience, and objectives. All are available as keynotes or extended workshops.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, i) => (
              <div
                key={topic.title}
                className="animate-on-scroll bg-white rounded-2xl p-8 gold-border card-hover"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-500 font-bold text-lg mb-5">
                  {topic.icon}
                </div>
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-3">{topic.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-5">{topic.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gold-50 text-gold-700 text-xs rounded-full border border-gold-200">
                    {topic.audience}
                  </span>
                  <span className="px-3 py-1 bg-charcoal/5 text-charcoal/60 text-xs rounded-full">
                    {topic.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
              Types of <span className="gold-text">Engagements</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {eventTypes.map((type, i) => (
              <div
                key={type.title}
                className="animate-on-scroll border border-gold-500/20 rounded-2xl p-6 hover:bg-white/5 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-2 h-8 bg-gold-gradient rounded-full mb-4" />
                <h3 className="font-playfair text-lg font-bold text-white mb-2">{type.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-50 mb-4">
                <span className="text-gold-600 text-xs font-medium tracking-widest uppercase">Track Record</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6">
                Past Speaking <span className="text-gold-600">Engagements</span>
              </h2>
              <p className="text-charcoal/60 mb-8">
                From intimate workshops to large-scale conferences, Chineze has delivered powerful messages across diverse platforms and contexts.
              </p>
              <div className="space-y-3">
                {pastEvents.map((event, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-cream rounded-xl border border-gold-100">
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{event.event}</p>
                      <p className="text-charcoal/50 text-xs mt-0.5">{event.type}</p>
                    </div>
                    <span className="text-gold-600 font-bold text-sm">{event.year}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll-right">
              <div className="bg-cream rounded-3xl p-8 gold-border">
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-6">
                  Book Chineze for Your Event
                </h3>
                <div className="space-y-4 mb-8">
                  {[
                    'Customized talk tailored to your theme and audience',
                    'Pre-event consultation to ensure perfect alignment',
                    'Post-talk materials for continued impact',
                    'Professional, punctual, and fully prepared',
                    'Available for in-person and virtual events',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-charcoal/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="block text-center px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Submit a Speaking Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  )
}
