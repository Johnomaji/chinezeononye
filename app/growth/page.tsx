import Link from 'next/link'
import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Growth & Transformation | Chineze Eden',
  description:
    'Structured Personal Growth — Chineze Eden partners with individuals, organisations, and institutions to unlock potential, strengthen capacity, and translate growth into sustainable results.',
  path: '/growth',
})

const stats = [
  { value: '3', label: 'Levels of Growth' },
  { value: '2', label: 'Decades in the Public Sector' },
  { value: '2021', label: 'The Journey Began' },
  { value: '500+', label: 'Lives Impacted' },
]

const levels = [
  {
    num: '01',
    tag: 'The Individual',
    heading: 'It begins with a person who decides to grow',
    body: [
      'Growth is not a mood, a motivational high, or a season of good intentions. It is a structure — chosen deliberately, built patiently, and stood upon for the rest of a life.',
      'The work starts here because it cannot start anywhere else. Before a team can be strengthened or an institution reformed, there has to be a person willing to look honestly at who they are, who they are becoming, and the distance between the two.',
    ],
  },
  {
    num: '02',
    tag: 'The Organisation',
    heading: 'Capacity is people, compounded',
    body: [
      'Organisations do not grow in the abstract. They grow because the people inside them grow — in clarity, in capability, in the confidence to carry responsibility well.',
      'Through structured and bespoke growth frameworks, Chineze partners with leaders and teams to unlock potential, strengthen capacity, and translate growth into meaningful, sustainable results — rather than training that is felt for a week and forgotten by the next quarter.',
    ],
  },
  {
    num: '03',
    tag: 'The Nation',
    heading: 'Systems that develop people, not just manage them',
    body: [
      'The same conviction scales. Structured personal growth is not merely personal — it is a strategy for organisational and national development.',
      'This informs a growing engagement in advisory, advocacy, and policy conversations: how policies, systems, and environments might move beyond simply managing people to intentionally developing people and strengthening the institutions they serve.',
    ],
  },
]

const framework = [
  {
    num: '01',
    title: 'Identity Breakthrough',
    desc: 'Everything stable is built on something settled. Before strategy, before goals, the work is to establish who you are apart from what you achieve — because an identity borrowed from performance collapses the moment performance does.',
  },
  {
    num: '02',
    title: 'Vision Mapping',
    desc: 'Clarity is kindness to your future self. Here the vague becomes specific: what is actually being built, why it matters, and what it will ask of you — named plainly enough to be pursued.',
  },
  {
    num: '03',
    title: 'Limitless Mindset',
    desc: 'Most ceilings are internal before they are circumstantial. This is the deliberate work of surfacing the assumptions quietly setting the limit, and replacing them with ones that hold weight.',
  },
  {
    num: '04',
    title: 'Action Blueprint',
    desc: 'Insight that never becomes a step is entertainment. The journey closes with a structure for the ordinary days — the deliberate, repeatable actions that turn conviction into a changed life.',
  },
]

const engagements = [
  {
    title: 'Executive & Leadership Coaching',
    desc: 'One-to-one partnership with leaders carrying real weight — clarifying identity, sharpening vision, and building the inner structure the role demands.',
  },
  {
    title: 'Team & Organisational Training',
    desc: 'Structured sessions that build shared language and capability across a team, so growth becomes a culture rather than an individual effort.',
  },
  {
    title: 'Bespoke Growth Frameworks',
    desc: 'Frameworks designed around the specific institution — its people, pressures, and goals — rather than a programme lifted from elsewhere.',
  },
  {
    title: 'Institutional Advisory',
    desc: 'Advisory and advocacy work on the policies, systems, and environments that shape whether people in an institution are developed or merely managed.',
  },
  {
    title: 'Keynotes & Masterclasses',
    desc: 'The Unstoppable You, delivered to a room — as a keynote that shifts the air or an extended masterclass that sends people home with tools.',
  },
  {
    title: 'Group Coaching Series',
    desc: 'A sustained series rather than a single sitting, layering structured growth on identity and value system over time.',
  },
]

const convictions = [
  'Equip the person. Strengthen the system. Shape the future.',
  'Transformation is never merely transactional; it is deeply human.',
  'Transformation begins within — but its impact should reach far beyond the individual.',
]

export default function GrowthPage() {
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
            style={{ fontSize: 'clamp(7rem, 27vw, 24rem)', opacity: 0.03, letterSpacing: '-0.04em' }}
          >
            GROWTH
          </span>
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute top-1/4 right-0 w-64 h-px bg-gradient-to-l from-gold-500/30 to-transparent" />
        <div className="absolute top-2/3 right-0 w-40 h-px bg-gradient-to-l from-gold-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
          <div className="flex items-center gap-4 mb-12 animate-on-scroll">
            <div className="w-16 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium">
              Transformation &amp; Growth
            </span>
          </div>

          <div className="animate-on-scroll">
            <h1
              className="font-playfair font-bold text-white leading-[0.9] mb-10"
              style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)' }}
            >
              Structured<br />
              <em className="not-italic text-gold-400">Personal</em><br />
              Growth
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:items-end animate-on-scroll">
            <p className="text-white/50 text-lg leading-relaxed max-w-lg">
              No matter how audacious the goals of an organisation or a nation may be, they can only
              be fully realised by individuals committed to their own personal growth.
            </p>
            <div className="flex flex-wrap gap-4 lg:ml-auto shrink-0">
              <a
                href="#levels"
                className="px-8 py-3.5 border border-white/15 text-white text-sm font-medium rounded-full hover:border-gold-500/60 hover:text-gold-400 transition-all duration-300"
              >
                The Three Levels ↓
              </a>
              <Link
                href="/contact?subject=Growth+%26+Transformation"
                className="px-8 py-3.5 bg-gold-gradient text-charcoal text-sm font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 bg-gradient-to-b from-gold-400/60 to-transparent" />
        </div>
      </section>

      {/* ─── BANNER ─── */}
      <section className="relative py-16 bg-gold-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-1 h-16 bg-charcoal/30 rounded-full shrink-0 hidden md:block" />
          <p className="font-playfair text-2xl md:text-4xl font-bold text-charcoal text-center md:text-left leading-snug">
            Equip the person. Strengthen the system. Shape the future.
          </p>
          <div className="md:ml-auto shrink-0">
            <span className="text-charcoal/50 text-sm tracking-widest uppercase">The Thread</span>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-[#111111] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="py-14 px-4 text-center group">
                <div className="font-playfair text-4xl md:text-5xl font-bold text-gold-400 mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs tracking-widest uppercase leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE THREE LEVELS ─── */}
      <section id="levels" className="py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 font-playfair font-bold text-white leading-none"
          style={{ fontSize: '20vw', opacity: 0.025 }}
        >
          LEVELS
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32 animate-on-scroll-left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">The Scale</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
                One idea,<br />
                three<br />
                <span className="text-gold-400">levels.</span>
              </h2>
              <p className="text-white/45 leading-relaxed max-w-sm">
                Structured personal growth is not merely personal. It is the same discipline, applied
                at widening scale — and it does not skip a level.
              </p>
            </div>

            <div className="lg:col-span-8 animate-on-scroll-right">
              {levels.map((level) => (
                <div
                  key={level.num}
                  className="border-t border-white/10 group hover:bg-white/[0.02] transition-colors duration-500"
                >
                  <div className="flex gap-6 items-start py-12">
                    <span className="font-playfair text-gold-500/30 text-4xl font-bold shrink-0 w-14 group-hover:text-gold-500/60 transition-colors duration-300 leading-none mt-1">
                      {level.num}
                    </span>
                    <div className="flex-1">
                      <span className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-3 block">
                        {level.tag}
                      </span>
                      <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white leading-snug mb-5 group-hover:text-gold-300 transition-colors duration-300">
                        {level.heading}
                      </h3>
                      <div className="space-y-4">
                        {level.body.map((para, j) => (
                          <p key={j} className="text-white/50 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE FRAMEWORK ─── */}
      <section className="bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
          <div className="animate-on-scroll">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">
                The Signature Framework
              </span>
            </div>
            <h2 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal leading-tight">
              From limitation<br />
              to <span className="text-gold-600">limitless.</span>
            </h2>
            <p className="text-charcoal/55 text-lg leading-relaxed max-w-xl mt-8">
              The Unstoppable You moves through four stages, in order. Each one holds the next up —
              which is why the work is structured rather than inspirational.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          {framework.map((stage) => (
            <details key={stage.num} className="animate-on-scroll border-t border-charcoal/10 group/stage">
              <summary className="flex gap-6 items-center py-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded">
                <span className="font-playfair text-gold-600/50 group-hover/stage:text-gold-600 text-3xl font-bold shrink-0 w-14 leading-none transition-colors duration-300">
                  {stage.num}
                </span>
                <h3 className="flex-1 font-playfair text-2xl md:text-3xl font-bold text-charcoal group-hover/stage:text-gold-700 leading-snug transition-colors duration-300">
                  {stage.title}
                </h3>
                <svg
                  className="w-6 h-6 shrink-0 text-gold-600/60 group-hover/stage:text-gold-600 group-open/stage:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pl-20 pr-10 pb-8 text-charcoal/60 leading-relaxed max-w-3xl">{stage.desc}</p>
            </details>
          ))}
          <div className="border-t border-charcoal/10" />

          <div className="mt-12">
            <Link
              href="/speaking"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors group/link"
            >
              See it delivered as a keynote or masterclass
              <svg
                className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CONVICTIONS ─── */}
      <section className="bg-[#0A0A0A]">
        {convictions.map((quote, i) => (
          <div
            key={i}
            className={`animate-on-scroll border-b border-white/8 group hover:bg-white/[0.02] transition-colors duration-500 ${
              i % 2 !== 0 ? 'bg-[#0D0D0D]' : ''
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
              <div className={`flex items-center gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                <div className="shrink-0">
                  <span className="font-playfair text-gold-500/20 text-7xl font-bold group-hover:text-gold-500/30 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="w-px h-16 bg-gold-500/20 shrink-0 hidden md:block group-hover:bg-gold-500/50 transition-colors duration-300" />
                <blockquote
                  className={`font-playfair font-bold text-white/80 group-hover:text-white leading-tight transition-colors duration-300 ${
                    i % 2 !== 0 ? 'md:text-right' : ''
                  }`}
                  style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)' }}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── WHO IT IS FOR / PORTRAIT ─── */}
      <section className="py-32 bg-cream relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-playfair font-bold text-charcoal leading-none"
          style={{ fontSize: '18vw', opacity: 0.03 }}
        >
          WORK
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 animate-on-scroll-left">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src="/Chinezered-e1745223506142.jpg"
                alt="Chineze Eden"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            </div>
            <div className="bg-charcoal rounded-2xl p-7 mt-6">
              <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">The Practitioner</p>
              <p className="text-white/70 leading-relaxed text-sm">
                Transformation Strategist, Consultant, Speaker, and Author — bringing close to two
                decades of Nigerian public sector experience, institutional insight, and a deeply
                relational approach to the work.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
              >
                Read her full story
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 animate-on-scroll-right">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">Ways to Engage</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-10">
              How the work<br />
              <span className="text-gold-600">takes shape.</span>
            </h2>

            <div>
              {engagements.map((item, i) => (
                <div
                  key={item.title}
                  className="animate-on-scroll border-t border-charcoal/10 py-7 flex gap-5 items-start group hover:bg-charcoal/[0.03] transition-colors duration-300 -mx-4 px-4"
                >
                  <span className="font-playfair text-charcoal/15 text-2xl font-bold shrink-0 w-10 leading-none mt-1 group-hover:text-gold-500/50 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-playfair font-bold text-charcoal text-lg leading-snug group-hover:text-gold-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-charcoal/55 text-sm leading-relaxed mt-1.5">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-charcoal/10" />
            </div>
          </div>
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
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Begin</span>
              </div>
              <h2
                className="font-playfair font-bold text-white leading-tight mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                The <span className="text-gold-400">unstoppable</span><br />
                you is the<br />
                growing you.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Whether you are one person deciding to take your own growth seriously, or a leader
                responsible for the capacity of many — the structure is the same. It simply has to
                be started.
              </p>
            </div>

            <div className="animate-on-scroll-right space-y-5">
              {[
                {
                  label: 'For yourself',
                  desc: 'Coaching and a structured path through the four stages, at your own pace.',
                },
                {
                  label: 'For your team',
                  desc: 'Training and frameworks built around your organisation, its people and its pressures.',
                },
                {
                  label: 'For your institution',
                  desc: 'Advisory on the systems and policies that decide whether people are developed or merely managed.',
                },
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
                  href="/contact?subject=Growth+%26+Transformation"
                  className="px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="/speaking"
                  className="px-8 py-4 border border-white/15 text-white font-medium rounded-full hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
                >
                  Speaking &amp; Workshops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
