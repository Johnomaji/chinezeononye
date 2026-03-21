'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { SiteSettings } from '@/lib/types'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [savedSettings, setSavedSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setSettings(data)
      setSavedSettings(data)
    } catch {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSettings() }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!settings) return
    const { name, value, type } = e.target
    setSettings(prev => prev ? {
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    } : null)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        toast.success('Settings saved!')
        setSavedSettings(settings)
      } else {
        toast.error('Failed to save settings')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleMaintenance = async () => {
    if (!settings) return
    const newMode = !settings.maintenanceMode
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, maintenanceMode: newMode }),
      })
      if (res.status === 401) {
        toast.error('Session expired. Please sign in again.')
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        setSettings(prev => prev ? { ...prev, maintenanceMode: newMode } : null)
        toast.success(newMode ? 'Maintenance mode enabled' : 'Site is now live!')
      }
    } catch {
      toast.error('Failed to update')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-white/5 rounded-xl animate-pulse w-48" />
        <div className="h-64 bg-[#1A1A1A] rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!settings) return null
  const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings)

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage your site configuration</p>
      </div>

      {/* Maintenance Mode Toggle — PROMINENT */}
      <div className={`rounded-2xl p-6 border-2 transition-colors duration-500 ${settings.maintenanceMode ? 'bg-red-500/10 border-red-500/50' : 'bg-green-500/10 border-green-500/30'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${settings.maintenanceMode ? 'bg-red-400' : 'bg-green-400'}`} />
              <h2 className={`font-bold text-lg ${settings.maintenanceMode ? 'text-red-400' : 'text-green-400'}`}>
                {settings.maintenanceMode ? 'Maintenance Mode Active' : 'Site is Live'}
              </h2>
            </div>
            <p className="text-white/60 text-sm">
              {settings.maintenanceMode
                ? 'Your website is currently hidden from visitors. Only admins can access it.'
                : 'Your website is publicly accessible to all visitors.'}
            </p>
          </div>
          <button
            onClick={handleToggleMaintenance}
            disabled={saving}
            className={`shrink-0 px-5 py-2.5 font-semibold text-sm rounded-xl transition-all duration-300 disabled:opacity-70 ${
              settings.maintenanceMode
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {saving ? 'Updating...' : settings.maintenanceMode ? 'Take Site Live' : 'Enable Maintenance'}
          </button>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-5">
        {/* Maintenance Settings */}
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-medium">Maintenance Mode Settings</h3>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Maintenance Message</label>
            <textarea
              name="maintenanceMessage"
              value={settings.maintenanceMessage}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
            />
            <p className="text-white/30 text-xs mt-1">Shown to visitors when maintenance mode is active</p>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Estimated Return Time</label>
            <input
              type="text"
              name="maintenanceEstimate"
              value={settings.maintenanceEstimate}
              onChange={handleChange}
              placeholder="e.g. Back within 2 hours"
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Site Info */}
        <div className="bg-[#1A1A1A] border border-gold-500/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-medium">Site Information</h3>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Site Title</label>
            <input
              type="text"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Site Description</label>
            <input
              type="text"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 bg-gold-gradient text-charcoal font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 disabled:opacity-70"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
          <button
            type="button"
            disabled={!hasChanges}
            onClick={() => { if (savedSettings) setSettings(savedSettings) }}
            className="px-5 py-3 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Revert Changes
          </button>
        </div>
      </form>
    </div>
  )
}
