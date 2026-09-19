import { PiCalendarBlank } from 'react-icons/pi'

import Ambient from '../components/Ambient'
import Reveal from '../components/Reveal'

import featured from '../assets/images/highlights/featured.jpeg'
import highlight1 from '../assets/images/highlights/highlight1.jpeg'
import highlight2 from '../assets/images/highlights/highlight2.jpeg'
import highlight3 from '../assets/images/highlights/highlight3.jpeg'
import highlight4 from '../assets/images/highlights/highlight4.jpeg'

const featuredHighlight = {
  image: featured,
  size: [1152, 2048],
  tag: 'Nightclub',
  date: 'Aug 27, 2026',
  iso: '2026-08-27',
  title: 'Outstanding Vol.7 was one for the books',
  excerpt:
    "The Moser Room came alive with a packed floor, a killer lineup, and a crowd that didn't stop moving until close. Here's a look back at the night.",
}

// Four items fill a 7/5 + 5/7 grid exactly, so there are no empty cells.
const highlights = [
  {
    image: highlight1,
    size: [1152, 2048],
    tag: 'Weddings',
    date: 'Jul 12, 2026',
    iso: '2026-07-12',
    title: 'A garden wedding to remember',
    excerpt: 'Soft lighting, live acoustic sets, and a reception that ran well past midnight.',
    span: 'lg:col-span-7',
  },
  {
    image: highlight2,
    size: [720, 482],
    tag: 'Corporate',
    date: 'Jun 3, 2026',
    iso: '2026-06-03',
    title: 'Telstra end-of-year celebration',
    excerpt: 'Full production for 300+ guests, from stage design to the closing set.',
    span: 'lg:col-span-5',
  },
  {
    image: highlight3,
    size: [2048, 2048],
    tag: 'Talent',
    date: 'May 18, 2026',
    iso: '2026-05-18',
    title: 'Meet our newest signed DJ',
    excerpt: 'Straight from the local club circuit to our talent roster this month.',
    span: 'lg:col-span-5',
  },
  {
    image: highlight4,
    size: [2048, 2048],
    tag: 'Nightclub',
    date: 'Apr 29, 2026',
    iso: '2026-04-29',
    title: 'Behind the scenes: building a set',
    excerpt: 'What actually goes into planning a three-hour nightclub takeover.',
    span: 'lg:col-span-7',
  },
]

function Meta({ tag, date, iso }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="font-medium text-accent">{tag}</span>
      <span className="flex items-center gap-1.5 text-dim">
        <PiCalendarBlank size={16} aria-hidden="true" />
        <time dateTime={iso}>{date}</time>
      </span>
    </div>
  )
}

function Highlights() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32">
      <Ambient />

      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl">Highlights</h1>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            Recaps from the nights, weddings and projects we've been part of lately.
          </p>
        </Reveal>

        {/* Featured */}
        <Reveal as="article" className="group panel mt-14 overflow-hidden lg:mt-20">
          <div className="grid md:grid-cols-2">
            <div className="relative h-72 overflow-hidden md:h-full md:min-h-[26rem]">
              <img
                src={featuredHighlight.image}
                alt={featuredHighlight.title}
                width={featuredHighlight.size[0]}
                height={featuredHighlight.size[1]}
                className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <Meta tag={featuredHighlight.tag} date={featuredHighlight.date} iso={featuredHighlight.iso} />
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {featuredHighlight.title}
              </h2>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">{featuredHighlight.excerpt}</p>
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {highlights.map((item, i) => (
            <Reveal as="article" key={item.title} delay={(i % 2) * 120} className={`group flex flex-col ${item.span}`}>
              <div className="overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-fg/10">
                <img
                  src={item.image}
                  alt={item.title}
                  width={item.size[0]}
                  height={item.size[1]}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] sm:h-80"
                />
              </div>
              <div className="mt-5">
                <Meta tag={item.tag} date={item.date} iso={item.iso} />
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">{item.excerpt}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Highlights
