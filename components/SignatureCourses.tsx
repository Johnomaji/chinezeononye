import { defaultAccountability, signatureCourses } from '@/lib/trainings'

/** The Signature Course Experiences as an expandable list, on a cream background. */
export default function SignatureCourses() {
  return (
    <>
      {signatureCourses.map((course) => (
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
            <div className="mt-6 border-l-4 border-gold-500 bg-gold-500/10 rounded-r-xl p-6 space-y-3 text-charcoal/75">
              <p className="text-gold-700 text-xs tracking-[0.3em] uppercase font-semibold">Format &amp; Delivery</p>
              <p className="font-semibold text-charcoal">{course.format}</p>
              <p>{course.accountability ?? defaultAccountability}</p>
              <p>Session can be delivered physically, virtually or hybrid.</p>
            </div>
          </div>
        </details>
      ))}
      <div className="border-t border-charcoal/10" />
    </>
  )
}
