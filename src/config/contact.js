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
  scriptUrl: 'https://script.google.com/macros/s/AKfycby5ygYnFrA4wqamncyWHq2iA1NEWqmA4hk5WlJcqdgNW3DEtnqy_hiMM9q1_6AtfUh_/exec',
  recipient: 'brucechamde@gmail.com',
}
//https://script.google.com/macros/s/AKfycby5ygYnFrA4wqamncyWHq2iA1NEWqmA4hk5WlJcqdgNW3DEtnqy_hiMM9q1_6AtfUh_/exec