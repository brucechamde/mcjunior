// Contact form delivery, using a Google Apps Script web app (free, no server needed).
// The script runs as brucechamde@gmail.com and emails each enquiry to brucechamde@gmail.com.
// Visitors only ever see "message sent"; the visitor's own address is set as Reply-To.
//
// One-time setup: follow the steps at the top of docs/contact-form.gs, then paste the
// Web app URL (it ends in /exec) below as scriptUrl.
//
// While scriptUrl is empty, the form falls back to opening the visitor's email app with the
// message filled in and addressed to `recipient`.
export const CONTACT = {
  scriptUrl: 'https://script.google.com/macros/s/AKfycbzSebFky_wfeWHPFmtVMNTiIN0GDt5iM3I5xQZfh3iGD0uy3ssefc8FnsWry8fDtocX/exec',
  recipient: 'brucechamde@gmail.com',
}
