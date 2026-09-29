import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import BoysEventGallery, { type BoysEvent } from '@/components/BoysEventGallery'

export const metadata = {
  title: 'Boys / Boyspiration | Chineze Eden',
  description: 'Equipping the wholesome boy — Chineze Eden\'s Boyspiration movement champions the emotional, spiritual, and social development of boys.',
}

const focusAreas = [
  {
    num: '01',
    title: 'Emotional Intelligence',
    desc: 'Teaching boys to name, process, and channel their emotions — moving beyond the damaging myth that boys shouldn\'t feel.',
  },
  {
    num: '02',
    title: 'Identity & Purpose',
    desc: 'Grounding boys in a strong sense of self before the world tries to define them — knowing who they are and why they matter.',
  },
  {
    num: '03',
    title: 'Spiritual Grounding',
    desc: 'Building an inner anchor rooted in faith, values, and integrity that holds them steady through life\'s pressures.',
  },
  {
    num: '04',
    title: 'Healthy Relationships',
    desc: 'Modelling respect, empathy, and honour — so boys grow into men who love well in every relationship.',
  },
  {
    num: '05',
    title: 'Resilience & Grit',
    desc: 'Equipping boys with the mental toughness to face failure, overcome adversity, and rise with character intact.',
  },
  {
    num: '06',
    title: 'Leadership & Service',
    desc: 'Cultivating the truth that real leadership is not dominance — it is service, for the good of others.',
  },
]

const taglines = [
  'Wholesome Men Do Not Just Happen. They Are Grown Boys Intentionally Equipped.',
  'The Wholesome Boy = The Wholesome Man = The Wholesome Family = The Wholesome Society',
]

const whyBlocks = [
  {
    heading: 'Because who he becomes, matters',
    tag: 'Identity',
    body: [
      'The boy is growing up without the emotional language, identity anchors, and safe spaces he needs to understand who he is and who he is becoming.',
      'Many boys are left feeling lost, struggling with their sense of identity and significance, and pressured to perform a version of masculinity that earns acceptance at the expense of their inner well-being.',
      'The boy needs more than instruction; he needs understanding, belonging, and intentional guidance. He deserves safe spaces to find his voice, embrace his identity, and grow into an emotionally healthy, confident, and purpose-driven young man.',
    ],
  },
  {
    heading: 'Equip the Boy, Shape the Man',
    tag: 'The Investment',
    body: [
      'Investing in a boy is not coddling him; it is equipping him.',
      'When a boy is seen, heard, guided, and intentionally built, he develops the confidence, character, and capacity to become a man who can lead, love, and serve without losing himself in the process.',
      'The goal is not to shield the boy from the realities of life, but to truly prepare him to navigate those realities with identity, courage, emotional strength, and purpose.',
    ],
  },
  {
    heading: 'Wholeness, Not Softness or Hardness',
    tag: 'Formation',
    body: [
      'This is not about producing soft boys or hard men.',
      'It is about raising whole ones — anchored in identity, grounded in purpose, and emotionally capable of carrying the weight of the lives they will one day lead.',
      'We want boys who can be strong without becoming hardened, vulnerable without becoming fragile, and confident without losing compassion. Boys who can grow into men with the inner strength to lead, love, and live fully.',
    ],
  },
]

const pastEvents: BoysEvent[] = [
  {
    title: 'Guest Speaker at the International Federation of Women Lawyers (FIDA) Nigeria, Anambra State Branch',
    year: 'July 2025',
    type: 'Guest Speaker',
    desc: 'Chineze Eden spoke at the FIDA Anambra July Meeting & Pep Talk, held at the FIDA Anambra Law Centre, Awka.',
    topic: 'Who is raising the boychild? Navigating identity, expectations and neglect.',
    images: ['/boys-fida-flyer.jpeg'],
  },
  {
    title: 'Guest Speaker, Politics Extra Radio Show on Kiss FM Abuja',
    year: 'May 2025',
    type: 'Radio Interview',
    desc: 'A live radio conversation hosted by Primorg to mark the 2025 International Day of The Boychild.',
    topic: 'The boychild in today\'s dynamic world.',
    images: [
      '/boys-kiss-fm-flyer.jpeg',
      '/boys-kiss-fm-team.jpeg',
      '/boys-kiss-fm-solo.jpeg',
    ],
  },
  {
    title: 'Impactfully Engaging the Boys at Kingsville College, Abuja',
    year: 'June 2025',
    type: 'School Visit',
    desc: 'Engaging the boys on the occasion of their Humanities Week — Empowered Voices, Informed Choices.',
    topic: 'Options beyond the obvious.',
    images: ['/boys-kingsville-flyer.jpeg'],
  },
  {
    title: 'Sharing Moments — Celebrating and Equipping the Boys at Milestone Academy, Abuja',
    year: 'May 2025',
    type: 'School Visit',
    desc: 'On the occasion of the 2025 International Day of The Boychild, 16th May, 2025.',
    images: [
      '/boys-session-1.jpeg',
      '/boys-milestone-flyer.jpeg',
      '/boys-milestone-1.jpeg',
      '/boys-celebration-1.jpeg',
      '/boys-celebration-2.jpeg',
    ],
  },
  {
    title: 'Sharing Moments — Celebrating and Equipping the Boys at De Regnant Star Academy, Abuja',
    year: 'May 2025',
    type: 'School Visit',
    desc: 'On the occasion of the 2025 International Day of The Boychild, 16th May, 2025.',
    images: ['/boys-radio-flyer.jpeg'],
  },
  {
    title: 'Guest Speaker at Tenderthots Podcast',
    year: 'May 2025',
    type: 'Podcast',
    desc: 'A podcast conversation on raising boys into wholesome men.',
    topic: 'From Boys to Men: Nurturing The Right Mindset.',
    link: { href: 'https://youtu.be/kuVqW3kU5G4', label: 'Watch on YouTube' },
    images: [],
  },
  {
    title: 'Sons Worshipping The Father 1.0',
    year: 'May 2023',
    type: 'Worship Experience',
    desc: 'A pure worship experience for preteen and teenage boys at Tigris Studios, Abuja. This was in commemoration of The 2023 International Day of the Boychild.',
    images: [
      '/boys-worship-1.jpeg',
      '/boys-worship-2.jpeg',
    ],
  },
  {
    title: 'Celebration of The International Day of The Boy Child',
    year: '2022',
    type: 'Special Celebration',
    desc: 'A landmark event honouring the boy child — championing his worth, celebrating his potential, and affirming the investment he deserves.',
    images: [
      '/boys-intl-day-1.jpeg',
      '/boys-intl-day-2.jpeg',
      '/boys-intl-day-3.jpeg',
      '/boys-intl-day-4.jpeg',
    ],
  },
  {
    title: 'Sons Worshipping The Father 2.0 & Purpose-Day Party',
    year: '2024',
    type: 'Worship & Celebration',
    desc: 'Bigger, deeper, and paired with a Purpose-Day party — celebrating boys stepping into their God-given identity and calling.',
    images: [],
  },
  {
    title: '3-Day Boys Bootcamp',
    year: '',
    type: 'Bootcamp',
    desc: 'A 3-Day engaging Bootcamp experience with the boys — building resilience, sharpening character and equipping the boys.',
    images: [
      '/boys-bootcamp-1.jpeg',
      '/boys-bootcamp-2.jpeg',
      '/boys-bootcamp-3.jpeg',
      '/boys-fatherhood-gist-flyer.jpeg',
    ],
  },
  {
    title: 'A 5-Part Series on Self Identity with the Boys',
    year: 'October 2023',
    type: 'Virtual Workshop Series',
    desc: 'A deep-dive five-session virtual journey guiding boys through the foundations of who they are — exploring identity, self-worth, and purpose from the inside out.',
    images: [],
  },
]

const workFolds = [
  'Directly engaging and equipping the boys.',
  'Advocacy and awareness on the critical need of intentionally equipping the boys.',
]

const instruments = [
  {
    title: 'Group Coaching Series',
    desc: 'Structured personal growth layered on identity and value system.',
  },
  { title: 'Structured Mentorships' },
  { title: 'Leadership & Mentoring Conferences' },
  { title: 'School Visits' },
  { title: 'Excursions' },
]

const stats = [
  { value: '11', label: 'Events Hosted' },
  { value: '500+', label: 'Boys Reached' },
  { value: '4', label: 'Schools Visited' },
  { value: '2', label: 'Worship Experiences' },
]

export default function BoysPage() {
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
            style={{ fontSize: 'clamp(8rem, 30vw, 26rem)', opacity: 0.03, letterSpacing: '-0.04em' }}
          >
            BOYS
          </span>
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute top-1/4 right-0 w-64 h-px bg-gradient-to-l from-gold-500/30 to-transparent" />
        <div className="absolute top-2/3 right-0 w-40 h-px bg-gradient-to-l from-gold-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
          <div className="flex items-center gap-4 mb-12 animate-on-scroll">
            <div className="w-16 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium">Boyspiration</span>
          </div>

          <div className="animate-on-scroll">
            <h1
              className="font-playfair font-bold text-white leading-[0.9] mb-10"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
            >
              Equipping<br />
              <em className="not-italic text-gold-400">Wholesome</em><br />
              Boys.
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:items-end animate-on-scroll">
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              Boys are not broken. They are becoming. Our responsibility is to equip,
              champion and nurture them intentionally as they grow into wholesome men.
            </p>
            <div className="flex flex-wrap gap-4 lg:ml-auto shrink-0">
              <a
                href="#events"
                className="px-8 py-3.5 border border-white/15 text-white text-sm font-medium rounded-full hover:border-gold-500/60 hover:text-gold-400 transition-all duration-300"
              >
                Our Engagements ↓
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-gradient-to-b from-gold-400/60 to-transparent" />
        </div>
      </section>

      {/* ─── MISSION BANNER ─── */}
      <section className="relative py-16 bg-gold-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-1 h-16 bg-charcoal/30 rounded-full shrink-0 hidden md:block" />
          <p className="font-playfair text-2xl md:text-4xl font-bold text-charcoal text-center md:text-left leading-snug">
            &ldquo;Equipping The Wholesome Boy.&rdquo;
          </p>
          <div className="md:ml-auto shrink-0">
            <span className="text-charcoal/50 text-sm tracking-widest uppercase">The Boyspiration Mission</span>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-[#111111] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="py-14 px-6 text-center group">
                <div className="font-playfair text-5xl md:text-6xl font-bold text-gold-400 mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE WHY ─── */}
      <section className="py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 font-playfair font-bold text-white leading-none"
          style={{ fontSize: '22vw', opacity: 0.025 }}
        >
          WHY
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32 animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">The Why</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight">
                Why the<br />
                <span className="text-gold-400">Boys?</span>
              </h2>
            </div>

            <div className="lg:col-span-8 animate-on-scroll-right">
              {whyBlocks.map((block, i) => (
                <details key={i} className="border-t border-white/10 group/why">
                  <summary className="flex gap-6 items-start py-10 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded">
                    <span className="font-playfair text-gold-500/30 text-4xl font-bold shrink-0 w-14 group-hover/why:text-gold-500/60 transition-colors duration-300 leading-none mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <span className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-2 block">{block.tag}</span>
                      <h3 className="font-playfair text-xl md:text-2xl font-bold text-white group-hover/why:text-gold-300 transition-colors duration-300">
                        {block.heading}
                      </h3>
                    </div>
                    <svg
                      className="w-6 h-6 shrink-0 mt-2 text-gold-400/60 group-hover/why:text-gold-400 group-open/why:rotate-180 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pl-20 pb-10 pr-10 space-y-4">
                    {block.body.map((para, j) => (
                      <p key={j} className="text-white/50 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </details>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOCUS AREAS ─── */}
      <section className="bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="flex flex-col md:flex-row md:items-end gap-6 animate-on-scroll">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">How We Build</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal leading-tight">
                Building from the<br /><span className="text-gold-600">Inside</span> Out.
              </h2>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, i) => (
              <div
                key={area.num}
                className="animate-on-scroll group relative border-b border-r border-charcoal/10 p-10 bg-cream hover:bg-charcoal transition-all duration-500 cursor-default overflow-hidden"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none select-none absolute right-4 bottom-2 font-playfair font-bold text-charcoal/5 group-hover:text-white/5 leading-none transition-colors duration-500"
                  style={{ fontSize: '6rem' }}
                >
                  {area.num}
                </span>

                <div className="relative">
                  <span className="font-playfair text-xs text-gold-600 group-hover:text-gold-400 font-bold tracking-widest uppercase mb-5 block transition-colors duration-300">
                    {area.num}
                  </span>
                  <div className="w-8 h-0.5 bg-gold-gradient rounded-full mb-6" />
                  <h3 className="font-playfair text-2xl font-bold text-charcoal group-hover:text-white mb-4 leading-snug transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-charcoal/55 group-hover:text-white/55 text-sm leading-relaxed transition-colors duration-300">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TAGLINES ─── */}
      <section className="bg-[#0A0A0A]">
        {taglines.map((quote, i) => (
          <div
            key={i}
            className={`animate-on-scroll border-b border-white/8 group hover:bg-white/[0.02] transition-colors duration-500 ${
              i % 2 !== 0 ? 'bg-[#0D0D0D]' : ''
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
              <div className={`flex items-center gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                <div className={`shrink-0 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                  <span className="font-playfair text-gold-500/20 text-7xl font-bold group-hover:text-gold-500/30 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="w-px h-16 bg-gold-500/20 shrink-0 hidden md:block group-hover:bg-gold-500/50 transition-colors duration-300" />
                <blockquote
                  className={`font-playfair font-bold text-white/80 group-hover:text-white leading-tight transition-colors duration-300 ${
                    i % 2 !== 0 ? 'md:text-right' : ''
                  }`}
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)' }}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── PAST EVENTS ─── */}
      <section id="events" className="py-32 bg-cream relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-playfair font-bold text-charcoal leading-none"
          style={{ fontSize: '18vw', opacity: 0.03 }}
        >
          EVENTS
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 animate-on-scroll">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">Track Record</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal leading-tight">
                What<br />We&apos;ve<br /><span className="text-gold-600">Done.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-8 flex items-end">
              <p className="text-charcoal/55 text-lg leading-relaxed max-w-lg">
                From Identity boot-camps to lovingly celebrating the boys on International Day of The Boychild, empowering Conferences, Christian faith based experiences for boys, to Advocacy and Awareness.
              </p>
            </div>
          </div>

          {/* Our Work */}
          <div className="mb-20 animate-on-scroll">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">Our Work</span>
            </div>

            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-8">
              Our work is <span className="text-gold-600">two-fold.</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {workFolds.map((fold, i) => (
                <div key={i} className="flex gap-5 items-start p-8 bg-white/60 border border-charcoal/10 rounded-2xl">
                  <span className="font-playfair text-gold-600 text-3xl font-bold leading-none shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-charcoal/80 text-lg leading-relaxed">{fold}</p>
                </div>
              ))}
            </div>

            <div className="bg-charcoal rounded-2xl p-8 md:p-12">
              <p className="font-playfair text-xl md:text-2xl text-white leading-snug mb-10">
                The core of our work is equipping <span className="text-gold-400">The Wholesome Boy</span> through
                direct engagements — physical, virtual or hybrid.
              </p>

              <p className="text-gold-400 text-xs tracking-[0.35em] uppercase mb-6">Our Primary Instruments of Engagement</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                {instruments.map((item) => (
                  <li key={item.title} className="flex gap-4 items-start border-t border-white/10 py-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 mt-2.5" />
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      {item.desc && <p className="text-white/50 text-sm leading-relaxed mt-1">{item.desc}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <BoysEventGallery events={pastEvents} />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-gradient" />

        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Get Involved</span>
              </div>
              <h2
                className="font-playfair font-bold text-white leading-tight mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                Champion a<br />
                <span className="text-gold-400">Boy</span><br />
                Today.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Whether you&apos;re a parent, educator, mentor, or someone who cares about the next generation of men — there&apos;s a place for you in Boyspiration.
              </p>
            </div>

            <div className="animate-on-scroll-right space-y-5">
              {[
                { label: 'Join the group calls', desc: 'Be part of the ongoing Boyspiration community conversations.' },
                { label: 'Bring Boyspiration to your school', desc: 'Host an event, workshop, or bootcamp for the boys in your community.' },
                { label: 'Share the message', desc: 'Champion a boy in your life and help spread the Boyspiration vision.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 p-6 border border-white/8 rounded-2xl hover:border-gold-500/30 hover:bg-white/3 transition-all duration-300 group"
                >
                  <div className="w-6 h-6 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold-500/20 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1 group-hover:text-gold-300 transition-colors">{item.label}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/about"
                  className="px-8 py-4 border border-white/15 text-white font-medium rounded-full hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
                >
                  Meet Chineze
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  )
}
