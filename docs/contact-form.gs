/**
 * Contact form mailer for The MC Junior Project website.
 *
 * Runs in Google Apps Script as brucechamde@gmail.com. The website POSTs the enquiry here, and this script
 * emails it to dangoria.praveen1@gmail.com through Gmail. Visitors never see the Gmail address; the visitor's own
 * address is set as Reply-To so hitting Reply answers them directly.
 *
 * SETUP (signed in to brucechamde@gmail.com)
 *   1. Go to script.google.com > New project. Delete the sample code and paste this whole file in.
 *   2. Click Deploy > New deployment > gear icon > Web app.
 *        Execute as:      Me (brucechamde@gmail.com)
 *        Who has access:  Anyone
 *      Click Deploy, then Authorize access and allow it to send email (Google may show an
 *      "unverified app" warning because it's your own script: Advanced > Go to project).
 *   3. Copy the Web app URL (ends in /exec) into scriptUrl in src/config/contact.js.
 *   4. If you edit this script later, use Deploy > Manage deployments > pencil > New version > Deploy.
 *      The URL stays the same. (Pasting new code without a new version changes nothing on the live form.)
 *
 * ABUSE PROTECTION
 *   The web app URL is public, so anyone can send requests straight to it, bypassing the website. These limits
 *   keep a spammer from flooding the inbox or using up Gmail's daily sending quota:
 *     - hidden spam-trap field, and a minimum time between the form opening and being sent
 *     - one message per email address per minute, and the same message is only accepted once
 *     - at most MAX_PER_HOUR messages an hour and MAX_PER_DAY a day across the whole site
 *     - messages with more than MAX_LINKS links are rejected (typical spam)
 *     - a reserve of Gmail's own daily quota is always left free
 *   If a limit is hit, the website tells the visitor to email directly, so a real person is never stuck.
 *   Stronger option if spam still gets through: add Cloudflare Turnstile (free) and verify it here.
 *
 * Free Gmail accounts can send about 100 emails a day through Apps Script.
 */

const TO = 'dangoria.praveen1@gmail.com'
const SENDER_NAME = 'The MC Junior Project website'

const MAX_PER_HOUR = 15
const MAX_PER_DAY = 40
const MAX_LINKS = 2
const MIN_FILL_MS = 1500 // a human needs longer than this to fill in the form
const QUOTA_RESERVE = 10 // always keep this many of Gmail's daily sends free

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const name = clean(data.name, 100)
    const email = clean(data.email, 200)
    const message = String(data.message || '').replace(/\r/g, '').trim().slice(0, 5000)
    const elapsed = Number(data.elapsed)

    if (data.botcheck) return reply(true) // spam trap filled in: pretend it worked
    if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) return reply(true) // too fast to be a person
    if (!name || !isEmail(email) || message.length < 10) return reply(false, 'invalid')
    if (looksLikeSpam(name, message)) return reply(true) // drop quietly, tells the spammer nothing
    if (MailApp.getRemainingDailyQuota() <= QUOTA_RESERVE) return reply(false, 'busy')
    if (isDuplicateOrTooSoon(email, message)) return reply(false, 'rate')
    if (!takeSlot()) return reply(false, 'busy')

    MailApp.sendEmail({
      to: TO,
      replyTo: email,
      name: SENDER_NAME,
      subject: 'Website enquiry from ' + name,
      body: 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message,
    })
    return reply(true)
  } catch (err) {
    return reply(false, 'error')
  }
}

// Handy for opening the URL in a browser to confirm the deployment is live.
function doGet() {
  return reply(true, 'contact form endpoint is live')
}

function clean(value, max) {
  // One line only, so nobody can inject extra email headers
  return String(value || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max)
}

function isEmail(value) {
  return /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/.test(value)
}

function looksLikeSpam(name, message) {
  const links = (message.match(/https?:\/\/|www\./gi) || []).length
  return links > MAX_LINKS || /https?:\/\/|www\./i.test(name)
}

// Same address within a minute, or the exact same message again within six hours
function isDuplicateOrTooSoon(email, message) {
  const cache = CacheService.getScriptCache()
  const sender = 'sender:' + email.toLowerCase()
  const digest = 'msg:' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email.toLowerCase() + '|' + message),
  )
  if (cache.get(sender) || cache.get(digest)) return true
  cache.put(sender, '1', 60)
  cache.put(digest, '1', 21600)
  return false
}

// Site-wide hourly and daily caps. A lock keeps two simultaneous requests from both slipping past the limit.
function takeSlot() {
  const lock = LockService.getScriptLock()
  lock.waitLock(5000)
  try {
    const props = PropertiesService.getScriptProperties()
    const now = new Date()
    const hourKey = 'h:' + Utilities.formatDate(now, 'UTC', 'yyyyMMddHH')
    const dayKey = 'd:' + Utilities.formatDate(now, 'UTC', 'yyyyMMdd')
    const hour = Number(props.getProperty(hourKey) || 0)
    const day = Number(props.getProperty(dayKey) || 0)
    if (hour >= MAX_PER_HOUR || day >= MAX_PER_DAY) return false

    // Drop old counters so the property store stays tiny
    Object.keys(props.getProperties()).forEach(function (key) {
      if ((key[0] === 'h' || key[0] === 'd') && key !== hourKey && key !== dayKey) props.deleteProperty(key)
    })
    props.setProperty(hourKey, String(hour + 1))
    props.setProperty(dayKey, String(day + 1))
    return true
  } finally {
    lock.releaseLock()
  }
}

function reply(ok, note) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok, note: note || '' })).setMimeType(
    ContentService.MimeType.JSON,
  )
}
