import { CONTACT } from '../config/contact'

const TIMEOUT_MS = 20000

// Sends a contact-form enquiry. Resolves to { ok: true, via: 'api' | 'mailto' } or { ok: false }.
export async function sendEnquiry({ name, email, message, botcheck }) {
  // Hidden spam-trap field was filled in: pretend it worked and send nothing.
  if (botcheck) return { ok: true, via: 'api' }

  // Not set up yet: hand the message to the visitor's email app instead of losing it.
  if (!CONTACT.scriptUrl) {
    const subject = `Website enquiry from ${name}`
    const body = `${message}\n\nFrom: ${name} (${email})`
    window.location.href = `mailto:${CONTACT.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return { ok: true, via: 'mailto' }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    // text/plain keeps this a "simple" request, which Apps Script accepts without a CORS preflight.
    const res = await fetch(CONTACT.scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name, email, message }),
      signal: controller.signal,
    })
    const data = await res.json()
    return data.ok ? { ok: true, via: 'api' } : { ok: false }
  } catch {
    return { ok: false }
  } finally {
    clearTimeout(timer)
  }
}
