'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center">
            <span className="text-charcoal font-playfair font-bold text-sm">C</span>
          </div>
          <span className="font-playfair font-bold text-xl text-white group-hover:text-gold-400 transition-colors">
            Chineze Ononye
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-sm font-medium transition-all duration-200 relative group',
                pathname === link.href ? 'text-gold-400' : 'text-white/80 hover:text-gold-400'
              )}
            >
              {link.label}
              <span
                className={clsx(
                  'absolute -bottom-1 left-0 h-0.5 bg-gold-400 transition-all duration-300',
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-5 py-2 bg-gold-gradient text-charcoal font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Book Chineze
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={clsx('w-6 h-0.5 bg-gold-400 transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={clsx('w-6 h-0.5 bg-gold-400 transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={clsx('w-6 h-0.5 bg-gold-400 transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'md:hidden absolute top-full left-0 right-0 bg-charcoal/98 backdrop-blur-md transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-96 border-t border-gold-500/20' : 'max-h-0'
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'text-sm font-medium py-2 transition-colors',
                pathname === link.href ? 'text-gold-400' : 'text-white/80 hover:text-gold-400'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-full text-center mt-2"
          >
            Book Chineze
          </Link>
        </div>
      </div>
    </nav>
  )
}
