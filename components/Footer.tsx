import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
                <span className="text-charcoal font-playfair font-bold">C</span>
              </div>
              <span className="font-playfair font-bold text-2xl">Chineze Ononye</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Empowering individuals and organizations to discover their purpose, unlock their potential, and live with intention.
            </p>
            <div className="flex gap-4 mt-6">
              {['T', 'L', 'I', 'Y'].map((initial, idx) => {
                const labels = ['Twitter', 'LinkedIn', 'Instagram', 'YouTube']
                return (
                  <a
                    key={labels[idx]}
                    href="#"
                    className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 transition-colors text-xs font-semibold"
                    aria-label={labels[idx]}
                  >
                    {initial}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-gold-400 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Chineze' },
                { href: '/blog', label: 'Blog' },
                { href: '/speaking', label: 'Speaking Topics' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-gold-400 font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="mailto:hello@chinezeonye.com" className="hover:text-gold-400 transition-colors">
                  hello@chinezeonye.com
                </a>
              </li>
              <li>Available for speaking engagements, workshops, and mentorship programs</li>
            </ul>
            <Link
              href="/contact"
              className="inline-block mt-5 px-5 py-2.5 bg-gold-gradient text-charcoal font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {year} Chineze Ononye. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
