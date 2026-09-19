// Contact form delivery, using EmailJS (free plan, about 200 emails a month, no server needed).
// Enquiries are sent through the brucechamde@gmail.com account and delivered to info@mcjuniorproject.com.
// Visitors only ever see "message sent"; the visitor's own address is set as Reply-To.
//
// One-time setup (do it while signed in to brucechamde@gmail.com)
//   1. Create a free account at emailjs.com.
//   2. Email Services > Add New Service > Gmail > Connect Account, then sign in as brucechamde@gmail.com.
//      Copy the Service ID (looks like service_xxxxxxx).
//   3. Email Templates > Create New Template, and set:
//        To Email:   {{to_email}}
//        From Name:  {{from_name}}
//        Reply To:   {{reply_to}}
//        Subject:    {{subject}}
//        Content:    Name: {{from_name}}
//                    Email: {{from_email}}
//
//                    {{message}}
//      Save it and copy the Template ID (looks like template_xxxxxxx).
//   4. Account > General: copy your Public Key.
//   5. Paste the three values below.
//   6. Recommended: Account > Security > "Allowed domains", add your live site's domain.
//
// The Public Key is meant to be public. Until all three values are set, the form falls back to opening
// the visitor's email app with the message filled in and addressed to `recipient`.
export const CONTACT = {
  serviceId: '',
  templateId: '',
  publicKey: '',
  recipient: 'info@mcjuniorproject.com',
  siteName: 'The MC Junior Project website',
}
