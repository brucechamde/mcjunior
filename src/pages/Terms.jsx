import LegalPage from '../components/LegalPage'

const sections = [
  {
    id: 'agreement',
    heading: 'Using this website',
    body: [
      'By using this website you agree to these terms. If you do not agree, please do not use it.',
      'The website is run by The MC Junior Project ("we", "us", "our"), based in Melbourne, Australia.',
    ],
  },
  {
    id: 'services-and-bookings',
    heading: 'Services and bookings',
    body: [
      'Information on this website about our services, events and packages is general and does not form an offer. A booking is only confirmed once we have agreed the details with you in writing.',
      'Pricing, deposits, cancellation and rescheduling terms are set out in your quote or booking confirmation, and those terms apply to your event.',
      'Event dates, lineups and venues shown on this website may change. We will do our best to keep them current.',
    ],
  },
  {
    id: 'enquiries',
    heading: 'Enquiries and messages',
    body: [
      'When you send us an enquiry, please give accurate details. Sending a message does not create a booking or a contract.',
      'How we handle the information you send is described in our privacy policy.',
    ],
  },
  {
    id: 'intellectual-property',
    heading: 'Content and intellectual property',
    body: [
      'The text, logos, graphics, photos, posters and other material on this website belong to us or are used with permission. You may view and share the site for personal, non-commercial purposes, but you may not copy, modify or reuse our material commercially without our written permission.',
    ],
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable use',
    body: [
      'When using this website, you agree not to:',
      {
        list: [
          'break the law or infringe anyone else\'s rights;',
          'try to gain unauthorised access to the website or its systems;',
          'send spam, malware or misleading messages through the contact form;',
          'use automated tools to scrape or overload the website.',
        ],
      },
    ],
  },
  {
    id: 'third-party-links',
    heading: 'Third-party links',
    body: [
      'This website links to other sites, including social media platforms. We do not control them and are not responsible for their content or practices.',
    ],
  },
  {
    id: 'liability',
    heading: 'Disclaimers and liability',
    body: [
      'We aim to keep this website accurate and available, but we provide it as is and do not promise it will always be error-free or uninterrupted.',
      'Nothing in these terms excludes, restricts or modifies any right or remedy you have under the Australian Consumer Law or any other law that cannot be excluded.',
      'To the extent the law allows, we are not liable for indirect or consequential loss arising from your use of this website.',
    ],
  },
  {
    id: 'governing-law',
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of Victoria, Australia, and you agree to submit to the non-exclusive jurisdiction of the courts of Victoria.',
    ],
  },
  {
    id: 'changes-and-contact',
    heading: 'Changes and contact',
    body: [
      'We may update these terms from time to time. The date at the top shows when they last changed, and continued use of the website means you accept the updated terms.',
      'Questions about these terms can be sent to info@mcjuniorproject.com.',
    ],
  },
]

function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      updated="19 September 2026"
      updatedISO="2026-09-19"
      intro="The rules for using this website and how bookings with The MC Junior Project work."
      sections={sections}
    />
  )
}

export default Terms
