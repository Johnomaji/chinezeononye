'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface GalleryPhoto {
  src: string
  width: number
  height: number
  title: string
  caption: string
}

function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: GalleryPhoto[]
  startIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(startIndex)
  const photo = photos[current]

  const prev = useCallback(() => setCurrent((c) => (c - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % photos.length), [photos.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col" onClick={onClose}>
      <div
        className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-0.5">{photo.caption}</p>
          <h3 className="font-playfair text-white font-bold text-lg leading-snug max-w-xl">{photo.title}</h3>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-white/30 text-sm tabular-nums">
            {current + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-gold-500/50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 relative min-h-0 px-16 py-6" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-w-5xl mx-auto">
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.title}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:bg-gold-500/20 hover:border-gold-500/40 hover:text-gold-400 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:bg-gold-500/20 hover:border-gold-500/40 hover:text-gold-400 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function GrowthGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setOpenIndex(i)}
            className="group relative block w-full mb-5 break-inside-avoid rounded-2xl overflow-hidden bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-gold-400 text-[0.65rem] tracking-[0.25em] uppercase mb-1">{photo.caption}</p>
              <p className="font-playfair text-white font-bold leading-snug">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox photos={photos} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  )
}
