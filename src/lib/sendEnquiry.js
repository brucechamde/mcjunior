import { CONTACT } from '../config/contact'

const TIMEOUT_MS = 20000
const COOLDOWN_MS = 60_000
const COOLDOWN_KEY = 'enquiry-sent-at'

// One message a minute per browser. This only stops accidental double sends and lazy scripts;
// the real limits are enforced server-side in docs/contact-form.gs.
function onCooldown() {
  try {
    return Date.now() - Number(localStorage.getItem(COOLDOWN_KEY) || 0) < COOLDOWN_MS
  } catch {
    return false
  }
}

function markSent() {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
  } catch {
    // Storage blocked: skip the cooldown
  }
}

// Sends a contact-form enquiry. Resolves to { ok: true, via: 'api' | 'mailto' } or { ok: false, reason? }.
export async function sendEnquiry({ name, email, message, botcheck, elapsed }) {
  // Hidden spam-trap field was filled in: pretend it worked and send nothing.
  if (botcheck) return { ok: true, via: 'api' }

  if (onCooldown()) return { ok: false, reason: 'wait' }

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
      body: JSON.stringify({ name, email, message, elapsed }),
      signal: controller.signal,
    })
    const data = await res.json()
    if (!data.ok) {
      console.warn('Contact form: the mail script declined the message:', data.note || 'no reason given')
      return { ok: false, reason: data.note }
    }
    markSent()
    return { ok: true, via: 'api' }
  } catch (error) {
    console.warn('Contact form: could not reach the mail script:', error?.name || error)
    return { ok: false }
  } finally {
    clearTimeout(timer)
  }
}
