import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'

export const metadata = {
  title: 'Boys / Sonspiration | Chineze Ononye',
  description: 'Equipping the wholesome boy child — Chineze Ononye\'s Sonspiration movement champions the emotional, spiritual, and social development of boys.',
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
  'Equipping the Wholesome Boy Child.',
  'A boy well-raised is a nation well-built.',
  'Boys don\'t need less — they need better.',
  'Wholesome men don\'t happen by accident. They are intentionally raised.',
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
    desc: 'A landmark event honouring the boy child — championing his worth, celebrating his potential, and affirming the investment he deserves.',
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
    desc: 'Bringing the Sonspiration message to DeRegnant School — spotlighting the value of every boy and the vision of wholesome manhood.',
  },
  {
    title: 'Sons Worshipping The Father 2.0 & Purpose-Day Party',
    year: '2024',
    type: 'Worship & Celebration',
    desc: 'Bigger, deeper, and paired with a Purpose-Day party — celebrating boys stepping into their God-given identity and calling.',
  },
  {
    title: '3-Day Boys Bootcamp — The Edge & Edges',
    year: '',
    type: 'Bootcamp',
    desc: 'An immersive three-day bootcamp pushing boys to their edge — building resilience, sharpening character, and equipping them to thrive in every dimension of life.',
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

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#0A0A0A] overflow-hidden">
        {/* Giant ghost word */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
        >
          <span
            className="font-playfair font-bold text-white leading-none"
            style={{ fontSize: 'clamp(8rem, 30vw, 26rem)', opacity: 0.03, letterSpacing: '-0.04em' }}
          >
            SONS
          </span>
        </div>

        {/* Diagonal gold beam */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute top-1/4 right-0 w-64 h-px bg-gradient-to-l from-gold-500/30 to-transparent" />
        <div className="absolute top-2/3 right-0 w-40 h-px bg-gradient-to-l from-gold-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
          {/* Label */}
          <div className="flex items-center gap-4 mb-12 animate-on-scroll">
            <div className="w-16 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium">Sonspiration</span>
          </div>

          {/* Headline */}
          <div className="animate-on-scroll">
            <h1 className="font-playfair font-bold text-white leading-[0.9] mb-10"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
            >
              Raising<br />
              <em className="not-italic text-gold-400">Wholesome</em><br />
              Sons.
            </h1>
          </div>

          {/* Sub + CTA row */}
          <div className="flex flex-col lg:flex-row gap-10 lg:items-end animate-on-scroll">
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              Boys are not broken. They are a generation waiting to be equipped,
              championed, and loved with intention.
            </p>
            <div className="flex flex-wrap gap-4 lg:ml-auto shrink-0">
              <Link
                href="/contact?subject=Sonspiration+%2F+Boy+Child"
                className="px-8 py-3.5 bg-gold-gradient text-charcoal font-bold text-sm rounded-full hover:shadow-2xl hover:shadow-gold-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                Join Sonspiration
              </Link>
              <a
                href="#events"
                className="px-8 py-3.5 border border-white/15 text-white text-sm font-medium rounded-full hover:border-gold-500/60 hover:text-gold-400 transition-all duration-300"
              >
                See Events ↓
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-gradient-to-b from-gold-400/60 to-transparent" />
        </div>
      </section>

      {/* ─── MISSION BANNER ─── */}
      <section className="relative py-16 bg-gold-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-1 h-16 bg-charcoal/30 rounded-full shrink-0 hidden md:block" />
          <p className="font-playfair text-2xl md:text-4xl font-bold text-charcoal text-center md:text-left leading-snug">
            &ldquo;Equipping the Wholesome Boy Child.&rdquo;
          </p>
          <div className="md:ml-auto shrink-0">
            <span className="text-charcoal/50 text-sm tracking-widest uppercase">The Sonspiration Mission</span>
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
        <div aria-hidden className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 font-playfair font-bold text-white leading-none" style={{ fontSize: '22vw', opacity: 0.025 }}>
          WHY
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: sticky label */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">The Why</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight">
                Why the<br />Boy Child<br />
                <span className="text-gold-400">Matters.</span>
              </h2>
            </div>

            {/* Right: content */}
            <div className="lg:col-span-8 space-y-0 animate-on-scroll-right">
              {[
                {
                  heading: 'A generation left without language.',
                  body: 'Boys are growing up without the emotional vocabulary, identity anchors, or safe spaces to wrestle with who they are becoming. The result is young men who feel lost — forced to perform a version of themselves that costs everything on the inside.',
                },
                {
                  heading: 'The need is not weakness — it\'s wisdom.',
                  body: 'Investing in a boy is not coddling him. It is equipping him. A boy who is seen, heard, and intentionally built becomes a man who can lead, love, and serve without losing himself in the process.',
                },
                {
                  heading: 'Wholeness, not softness or hardness.',
                  body: 'Sonspiration is not about producing soft boys or hard men. It is about raising whole ones — anchored, purposeful, and emotionally capable of carrying the weight of the lives they will one day lead.',
                },
              ].map((block, i) => (
                <div
                  key={i}
                  className="border-t border-white/10 py-10 group"
                >
                  <div className="flex gap-6 items-start">
                    <span className="font-playfair text-gold-500/30 text-4xl font-bold shrink-0 group-hover:text-gold-500/60 transition-colors duration-300 leading-none mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors duration-300">
                        {block.heading}
                      </h3>
                      <p className="text-white/50 leading-relaxed">{block.body}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOCUS AREAS ─── */}
      <section className="bg-cream relative overflow-hidden">
        {/* Section label */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-0 animate-on-scroll">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">What We Build</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal leading-tight">
                Built<br /><span className="text-gold-600">Inside</span> Out.
              </h2>
            </div>
            <p className="md:ml-auto md:max-w-xs text-charcoal/55 text-sm leading-relaxed">
              Sonspiration works on six pillars that produce wholesome, grounded, purposeful young men.
            </p>
          </div>
        </div>

        {/* Grid that inverts on hover */}
        <div className="border-t border-charcoal/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, i) => (
              <div
                key={area.num}
                className="animate-on-scroll group relative border-b border-r border-charcoal/10 p-10 bg-cream hover:bg-charcoal transition-all duration-500 cursor-default overflow-hidden"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Ghost number bg */}
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

      {/* ─── TAGLINES ─── Full-bleed cinematic quotes */}
      <section className="bg-[#0A0A0A]">
        {taglines.map((quote, i) => (
          <div
            key={i}
            className={`animate-on-scroll border-b border-white/8 group hover:bg-white/[0.02] transition-colors duration-500 ${
              i % 2 === 0 ? '' : 'bg-[#0D0D0D]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
              <div className={`flex items-center gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                <div className={`shrink-0 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                  <span className="font-playfair text-gold-500/20 text-7xl font-bold group-hover:text-gold-500/30 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={`w-px h-16 bg-gold-500/20 shrink-0 hidden md:block group-hover:bg-gold-500/50 transition-colors duration-300`} />
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

      {/* ─── PAST EVENTS ─── Timeline list, not cards */}
      <section id="events" className="py-32 bg-cream relative overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-playfair font-bold text-charcoal leading-none" style={{ fontSize: '18vw', opacity: 0.03 }}>
          EVENTS
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
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
                From worship experiences and identity bootcamps to school celebrations and group series — here is Sonspiration on the ground.
              </p>
            </div>
          </div>

          {/* Event list */}
          <div className="space-y-0">
            {pastEvents.map((event, i) => (
              <div
                key={i}
                className="animate-on-scroll group border-t border-charcoal/10 py-8 md:py-10 grid grid-cols-12 gap-6 items-start hover:bg-charcoal/[0.03] transition-colors duration-300 -mx-6 px-6"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="font-playfair text-3xl md:text-4xl font-bold text-charcoal/15 group-hover:text-gold-500/40 transition-colors duration-300 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title + desc */}
                <div className="col-span-10 md:col-span-8">
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-charcoal group-hover:text-gold-700 transition-colors duration-300 mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-charcoal/50 text-sm leading-relaxed">{event.desc}</p>
                </div>

                {/* Meta */}
                <div className="col-span-12 md:col-span-3 flex md:flex-col gap-3 md:items-end md:justify-start pt-1">
                  <span className="inline-block px-3 py-1 border border-charcoal/15 text-charcoal/50 text-xs rounded-full group-hover:border-gold-400/40 group-hover:text-gold-600 transition-colors duration-300">
                    {event.type}
                  </span>
                  {event.year && (
                    <span className="font-playfair font-bold text-gold-500 text-xl">
                      {event.year}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="border-t border-charcoal/10" />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── Split, bold */}
      <section className="bg-[#0A0A0A] relative overflow-hidden">
        {/* Gold vertical bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-gradient" />

        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Get Involved</span>
              </div>
              <h2 className="font-playfair font-bold text-white leading-tight mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                Champion a<br />
                <span className="text-gold-400">Boy</span><br />
                Today.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Whether you&apos;re a parent, educator, mentor, or someone who cares about the next generation of men — there&apos;s a place for you in Sonspiration.
              </p>
            </div>

            <div className="animate-on-scroll-right space-y-5">
              {[
                { label: 'Join the group calls', desc: 'Be part of the ongoing Sonspiration community conversations.' },
                { label: 'Bring Sonspiration to your school', desc: 'Host an event, workshop, or bootcamp for the boys in your community.' },
                { label: 'Share the message', desc: 'Champion a boy in your life and help spread the Sonspiration vision.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-6 border border-white/8 rounded-2xl hover:border-gold-500/30 hover:bg-white/3 transition-all duration-300 group">
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
                  href="/contact?subject=Sonspiration+%2F+Boy+Child"
                  className="px-8 py-4 bg-gold-gradient text-charcoal font-bold rounded-full hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Join Sonspiration
                </Link>
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
