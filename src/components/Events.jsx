import { FaCalendar, FaLocationDot } from 'react-icons/fa6'
import poster from '../assets/images/Img.jpg'

const events = [
  {
    title: 'Outstanding Vol.7',
    date: 'Fri 27 Aug 2026',
    venue: 'The Moser Room',
    poster: poster,
  },
  // Add more events here, each with its own poster image import
]

function Events() {
  return (
    <section id="events" className="relative bg-[#0B0B10] overflow-hidden">
      {/* Background contrast layer, same system as Home/Contact */}
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

      {/* Intro banner */}
      <div className="relative border-b border-white/10 px-4 py-16 sm:py-20 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-cyan-300 mb-3">
          DON'T MISS OUT
        </p>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Hope to see you there
        </h2>
      </div>

      {/* Upcoming events */}
      <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-pink-400 mb-3">
          WHAT'S ON
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-10">
          Upcoming events
        </h3>

        <div className="flex flex-col gap-10">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
            >
              {/* Event meta */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-6 pt-6">
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {event.title}
                </h4>
                <span className="text-white/20">|</span>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <FaCalendar className="w-3.5 h-3.5 text-cyan-300" />
                  {event.date}
                </div>
                <span className="text-white/20">|</span>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <FaLocationDot className="w-3.5 h-3.5 text-pink-400" />
                  {event.venue}
                </div>
              </div>

              {/* Poster */}
              <div className="mt-6">
                <img
                  src={event.poster}
                  alt={event.title}
                  className="w-full max-h-[600px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events