import { Link } from 'react-router-dom'
import { PiArrowRight, PiCalendarBlank, PiMapPin } from 'react-icons/pi'

import Reveal from './Reveal'
import poster from '../assets/images/Img.jpg'

const events = [
  {
    title: 'Outstanding Vol.7',
    date: 'Fri 27 Aug 2026',
    iso: '2026-08-27',
    venue: 'The Moser Room',
    poster: poster,
    width: 1656,
    height: 630,
  },
  // Add more events here, each with its own poster image import
]

function Events() {
  return (
    <section id="events" className="relative isolate border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium text-accent">Don't miss out</p>
          <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl">Hope to see you there</h2>
        </Reveal>

        <h3 className="mt-14 text-lg font-medium text-muted">Upcoming events</h3>

        {events.length === 0 ? (
          <Reveal className="panel mt-6 flex flex-col items-start gap-4 p-8">
            <p className="max-w-[46ch] text-muted">
              No events are announced right now. Planning something of your own? Tell us about it.
            </p>
            <Link to="/#contact" className="link-arrow">
              Book an event
              <PiArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        ) : (
          <div className="mt-6 flex flex-col gap-14">
            {events.map((event) => (
              <Reveal as="article" key={event.title} className="group">
                <div className="overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-fg/10 shadow-[0_30px_80px_-40px_rgba(232,87,127,0.4)]">
                  <img
                    src={event.poster}
                    alt={`${event.title} poster`}
                    width={event.width}
                    height={event.height}
                    loading="lazy"
                    className="aspect-[1656/630] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <h4 className="text-2xl font-semibold tracking-tight">{event.title}</h4>
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <PiCalendarBlank size={18} aria-hidden="true" className="text-accent" />
                    <time dateTime={event.iso}>{event.date}</time>
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <PiMapPin size={18} aria-hidden="true" className="text-accent" />
                    {event.venue}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Events
