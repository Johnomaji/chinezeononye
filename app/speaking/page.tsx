import Link from 'next/link'
import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Speaking | Chineze Eden',
  description: 'Book Chineze Eden for keynotes, workshops, and panel discussions on education, leadership, mentorship, and personal development.',
  path: '/speaking',
})

const signatureTopic = {
  title: 'The Unstoppable You Signature Course Experience',
  desc: 'This is more than a talk — it\'s a full transformational experience. Drawing from years of coaching, education, and personal breakthroughs, Chineze takes your audience on a journey from limitation to limitless. Participants leave with a renewed identity, a clear vision, and the tools to pursue it relentlessly.',
  audience: 'All audiences',
  highlights: ['Identity Breakthrough', 'Vision Mapping', 'Limitless Mindset', 'Action Blueprint'],
}

const topics = [
  {
    title: 'Teaching with Purpose',
    desc: 'A masterclass for educators on the difference between instructing and transforming. Packed with frameworks, case studies, and actionable strategies for the modern classroom.',
    audience: 'Educators & Schools',
  },
  {
    title: 'The Mentorship Multiplier',
    desc: 'How intentional mentorship creates exponential impact in organizations, communities, and families. Includes frameworks for both mentors and mentees.',
    audience: 'Organizations & Leaders',
  },
  {
    title: 'Finding Your Authentic Voice',
    desc: 'A transformative talk on the power of speaking your truth — professionally and personally. Particularly impactful for women in leadership and young professionals.',
    audience: 'Professional Women, Youth',
  },
  {
    title: 'Rising from Rejection',
    desc: 'A raw, honest exploration of how setbacks and failures become the foundation for extraordinary comebacks. Vulnerable, inspiring, and deeply practical.',
    audience: 'All audiences',
  },
  {
    title: 'Purpose-Driven Leadership',
    desc: 'For executives and managers who want to lead from a place of values and vision rather than just strategy. Integrates emotional intelligence, storytelling, and servant leadership principles.',
    audience: 'Executives & Managers',
  },
  {
    title: 'Raising The Wholesome Boy',
    desc: 'A passionate call to action for parents, educators, and communities to intentionally invest in the boy child. Chineze unpacks the emotional, spiritual, and identity needs of boys growing up today — and the practical steps to raise whole, grounded, purposeful young men.',
    audience: 'Parents, Educators, Communities',
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

type Engagement = {
  event: string
  year: string
  type: string
  link?: string
}

const pastEvents: Engagement[] = [
  { event: 'FIDA Nigeria, Anambra Branch', year: 'Jul 2025', type: 'Guest Speaker' },
  { event: 'Kingsville College, Abuja', year: 'Jun 2025', type: 'School Engagement' },
  {
    event: 'Fatherhood Gist With Favour',
    year: 'Jun 2025',
    type: 'Podcast',
    link: 'https://youtu.be/POKsy6uNxHY?si=4wUYmPRO-VEQRSqq',
  },
  { event: 'Politics Extra, Kiss FM Abuja', year: 'May 2025', type: 'Radio' },
  { event: 'Self Identity Series with the Boys', year: 'Oct 2023', type: 'Virtual Workshops' },
]

const whatYouGet = [
  'A talk customized to your theme, audience, and objectives',
  'Pre-event consultation to ensure perfect alignment',
  'Post-talk materials so the impact continues after the room empties',
  'Professional, punctual, and fully prepared',
  'Available for in-person, virtual, and hybrid events',
]

export default function SpeakingPage() {
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
            style={{ fontSize: 'clamp(6rem, 24vw, 22rem)', opacity: 0.03, letterSpacing: '-0.04em' }}
          >
            STAGE
          </span>
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute top-1/4 right-0 w-64 h-px bg-gradient-to-l from-gold-500/30 to-transparent" />
        <div className="absolute top-2/3 right-0 w-40 h-px bg-gradient-to-l from-gold-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-12 animate-on-scroll">
              <div className="w-16 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium">Speaking</span>
            </div>

            <div className="animate-on-scroll">
              <h1
                className="font-playfair font-bold text-white leading-[0.9] mb-10"
                style={{ fontSize: 'clamp(3rem, 8.5vw, 7.5rem)' }}
              >
                Words<br />
                That <em className="not-italic text-gold-400">Move</em><br />
                Rooms
              </h1>
            </div>

            <div className="animate-on-scroll space-y-5 max-w-xl">
              <p className="text-white/50 text-lg leading-relaxed">
                Chineze brings to every stage she stands on a rare, authentic combination of an
                educator&apos;s wisdom, a people&apos;s empathy, insightful experience, and a speaker&apos;s fire.
              </p>
              <p className="text-white/50 text-lg leading-relaxed">
                The result? Audiences that don&apos;t just leave inspired — they leave transformed, with
                the strategies and resources to birth even deeper levels of transformation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10 animate-on-scroll">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-gold-gradient text-charcoal text-sm font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Book Chineze to Speak
              </Link>
              <a
                href="#topics"
                className="px-8 py-3.5 border border-white/15 text-white text-sm font-medium rounded-full hover:border-gold-500/60 hover:text-gold-400 transition-all duration-300"
              >
                View Topics ↓
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block animate-on-scroll-right">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/new5.png"
                alt="Chineze Eden speaking on stage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border-2 border-gold-400/30" />
            <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-gold-500/10 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ─── BANNER ─── */}
      <section className="relative py-14 bg-gold-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-1 h-14 bg-charcoal/30 rounded-full shrink-0 hidden md:block" />
          <p className="font-playfair text-2xl md:text-4xl font-bold text-charcoal text-center md:text-left leading-snug">
            &ldquo;Structured Personal Growth is the key to lasting, wholesome success.&rdquo;
          </p>
          <div className="md:ml-auto shrink-0">
            <span className="text-charcoal/50 text-sm tracking-widest uppercase">The Premise</span>
          </div>
        </div>
      </section>

      {/* ─── SIGNATURE EXPERIENCE ─── */}
      <section className="py-28 bg-[#0D0D0D] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 font-playfair font-bold text-white leading-none"
          style={{ fontSize: '20vw', opacity: 0.025 }}
        >
          THE
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32 animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Signature Experience</span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                The Unstoppable<br />
                <span className="text-gold-400">You.</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 max-w-md">{signatureTopic.desc}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-4 py-1.5 border border-gold-500/40 text-gold-400 text-xs rounded-full">
                  {signatureTopic.audience}
                </span>
              </div>

              <Link
                href="/contact?subject=The+Unstoppable+You"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1 text-sm"
              >
                Enquire About This Experience
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="lg:col-span-7 animate-on-scroll-right">
              {signatureTopic.highlights.map((h, i) => (
                <div
                  key={h}
                  className="border-t border-white/10 group hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="flex items-center gap-6 py-10">
                    <span className="font-playfair text-gold-500/30 text-4xl font-bold shrink-0 w-14 leading-none group-hover:text-gold-500/60 transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="flex-1 font-playfair text-2xl md:text-3xl font-bold text-white group-hover:text-gold-300 transition-colors duration-300">
                      {h}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center shrink-0 group-hover:bg-gold-500/15 transition-colors">
                      <svg className="w-3.5 h-3.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOPICS ─── */}
      <section id="topics" className="bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
          <div className="animate-on-scroll">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">Signature Topics</span>
            </div>
            <h2 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal leading-tight">
              What Chineze<br />
              <span className="text-gold-600">Speaks</span> About.
            </h2>
            <p className="text-charcoal/55 text-lg leading-relaxed max-w-xl mt-8">
              Each talk is shaped around your event&apos;s theme, audience, and objectives. All are
              available as keynotes or extended workshops.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          {topics.map((topic, i) => (
            <details key={topic.title} className="animate-on-scroll border-t border-charcoal/10 group/topic">
              <summary className="flex gap-6 items-center py-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded">
                <span className="font-playfair text-gold-600/50 group-hover/topic:text-gold-600 text-3xl font-bold shrink-0 w-14 leading-none transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 font-playfair text-2xl md:text-3xl font-bold text-charcoal group-hover/topic:text-gold-700 leading-snug transition-colors duration-300">
                  {topic.title}
                </h3>
                <span className="hidden md:inline-block px-3 py-1 border border-charcoal/15 text-charcoal/50 text-xs rounded-full shrink-0 group-hover/topic:border-gold-400/40 group-hover/topic:text-gold-600 transition-colors duration-300">
                  {topic.audience}
                </span>
                <svg
                  className="w-6 h-6 shrink-0 text-gold-600/60 group-hover/topic:text-gold-600 group-open/topic:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pl-20 pr-10 pb-8">
                <p className="text-charcoal/60 leading-relaxed max-w-3xl">{topic.desc}</p>
                <span className="md:hidden inline-block mt-4 px-3 py-1 bg-gold-50 border border-gold-200 text-gold-700 text-xs rounded-full">
                  {topic.audience}
                </span>
              </div>
            </details>
          ))}
          <div className="border-t border-charcoal/10" />
        </div>
      </section>

      {/* ─── ENGAGEMENT TYPES ─── */}
      <section className="py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-playfair font-bold text-white leading-none"
          style={{ fontSize: '18vw', opacity: 0.025 }}
        >
          FORMAT
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll mb-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Formats</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight">
              Types of<br />
              <span className="text-gold-400">Engagements.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {eventTypes.map((type, i) => (
              <div
                key={type.title}
                className="animate-on-scroll bg-[#0A0A0A] p-8 hover:bg-white/[0.03] transition-colors duration-300 group"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="font-playfair text-gold-500/30 text-2xl font-bold group-hover:text-gold-500/60 transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-playfair text-xl font-bold text-white mt-4 mb-2 group-hover:text-gold-300 transition-colors duration-300">
                  {type.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRACK RECORD + BOOKING ─── */}
      <section className="py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 animate-on-scroll-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">Track Record</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
              Stages she has<br />
              <span className="text-gold-600">stood on.</span>
            </h2>
            <p className="text-charcoal/55 leading-relaxed mb-10 max-w-md">
              Law associations, school halls, radio studios, podcasts, and virtual rooms.
            </p>

            <div>
              {pastEvents.map((item, i) => (
                <div
                  key={i}
                  className="animate-on-scroll border-t border-charcoal/10 py-6 flex items-center gap-5 group hover:bg-charcoal/[0.03] transition-colors duration-300 -mx-4 px-4"
                >
                  <span className="font-playfair text-charcoal/15 text-2xl font-bold shrink-0 w-10 leading-none group-hover:text-gold-500/50 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-playfair font-bold text-charcoal text-lg leading-snug group-hover:text-gold-700 transition-colors duration-300">
                      {item.event}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex align-middle ml-2 text-gold-600 hover:text-gold-700 transition-colors"
                          aria-label={`Watch ${item.event}`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </p>
                    <p className="text-charcoal/45 text-sm mt-1">{item.type}</p>
                  </div>

                  <span className="font-playfair font-bold text-gold-500 text-lg shrink-0 whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
              ))}
              <div className="border-t border-charcoal/10" />
            </div>

            <div className="mt-10">
              <Link
                href="/boys"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors group/link"
              >
                See the Boyspiration engagements
                <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 animate-on-scroll-right">
            <div className="lg:sticky lg:top-32 bg-charcoal rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
                Book Chineze for<br />your event.
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                What every engagement includes.
              </p>

              <ul className="mb-9">
                {whatYouGet.map((item) => (
                  <li key={item} className="flex gap-4 items-start border-t border-white/10 py-4">
                    <div className="w-5 h-5 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact?subject=Speaking+Request"
                className="block text-center px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Submit a Speaking Request
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
