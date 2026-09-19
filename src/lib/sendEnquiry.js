import { CONTACT } from '../config/contact'

const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'
const TIMEOUT_MS = 15000

const isConfigured = () => Boolean(CONTACT.serviceId && CONTACT.templateId && CONTACT.publicKey)

// Sends a contact-form enquiry. Resolves to { ok: true, via: 'api' | 'mailto' } or { ok: false }.
export async function sendEnquiry({ name, email, message, botcheck }) {
  // Hidden spam-trap field was filled in: pretend it worked and send nothing.
  if (botcheck) return { ok: true, via: 'api' }

  const subject = `Website enquiry from ${name}`

  // Not set up yet: hand the message to the visitor's email app instead of losing it.
  if (!isConfigured()) {
    const body = `${message}\n\nFrom: ${name} (${email})`
    window.location.href = `mailto:${CONTACT.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return { ok: true, via: 'mailto' }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: CONTACT.serviceId,
        template_id: CONTACT.templateId,
        user_id: CONTACT.publicKey,
        template_params: {
          to_email: CONTACT.recipient,
          from_name: name,
          from_email: email,
          reply_to: email,
          subject,
          message,
          site_name: CONTACT.siteName,
        },
      }),
      signal: controller.signal,
    })
    return res.ok ? { ok: true, via: 'api' } : { ok: false }
  } catch {
    return { ok: false }
  } finally {
    clearTimeout(timer)
  }
}
