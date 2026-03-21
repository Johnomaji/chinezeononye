'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  imageSrc: string
  aspect: number
  onCancel: () => void
  onConfirm: (blob: Blob) => void
}

export default function ImageCropperModal({ imageSrc, aspect, onCancel, onConfirm }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 })
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return
      setContainerSize({
        w: containerRef.current.clientWidth,
        h: containerRef.current.clientHeight,
      })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const cropSize = useMemo(() => {
    const { w, h } = containerSize
    if (!w || !h) return { w: 0, h: 0 }
    const containerRatio = w / h
    if (containerRatio > aspect) {
      const cropH = h
      return { w: cropH * aspect, h: cropH }
    }
    const cropW = w
    return { w: cropW, h: cropW / aspect }
  }, [containerSize, aspect])

  const baseScale = useMemo(() => {
    if (!imgSize.w || !imgSize.h || !cropSize.w || !cropSize.h) return 1
    return Math.max(cropSize.w / imgSize.w, cropSize.h / imgSize.h)
  }, [imgSize, cropSize])

  const scale = baseScale * zoom

  const clampOffset = (x: number, y: number) => {
    const { w: cw, h: ch } = containerSize
    const { w: iw, h: ih } = imgSize
    if (!cw || !ch || !iw || !ih) return { x, y }

    const renderedW = iw * scale
    const renderedH = ih * scale
    const cropLeft = (cw - cropSize.w) / 2
    const cropTop = (ch - cropSize.h) / 2
    const cropRight = cropLeft + cropSize.w
    const cropBottom = cropTop + cropSize.h
    const cx = cw / 2
    const cy = ch / 2

    const minX = cropRight - cx - renderedW / 2
    const maxX = cropLeft - cx + renderedW / 2
    const minY = cropBottom - cy - renderedH / 2
    const maxY = cropTop - cy + renderedH / 2

    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    }
  }

  useEffect(() => {
    setOffset(prev => clampOffset(prev.x, prev.y))
  }, [scale, cropSize.w, cropSize.h, containerSize.w, containerSize.h])

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const next = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }
    setOffset(clampOffset(next.x, next.y))
  }

  const handlePointerUp = () => setDragging(false)

  const handleConfirm = async () => {
    if (!imgRef.current || !containerRef.current) return
    const img = imgRef.current
    const { w: cw, h: ch } = containerSize
    const { w: iw, h: ih } = imgSize
    const cropLeft = (cw - cropSize.w) / 2
    const cropTop = (ch - cropSize.h) / 2
    const cx = cw / 2
    const cy = ch / 2
    const renderedW = iw * scale
    const renderedH = ih * scale
    const imageLeft = cx - renderedW / 2 + offset.x
    const imageTop = cy - renderedH / 2 + offset.y

    const sx = Math.max(0, (cropLeft - imageLeft) / scale)
    const sy = Math.max(0, (cropTop - imageTop) / scale)
    const sw = Math.min(iw, cropSize.w / scale)
    const sh = Math.min(ih, cropSize.h / scale)

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(sw)
    canvas.height = Math.round(sh)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
    canvas.toBlob((blob) => {
      if (blob) onConfirm(blob)
    }, 'image/jpeg', 0.9)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-[#111111] border border-gold-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Crop Image</h3>
          <button onClick={onCancel} className="text-white/40 hover:text-white">âœ•</button>
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-[360px] bg-black/40 rounded-xl overflow-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="To crop"
            onLoad={(e) => {
              const el = e.currentTarget
              setImgSize({ w: el.naturalWidth, h: el.naturalHeight })
            }}
            className="absolute top-1/2 left-1/2 select-none"
            style={{
              transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
              transformOrigin: 'center',
            }}
            draggable={false}
          />

          <div
            className="absolute border-2 border-gold-400/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"
            style={{
              width: cropSize.w,
              height: cropSize.h,
              left: (containerSize.w - cropSize.w) / 2,
              top: (containerSize.h - cropSize.h) / 2,
            }}
          />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-white/40 text-xs">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1"
          />
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-xl"
          >
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  )
}
