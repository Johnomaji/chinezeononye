'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface BoysEvent {
  title: string
  year: string
  type: string
  desc: string
  images: string[]
  schools?: string[]
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ImageModal({
  event,
  startIndex,
  onClose,
}: {
  event: BoysEvent
  startIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(() => setCurrent((c) => (c - 1 + event.images.length) % event.images.length), [event.images.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % event.images.length), [event.images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/98 flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-0.5">{event.type}{event.year ? ` · ${event.year}` : ''}</p>
          <h3 className="font-playfair text-white font-bold text-lg leading-snug max-w-lg">{event.title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/30 text-sm tabular-nums">{current + 1} / {event.images.length}</span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-gold-500/50 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Image */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0 px-16 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-w-4xl">
          <Image
            key={event.images[current]}
            src={event.images[current]}
            alt={`${event.title} — image ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>

        {event.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:bg-gold-500/20 hover:border-gold-500/40 hover:text-gold-400 transition-all duration-200"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:bg-gold-500/20 hover:border-gold-500/40 hover:text-gold-400 transition-all duration-200"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {event.images.length > 1 && (
        <div
          className="shrink-0 flex gap-2 px-6 pb-4 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {event.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                i === current ? 'border-gold-400 opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function EventGalleryModal({
  event,
  onClose,
}: {
  event: BoysEvent
  onClose: () => void
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (lightboxIndex !== null) {
    return (
      <ImageModal
        event={event}
        startIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0F0F0F] border border-white/10 rounded-t-3xl md:rounded-3xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top bar */}
        <div className="h-1 bg-gold-gradient shrink-0" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-white/8 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2.5 py-0.5 border border-gold-500/30 text-gold-400 text-xs rounded-full tracking-wide">
                {event.type}
              </span>
              {event.year && (
                <span className="font-playfair text-gold-400 font-bold text-sm">{event.year}</span>
              )}
            </div>
            <h3 className="font-playfair text-white font-bold text-xl leading-snug">{event.title}</h3>
            <p className="text-white/40 text-sm mt-1.5 leading-relaxed">{event.desc}</p>
            {event.schools && event.schools.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {event.schools.map((school) => (
                  <span key={school} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-gold-500/20 text-gold-400 text-xs rounded-full">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {school}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/40 transition-colors mt-0.5"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Image grid */}
        <div className="overflow-y-auto flex-1 p-5">
          <div
            className={`grid gap-3 ${
              event.images.length === 1
                ? 'grid-cols-1'
                : event.images.length === 2
                ? 'grid-cols-2'
                : 'grid-cols-2 md:grid-cols-3'
            }`}
          >
            {event.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <Image
                  src={img}
                  alt={`${event.title} — photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 45vw, 30vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-white/20 text-xs pb-4 shrink-0">
          Click any photo to expand · {event.images.length} photo{event.images.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

export default function BoysEventGallery({ events }: { events: BoysEvent[] }) {
  const [activeEvent, setActiveEvent] = useState<BoysEvent | null>(null)

  return (
    <>
      <div className="space-y-0">
        {events.map((event, i) => (
          <div
            key={i}
            className="group border-t border-charcoal/10 py-8 md:py-10 grid grid-cols-12 gap-4 md:gap-6 items-start hover:bg-charcoal/[0.03] transition-colors duration-300 -mx-6 px-6"
          >
            {/* Number */}
            <div className="col-span-2 md:col-span-1">
              <span className="font-playfair text-3xl md:text-4xl font-bold text-charcoal/15 group-hover:text-gold-500/40 transition-colors duration-300 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Title + desc */}
            <div className="col-span-10 md:col-span-7">
              <h3 className="font-playfair text-xl md:text-2xl font-bold text-charcoal group-hover:text-gold-700 transition-colors duration-300 mb-2 leading-snug">
                {event.title}
              </h3>
              <p className="text-charcoal/50 text-sm leading-relaxed">{event.desc}</p>

              {event.schools && event.schools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {event.schools.map((school) => (
                    <span key={school} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-50 border border-gold-200 text-gold-700 text-xs rounded-full font-medium">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {school}
                    </span>
                  ))}
                </div>
              )}

              {event.images.length > 0 && (
                <button
                  onClick={() => setActiveEvent(event)}
                  className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors group/btn"
                >
                  <span className="flex gap-1.5">
                    {event.images.slice(0, 3).map((img, j) => (
                      <span key={j} className="relative w-8 h-8 rounded overflow-hidden inline-block border border-gold-200">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </span>
                    ))}
                    {event.images.length > 3 && (
                      <span className="w-8 h-8 rounded bg-gold-50 border border-gold-200 inline-flex items-center justify-center text-gold-600 font-bold text-xs">
                        +{event.images.length - 3}
                      </span>
                    )}
                  </span>
                  <span className="underline underline-offset-2 group-hover/btn:no-underline">
                    View photo{event.images.length !== 1 ? 's' : ''}
                  </span>
                  <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Meta */}
            <div className="col-span-12 md:col-span-4 flex md:flex-col gap-3 md:items-end md:justify-start pt-1">
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

      {activeEvent && (
        <EventGalleryModal event={activeEvent} onClose={() => setActiveEvent(null)} />
      )}
    </>
  )
}
