import Link from 'next/link'
import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import ScrollAnimator from '@/components/ScrollAnimator'
import SignatureCourses from '@/components/SignatureCourses'
import { pageMetadata } from '@/lib/seo'
import { engagements } from '@/lib/trainings'

export const metadata = pageMetadata({
  title: 'Trainings | Eden Chineze',
  description:
    'Signature Course Experiences and bespoke trainings from Eden Chineze for individuals, teams and organisations, delivered physically, virtually or hybrid.',
  path: '/trainings',
})

const TRAINING_ENQUIRY = '/contact?subject=Workshop+%2F+Training'

const steps = [
  {
    title: 'Start a Conversation',
    desc: 'Tell us about your people, your goals and where you want to go.',
  },
  {
    title: 'Shape the Experience',
    desc: 'Together we choose a Signature Course Experience or design a bespoke framework around your institution.',
  },
  {
    title: 'Deliver',
    desc: 'Sessions for a group or the whole organisation, delivered physically, virtually or hybrid.',
  },
  {
    title: 'Follow Through',
    desc: 'A one-hour accountability session follows 90 days after, so growth is reviewed, not assumed.',
  },
]

export default function TrainingsPage() {
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
            style={{ fontSize: 'clamp(6rem, 22vw, 20rem)', opacity: 0.03, letterSpacing: '-0.04em' }}
          >
            EQUIP
          </span>
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute top-1/4 right-0 w-64 h-px bg-gradient-to-l from-gold-500/30 to-transparent" />
        <div className="absolute top-2/3 right-0 w-40 h-px bg-gradient-to-l from-gold-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-12 animate-on-scroll">
              <div className="w-16 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium">Trainings</span>
            </div>

            <div className="animate-on-scroll">
              <h1
                className="font-playfair font-bold text-white leading-[0.9] mb-10"
                style={{ fontSize: 'clamp(3rem, 8.5vw, 7.5rem)' }}
              >
                Trainings<br />
                That <em className="not-italic text-gold-400">Equip</em>
              </h1>
            </div>

            <div className="animate-on-scroll space-y-5 max-w-xl">
              <p className="text-white/50 text-lg leading-relaxed">
                Structured, bespoke course experiences for individuals, teams and organisations, built
                on the conviction that organisational excellence is strengthened by the personal growth
                of the people who drive it.
              </p>
              <p className="text-white/50 text-lg leading-relaxed">
                Every experience can be delivered physically, virtually or hybrid, and is followed by an
                accountability session 90 days after.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10 animate-on-scroll">
              <Link
                href={TRAINING_ENQUIRY}
                className="px-8 py-3.5 bg-gold-gradient text-charcoal text-sm font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Book a Training
              </Link>
              <a
                href="#courses"
                className="px-8 py-3.5 border border-white/15 text-white text-sm font-medium rounded-full hover:border-gold-500/60 hover:text-gold-400 transition-all duration-300"
              >
                Explore the Courses ↓
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block animate-on-scroll-right">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/growth-customer-service-training.jpeg"
                alt="Eden Chineze facilitating a customer support service training"
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border-2 border-gold-400/20" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 bg-gradient-to-b from-gold-400/60 to-transparent" />
        </div>
      </section>

      {/* ─── BRAND PROMISE ─── */}
      <section className="relative py-16 md:py-20 bg-gold-gradient overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center animate-on-scroll">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-charcoal/40" />
            <span className="text-charcoal/70 text-xs tracking-[0.35em] uppercase font-semibold">The Brand Promise</span>
            <div className="w-8 h-px bg-charcoal/40" />
          </div>
          <p className="font-playfair text-3xl md:text-5xl font-bold text-charcoal leading-snug">
            Equipped through every Experience with us, and Equipped for life.
          </p>
        </div>
      </section>

      {/* ─── SIGNATURE COURSE EXPERIENCES ─── */}
      <section id="courses" className="bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-on-scroll">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">Signature Framework</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal leading-tight">
                Our Signature<br />
                <span className="text-gold-600">Course Experiences.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <p className="text-charcoal/55 text-lg leading-relaxed">
                Open any course to see what it covers and how it is delivered.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          <SignatureCourses />

          <div className="mt-12">
            <Link
              href={TRAINING_ENQUIRY}
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white font-semibold rounded-full hover:bg-gold-600 transition-colors duration-300"
            >
              Bring a Course to Your Team
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WAYS TO ENGAGE ─── */}
      <section className="py-28 bg-[#0D0D0D] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 font-playfair font-bold text-white leading-none"
          style={{ fontSize: '20vw', opacity: 0.025 }}
        >
          ENGAGE
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16 animate-on-scroll">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Ways to Engage</span>
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight">
                Beyond the<br />
                <span className="text-gold-400">course room.</span>
              </h2>
            </div>
            <p className="text-white/45 leading-relaxed max-w-md lg:ml-auto">
              Alongside the Signature Course Experiences, the work comes in the shape your people and
              institution need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {engagements.map((item, i) => (
              <div
                key={item.title}
                className="animate-on-scroll bg-white/[0.03] border border-gold-500/15 rounded-2xl p-8 hover:bg-white/[0.06] hover:border-gold-500/40 transition-all duration-300 group"
                style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              >
                <span className="font-playfair text-gold-500/30 text-3xl font-bold leading-none group-hover:text-gold-500/60 transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-playfair text-xl font-bold text-white mt-5 mb-3 group-hover:text-gold-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW TO ENGAGE ─── */}
      <section className="py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 animate-on-scroll">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-600 text-xs tracking-[0.35em] uppercase">How to Engage</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-charcoal leading-tight">
              From first conversation<br />
              <span className="text-gold-600">to lasting growth.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="animate-on-scroll border-t-2 border-gold-500/30 pt-6" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="font-playfair text-gold-600 text-4xl font-bold leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-playfair text-xl font-bold text-charcoal mt-4 mb-2">{step.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-gradient" />
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 animate-on-scroll">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs tracking-[0.35em] uppercase">Let&apos;s Begin</span>
              </div>
              <h2
                className="font-playfair font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
              >
                Equip your people.<br />
                <span className="text-gold-400">Elevate</span> your results.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 lg:ml-auto shrink-0">
              <Link
                href={TRAINING_ENQUIRY}
                className="px-8 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Book a Training
              </Link>
              <Link
                href="/growth"
                className="px-8 py-4 border border-white/15 text-white font-medium rounded-full hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
              >
                Growth &amp; Transformation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
