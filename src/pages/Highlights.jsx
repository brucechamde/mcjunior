import { FaCalendar, FaArrowRight } from 'react-icons/fa6'

import featured from '../assets/images/highlights/featured.jpeg'
import highlight1 from '../assets/images/highlights/highlight1.jpeg'
import highlight2 from '../assets/images/highlights/highlight2.jpeg'
import highlight3 from '../assets/images/highlights/highlight3.jpeg'
import highlight4 from '../assets/images/highlights/highlight4.jpeg'

const featuredHighlight = {
  image: featured,
  tag: 'Nightclub',
  date: 'Aug 27, 2026',
  title: 'Outstanding Vol.7 was one for the books',
  excerpt:
    'The Moser Room came alive with a packed floor, a killer lineup, and a crowd that didn\'t stop moving until close. Here\'s a look back at the night.',
}

const highlights = [
  {
    image: highlight1,
    tag: 'Weddings',
    date: 'Jul 12, 2026',
    title: 'A garden wedding to remember',
    excerpt: 'Soft lighting, live acoustic sets, and a reception that ran well past midnight.',
  },
  {
    image: highlight2,
    tag: 'Corporate',
    date: 'Jun 3, 2026',
    title: 'Telstra end-of-year celebration',
    excerpt: 'Full production for 300+ guests, from stage design to the closing set.',
  },
  {
    image: highlight3,
    tag: 'Talent',
    date: 'May 18, 2026',
    title: 'Meet our newest signed DJ',
    excerpt: 'Straight from the local club circuit to our talent roster this month.',
  },
  {
    image: highlight4,
    tag: 'Nightclub',
    date: 'Apr 29, 2026',
    title: 'Behind the scenes: building a set',
    excerpt: 'What actually goes into planning a three-hour nightclub takeover.',
  },
]

const tagStyles = {
  Nightclub: 'bg-pink-500/10 text-pink-400 ring-pink-500/30',
  Weddings: 'bg-cyan-400/10 text-cyan-300 ring-cyan-400/30',
  Corporate: 'bg-pink-500/10 text-pink-400 ring-pink-500/30',
  Talent: 'bg-cyan-400/10 text-cyan-300 ring-cyan-400/30',
}

function Highlights() {
  return (
    <section className="relative bg-[#0B0B10] overflow-hidden px-4 pt-28 sm:pt-36 pb-20 sm:pb-28">
      {/* Background contrast layer, same system as rest of site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -right-24 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-cyan-300 mb-3">
            RECAPS AND MOMENTS
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Highlights
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Recaps from the nights, weddings and projects we've been part of lately.
          </p>
        </div>

        {/* Featured highlight */}
        <div className="mb-14 sm:mb-16 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <img
                src={featuredHighlight.image}
                alt={featuredHighlight.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ring-1 ${tagStyles[featuredHighlight.tag]}`}
                >
                  {featuredHighlight.tag}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FaCalendar className="w-3 h-3" />
                  {featuredHighlight.date}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                {featuredHighlight.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
                {featuredHighlight.excerpt}
              </p>
              <button className="flex items-center gap-2 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors w-fit">
                Read highlight
                <FaArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Highlight grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${tagStyles[item.tag]}`}
                  >
                    {item.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaCalendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Highlights