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
      'Growth is not a mood or a season of good intentions. It is a deliberate, structured commitment to developing one’s mindset, character, capacity and competence.',
      'Before a team can be strengthened or an institution transformed, there must be a person already on the path of growth willing to bring on same experience on the larger scale.',
      'The person is where the transformation begins.',
      'Growth that makes for lasting transformation in a person, starts with a self-awareness.',
    ],
  },
  {
    num: '02',
    tag: 'The Organisation',
    heading: 'Capacity is people, compounded',
    body: [
      'Organizations do not grow in abstract. They grow and transform as their people are wholesomely growing and transforming- in identity, in clarity, in capability and the confidence to authentically carry responsibility well.',
      'Through structured and bespoke growth frameworks, Eden partners with leaders and teams to unlock potential, strengthen capacity and translate growth into wholesome, meaningful, sustainable results that endure beyond the training room.',
    ],
  },
  {
    num: '03',
    tag: 'The Nation',
    heading: 'Systems that develop people, not just manage them',
    body: [
      'The same conviction extends to National development: Structured personal growth is not merely personal. It is a strategy for Organisational and National progress.',
      'This informs Eden’s in-depth training and consulting across MDAs; and her growing engagement in advisory, advocacy and policy conversations on how policies, systems and environments can intentionally develop and strengthen the institutions they serve.',
    ],
  },
]

const courses: {
  num: string
  title: string
  tagline: string
  body: string[]
  forYouIf?: string[]
  closing?: string
}[] = [
  {
    num: '01',
    title: 'The Unstoppable You',
    tagline: 'The Unstoppable You is the Growing You',
    body: [
      'Your proven, practical pathway to wholesome personal transformation, personal power and a more enriched life.',
      'More than a Course Experience, The Unstoppable You equips you with a practical formula for lifelong growth and transformation - empowering you to continually unlock your potential, take intentional action, and create the outcomes you desire across different areas of your life.',
    ],
    forYouIf: [
      'feel stuck, stagnant or frustrated with your current reality.',
      'know you are capable of more but struggle to translate your potential to progress.',
      'desire greater clarity, confidence and direction.',
      'are ready to take ownership of your growth and create meaningful, lasting change.',
    ],
    closing: 'Who you are becoming is foundational to everything you do, including your wealth creation.',
  },
  {
    num: '02',
    title: 'The Trophy Employee',
    tagline: 'Developing The Person. Elevating Workplace Performance',
    body: [
      'The Trophy Employee is a Signature professional development experience built on the conviction that Organisational excellence is strengthened by the personal growth levels of the employees who drive it.',
      'Through a holistic, structured approach to individual development, the program engages the employee as a whole person, fostering the self-awareness, personal responsibility, mindset and capacity needed to thrive both personally and professionally.',
      'By connecting personal growth with workplace expectations and Organisational objectives, the experience equips employees to move beyond performing assigned duties to wholesomely engaging meaningfully, taking ownership and contributing to sustained Organisational excellence.',
    ],
  },
  {
    num: '03',
    title: 'Wow Them - Win Them',
    tagline: 'Where Personal Growth Translates into Service Excellence, Customer Loyalty and Revenue Growth',
    body: [
      'Wow Them - Win Them is a holistic Customer Service and support development experience designed to help organizations embed service excellence into their culture, strengthen customer relationships, retain their customer base and grow revenue.',
      'Recognizing that exceptional customer engagement is influenced by the employee delivering the service, the experience goes beyond operational service skills to engage the employee as a whole person.',
      'By integrating personal development with practical customer service strategies, the experience equips employees with empathy, professionalism, personal ownership and a genuine commitment to delivering value beyond just the task. This is because an employee cannot truly and lastingly give what he is not experiencing in his personal life.',
      'The result is a workforce better equipped to deliver consistently excellent customer experiences, build lasting customer relationships, strengthen customer loyalty and contribute to sustainable business growth.',
    ],
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
  'Equip The Person. Strengthen The System. Shape The Future.',
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
              Growth &amp; Transformation
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
            <div className="text-white/50 text-lg leading-relaxed max-w-lg space-y-4">
              <p>This is Eden&rsquo;s forte.</p>
              <p>
                She has come to recognize that no matter how audacious the goals of an Organization
                or a Nation are, the full realization of those objectives depend on individuals
                committed to their own continuous personal growth - a conviction that underpins her
                work.
              </p>
            </div>
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
          <p className="font-playfair text-3xl md:text-5xl font-bold text-charcoal text-center md:text-left leading-tight tracking-tight">
            Equip The Person.<br />
            Strengthen The System.<br />
            <span className="italic">Shape The Future.</span>
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
                Signature Framework
              </span>
            </div>
            <h2 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal leading-tight">
              Our Signature<br />
              <span className="text-gold-600">Course Experiences.</span>
            </h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          {courses.map((course) => (
            <details key={course.num} className="animate-on-scroll border-t border-charcoal/10 group/stage">
              <summary className="flex gap-6 items-center py-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded">
                <span className="font-playfair text-gold-600/50 group-hover/stage:text-gold-600 text-3xl font-bold shrink-0 w-14 leading-none transition-colors duration-300">
                  {course.num}
                </span>
                <div className="flex-1">
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal group-hover/stage:text-gold-700 leading-snug transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="font-playfair italic text-gold-600 text-base md:text-lg mt-1">
                    {course.tagline}
                  </p>
                </div>
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
              <div className="pl-20 pr-10 pb-10 text-charcoal/60 leading-relaxed max-w-3xl space-y-4">
                {course.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {course.forYouIf && (
                  <div className="pt-2">
                    <p className="font-semibold text-charcoal mb-3">The Course is for you if you:</p>
                    <ul className="space-y-2">
                      {course.forYouIf.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {course.closing && (
                  <p className="font-playfair italic text-charcoal text-lg pt-2">{course.closing}</p>
                )}
              </div>
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
