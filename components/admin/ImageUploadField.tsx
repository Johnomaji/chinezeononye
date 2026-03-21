'use client'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ImageCropperModal from './ImageCropperModal'

interface Props {
  label: string
  value: string
  onChange: (url: string) => void
  aspect: number
  helper?: string
  onUnauthorized?: () => void
}

export default function ImageUploadField({ label, value, onChange, aspect, helper, onUnauthorized }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [cropSrc, setCropSrc] = useState<string | null>(null)

  const openFilePicker = () => fileInputRef.current?.click()

  const handleFile = async (file?: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large (max 5MB).')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setCropSrc(String(reader.result))
    reader.readAsDataURL(file)
  }

  const uploadBlob = async (blob: Blob) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', new File([blob], 'upload.jpg', { type: 'image/jpeg' }))
      const res = await fetch('/api/uploads', { method: 'POST', body: formData })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        onUnauthorized?.()
        return
      }
      const data = await res.json()
      if (res.ok) {
        onChange(data.url)
        toast.success('Image uploaded')
      } else {
        toast.error(data.error || 'Upload failed')
      }
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium">{label}</h3>
        <button
          type="button"
          onClick={openFilePicker}
          disabled={uploading}
          className="px-3 py-1.5 text-xs text-white/70 border border-white/20 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-60"
        >
          {uploading ? 'Uploading...' : 'Select Image'}
        </button>
      </div>

      <div
        className={`rounded-xl border border-dashed p-4 text-center text-sm transition-colors ${
          dragging ? 'border-gold-400 bg-gold-500/10 text-gold-300' : 'border-white/20 text-white/40'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files?.[0]
          handleFile(file)
        }}
      >
        Drag & drop an image here, or{' '}
        <button type="button" onClick={openFilePicker} className="text-gold-400 underline">
          browse
        </button>
        <div className="text-xs text-white/30 mt-1">JPG, PNG, WEBP, GIF (max 5MB)</div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          handleFile(file)
          e.currentTarget.value = ''
        }}
      />

      <div>
        <label className="block text-xs text-white/50 mb-1.5">Image URL</label>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/20"
        />
        {helper && <p className="text-white/30 text-xs mt-1">{helper}</p>}
      </div>

      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="w-full h-36 object-cover rounded-lg" />
      )}

      {cropSrc && (
        <ImageCropperModal
          imageSrc={cropSrc}
          aspect={aspect}
          onCancel={() => setCropSrc(null)}
          onConfirm={(blob) => {
            setCropSrc(null)
            uploadBlob(blob)
          }}
        />
      )}
    </div>
  )
}
