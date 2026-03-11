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
    a: 'For keynote speaking, we recommend booking at least 8–12 weeks in advance for the best availability. For workshops and mentorship sessions, 4–6 weeks is usually sufficient.',
  },
  {
    q: 'Does Chineze offer virtual sessions?',
    a: 'Yes! Chineze is fully equipped and experienced in delivering impactful virtual keynotes, workshops, and mentorship sessions via Zoom, Teams, and other platforms.',
  },
  {
    q: 'What is the process for beginning mentorship?',
    a: 'Start by submitting the contact form. We will schedule a 30-minute discovery call to understand your goals, then propose a customized mentorship plan.',
  },
  {
    q: 'Are there group mentorship options?',
    a: 'Yes! Chineze offers both individual and group mentorship programs. Group cohorts are a cost-effective way for organizations to develop multiple leaders simultaneously.',
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
                value: 'hello@chinezeonye.com',
                desc: 'Best for general inquiries and mentorship',
                href: 'mailto:hello@chinezeonye.com',
              },
              {
                title: 'Speaking Bookings',
                value: 'bookings@chinezeonye.com',
                desc: 'For event and conference inquiries',
                href: 'mailto:bookings@chinezeonye.com',
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
                {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map(s => (
                  <a
                    key={s}
                    href="#"
                    className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 transition-colors text-xs font-semibold"
                    aria-label={s}
                  >
                    {s[0]}
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
                    <option value="Mentorship Program">Mentorship Program</option>
                    <option value="Workshop / Training">Workshop / Training</option>
                    <option value="Media Inquiry">Media Inquiry</option>
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
