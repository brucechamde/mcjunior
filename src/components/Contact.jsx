import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { PiCheckCircle, PiClock, PiEnvelopeSimple, PiMapPin, PiPhone, PiWarningCircle } from 'react-icons/pi'

import Ambient from './Ambient'
import Reveal from './Reveal'
import Spotlight from './Spotlight'
import { sendEnquiry } from '../lib/sendEnquiry'

const contactDetails = [
  { icon: PiEnvelopeSimple, label: 'Email', value: 'info@mcjuniorproject.com', href: 'mailto:info@mcjuniorproject.com' },
  { icon: PiPhone, label: 'Phone', value: '+61 429 228 239', href: 'tel:+61429228239' },
  { icon: PiMapPin, label: 'Location', value: 'Melbourne, Australia' },
  { icon: PiClock, label: 'Hours', value: 'Mon-Sat, 9am-6pm' },
]

const emptyForm = { name: '', email: '', message: '', botcheck: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name.'
  if (!form.email.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = 'Enter a valid email, like you@example.com.'
  if (form.message.trim().length < 10) errors.message = 'Tell us a little more about your event (10 characters minimum).'
  return errors
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-300">
          <PiWarningCircle size={16} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  // idle | sending | sent | opened (email app) | error
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = ['name', 'email', 'message'].find((key) => found[key])
      formRef.current?.elements[first]?.focus()
      return
    }

    setStatus('sending')
    const result = await sendEnquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      botcheck: form.botcheck,
    })

    if (result.ok) {
      setStatus(result.via === 'mailto' ? 'opened' : 'sent')
      setForm(emptyForm)
    } else {
      setStatus('error')
    }
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: 'field',
  })

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-24 lg:py-32">
      <Ambient />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl">Contact us</h2>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">
                Got an event in mind? Tell us what you're planning and we'll get back to you with the right people for
                the job.
              </p>
            </Reveal>

            <ul className="mt-10 flex flex-col gap-2">
              {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
                <Reveal as="li" key={label} delay={i * 80} y={16}>
                  <Spotlight className="group flex items-center gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-fg/[0.03]">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-fg/[0.05] text-accent ring-1 ring-fg/10 transition-transform duration-300 group-hover:scale-105">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-dim">{label}</p>
                      {href ? (
                        <a href={href} className="break-words font-medium transition-colors hover:text-accent">
                          {value}
                        </a>
                      ) : (
                        <p className="break-words font-medium">{value}</p>
                      )}
                    </div>
                  </Spotlight>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="panel p-6 sm:p-9">
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <Field id="name" label="Name" error={errors.name}>
                  <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Your name…" />
                </Field>

                <Field id="email" label="Email" error={errors.email}>
                  <input
                    {...fieldProps('email')}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    {...fieldProps('message')}
                    rows={5}
                    autoComplete="off"
                    placeholder="Tell us about your event…"
                    className="field resize-none"
                  />
                </Field>

                {/* Spam trap: hidden from people, filled in by bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="botcheck">Leave this field empty</label>
                  <input
                    id="botcheck"
                    name="botcheck"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.botcheck}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <button type="submit" disabled={status === 'sending'} className="btn-primary">
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  <div aria-live="polite" role="status">
                    <AnimatePresence mode="wait">
                      {(status === 'sent' || status === 'opened') && (
                        <motion.p
                          key="ok"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300"
                        >
                          <PiCheckCircle size={20} aria-hidden="true" />
                          {status === 'sent'
                            ? "Thanks. Your message is on its way and we'll be in touch soon."
                            : 'Your email app should now open with your message ready to send.'}
                        </motion.p>
                      )}
                      {status === 'error' && (
                        <motion.p
                          key="error"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2 text-sm text-red-600 dark:text-red-300"
                        >
                          <PiWarningCircle size={20} aria-hidden="true" className="mt-0.5 shrink-0" />
                          <span>
                            We couldn't send your message. Please try again, or email us at{' '}
                            <a href="mailto:info@mcjuniorproject.com" className="underline underline-offset-4">
                              info@mcjuniorproject.com
                            </a>
                            .
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <p className="text-sm text-dim">
                  We only use your details to reply to you. See our{' '}
                  <Link to="/privacy" className="underline underline-offset-4 transition-colors hover:text-fg">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
