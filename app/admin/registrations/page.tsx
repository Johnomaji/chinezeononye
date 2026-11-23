'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { formatNaira } from '@/lib/events'

type Registration = {
  reference: string
  runId: string
  name: string
  email: string
  phone: string
  paidNaira: number
  paidAt: string | null
  certificate: { issuedAt: string } | null
}

type RegistrationsData = {
  currentRunId: string
  runs: { id: string; label: string }[]
  certificates: 'ok' | 'not-configured' | 'error'
  registrations: Registration[]
}

// Matches MAX_CERTIFICATE_BYTES in lib/certificates.ts, so oversized files are caught before uploading.
const MAX_CERTIFICATE_BYTES = 4 * 1024 * 1024
const CERTIFICATE_TYPES = ['application/pdf', 'image/png', 'image/jpeg']

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { timeZone: 'Africa/Lagos', dateStyle: 'medium', timeStyle: 'short' })

// Quoted, and prefixed with ' where a spreadsheet would otherwise read the cell
// as a formula: names and phone numbers are typed in by the public.
const csvCell = (value: string | number) => {
  const text = String(value)
  return `"${(/^[=+\-@]/.test(text) ? `'${text}` : text).replace(/"/g, '""')}"`
}

export default function AdminRegistrationsPage() {
  const router = useRouter()
  const [data, setData] = useState<RegistrationsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [runId, setRunId] = useState('')
  const [query, setQuery] = useState('')
  const [files, setFiles] = useState<Record<string, File>>({})
  const [issuingRef, setIssuingRef] = useState<string | null>(null)

  const fetchRegistrations = async () => {
    setLoading(true)
    setLoadError('')
    try {
      const res = await fetch('/api/registrations')
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const body = await res.json()
      if (!res.ok) {
        setLoadError(body.error || 'Failed to load registrations')
        return
      }
      setData(body)
      setRunId(current => current || body.currentRunId)
    } catch {
      setLoadError('Network error. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRegistrations() }, [])

  const chooseFile = (reference: string, file: File | undefined) => {
    if (!file) return
    if (!CERTIFICATE_TYPES.includes(file.type)) {
      toast.error('Please choose a PDF, PNG or JPG file.')
      return
    }
    if (file.size > MAX_CERTIFICATE_BYTES) {
      toast.error('File too large (max 4MB).')
      return
    }
    setFiles(prev => ({ ...prev, [reference]: file }))
  }

  const clearFile = (reference: string) =>
    setFiles(prev => {
      const next = { ...prev }
      delete next[reference]
      return next
    })

  const issue = async (r: Registration) => {
    const file = files[r.reference]
    if (!file) return
    const again = r.certificate ? ' They have already been sent one; this sends the new file as well.' : ''
    if (!confirm(`Email ${file.name} to ${r.name} (${r.email}) as their certificate?${again}`)) return

    setIssuingRef(r.reference)
    try {
      const formData = new FormData()
      formData.append('reference', r.reference)
      formData.append('file', file)
      const res = await fetch('/api/registrations/certificate', { method: 'POST', body: formData })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const body = await res.json()
      if (!res.ok) {
        toast.error(body.error || 'Failed to issue the certificate')
        return
      }
      setData(prev =>
        prev && {
          ...prev,
          registrations: prev.registrations.map(x =>
            x.reference === r.reference ? { ...x, certificate: { issuedAt: body.issuedAt } } : x
          ),
        }
      )
      clearFile(r.reference)
      toast.success(`Certificate sent to ${body.email}`)
    } catch {
      toast.error('Network error. The certificate may not have been sent.')
    } finally {
      setIssuingRef(null)
    }
  }

  const run = data?.runs.find(x => x.id === runId)
  const inRun = data?.registrations.filter(r => r.runId === runId) ?? []
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = inRun.filter(r =>
    !normalizedQuery || [r.name, r.email, r.phone, r.reference].join(' ').toLowerCase().includes(normalizedQuery)
  )
  const issuedCount = inRun.filter(r => r.certificate).length
  const canIssue = data?.certificates !== 'not-configured'

  const copyEmails = async () => {
    const emails = Array.from(new Set(filtered.map(r => r.email)))
    try {
      await navigator.clipboard.writeText(emails.join(', '))
      toast.success(`Copied ${emails.length} email${emails.length === 1 ? '' : 's'}`)
    } catch {
      toast.error('Could not copy to the clipboard')
    }
  }

  const exportCsv = () => {
    const header = ['Name', 'Email', 'Phone', 'Paid (NGN)', 'Paid at (WAT)', 'Reference', 'Certificate issued (WAT)']
    const rows = filtered.map(r => [
      r.name,
      r.email,
      r.phone,
      r.paidNaira,
      r.paidAt ? formatDate(r.paidAt) : '',
      r.reference,
      r.certificate ? formatDate(r.certificate.issuedAt) : '',
    ])
    const csv = [header, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n')
    // The byte-order mark makes Excel read the file as UTF-8.
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${runId}-registrations.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white">Registrations</h1>
          <p className="text-white/40 text-sm mt-1">
            {run ? `${run.label} - ` : ''}
            {inRun.length} registered - {issuedCount} certificate{issuedCount === 1 ? '' : 's'} issued
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyEmails}
            disabled={filtered.length === 0}
            className="px-4 py-2 text-xs text-white/70 border border-white/20 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Copy emails
          </button>
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="px-4 py-2 text-xs text-white/70 border border-white/20 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      {data && data.certificates !== 'ok' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
          <p className="text-red-400 font-semibold text-sm">
            {data.certificates === 'not-configured'
              ? 'Certificate storage is not set up'
              : 'Could not load issued certificates'}
          </p>
          <p className="text-white/50 text-xs mt-1">
            {data.certificates === 'not-configured'
              ? 'Certificates can’t be issued until a private Vercel Blob store is connected to this project. The registrations below are still up to date.'
              : 'The list below may not show who has already been sent a certificate. Try reloading the page.'}
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, email, phone, or reference..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/30"
          />
        </div>
        {data && data.runs.length > 1 && (
          <select
            value={runId}
            onChange={e => setRunId(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
          >
            {data.runs.map(x => (
              <option key={x.id} value={x.id}>
                {x.label}
                {x.id === data.currentRunId ? ' (current)' : ''}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#1A1A1A] rounded-2xl h-24 animate-pulse" />
          ))}
        </div>
      ) : loadError ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">{loadError}</p>
          <button
            onClick={fetchRegistrations}
            className="mt-4 px-4 py-2 text-xs text-gold-400 border border-gold-500/30 rounded-lg hover:bg-gold-500/10 transition-colors"
          >
            Try again
          </button>
        </div>
      ) : inRun.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">No one has registered for this run yet.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-16 text-center">
          <p className="text-white/40">No registrations match your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => {
            const file = files[r.reference]
            const issuing = issuingRef === r.reference
            return (
              <div
                key={r.reference}
                className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-5 flex flex-col lg:flex-row gap-4 lg:items-center"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{r.name}</p>
                  <a
                    href={`mailto:${r.email}`}
                    className="text-gold-400 text-sm hover:text-gold-300 transition-colors break-all"
                  >
                    {r.email}
                  </a>
                  <p className="text-white/50 text-xs mt-1">
                    {r.phone || 'No phone'} - {formatNaira(r.paidNaira)}
                    {r.paidAt ? ` - ${formatDate(r.paidAt)}` : ''}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5 font-mono break-all">{r.reference}</p>
                </div>

                <div className="lg:w-80 shrink-0 space-y-2">
                  {r.certificate && (
                    <p className="text-xs text-green-400">
                      Certificate issued {formatDate(r.certificate.issuedAt)} -{' '}
                      <a
                        href={`/api/registrations/certificate?reference=${encodeURIComponent(r.reference)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-green-300"
                      >
                        View
                      </a>
                    </p>
                  )}
                  {file ? (
                    <div className="flex items-center gap-2">
                      <span className="flex-1 min-w-0 truncate text-white/60 text-xs" title={file.name}>
                        {file.name}
                      </span>
                      <button
                        onClick={() => clearFile(r.reference)}
                        disabled={issuing}
                        className="px-2 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors disabled:opacity-50"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => issue(r)}
                        disabled={issuingRef !== null}
                        className="px-3 py-1.5 text-xs font-semibold bg-gold-gradient text-charcoal rounded-lg hover:shadow-lg hover:shadow-gold-500/20 transition-all disabled:opacity-60"
                      >
                        {issuing ? 'Sending...' : r.certificate ? 'Issue again' : 'Issue'}
                      </button>
                    </div>
                  ) : (
                    <label
                      className={`inline-block px-3 py-1.5 text-xs text-white/70 border border-white/20 rounded-lg transition-colors ${
                        canIssue ? 'cursor-pointer hover:bg-white/10' : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {r.certificate ? 'Upload a new certificate' : 'Upload certificate (PDF, PNG or JPG)'}
                      <input
                        type="file"
                        accept="application/pdf,image/png,image/jpeg,.pdf,.png,.jpg,.jpeg"
                        disabled={!canIssue}
                        className="sr-only"
                        onChange={e => {
                          chooseFile(r.reference, e.target.files?.[0])
                          e.target.value = ''
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
