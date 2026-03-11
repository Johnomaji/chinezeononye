import Link from 'next/link'
import { getSettings } from '@/lib/data'

export const metadata = {
  title: 'Under Maintenance | Chineze Ononye',
}

export default function MaintenancePage() {
  const settings = getSettings()

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center relative overflow-hidden px-6">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,162,39,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gold-600/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center">
            <span className="text-charcoal font-playfair font-bold text-xl">C</span>
          </div>
          <span className="font-playfair font-bold text-2xl text-white">Chineze Ononye</span>
        </div>

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Scheduled Maintenance</span>
        </div>

        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
          We&apos;ll Be Back <span className="gold-text">Soon</span>
        </h1>

        <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-lg mx-auto">
          {settings.maintenanceMessage}
        </p>

        {settings.maintenanceEstimate && (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500/10 border border-gold-500/30 rounded-xl mb-10">
            <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gold-400 text-sm font-medium">{settings.maintenanceEstimate}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <a
            href="mailto:hello@chinezeonye.com"
            className="px-8 py-3.5 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300"
          >
            Email Us Directly
          </a>
          <Link
            href="/admin/login"
            className="px-8 py-3.5 border border-white/20 text-white/70 font-medium rounded-full hover:border-gold-400 hover:text-gold-400 transition-all duration-300 text-sm"
          >
            Admin Login
          </Link>
        </div>

        {/* Decorative gold line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
          <div className="w-2 h-2 rounded-full bg-gold-400" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
        </div>

        <p className="mt-6 text-white/30 text-sm">
          &copy; {new Date().getFullYear()} Chineze Ononye. All rights reserved.
        </p>
      </div>
    </div>
  )
}
