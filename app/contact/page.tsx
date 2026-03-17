'use client'
import { useState } from 'react'
import PublicLayout from '@/components/PublicLayout'
import toast from 'react-hot-toast'

const faqs = [
  {
    q: 'What types of events does Chineze speak at?',
    a: 'Chineze speaks at conferences, summits, corporate events, schools, universities, workshops, and virtual events. She tailors each talk to fit the specific context and audience.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'For keynote speaking, we recommend booking at least 3-4 weeks in advance for the best availability. For workshops and group coaching sessions, 4–6 weeks is usually sufficient.',
  },
  {
    q: 'Does Chineze offer virtual sessions?',
    a: 'Yes! Chineze is fully equipped and experienced in delivering impactful virtual keynotes, workshops, and group coaching sessions via Zoom, Teams, and other platforms.',
  },
  {
    q: 'What is the process for initiating group coaching?',
    a: 'Start by submitting the contact form. We will schedule a 30-minute discovery call to understand your goals, then propose a customized group coaching plan.',
  },
  {
    q: 'Are there group coaching options?',
    a: 'Yes! Chineze offers small group, medium group and large group coaching programs. Group cohorts are a cost-effective way for organizations to develop multiple leaders simultaneously.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Message sent! Chineze will be in touch soon.')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">Get In Touch</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
            Let&apos;s <span className="gold-text">Connect</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you want to book a speaking engagement, explore mentorship, or just say hello — the door is always open.
          </p>
        </div>
      </section>

      {/* CONTACT FORM + INFO */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">Ways to Reach Out</h2>
            </div>
            {[
              {
                title: 'Email',
                value: 'Chinezeedenononye@gmail.com',
                desc: 'Best for general inquiries and mentorship',
                href: 'mailto:Chinezeedenononye@gmail.com',
              },
              {
                title: 'Speaking Bookings',
                value: 'Chinezeedenononye@gmail.com',
                desc: 'For event and conference inquiries',
                href: 'mailto:Chinezeedenononye@gmail.com',
              },
            ].map(contact => (
              <div key={contact.title} className="bg-white rounded-2xl p-6 gold-border">
                <p className="text-gold-600 font-semibold text-sm mb-1">{contact.title}</p>
                <a href={contact.href} className="text-charcoal font-medium hover:text-gold-600 transition-colors">
                  {contact.value}
                </a>
                <p className="text-charcoal/50 text-xs mt-1">{contact.desc}</p>
              </div>
            ))}

            <div className="bg-charcoal rounded-2xl p-6">
              <p className="text-gold-400 font-semibold text-sm mb-3">Follow Along</p>
              <div className="flex gap-3">
                {[
                  {
                    label: 'Twitter',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.735-8.858L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'LinkedIn',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Instagram',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'YouTube',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                  },
                ].map(({ label, icon }) => (
                  <a
                    key={label}
                    href="#"
                    className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 transition-colors"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gold-50 rounded-2xl p-6 border border-gold-200">
              <p className="font-playfair text-charcoal font-bold mb-2">Response Time</p>
              <p className="text-charcoal/60 text-sm">
                All messages are personally reviewed. Expect a response within 1–2 business days.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 gold-border shadow-sm">
              <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Full Name <span className="text-gold-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:border-gold-400 transition-colors text-sm bg-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email Address <span className="text-gold-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:border-gold-400 transition-colors text-sm bg-cream"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:border-gold-400 transition-colors text-sm bg-cream"
                  >
                    <option value="">Select a subject</option>
                    <option value="Speaking Engagement">Speaking Engagement</option>
                    <option value="school">School talks on boy child</option>
                    <option value="Group Coaching">Group Coaching</option>
                    <option value="Workshop / Training">Workshop / Training</option>
                    <option value="Sonspiration / Boy Child">Sonspiration / Boy Child</option>
                    <option value="Media Inquiry">Media Inquiry</option>
                    <option value="The Unstoppable you">Our Signature Course: The Unstoppable you</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Message <span className="text-gold-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell Chineze about your event, your goals, or what you have in mind..."
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:border-gold-400 transition-colors text-sm bg-cream resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gold-gradient text-charcoal font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-charcoal">
              Frequently Asked <span className="text-gold-600">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gold-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gold-50 transition-colors"
                >
                  <span className="font-medium text-charcoal pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gold-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-charcoal/60 text-sm leading-relaxed">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
