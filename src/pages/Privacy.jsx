import LegalPage from '../components/LegalPage'

const sections = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    body: [
      'This website is run by The MC Junior Project ("we", "us", "our"), an MC, DJ and event production business based in Melbourne, Australia.',
      'We handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. You can reach us at info@mcjuniorproject.com.',
    ],
  },
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: [
      'We only collect what we need to talk to you and to plan your event:',
      {
        list: [
          'Contact details and messages you send us, including your name, email address and anything you write in the contact form.',
          'Event details you share when you make a booking enquiry, such as dates, venue, guest numbers and music preferences.',
          'Records of emails, calls and messages between you and our team.',
          'Basic technical data your browser sends to our hosting provider when you visit, such as your IP address, browser type and the pages you request.',
        ],
      },
      'We do not ask for payment card details through this website.',
    ],
  },
  {
    id: 'how-we-use-it',
    heading: 'How we use your information',
    body: [
      {
        list: [
          'To reply to your enquiry and prepare quotes and bookings.',
          'To deliver and manage the events and services you ask us for.',
          'To keep this website secure and working properly.',
          'To meet legal, tax and accounting obligations.',
        ],
      },
      'We do not sell your personal information.',
    ],
  },
  {
    id: 'sharing',
    heading: 'Who we share it with',
    body: [
      'We share information only when it is needed to do the job you have asked us to do:',
      {
        list: [
          'Our hosting, email and IT service providers, who process it on our behalf. Messages sent through the contact form are handled by our email delivery provider, EmailJS, which passes them to our inbox.',
          'MCs, DJs, performers and event staff working on your event, limited to the details they need.',
          'Government bodies, regulators or others when the law requires it.',
        ],
      },
      'Some of these providers may store data outside Australia. Where that happens we take reasonable steps to make sure your information is handled to a similar standard.',
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies and tracking',
    body: [
      'This website does not set advertising or tracking cookies. Fonts and images are served from the site itself.',
      'Links to Facebook, Instagram and TikTok take you to those platforms, which have their own privacy policies and practices. We are not responsible for how they handle your information.',
      'If we add analytics or similar tools in future, we will update this page first.',
    ],
  },
  {
    id: 'security-and-retention',
    heading: 'Security and how long we keep it',
    body: [
      'We take reasonable steps to protect personal information from misuse, loss and unauthorised access. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
      'We keep information for as long as we need it for the purposes above or to meet legal obligations. After that we delete it or de-identify it.',
    ],
  },
  {
    id: 'your-rights',
    heading: 'Access and correction',
    body: [
      'You can ask to see the personal information we hold about you, and ask us to correct anything that is wrong or out of date. Email info@mcjuniorproject.com and we will respond within 30 days where we can.',
      'You can also ask us to delete your information. We will do so unless we are required to keep it.',
    ],
  },
  {
    id: 'complaints',
    heading: 'Complaints',
    body: [
      'If you think we have mishandled your personal information, contact us first at info@mcjuniorproject.com so we can try to put it right. If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner at oaic.gov.au.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: [
      'We may update this policy from time to time. The date at the top shows when it last changed. Please check back occasionally.',
    ],
  },
]

function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="19 September 2026"
      updatedISO="2026-09-19"
      intro="How The MC Junior Project collects, uses and protects your personal information when you visit this website or book with us."
      sections={sections}
    />
  )
}

export default Privacy
