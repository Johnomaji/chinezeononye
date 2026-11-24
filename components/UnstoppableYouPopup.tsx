'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UnstoppableYouRegister from '@/components/UnstoppableYouRegister'
import { unstoppableYou, unstoppableYouDetails } from '@/lib/events'

const DELAY_MS = 5000
// Keyed by run id, so a returning visitor is shown the next run of the course too.
const SEEN_KEY = `uy-popup-seen:${unstoppableYou.id}`

// Fallback for browsers that block localStorage: at least don't repeat the
// popup on every page within the same visit.
let shownThisVisit = false

function hasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) !== null
  } catch {
    return false
  }
}

function markSeen() {
  shownThisVisit = true
  try {
    localStorage.setItem(SEEN_KEY, new Date().toISOString())
  } catch {}
}

export default function UnstoppableYouPopup() {
  // 'registering': the registration form has taken over. The popup hides but
  // stays mounted, because the form lives inside it.
  const [status, setStatus] = useState<'closed' | 'open' | 'registering'>('closed')
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (shownThisVisit || hasSeen() || Date.now() >= Date.parse(unstoppableYou.startsAt)) return
    const timer = setTimeout(() => {
      // A gallery or the registration form is already open; try again on the next page.
      if (document.body.style.overflow === 'hidden') return
      markSeen()
      setStatus('open')
    }, DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = useCallback(() => setStatus('closed'), [])

  useEffect(() => {
    if (status !== 'open') return
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [status, dismiss])

  if (status === 'closed') return null

  return (
    <div
      className={`fixed inset-0 z-[90] overflow-y-auto bg-black/75 backdrop-blur-sm ${
        status === 'registering' ? 'hidden' : ''
      }`}
    >
      <div
        className="min-h-full flex items-center justify-center p-4"
        onMouseDown={e => {
          if (e.target === e.currentTarget) dismiss()
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="uy-popup-title"
          className="relative w-full max-w-sm sm:max-w-3xl bg-charcoal border border-gold-500/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="hidden sm:flex sm:w-[44%] shrink-0 items-center bg-black">
            <Image
              src={unstoppableYou.flyer}
              alt={unstoppableYou.flyerAlt}
              width={1122}
              height={1280}
              sizes="340px"
              className="w-full h-auto"
            />
          </div>

          <div className="flex-1 px-6 sm:px-8 py-8 sm:py-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Upcoming Course Experience</span>
            </div>
            <h2 id="uy-popup-title" className="font-playfair text-3xl sm:text-4xl font-bold text-white leading-tight pr-8">
              {unstoppableYou.title}
            </h2>
            <p className="font-playfair italic text-gold-400 text-lg mt-2 mb-4">{unstoppableYou.tagline}</p>
            <ul className="space-y-1.5 mb-6 text-sm">
              {unstoppableYou.highlights.map(item => (
                <li key={item} className="flex gap-3 text-white/80">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <dl className="border-t border-white/10 mb-8 text-sm">
              {unstoppableYouDetails.map(d => (
                <div key={d.label} className="flex gap-4 py-2.5 border-b border-white/10">
                  <dt className="w-14 shrink-0 text-gold-400/80 text-[11px] tracking-widest uppercase pt-0.5">
                    {d.label}
                  </dt>
                  <dd className="text-white/90">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <UnstoppableYouRegister onOpen={() => setStatus('registering')} />
              <Link
                href="/growth#courses"
                onClick={dismiss}
                className="text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
