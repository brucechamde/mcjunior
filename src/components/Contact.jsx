import { useState } from 'react'
import { FaEnvelope, FaPhone, FaLocationDot, FaClock } from 'react-icons/fa6'

const contactDetails = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'info@mcjuniorproject.com',
    accent: 'pink',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+61 429 228 239',
    accent: 'cyan',
  },
  {
    icon: FaLocationDot,
    label: 'Location',
    value: 'Melbourne, Australia',
    accent: 'pink',
  },
  {
    icon: FaClock,
    label: 'Hours',
    value: 'Mon–Sat, 9am–6pm',
    accent: 'cyan',
  },
]

const accentStyles = {
  pink: {
    ring: 'ring-pink-500/30',
    bg: 'bg-pink-500/10',
    icon: 'text-pink-400',
  },
  cyan: {
    ring: 'ring-cyan-400/30',
    bg: 'bg-cyan-400/10',
    icon: 'text-cyan-300',
  },
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Hook this up to your email service / backend later
    console.log('Form submitted:', form)
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="relative bg-[#0B0B10] overflow-hidden px-4 py-20 sm:py-28">
      {/* Background contrast layer, same vibe as Home */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-14 sm:mb-16 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-pink-400 mb-3">
            GET IN TOUCH
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact us
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Got an event in mind? Tell us what you're planning and we'll get back
            to you with the right people for the job.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Contact details */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactDetails.map(({ icon: Icon, label, value, accent }) => {
              const styles = accentStyles[accent]
              return (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5"
                >
                  <div
                    className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ring-1 ${styles.ring} ${styles.bg}`}
                  >
                    <Icon className={`w-4 h-4 ${styles.icon}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-6 py-3 rounded-full bg-pink-500 text-white font-semibold text-sm hover:bg-pink-400 transition-colors self-start"
              >
                Send message
              </button>

              {submitted && (
                <p className="text-sm text-cyan-300">
                  Thanks — we'll be in touch soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact