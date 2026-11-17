'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import { formatNaira, unstoppableYou, unstoppableYouDetails } from '@/lib/events'
import { WEB3FORMS_ACCESS_KEY } from '@/lib/web3forms'

type PaystackTransaction = { reference: string }

type PaystackOptions = {
  key: string
  email: string
  amount: number
  currency?: string
  firstName?: string
  lastName?: string
  phone?: string
  metadata?: Record<string, unknown>
  onSuccess: (transaction: PaystackTransaction) => void
  onCancel?: () => void
  onError?: (error: { message?: string }) => void
}

declare global {
  interface Window {
    PaystackPop?: new () => { newTransaction: (options: PaystackOptions) => void }
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
const PAYSTACK_SRC = 'https://js.paystack.co/v2/inline.js'
const CONTACT_EMAIL = 'info@edenononye.com'

let paystackScript: Promise<void> | null = null

function loadPaystack(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve()
  if (!paystackScript) {
    paystackScript = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = PAYSTACK_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        paystackScript = null
        script.remove()
        reject(new Error(`Failed to load ${PAYSTACK_SRC}`))
      }
      document.body.appendChild(script)
    })
  }
  return paystackScript
}

type Registrant = { name: string; email: string; phone: string }

// Paystack's dashboard is the record of who paid; this just emails the details
// to the site inbox as well. A failure here must not affect the registrant.
async function notifyRegistration(r: Registrant, reference: string) {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New registration: ${unstoppableYou.title} (${r.name})`,
        from_name: 'Chineze Eden website',
        name: r.name,
        email: r.email,
        phone: r.phone,
        message: [
          `${r.name} has registered and paid for ${unstoppableYou.title}.`,
          `Dates: ${unstoppableYou.dates}`,
          `Time: ${unstoppableYou.time}`,
          `Amount: ${formatNaira(unstoppableYou.feeNaira)}`,
          `Paystack reference: ${reference}`,
        ].join('\n'),
      }),
    })
    const data = await res.json()
    if (!data.success) console.error('Registration: Web3Forms rejected the notification', res.status, data)
  } catch (err) {
    console.error('Registration: notification to Web3Forms failed', err)
  }
}

const emptyForm: Registrant = { name: '', email: '', phone: '' }

const inputClass =
  'w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:border-gold-400 transition-colors text-sm bg-white disabled:opacity-60'

export default function UnstoppableYouRegister() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'paying' | 'success'>('form')
  const [form, setForm] = useState<Registrant>(emptyForm)
  const [reference, setReference] = useState('')
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    if (step === 'paying') return
    setOpen(false)
    if (step === 'success') {
      setStep('form')
      setForm(emptyForm)
      setReference('')
    }
    triggerRef.current?.focus()
  }, [step])

  useEffect(() => {
    if (!open) return
    // Warm the Paystack script while the visitor fills in the form.
    loadPaystack().catch(() => {})
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!PAYSTACK_KEY) {
      console.error('Registration: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set')
      toast.error(`Online payment is unavailable right now. Please email ${CONTACT_EMAIL} to register.`)
      return
    }

    const registrant: Registrant = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
    }

    setStep('paying')
    try {
      await loadPaystack()
    } catch (err) {
      console.error('Registration: could not load Paystack', err)
      toast.error('Could not open the payment window. Check your connection and try again.')
      setStep('form')
      return
    }

    const [firstName, ...otherNames] = registrant.name.split(/\s+/)
    const popup = new window.PaystackPop!()
    popup.newTransaction({
      key: PAYSTACK_KEY,
      email: registrant.email,
      amount: unstoppableYou.feeNaira * 100, // Paystack expects kobo
      currency: 'NGN',
      firstName,
      lastName: otherNames.join(' '),
      phone: registrant.phone,
      metadata: {
        custom_fields: [
          { display_name: 'Full name', variable_name: 'full_name', value: registrant.name },
          { display_name: 'Phone', variable_name: 'phone', value: registrant.phone },
          {
            display_name: 'Event',
            variable_name: 'event',
            value: `${unstoppableYou.title}, ${unstoppableYou.dates}`,
          },
        ],
      },
      onSuccess: transaction => {
        setReference(transaction.reference)
        setStep('success')
        notifyRegistration(registrant, transaction.reference)
      },
      onCancel: () => {
        setStep('form')
        toast('Payment window closed. You can try again whenever you are ready.')
      },
      onError: error => {
        console.error('Registration: Paystack error', error)
        toast.error('The payment could not be started. Please try again.')
        setStep('form')
      },
    })
  }

  const paying = step === 'paying'

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 px-10 py-4 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-1"
      >
        Register Now
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Portalled to <body>: the scroll-in animation puts a transform on this
          button's column, which would otherwise trap a position:fixed overlay inside it. */}
      {open && createPortal(
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 backdrop-blur-sm">
          <div
            className="min-h-full flex items-center justify-center p-4"
            onMouseDown={e => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="uy-register-title"
              className="relative w-full max-w-lg bg-cream rounded-3xl shadow-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={close}
                disabled={paying}
                aria-label="Close registration"
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="bg-charcoal px-6 sm:px-8 pt-8 pb-6">
                <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-2">Registration</p>
                <h2 id="uy-register-title" className="font-playfair text-2xl sm:text-3xl font-bold text-white pr-8">
                  {unstoppableYou.title}
                </h2>
                <dl className="mt-5 space-y-2.5 text-sm">
                  {unstoppableYouDetails.map(d => (
                    <div key={d.label} className="flex gap-4">
                      <dt className="w-14 shrink-0 text-white/40 text-[11px] tracking-widest uppercase pt-0.5">
                        {d.label}
                      </dt>
                      <dd className="text-white/90">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {step === 'success' ? (
                <div className="px-6 sm:px-8 py-10 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gold-500/15 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3">You&apos;re registered!</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    Thank you, {form.name.trim().split(/\s+/)[0]}. Your payment was successful and your seat is
                    reserved. The joining link and session details will be sent to{' '}
                    <strong className="text-charcoal">{form.email.trim().toLowerCase()}</strong> before the course
                    begins.
                  </p>
                  <p className="text-charcoal/50 text-sm mt-4">
                    Payment reference: <span className="font-mono">{reference}</span>
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 px-10 py-3 bg-gold-gradient text-charcoal font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 space-y-5">
                  <div>
                    <label htmlFor="uy-name" className="block text-sm font-medium text-charcoal mb-2">
                      Full Name <span className="text-gold-600">*</span>
                    </label>
                    <input
                      id="uy-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoFocus
                      autoComplete="name"
                      disabled={paying}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="uy-email" className="block text-sm font-medium text-charcoal mb-2">
                      Email Address <span className="text-gold-600">*</span>
                    </label>
                    <input
                      id="uy-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      disabled={paying}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="uy-phone" className="block text-sm font-medium text-charcoal mb-2">
                      Phone / WhatsApp <span className="text-gold-600">*</span>
                    </label>
                    <input
                      id="uy-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      minLength={7}
                      autoComplete="tel"
                      disabled={paying}
                      placeholder="e.g. 0803 000 0000"
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={paying}
                    className="w-full py-4 bg-gold-gradient text-charcoal font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {paying ? 'Opening secure payment…' : 'Proceed to Payment'}
                  </button>
                  <p className="text-charcoal/50 text-xs text-center leading-relaxed">
                    Payment is processed securely by Paystack (card, bank transfer or USSD).
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
