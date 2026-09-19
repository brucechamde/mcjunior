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
 *      The URL stays the same.
 *
 * Free Gmail accounts can send about 100 emails a day through Apps Script.
 */

const TO = 'dangoria.praveen1@gmail.com'
const SENDER_NAME = 'The MC Junior Project website'
const MAX_PER_HOUR = 40 // safety cap so a spam burst cannot use up the daily quota

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const name = clean(data.name, 100)
    const email = clean(data.email, 200)
    const message = String(data.message || '').trim().slice(0, 5000)

    if (data.botcheck) return reply(true) // spam trap filled in: pretend it worked
    if (!name || !isEmail(email) || message.length < 10) return reply(false, 'invalid')
    if (isRateLimited(email)) return reply(false, 'rate')

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
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function isRateLimited(email) {
  const cache = CacheService.getScriptCache()
  const perSender = 'sender:' + email.toLowerCase()
  if (cache.get(perSender)) return true // one message per address per minute

  const hour = 'hour:' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMddHH')
  const count = Number(cache.get(hour) || 0)
  if (count >= MAX_PER_HOUR) return true

  cache.put(perSender, '1', 60)
  cache.put(hour, String(count + 1), 3600)
  return false
}

function reply(ok, note) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok, note: note || '' })).setMimeType(
    ContentService.MimeType.JSON,
  )
}
